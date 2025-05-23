import { _decorator, Button, find, Label, Node, SpriteFrame } from "cc";
import { AbsFriendItem } from "./AbsFriendItem";
import { FriendDetailItem } from "./FriendDetailItem";
import { AudioManger } from "../../../Manager/AudioManger";
import { AUDIOS } from "../../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("FriendListItem")
export class FriendListItem extends AbsFriendItem {
  private friendDetailNode: Node = null;

  init(
    name: string,
    career: string,
    level: string,
    id: string,
    characterProto: proto.ICharacter
  ) {
    super.init(name, career, level, id, characterProto);
  }

  start() {
    super.start();
    this.node.on(
      Node.EventType.TOUCH_END,
      this.handleTouchFriendListItem,
      this
    );
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

  public setFriendDetailNode(node: Node) {
    this.friendDetailNode = node;
  }

  private handleTouchFriendListItem(): void {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    const friendDetailNodeComponent =
      this.friendDetailNode.getComponent(FriendDetailItem);
    friendDetailNodeComponent.setFriendName(this.friendName);
    friendDetailNodeComponent.setFriendCareer(this.friendCareer);
    friendDetailNodeComponent.setFriendLevel(this.friendLevel);
    friendDetailNodeComponent.setFriendId(this.friendId);
    friendDetailNodeComponent.setAvatarSprite(this.avatarSprite.spriteFrame);
    friendDetailNodeComponent.setFriendCharacterProto(
      this.friendCharacterProto
    );
    friendDetailNodeComponent.getAddFriendButton().active = false;
    friendDetailNodeComponent.getModalNode().active = true;
    this.friendDetailNode.active = true;
  }
}
