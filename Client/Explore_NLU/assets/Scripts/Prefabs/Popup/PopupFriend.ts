import { _decorator, Button, Component, Node, Sprite, SpriteFrame } from 'cc';
import { PopupComponent } from '../../Controller/PopupComponent';
const { ccclass, property } = _decorator;

@ccclass('PopupFriend')
export class PopupFriend extends Component {
    @property(SpriteFrame)
    public btnPressedSprite: SpriteFrame
    @property(SpriteFrame)
    public btnNormalSprite: SpriteFrame
    @property(Button)
    public btnListFriend: Button = null;
    @property(Button)
    public btnAddFriend: Button = null;
    @property(Node)
    public listFriendNode: Node = null;
    @property(Node)
    public addFriendNode: Node = null;
    @property(Node)
    public friendDetailModal: Node = null;
    @property(Node)
    public friendDetailNode: Node = null;
    onLoad() {
        this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.listFriendNode.active = true;
        this.friendDetailModal.on(Node.EventType.TOUCH_END, this.onCloseFriendDetailModal, this);
    }

    onClickExitPopup() {
        this.node.getComponent(PopupComponent).hide();
        let timeoutDestroy = setTimeout(() => {
            this.node.destroy();
            clearTimeout(timeoutDestroy);
        }, 300);      
    }

    onClickListFriend() {
        console.log("List friend");
        this.btnListFriend.getComponent(Sprite).spriteFrame = this.btnPressedSprite;
        this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.listFriendNode.active = true;
        this.addFriendNode.active = false;
    }

    onClickAddFriend() {
        console.log("Add friend");
        this.btnListFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnPressedSprite;
        this.listFriendNode.active = false;
        this.addFriendNode.active = true;
    }

    onClickAcceptFriend() {
        console.log("Accept friend");
    }

    onCloseFriendDetailModal() {
        this.friendDetailModal.active = false;
        this.friendDetailNode.active = false;
    }
}


