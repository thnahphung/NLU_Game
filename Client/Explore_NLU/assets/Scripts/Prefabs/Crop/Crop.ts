import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, find, Node, RigidBody2D, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING } from '../../Utils/Const';
import { TilledLand } from '../Lands/TilledLand';
const { ccclass, property } = _decorator;

@ccclass('Crop')
export class Crop extends Component {
    // Node đất trồng
    public plantingLand: Node = null;
    // Node đất đã cày
    public tilledLand: Node = null;
    // Giai đoạn phát triển hiện tại
    private currentStage:number = 0;
    // Thời gian đã trôi qua
    private elapsedTime:number = 0;
    // Thời gian (giây) cho mỗi giai đoạn phát triển
    private seedTime:number = 1;
    private sproutTime:number = 1;
    private smallTreeTime:number = 1;
    // Trạng thái cây đã thu hoạch
    private isHarvested:boolean = false;
    // Thời gian hiệu ứng thu hoạch
    private effectHarvestTime: number = 0;
    // Proto information của cây trồng
    public cropProto: proto.ICrop = null;
    // Sprite của các giai đoạn phát triển
    @property(SpriteFrame)
    public seedSprite: SpriteFrame
    @property(SpriteFrame)
    public sproutSprite: SpriteFrame
    @property(SpriteFrame)
    public smallTreeSprite: SpriteFrame
    @property(SpriteFrame)
    public bigTreeSprite: SpriteFrame
    @property(SpriteFrame)
    public harvestSprite: SpriteFrame

    protected onLoad(): void {
        this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.seedSprite;
    }

    protected start(): void {
        // Đặt sprite ban đầu là hạt giống
        this.node.on(Node.EventType.TOUCH_END, this.handleTouchCrop, this);
    }

    private handleTouchCrop(): void {
        let spriteStatus = this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame.name
        if(spriteStatus == "rice-level4-v1" || spriteStatus == "cabbage-level4-v1" || spriteStatus == "carrot-level4-v1" || spriteStatus == "cucumber-level4-v1"  || spriteStatus == "pumpkin-level4-v1"){
            this.showMenuTool();
        }else{
            return;
        }
    }
    private showMenuTool(): void {
        CoatingComponent.me().offAllCoating();
        if(GlobalData.me().getHarvestStatus()){
            return;
        }
        GlobalData.me().setHarvestStatus(true);
        var menuSeedNode = this.getMenuToolNode();
        menuSeedNode.setPosition(this.plantingLand.getPosition().x, this.plantingLand.getPosition().y + 145, 0);
        menuSeedNode.active = true;
        let menuModalPanel = menuSeedNode.getChildByName("MenuToolModal");
        console.log(menuModalPanel)
        CoatingComponent.me().setCoating(COATING.HARVEST, menuModalPanel, menuSeedNode);
        CoatingComponent.me().showCoating(COATING.HARVEST);
        CoatingComponent.me().autoOff(COATING.HARVEST);

        let childrenMenu = menuSeedNode.getChildByName("MenuToolContent").children;
        for (let i = 0; i < childrenMenu.length; i++) {
            const name = childrenMenu[i].name;
            if(name != "Sickle"){
                childrenMenu[i].active = false;
            }else{
                childrenMenu[i].active = true;
            }
        }
    }

    private getMenuToolNode(): Node {
        return find('Canvas/PopupGameLayer/MenuToolPanel');
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if(otherCollider.node.name === "Sickle"){
            this.handleHarvest();
        }else{
            return;
        }
    }

    private handleHarvest(): void {
        this.node.off(Node.EventType.TOUCH_END, this.handleTouchCrop, this);
        this.node.getComponent(Collider2D).enabled = false;
        this.node.scale = new Vec3(0, 0, 0);
        this.node.setPosition(this.node.getPosition().x, this.node.getPosition().y + 10, 0);
        this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.harvestSprite;
        this.tilledLand.getComponent(TilledLand).isSown = false;
        this.isHarvested = true;
        GlobalData.me().setHarvestedStatus(false);
        tween(this.node)
        .call(() => {
            this.node.active = true;
        })
        .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: "backOut" })
        .start();
    }

    update(deltaTime: number) {
        // Kiểm tra và cập nhật hiệu ứng khi đã thu hoạch
        if(this.isHarvested){
            this.effectHarvestTime += deltaTime;
            if(this.effectHarvestTime >= 1){
                this.node.destroy();
            }
        }
        // Kiểm tra và cập nhật giai đoạn phát triển
        if(!this.cropProto || !this.cropProto.CommonRisingTimes || !this.cropProto.CommonRisingTimes.commonRisingTime || this.cropProto.CommonRisingTimes.commonRisingTime.length == 0) {
            return;
        }
            // Lấy ra các giai đoạn phát triển của cây
        this.cropProto.CommonRisingTimes.commonRisingTime.forEach((risingTime) => {
            if(risingTime.stage === 1){
                this.seedTime = risingTime.time;
            }else if(risingTime.stage === 2){
                this.sproutTime = risingTime.time;
            }else if(risingTime.stage === 3){
                this.smallTreeTime = risingTime.time;
            }
        });
        this.elapsedTime += deltaTime;
        if (this.currentStage === 0 && this.elapsedTime >= this.seedTime) {
            this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.sproutSprite;
            this.currentStage = 1;
        } else if (this.currentStage === 1 && this.elapsedTime >= this.seedTime + this.sproutTime) {
            this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.smallTreeSprite;
            this.currentStage = 2;
        } else if (this.currentStage === 2 && this.elapsedTime >= this.seedTime + this.sproutTime + this.smallTreeTime) {
            this.node.getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.bigTreeSprite;
            this.currentStage = 3;
            const collider = this.node.getComponent(BoxCollider2D);
            const rigidBody = this.node.getComponent(RigidBody2D);
            let collider2D = this.node.getComponent(Collider2D);
            if(collider && rigidBody && collider2D){
                collider.enabled = true;
                rigidBody.enabled = true;
                if(collider2D){
                    collider2D.enabled = true;
                    collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
                }
            }
        }
    }
}


