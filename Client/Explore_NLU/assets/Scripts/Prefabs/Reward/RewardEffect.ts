import {
  _decorator,
  Component,
  Label,
  Node,
  Sprite,
  SpriteFrame,
  tween,
  Vec3,
} from "cc";
import { REWARD_ICONS } from "../../Utils/Const";
import { ResourceManager } from "../../Manager/ResourceManager";
const { ccclass, property } = _decorator;

@ccclass("RewardEffect")
export class RewardEffect extends Component {
  @property(Sprite)
  private rewardSprite: Sprite = null;
  @property(Label)
  private rewardNameLabel: Label = null;
  @property(Label)
  private rewardQuantityLabel: Label = null;
  start() {
    tween(this.node)
      .by(0.8, { position: new Vec3(0, 100, 0) })
      .call(() => {
        this.node.destroy();
      })
      .start();
  }

  public setRewardSpriteFrame(spriteFrame: SpriteFrame): void {
    this.rewardSprite.spriteFrame = spriteFrame;
  }

  public setRewardName(name: string): void {
    this.rewardNameLabel.string = name;
  }

  public setRewardQuantity(quantity: number): void {
    this.rewardQuantityLabel.string = "x" + quantity;
  }

  public setReward(
    name: string,
    quantity: number,
    type: REWARD_ICONS | string
  ): void {
    this.setRewardSpriteFrame(ResourceManager.me().getSpriteFrame(type));
    this.setRewardName(name);
    this.setRewardQuantity(quantity);
  }
}
