import { _decorator, Color, Component, Label, Node, Sprite } from "cc";
import { ResourceManager } from "../../../Manager/ResourceManager";
const { ccclass, property } = _decorator;

@ccclass("ItemRank")
export class ItemRank extends Component {
  @property(Label)
  private rankLabel: Label = null;
  @property(Label)
  private nameLabel: Label = null;
  @property(Label)
  private goldLabel: Label = null;
  @property(Label)
  private levelLabel: Label = null;
  @property(Label)
  private idLabel: Label = null;
  @property(Sprite)
  private avatarSprite: Sprite = null;

  private user: proto.IUser;
  private rank: number;
  init(user: proto.IUser, rank: number) {
    this.user = user;
    this.rank = rank;
  }
  start() {
    this.setupInfoRank();
  }

  setupInfoRank() {
    this.rankLabel.string = this.rank.toString();
    this.nameLabel.string = this.user.playerName;
    this.goldLabel.string = `${this.user.gold.toString()}G`;
    this.levelLabel.string = this.user.level.toString();
    this.idLabel.string = this.user.userId.toString();
    this.avatarSprite.spriteFrame = ResourceManager.me().getChacracterFrame(
      this.user.character.code
    );
    this.setColorLabelRank();
  }

  private setColorLabelRank() {
    if (this.rank === 1) {
      this.rankLabel.node.getComponent(Label).color = new Color(255, 0, 0);
    } else if (this.rank === 2 || this.rank === 3) {
      this.rankLabel.node.getComponent(Label).color = new Color(255, 255, 0);
    } else {
      this.rankLabel.node.getComponent(Label).color = new Color(0, 0, 0);
    }
  }
}
