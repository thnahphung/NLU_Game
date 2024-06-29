import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AbsFriendItem')
export class AbsFriendItem extends Component {
    protected friendName: string = "";
    protected friendCareer: string = "";
    protected friendLevel: string = "";
    protected friendId: string = "";
    @property(SpriteFrame)
    protected bstySprite: SpriteFrame
     @property(SpriteFrame)
    protected ksckSprite: SpriteFrame
    @property(SpriteFrame)
    protected ksnnSprite: SpriteFrame
    @property(SpriteFrame)
    protected kschSprite: SpriteFrame

    protected start() {
        const labelInfo = this.node.getChildByName("ValueInfo");
        this.friendName = labelInfo.getChildByName("NameLabel").getComponent(Label).string;
        this.friendCareer = labelInfo.getChildByName("CareerLabel").getComponent(Label).string;
        this.friendLevel = labelInfo.getChildByName("LevelLabel").getComponent(Label).string;
        this.friendId = labelInfo.getChildByName("IdLabel").getComponent(Label).string;
        if(this.friendCareer.trim() == "Bác sĩ thú y"){
            this.node.getChildByName("Avatar").getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.bstySprite;
        }else if(this.friendCareer.trim() == "Kỹ sư cơ khí"){
            this.node.getChildByName("Avatar").getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.ksckSprite;
        }else if(this.friendCareer.trim() == "Kỹ sư nông nghiệp"){
            this.node.getChildByName("Avatar").getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.ksnnSprite;
        }else if(this.friendCareer.trim() == "Kỹ sư chăn nuôi"){
            this.node.getChildByName("Avatar").getChildByName("Sprite").getComponent(Sprite).spriteFrame = this.kschSprite;
        }
    }
}


