import { _decorator, find, Label, Node, Sprite, SpriteFrame } from "cc";
import { UICanvas } from "../../MainUI/UICanvas";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import DataSender from "../../../Utils/DataSender";
import { AbsFriendItem } from "./AbsFriendItem";
const { ccclass, property } = _decorator;

@ccclass("AddFriendItem")
export class AddFriendItem extends AbsFriendItem {
  @property(Sprite)
  private normalSpriteButton: Sprite = null;
  @property(Sprite)
  private sentSpriteButton: Sprite = null;
  private isSent: boolean = false;

  init(
    name: string,
    career: string,
    level: string,
    id: string,
    characterProto: proto.ICharacter
  ): void {
    super.init(name, career, level, id, characterProto);
  }

  start() {
    super.start();
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

  onClickAddNewFriend(): void {
    if (this.isSent) return;
    if (this.friendId && this.friendId !== "") {
      DataSender.sendReqAddFriend(Number.parseInt(this.friendId));
      this.normalSpriteButton.node.active = false;
      this.sentSpriteButton.node.active = true;
      this.isSent = true;
    } else {
      UICanvas.me().showPopupMessage(t("label_text.error_common"));
    }
  }
}
