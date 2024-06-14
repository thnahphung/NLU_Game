import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Crop')
export class Crop extends Component {
    // Giai đoạn phát triển hiện tại
    private currentStage:number = 0;
    // Thời gian đã trôi qua
    private elapsedTime:number = 0;
    // Thời gian (giây) cho mỗi giai đoạn phát triển
    private seedTime:number = 5;
    private sproutTime:number = 8;
    private smallTreeTime:number = 8;

    @property(SpriteFrame)
    public seedSprite: SpriteFrame
    @property(SpriteFrame)
    public sproutSprite: SpriteFrame
    @property(SpriteFrame)
    public smallTreeSprite: SpriteFrame
    @property(SpriteFrame)
    public bigTreeSprite: SpriteFrame

    protected onLoad(): void {
        // Đặt sprite ban đầu là hạt giống
        this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.seedSprite;
    }

    update(deltaTime: number) {
         this.elapsedTime += deltaTime;
        // Kiểm tra và cập nhật giai đoạn phát triển
        if (this.currentStage === 0 && this.elapsedTime >= this.seedTime) {
            this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.sproutSprite;
            this.currentStage = 1;
            console.log("Sprout");
        } else if (this.currentStage === 1 && this.elapsedTime >= this.seedTime + this.sproutTime) {
            this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.smallTreeSprite;
            this.currentStage = 2;
            console.log("Small Tree");
        } else if (this.currentStage === 2 && this.elapsedTime >= this.seedTime + this.sproutTime + this.smallTreeTime) {
            this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.bigTreeSprite;
            this.currentStage = 3;
            console.log("Big Tree");
        }
    }
}


