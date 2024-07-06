import { _decorator, Component, Label, Node, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
import { REWARD_ICONS } from '../../Utils/Const';
const { ccclass, property } = _decorator;

@ccclass('RewardEffect')
export class RewardEffect extends Component {
    @property(Sprite)
    private rewardSprite: Sprite = null;
    @property(Label)
    private rewardNameLabel: Label = null;
    @property(Label)
    private rewardQuantityLabel: Label = null;
    @property(SpriteFrame)
    private rewardSprites: SpriteFrame[] = [];
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

    public setReward(name: string, quantity: number, type: REWARD_ICONS): void {
        this.rewardSprites.forEach((spriteFrame) => {
            console.log(spriteFrame.name, type, spriteFrame.name == type);
            if (spriteFrame.name == type) {
                this.setRewardSpriteFrame(spriteFrame);
            }
        })
        this.setRewardName(name);
        this.setRewardQuantity(quantity);
    }
}


