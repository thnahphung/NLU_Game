import { _decorator, instantiate, Node, Prefab } from "cc";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { PopupComponent } from "../../Controller/PopupComponent";
import { UICanvas } from "../MainUI/UICanvas";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import GlobalData from "../../Utils/GlobalData";
import DataSender from "../../Utils/DataSender";
import { ItemPopupAid } from "./ItemPopup/ItemPopupAid";
const { ccclass, property } = _decorator;

@ccclass("PopupAid")
export class PopupAid extends AbsHandler {
  @property(Prefab)
  private prefabAidItem: Prefab;
  @property(Node)
  private scrollView: Node = null;

  onLoad() {
    HandlerManager.me().registerHandler(this);
    this.onLoadListFriend();
  }

  start() {}

  onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
    packetWrapper.packet.forEach((packet) => {
      if (packet.resLoadSupportFriends) {
        this.onLoadSupportFriends(packet.resLoadSupportFriends);
      }
    });
  }

  private onLoadSupportFriends(
    resLoadSupportFriends: proto.IResLoadSupportFriends
  ) {
    console.log(resLoadSupportFriends);
    const listFriend = resLoadSupportFriends.users;
    listFriend.forEach((friend) => {
      const popupAidItem = instantiate(this.prefabAidItem);
      const friendComponent = popupAidItem.getComponent(ItemPopupAid);
      friendComponent.init(
        friend.playerName,
        friend.character.name,
        friend.level.toString(),
        friend.userId.toString(),
        friend.character
      );
      friendComponent.setFriendStatus("Chờ mời");
      this.scrollView.addChild(popupAidItem);
    });
  }

  onLoadListFriend(): void {
    if (GlobalData.me().getMainUser() == null) return;
    DataSender.sendReqLoadSupportFriends();
  }

  private onClickExitPopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  private onClickInviteRandom() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    DataSender.sedReqSupportFind();
    UICanvas.me().showPopupFindTime();
    this.node.active = false;
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
