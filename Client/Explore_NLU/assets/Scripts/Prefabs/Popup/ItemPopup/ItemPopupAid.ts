import { _decorator, Component, Label, Node, SpriteFrame } from "cc";
import { AbsFriendItem } from "./AbsFriendItem";
import DataSender from "../../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupAid")
export class ItemPopupAid extends AbsFriendItem {
  private friendStatus: string = "";
  @property(Label)
  private statusLabel: Label = null;
  start() {
    super.start();
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

  private onClickInvite() {
    console.log("onClickInvite");
    DataSender.sendReqInviteSupport(Number.parseInt(this.friendId));
  }
}
