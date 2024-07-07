import {
  _decorator,
  Component,
  Input,
  instantiate,
  Node,
  Prefab,
  ScrollView,
} from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import DataSender from "../../Utils/DataSender";
import { AbsHandler } from "../../Handler/AbsHandler";
import { ItemPopupShop } from "./ItemPopup/ItemPopupShop";
import { HandlerManager } from "../../Manager/HandlerManager";
const { ccclass, property } = _decorator;

@ccclass("PopupShop")
export class PopupShop extends AbsHandler {
  @property(Node) private blackBackground: Node;
  @property(Prefab) private prefabItemPopupShop: Prefab;
  @property(ScrollView) private scrollViewItemShops: ScrollView;
  private type: number = 0;
  private shopItems: proto.IShopItem[];

  protected onLoad(): void {
    HandlerManager.me().registerHandler(this);
  }

  start() {
    this.blackBackground.on(Input.EventType.TOUCH_START, this.hidePopup, this);
    DataSender.sendReqLoadShop(this.type);
  }

  public init(type?: proto.ShopItem.TYPE_SHOP) {
    this.type = type;
    this.shopItems = [];
  }

  onMessageHandler(packets: proto.IPacketWrapper) {
    packets.packet.forEach((packet) => {
      if (packet.resLoadShop) {
        this.onResLoadShopHandler(packet);
        console.log("onResLoadShopHandler", packet.resLoadShop);
      }
    });
  }

  onResLoadShopHandler(packet: proto.IPacket) {
    this.shopItems = packet.resLoadShop.shopItems;
    this.shopItems.forEach((shopItem) => {
      const itemPopupShop = instantiate(this.prefabItemPopupShop);
      itemPopupShop.getComponent(ItemPopupShop).init(shopItem);
      this.scrollViewItemShops.content.addChild(itemPopupShop);
    });
  }

  public hidePopup() {
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }

  public setType(type: proto.ShopItem.TYPE_SHOP) {
    this.type = type;
  }

  public getType() {
    return this.type;
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
