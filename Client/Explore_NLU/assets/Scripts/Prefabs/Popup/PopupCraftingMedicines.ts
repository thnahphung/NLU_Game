import {
  _decorator,
  Button,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  Sprite,
} from "cc";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import DataSender from "../../Utils/DataSender";
import { AudioManger } from "../../Manager/AudioManger";
import { PopupComponent } from "../../Controller/PopupComponent";
import { AUDIOS, TYPE_ITEM } from "../../Utils/Const";
import { ResourceManager } from "../../Manager/ResourceManager";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../Utils/Util";
import GlobalData from "../../Utils/GlobalData";
import { UICanvas } from "../MainUI/UICanvas";
const { ccclass, property } = _decorator;

@ccclass("PopupCraftingMedicines")
export class PopupCraftingMedicines extends AbsHandler {
  @property(Node) private medicineBar: Node;
  @property(Label) private medicineName: Label;
  @property(Node) private leftBar: Node;
  @property(Node) private rightBar: Node;
  @property(Node) private craftingFormula: Node;
  @property(Node) private containerCrafting: Node;

  @property(Prefab) private itemMedicine: Prefab;
  @property(Prefab) private itemFormulaMedicine: Prefab;
  @property(Prefab) private itemCraftingChoose: Prefab;
  @property(Prefab) private itemCraftingFormula: Prefab;

  private listFormulaChoosed: proto.Formula[] = [];
  private medicineChoosed: proto.IMedicine;
  protected onLoad(): void {
    HandlerManager.me().registerHandler(this);
  }

  start() {
    DataSender.sendResLoadAllFormula();
    DataSender.sendResLoadAllMedicine();
  }

  onMessageHandler(packets: proto.IPacketWrapper) {
    packets.packet.forEach((packet) => {
      if (packet.resLoadAllFormula) {
        this.onLoadAllFormulaHandler(packet.resLoadAllFormula);
      }
      if (packet.resLoadAllMedicine) {
        this.onLoadAllMedicineHandler(packet.resLoadAllMedicine);
      }
      if (packet.resCraftingMedicine) {
        this.onCraftingMedicineHandler(packet.resCraftingMedicine);
      }
    });
  }

  onCraftingMedicineHandler(packet: proto.IResCraftingMedicine) {
    console.log(packet);

    if (packet.status == 400) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(t("label_text.incorrect_formula"));
      return;
    }

    AudioManger.me().playOneShot(AUDIOS.LEVEL_UP);
    for (let warehouseItem of packet.warehouseItems) {
      GlobalData.me().addWarehouseItem(warehouseItem);
    }
    this.listFormulaChoosed = [];
    this.containerCrafting.removeAllChildren();
  }

  onLoadAllFormulaHandler(packet: proto.IResLoadAllFormula) {
    for (let i = 0; i < packet.noGrowthItems.length; i++) {
      const itemFormula = instantiate(this.itemFormulaMedicine);
      itemFormula.getChildByName("Sprite").getComponent(Sprite).spriteFrame =
        ResourceManager.me().getSpriteFrame(packet.noGrowthItems[i].name);
      itemFormula.on(Button.EventType.CLICK, () => {
        this.onClickFormula(packet.noGrowthItems[i], itemFormula);
      });

      GlobalData.me()
        .getWarehouseItems()
        .forEach((warehouseItem) => {
          if (warehouseItem.noGrowthItem.name == packet.noGrowthItems[i].name) {
            itemFormula
              .getChildByName("Quantity")
              .getChildByName("QuantityLabel")
              .getComponent(Label).string = warehouseItem.quantity.toString();
          }
        });
      if (i < 5) {
        this.leftBar.addChild(itemFormula);
      } else {
        this.rightBar.addChild(itemFormula);
      }
    }
  }

  onLoadAllMedicineHandler(packet: proto.IResLoadAllMedicine) {
    for (let item of packet.medicines) {
      const itemMedicine = instantiate(this.itemMedicine);
      itemMedicine.getChildByName("Sprite").getComponent(Sprite).spriteFrame =
        ResourceManager.me().getSpriteFrame(item.noGrowthItem.name);
      itemMedicine.on(Button.EventType.CLICK, () => {
        this.onClickMedicine(item);
      });
      this.medicineBar.addChild(itemMedicine);
    }
  }

  update(deltaTime: number) {}

  onClickExist() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }

  onClickFormula(formula: proto.INoGrowthItem, itemFormula: Node) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    if (this.containerCrafting.children.length >= 10) return;
    if (
      itemFormula
        .getChildByName("Quantity")
        .getChildByName("QuantityLabel")
        .getComponent(Label).string == "0"
    )
      return;
    const itemCraftingChoose = instantiate(this.itemCraftingChoose);
    itemCraftingChoose
      .getChildByName("Sprite")
      .getComponent(Sprite).spriteFrame = ResourceManager.me().getSpriteFrame(
      formula.name
    );
    itemCraftingChoose.on(Button.EventType.CLICK, () => {
      this.onClickCraftingChoosed(itemCraftingChoose, formula, itemFormula);
    });
    this.containerCrafting.addChild(itemCraftingChoose);

    let formulaChoosed: proto.Formula | undefined = this.getFormulaChoosed(
      formula.id
    );
    if (formulaChoosed) {
      formulaChoosed.quantity += 1;
    } else {
      formulaChoosed = {
        noGrowthItemId: formula.id,
        noGrowthItemResultId: 0,
        quantity: 1,
        toJSON: () => ({}),
      };
      this.listFormulaChoosed.push(formulaChoosed);
    }
    let quantity = itemFormula
      .getChildByName("Quantity")
      .getChildByName("QuantityLabel")
      .getComponent(Label).string;
    itemFormula
      .getChildByName("Quantity")
      .getChildByName("QuantityLabel")
      .getComponent(Label).string = (Number.parseInt(quantity) - 1).toString();
  }

  onClickMedicine(medicine: proto.IMedicine) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.medicineName.node.parent.active = true;
    this.medicineChoosed = medicine;
    this.medicineName.string = t(
      "label_text." + Util.convertDashToUnderscore(medicine.noGrowthItem.name)
    );
    this.craftingFormula.removeAllChildren();
    for (let formula of medicine.formulas) {
      const itemCraftingFormula = instantiate(this.itemCraftingFormula);
      itemCraftingFormula
        .getChildByName("Sprite")
        .getComponent(Sprite).spriteFrame = ResourceManager.me().getSpriteFrame(
        formula.noGrowthItem.name
      );
      itemCraftingFormula.getChildByName("Amount").getComponent(Label).string =
        formula.quantity.toString();
      this.craftingFormula.addChild(itemCraftingFormula);
    }
  }

  onClickCraftingChoosed(
    itemCraftingChoosed: Node,
    formula: proto.INoGrowthItem,
    itemFormula: Node
  ) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.containerCrafting.removeChild(itemCraftingChoosed);
    let formulaChoosed: proto.Formula | undefined = this.getFormulaChoosed(
      formula.id
    );
    formulaChoosed.quantity -= 1;
    if (formulaChoosed.quantity == 0) {
      this.listFormulaChoosed = this.listFormulaChoosed.filter(
        (item) => item.noGrowthItemId != formula.id
      );
    }
    let quantity = itemFormula
      .getChildByName("Quantity")
      .getChildByName("QuantityLabel")
      .getComponent(Label).string;
    itemFormula
      .getChildByName("Quantity")
      .getChildByName("QuantityLabel")
      .getComponent(Label).string = (Number.parseInt(quantity) + 1).toString();
  }

  public getFormulaChoosed(noGrowthItemId: number) {
    return this.listFormulaChoosed.find(
      (formula) => formula.noGrowthItemId == noGrowthItemId
    );
  }

  public onClickCraftingMedicine() {
    if (this.medicineChoosed == null) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(t("label_text.please_choose_medicine"));
      return;
    }
    DataSender.sendReqCraftingMedicine(
      this.listFormulaChoosed,
      this.medicineChoosed.noGrowthItem.id
    );
  }
}
