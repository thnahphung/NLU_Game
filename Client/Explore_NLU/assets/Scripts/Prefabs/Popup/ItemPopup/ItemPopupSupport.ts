import { _decorator, Button, Component, Label, Node, Sprite } from "cc";
import { AbsFriendItem } from "./AbsFriendItem";
import GlobalData from "../../../Utils/GlobalData";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import DataSender from "../../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupSupport")
export class ItemPopupSupport extends AbsFriendItem {
  private friendStatus: string = "";
  @property(Label)
  private statusLabel: Label = null;
  @property(Button)
  private supportButton: Button = null;
  start() {
    super.start();
    this.checkSupportedUser(Number.parseInt(this.friendId));
  }

  checkSupportedUser(friendId: number) {
    if (friendId < 0) return;
    if (GlobalData.me().containsInvitedSupportingUserId(friendId)) {
      this.interactableInviteButton();
    }
  }

  public interactableInviteButton() {
    this.supportButton.interactable = false;
    this.supportButton.getComponent(Sprite).enabled = false;
    this.supportButton.node.getChildByName("Label").getComponent(Label).string =
      t("label_text.aid_btn_invited");
  }

  public setFriendStatus(status: string) {
    this.friendStatus = status;
    this.statusLabel.string = status;
  }

  private onClickSupport() {
    this.interactableInviteButton();
    DataSender.sendReqSupportFriend(Number.parseInt(this.friendId));
    GlobalData.me().addInvitedSupportingUserId(Number.parseInt(this.friendId));
  }
}
