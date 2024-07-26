import {
  _decorator,
  Button,
  Component,
  Label,
  Node,
  Sprite,
  SpriteFrame,
} from "cc";
import { AbsFriendItem } from "./AbsFriendItem";
import DataSender from "../../../Utils/DataSender";
import GlobalData from "../../../Utils/GlobalData";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import { AudioManger } from "../../../Manager/AudioManger";
import { AUDIOS } from "../../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupAid")
export class ItemPopupAid extends AbsFriendItem {
  private friendStatus: string = "";
  @property(Label)
  private statusLabel: Label = null;
  @property(Button)
  private inviteButton: Button = null;
  start() {
    super.start();
    this.checkInvitedSupportingUser(Number.parseInt(this.friendId));
  }

  public setFriendStatus(status: string) {
    this.friendStatus = status;
    this.statusLabel.string = status;
  }

  setCharacterSprite() {
    super.setCharacterSprite();
  }

  public setFriendName(name: string) {
    super.setFriendName(name);
  }

  public setFriendCareer(career: string) {
    super.setFriendCareer(career);
  }

  public setFriendLevel(level: string) {
    super.setFriendLevel(level);
  }

  public setFriendId(id: string) {
    super.setFriendId(id);
  }

  public setAvatarSprite(spriteFrame: SpriteFrame) {
    super.setFriendAvatar(spriteFrame);
  }

  public setFriendCharacterProto(characterProto: proto.ICharacter) {
    super.setFriendCharacterProto(characterProto);
  }

  public checkInvitedSupportingUser(userId: number) {
    if (userId < 0) return;
    if (GlobalData.me().containsInvitedSupportingUserId(userId)) {
      this.interactableInviteButton();
    }
  }

  public interactableInviteButton() {
    this.inviteButton.interactable = false;
    this.inviteButton.getComponent(Sprite).enabled = false;
    this.inviteButton.node.getChildByName("Label").getComponent(Label).string =
      t("label_text.aid_btn_invited");
  }

  private onClickInvite() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.interactableInviteButton();
    DataSender.sendReqInviteSupport(Number.parseInt(this.friendId));
    GlobalData.me().addInvitedSupportingUserId(Number.parseInt(this.friendId));
  }
}
