import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from "cc";
import { ResourceManager } from "../../../Manager/ResourceManager";
const { ccclass, property } = _decorator;

@ccclass("AbsFriendItem")
export class AbsFriendItem extends Component {
  protected friendName: string = "";
  protected friendCareer: string = "";
  protected friendLevel: string = "";
  protected friendId: string = "";
  protected friendCharacterProto = null;
  @property(Label)
  protected nameLabel: Label = null;
  @property(Label)
  protected careerLabel: Label = null;
  @property(Label)
  protected levelLabel: Label = null;
  @property(Label)
  protected idLabel: Label = null;
  @property(Sprite)
  protected avatarSprite: Sprite = null;

  init(
    name: string,
    career: string,
    level: string,
    id: string,
    characterProto: proto.ICharacter
  ) {
    this.friendName = this.nameLabel?.string;
    this.friendCareer = this.careerLabel?.string;
    this.friendLevel = this.levelLabel?.string;
    this.friendId = this.idLabel?.string;
    this.friendCharacterProto = characterProto;
    this.setFriendName(name);
    this.setFriendCareer(career);
    this.setFriendLevel(level);
    this.setFriendId(id);
    this.setCharacterSprite();
  }

  protected start() {}

  protected setCharacterSprite() {
    this.avatarSprite.spriteFrame = ResourceManager.me().getChacracterFrame(
      this.friendCharacterProto.code
    );
  }

  protected setFriendName(name: string) {
    this.friendName = name;
    this.nameLabel.string = name;
  }

  protected setFriendCareer(career: string) {
    this.friendCareer = career;
    this.careerLabel.string = career;
  }

  protected setFriendLevel(level: string) {
    this.friendLevel = level;
    this.levelLabel.string = level;
  }

  protected setFriendId(id: string) {
    this.friendId = id;
    this.idLabel.string = id;
  }

  protected setFriendAvatar(sprite: SpriteFrame) {
    this.avatarSprite.spriteFrame = sprite;
  }

  protected setFriendCharacterProto(characterProto: proto.ICharacter) {
    this.friendCharacterProto = characterProto;
  }
}
