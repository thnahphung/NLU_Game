import { _decorator, Component, instantiate, Node, Prefab } from "cc";
import { HandlerManager } from "../../Manager/HandlerManager";
import { AbsHandler } from "../../Handler/AbsHandler";
import { AudioManger } from "../../Manager/AudioManger";
import DataSender from "../../Utils/DataSender";
import { AUDIOS } from "../../Utils/Const";
import { UICanvas } from "../MainUI/UICanvas";
import { ItemPopupSupport } from "./ItemPopup/ItemPopupSupport";
import GlobalData from "../../Utils/GlobalData";
import { PopupComponent } from "../../Controller/PopupComponent";
const { ccclass, property } = _decorator;

@ccclass("PopupSupport")
export class PopupSupport extends AbsHandler {
  @property(Prefab)
  private prefabSupportdItem: Prefab;
  @property(Node)
  private scrollView: Node = null;

  onLoad() {
    HandlerManager.me().registerHandler(this);
    this.onLoadListFriend();
  }
  start() {}

  onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
    packetWrapper.packet.forEach((packet) => {
      if (packet.resLoadAidFriends) {
        this.onLoadAidFriends(packet.resLoadAidFriends);
      }
    });
  }

  private onLoadAidFriends(resLoadAidFriends: proto.IResLoadAidFriends) {
    const listFriend = resLoadAidFriends.users;
    listFriend.forEach((friend) => {
      const popupAidItem = instantiate(this.prefabSupportdItem);
      const friendComponent = popupAidItem.getComponent(ItemPopupSupport);
      friendComponent.init(
        friend.playerName,
        friend.character.name,
        friend.level.toString(),
        friend.userId.toString(),
        friend.character
      );
      friendComponent.setFriendStatus("Đang chờ");
      this.scrollView.addChild(popupAidItem);
    });
  }

  onLoadListFriend(): void {
    if (GlobalData.me().getMainUser() == null) return;
    DataSender.sendReqLoadAidFriends();
  }

  private onClickInviteRandom() {
    console.log(
      "onClickInviteRandom support in popupSupport.ts",
      GlobalData.me().getAidUser(),
      GlobalData.me().getSupportUser()
    );
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    DataSender.sedReqSupportFind();
    UICanvas.me().showPopupFindTime();
    this.node.active = false;
  }

  private onClickExitPopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
