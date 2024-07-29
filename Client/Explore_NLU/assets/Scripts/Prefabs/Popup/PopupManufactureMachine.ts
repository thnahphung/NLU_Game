import {
  _decorator,
  Component,
  Label,
  Node,
  ProgressBar,
  RichText,
  Sprite,
} from "cc";
import { ResourceManager } from "../../Manager/ResourceManager";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import DataSender from "../../Utils/DataSender";
import { MachinePart } from "../Machine/MachinePart";
import { UICanvas } from "../MainUI/UICanvas";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import GlobalData from "../../Utils/GlobalData";
import { ItemMachine } from "./ItemPopup/ItemMachine";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { PopupFactory } from "./PopupFactory";
import { PopupUpgradeMachine } from "./PopupUpgradeMachine";
import { Util } from "../../Utils/Util";
const { ccclass, property } = _decorator;

@ccclass("PopupManufactureMachine")
export class PopupManufactureMachine extends AbsHandler {
  @property(Node)
  private scrollViewManufactureMachine: Node = null;
  @property(RichText)
  private machineName: Label = null;
  @property(Node)
  private machineSprite: Node = null;
  @property(Label)
  private durabelLabel: Label = null;
  @property(Label)
  private speedLabel: Label = null;
  @property(Label)
  private powerLabel: Label = null;
  @property(Label)
  private valueLabel: Label = null;
  @property(Label)
  private descriptionLabel: Label = null;
  @property(Node)
  private machinePartPanel: Node = null;
  @property(ProgressBar)
  private rateProgressBar: ProgressBar = null;
  @property(Node)
  private machineStar: Node[] = [];
  @property(Node)
  private machinePart: Node[] = [];

  private noGrowthItemId: number = -1;
  private machine: proto.IMachine = null;

  init(noGrowthItemId: number) {
    this.noGrowthItemId = noGrowthItemId;
    this.setUpMachine(noGrowthItemId);
  }

  public setNoGothItemId(noGothItemId: number) {
    this.noGrowthItemId = noGothItemId;
  }

  public setMachine(machine: proto.IMachine) {
    this.machine = machine;
  }

  protected onLoad(): void {
    HandlerManager.me().registerHandler(this);
    let machine = GlobalData.me().getMachine(this.noGrowthItemId);
    this.machine = machine;
    this.setUpMachine(this.noGrowthItemId);
    DataSender.sendReqLoadAllMachineFormula();
  }

  onStart(): void {}

  public setUpMachine(noGothItemId: number) {
    let machine = GlobalData.me().getMachine(noGothItemId);
    if (!machine) return;
    this.machine = machine;
    this.machineSprite.getComponent(Sprite).spriteFrame =
      ResourceManager.me().getSpriteFrame(machine.noGrowthItem.name);
    if (machine.propertyMachine) {
      this.machineStar.forEach((star, index) => {
        star.active = index < machine.propertyMachine.numberStar;
      });
      this.machineName.string = Util.setColorString(
        machine.propertyMachine.numberStar,
        t("label_text." + machine.noGrowthItem.name.toLowerCase())
      );
      this.durabelLabel.string = machine.propertyMachine.durable.toString();
      this.speedLabel.string = machine.propertyMachine.speed.toString();
      this.powerLabel.string = machine.propertyMachine.power.toString();
      this.valueLabel.string = machine.propertyMachine.value.toString();
      this.descriptionLabel.string = machine.noGrowthItem.description;
      this.rateProgressBar.progress = machine.propertyMachine.rate / 100;
    }
    if (machine.formulaMachines && machine.formulaMachines.length > 0) {
      this.setParts(machine.formulaMachines);
    } else {
      DataSender.sendReqLoadFormulaOfMachine(machine.noGrowthItem);
    }
  }

  public getScrollViewMachineManufactureMachine() {
    return this.scrollViewManufactureMachine;
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    packets.packet.forEach((packet) => {
      if (packet.resLoadFormulasOfMachine) {
        this.handleResLoadFormulasOfMachine(packet);
      }

      if (packet.resLoadAllMachineFormula) {
        this.handleResLoadAllMachineFormula(packet);
      }

      if (packet.resManufactureMachine) {
        this.handleResManufacture(packet);
      }

      if (packet.resIncreaseRateMachine) {
        this.handleResIncreaseRateMachine(packet);
      }
    });
  }

  private handleResIncreaseRateMachine(packet: proto.IPacket) {
    const status = packet.resIncreaseRateMachine.status;
    if (status == 400) {
      UICanvas.me().showPopupMessage(t("label_text.mac_manufacture_fail_400"));
      return;
    }
    if (status == 401) {
      UICanvas.me().showPopupMessage(
        t("label_text.mac_increase_rate_fail_401")
      );
      return;
    }

    if (status == 402) {
      UICanvas.me().showPopupMessage(
        t("label_text.mac_increase_rate_fail_402")
      );
      return;
    }
    if (status == 500) {
      UICanvas.me().showPopupMessage(t("label_text.server_error"));
      return;
    }

    if (status == 200) {
      let ratePlus =
        packet.resIncreaseRateMachine.rate - this.machine.propertyMachine.rate;
      let machine = GlobalData.me().getMachine(
        packet.resIncreaseRateMachine.machineId
      );
      machine.propertyMachine.rate = packet.resIncreaseRateMachine.rate;
      GlobalData.me().updateMachine(machine);
      this.setUpMachine(machine.noGrowthItem.id);

      let gold = packet.resIncreaseRateMachine.gold;
      GlobalData.me().getMainUser().gold = gold;
      UICanvas.me().loadGold();

      UICanvas.me().showInformationEffect(
        t("label_text.mac_rate"),
        `${packet.resIncreaseRateMachine.rate}`,
        `+${ratePlus}`
      );
    }
  }

  private setParts(formulas: proto.IFormulaMachine[]) {
    this.machinePart.forEach((part, index) => {
      let namePart = formulas[index].noGrowthItem.name;
      if (namePart)
        part.getChildByName("Sprite").getComponent(Sprite).spriteFrame =
          ResourceManager.me().getSpriteFrame(namePart);
      part.getChildByName("Quantity").getComponent(Label).string =
        formulas[index].userQuantity +
        "/" +
        formulas[index].quantity.toString();
    });
  }

  private handleResLoadFormulasOfMachine(packet: proto.IPacket) {
    const machine = packet.resLoadFormulasOfMachine.Machine;
    if (!machine) {
      return;
    }
    const machineData = GlobalData.me().getMachine(machine.noGrowthItem.id);
    machineData.formulaMachines = machine.formulaMachines;
    const formulas = machine.formulaMachines;
    GlobalData.me().updateMachine(machineData);
    this.setParts(formulas);
  }

  private handleResLoadAllMachineFormula(packet: proto.IPacket) {
    const machinePartPanels = this.machinePartPanel.children;
    packet.resLoadAllMachineFormula.noGrowthItems.forEach((item, index) => {
      machinePartPanels[index].getComponent(MachinePart).init(item);
    });
  }

  private handleResManufacture(packet: proto.IPacket) {
    const status = packet.resManufactureMachine.status;
    if (status == 400) {
      UICanvas.me().showPopupMessage(t("label_text.mac_manufacture_fail_400"));
      return;
    }
    if (status == 401) {
      UICanvas.me().showPopupMessage(t("label_text.mac_manufacture_fail_401"));
      return;
    }
    if (status == 500) {
      UICanvas.me().showPopupMessage(t("label_text.server_error"));
      return;
    }
    if (status == 201) {
      UICanvas.me().showPopupManufactureResult(
        this.machine.noGrowthItem,
        new proto.PropertyMachine(),
        status
      );

      let machine = GlobalData.me().getMachine(
        packet.resManufactureMachine.machine.noGrowthItem.id
      );
      machine.formulaMachines =
        packet.resManufactureMachine.machine.formulaMachines;
      machine.propertyMachine.rate =
        packet.resManufactureMachine.machine.propertyMachine.rate;
      GlobalData.me().updateMachine(machine);
      this.setUpMachine(machine.noGrowthItem.id);
      return;
    }
    const machine = packet.resManufactureMachine.machine;
    const propertyMachine = machine.propertyMachine;
    if (status == 200) {
      UICanvas.me().showPopupManufactureResult(
        this.machine.noGrowthItem,
        propertyMachine,
        status
      );
      this.machine = machine;
      this.noGrowthItemId = machine.noGrowthItem.id;
      GlobalData.me().updateMachine(machine);
      this.setUpMachine(machine.noGrowthItem.id);
      this.updateItemMachine(machine.noGrowthItem.id);
    }
  }

  private onClickManufacture() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_1);
    DataSender.sendReqManufactureMachine(this.machine);
  }

  private onClickIncreaseRate() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_1);
    DataSender.sendReqIncreaseRateMachine(this.machine.noGrowthItem.id);
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }

  private updateItemMachine(machineId: number) {
    let itemMachines = this.scrollViewManufactureMachine.children;
    for (let i = 0; i < itemMachines.length; i++) {
      if (
        itemMachines[i].getComponent(ItemMachine).getMachineItemId() ==
        machineId
      ) {
        itemMachines[i].getComponent(ItemMachine).setUpMachine();
        break;
      }
    }

    let popupUpgradeMachine = UICanvas.me()
      .getPopupFactory()
      .getComponent(PopupFactory)
      .getPopupUpgradeMachine();
    let itemMachinesUpgrade = popupUpgradeMachine
      .getComponent(PopupUpgradeMachine)
      .getScrollViewUpgradeMachine().children;
    for (let i = 0; i < itemMachinesUpgrade.length; i++) {
      if (
        itemMachinesUpgrade[i].getComponent(ItemMachine).getMachineItemId() ==
        machineId
      ) {
        itemMachinesUpgrade[i].getComponent(ItemMachine).setUpMachine();
        break;
      }
    }
  }
}
