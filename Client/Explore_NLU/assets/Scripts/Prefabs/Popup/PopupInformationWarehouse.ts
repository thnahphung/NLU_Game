import { _decorator, Button, Component, Label, Node, tween, Vec3 } from "cc";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../Utils/Util";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { UICanvas } from "../MainUI/UICanvas";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("PopupInformationWarehouse")
export class PopupInformationWarehouse extends Component {
  @property(Label)
  private nameItem: Label = null;
  @property(Label)
  private quantity: Label = null;
  @property(Label)
  private price: Label = null;
  private isOpen = false;

  private warehouseItem: proto.IWarehouseItem;

  init(warehouseItem: proto.IWarehouseItem) {
    this.warehouseItem = warehouseItem;
    let name = warehouseItem.noGrowthItem.name;
    this.nameItem.string = t(
      "label_text." + Util.convertDashToUnderscore(name.toLowerCase())
    );
    this.setDefaultQuantity(warehouseItem.quantity);
    this.setPrice();
    this.open();
  }

  private setDefaultQuantity(quantityWarehouse: number) {
    // Chia 2 để hiển thị mặc định, nếu số lẽ thì lấy phần nguyên
    let quantityDefault = quantityWarehouse / 2;
    if (quantityDefault % 1 != 0) {
      quantityDefault = Math.floor(quantityDefault);
    }
    this.quantity.string = quantityDefault.toString();
  }

  private setPrice() {
    if (!this.warehouseItem) return;
    this.price.string = Util.formatPrice(
      this.warehouseItem.noGrowthItem.salePrice * parseInt(this.quantity.string)
    );
  }

  private open() {
    if (this.isOpen) return;
    this.isOpen = true;
    tween(this.node)
      .call(() => {
        this.node.position = new Vec3(-220, 180, 0);
      })
      .to(0.5, { position: new Vec3(-380, 180, 0) }, { easing: "backOut" })
      .start();
  }

  public close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.node.position = new Vec3(-220, 180, 0);
  }

  riseQuantity() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    let quantity = parseInt(this.quantity.string);
    if (quantity >= this.warehouseItem.quantity) return;
    this.quantity.string = (parseInt(this.quantity.string) + 1).toString();
    this.setPrice();
  }

  reduceQuantity() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    let quantity = parseInt(this.quantity.string);
    if (quantity <= 0) return;
    this.quantity.string = (parseInt(this.quantity.string) - 1).toString();
    this.setPrice();
  }

  sell() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    if (!this.warehouseItem) return;
    if (this.warehouseItem.quantity <= 0) {
      UICanvas.me().showPopupMessage(t("label_text.sell_item_400"));
      return;
    }
    DataSender.sendReqSellItemWarehouse(
      this.warehouseItem,
      parseInt(this.quantity.string)
    );
  }
}
