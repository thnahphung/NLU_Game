import { _decorator, Component, find, Label, Node, Sprite } from "cc";
import { ResourceManager } from "../../../Manager/ResourceManager";
import { Util } from "../../../Utils/Util";
import { UICanvas } from "../../MainUI/UICanvas";
import { AUDIOS } from "../../../Utils/Const";
import { AudioManger } from "../../../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupWarehouse")
export class ItemPopupWarehouse extends Component {
  @property(Sprite) private icon: Sprite;
  @property(Label) private quantity: Label;

  private warehouseItem: proto.IWarehouseItem;
  public init(warehouseItem: proto.IWarehouseItem) {
    this.warehouseItem = warehouseItem;
  }

  protected onLoad(): void {
    this.node.on(Node.EventType.TOUCH_END, this.onClickItem, this);
  }

  start() {
    this.setUpInfoWarehouseItem();
  }

  update(deltaTime: number) {}

  public setUpInfoWarehouseItem() {
    this.icon.spriteFrame = ResourceManager.me().getSpriteFrame(
      this.warehouseItem.noGrowthItem.name
    );
    // this.quantity.string = this.warehouseItem.quantity.toString();
    this.quantity.string = Util.formatAmount(this.warehouseItem.quantity);
  }

  public setItem(warehouseItem: proto.IWarehouseItem) {
    this.warehouseItem = warehouseItem;
  }

  public getItem(): proto.IWarehouseItem {
    return this.warehouseItem;
  }

  private onClickItem() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    const popupWarehouse = find("UICanvas/PopupLayer/PopupWarehouse");
    if (popupWarehouse) {
      popupWarehouse.emit("click-item", this.warehouseItem);
    }
  }

  public setQuantity(quantity: number) {
    this.warehouseItem.quantity = quantity;
    this.quantity.string = Util.formatAmount(quantity);
  }
}
