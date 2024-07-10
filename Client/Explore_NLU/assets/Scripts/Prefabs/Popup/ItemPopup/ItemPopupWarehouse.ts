import { _decorator, Component, Label, Node, Sprite } from "cc";
import { ResourceManager } from "../../../Manager/ResourceManager";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupWarehouse")
export class ItemPopupWarehouse extends Component {
  @property(Sprite) private icon: Sprite;
  @property(Label) private quantity: Label;

  private warehouseItem: proto.IWarehouseItem;
  public init(warehouseItem: proto.IWarehouseItem) {
    this.warehouseItem = warehouseItem;
  }

  start() {
    this.setUpInfoWarehouseItem();
  }

  update(deltaTime: number) {}

  private setUpInfoWarehouseItem() {
    this.icon.spriteFrame = ResourceManager.me().getSpriteFrame(
      this.warehouseItem.noGrowthItem.name
    );
    this.quantity.string = this.warehouseItem.quantity.toString();
  }

  public setItem(warehouseItem: proto.IWarehouseItem) {
    this.warehouseItem = warehouseItem;
  }

  public getItem(): proto.IWarehouseItem {
    return this.warehouseItem;
  }
}
