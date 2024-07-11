import { _decorator, Component, Input, instantiate, Node, Prefab } from "cc";
import DataSender from "../../Utils/DataSender";
import { PopupComponent } from "../../Controller/PopupComponent";
import { AbsHandler } from "../../Handler/AbsHandler";
import { ItemPopupCageBuilding } from "./ItemPopup/ItemPopupCageBuilding";
import { HandlerManager } from "../../Manager/HandlerManager";
const { ccclass, property } = _decorator;

@ccclass("PopupCageBuilding")
export class PopupCageBuilding extends AbsHandler {
  @property(Node) blackBackground: Node;
  @property(Node) content: Node;
  @property(Prefab) prefabItemPopupCageBuilding: Prefab;
  private cageItems: proto.IShopItem[];

  protected onLoad(): void {
    HandlerManager.me().registerHandler(this);
  }

  start() {
    this.blackBackground.on(Input.EventType.TOUCH_START, this.hidePopup, this);
    DataSender.sendReqLoadShop(proto.ShopItem.TYPE_SHOP.CAGE);
  }

  public hidePopup() {
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }

  onMessageHandler(packets: proto.IPacketWrapper) {
    packets.packet.forEach((packet) => {
      if (packet.resLoadShop) {
        this.onResLoadShopHandler(packet);
      }
    });
  }

  onResLoadShopHandler(packet: proto.IPacket) {
    this.cageItems = packet.resLoadShop.shopItems;
    this.cageItems.forEach((shopItem) => {
      const itemPopupCageBuilding = instantiate(
        this.prefabItemPopupCageBuilding
      );
      itemPopupCageBuilding.getComponent(ItemPopupCageBuilding).init(shopItem);
      this.content.addChild(itemPopupCageBuilding);
    });
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
