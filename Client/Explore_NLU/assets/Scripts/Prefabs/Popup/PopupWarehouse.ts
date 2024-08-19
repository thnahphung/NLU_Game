import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  ScrollView,
} from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import GlobalData from "../../Utils/GlobalData";
import { ItemPopupWarehouse } from "./ItemPopup/ItemPopupWarehouse";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { PopupInformationWarehouse } from "./PopupInformationWarehouse";
const { ccclass, property } = _decorator;

@ccclass("PopupWarehouse")
export class PopupWarehouse extends Component {
  @property(Prefab) private prefabItemPopupWarehouse: Prefab;
  @property(ScrollView) private scrollView: ScrollView;
  @property(Node) private popupInformationItemWarehouse: Node;

  protected onEnable(): void {
    this.instanceItems();
    this.node.on("click-item", this.onSetupInfoWarehouseItem, this);
  }

  instanceItems() {
    this.scrollView.content.removeAllChildren();
    const warehouseItems = GlobalData.me().getWarehouseItems();
    for (let item of warehouseItems) {
      const itemPopupWarehouse = instantiate(this.prefabItemPopupWarehouse);
      itemPopupWarehouse.getComponent(ItemPopupWarehouse).init(item);
      this.scrollView.content.addChild(itemPopupWarehouse);
    }
  }

  onClickExit() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
  }

  private onSetupInfoWarehouseItem(warehouseItem: proto.IWarehouseItem) {
    this.popupInformationItemWarehouse
      .getComponent(PopupInformationWarehouse)
      .init(warehouseItem);
  }

  public resetQuantityOfItem(warehouseItem: proto.IWarehouseItem) {
    const itemPopupWarehouse = this.scrollView.content.children.find(
      (item) =>
        item.getComponent(ItemPopupWarehouse).getItem().noGrowthItem.id ===
        warehouseItem.noGrowthItem.id
    );
    if (itemPopupWarehouse) {
      itemPopupWarehouse
        .getComponent(ItemPopupWarehouse)
        .setQuantity(warehouseItem.quantity);
    }
  }

  protected onDisable(): void {
    this.closePopupInformationWarehouse();
  }

  public closePopupInformationWarehouse() {
    this.popupInformationItemWarehouse
      .getComponent(PopupInformationWarehouse)
      .close();
  }
}
