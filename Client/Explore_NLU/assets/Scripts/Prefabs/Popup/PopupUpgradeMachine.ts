import { _decorator, Button, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PopupUpgradeMachine')
export class PopupUpgradeMachine extends Component {
    @property(Button)
    private specButton: Button = null;
    @property(Button)
    private riseStarButton: Button = null;
    @property(SpriteFrame)
    private buttonNormal: SpriteFrame = null;
    @property(SpriteFrame)
    private buttonPressed: SpriteFrame = null;
    @property(Node)
    private specContent: Node = null;
    @property(Node)
    private riseStarContent: Node = null;
    start() {

    }

    onSpecButtonClicked() {
        this.specContent.active = true;
        this.riseStarContent.active = false;
        this.specButton.normalSprite = this.buttonPressed;
        this.specButton.hoverSprite = this.buttonPressed;
        this.riseStarButton.normalSprite = this.buttonNormal;
    }

    onRiseStarButtonClicked() {
        this.specContent.active = false;
        this.riseStarContent.active = true;
        this.specButton.normalSprite = this.buttonNormal;
        this.riseStarButton.hoverSprite = this.buttonPressed;
        this.riseStarButton.normalSprite = this.buttonPressed;
    }

}


