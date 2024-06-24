import { _decorator, Button, Component, EditBox, Label, Node, Sprite, SpriteFrame } from 'cc';
import { PopupComponent } from '../../Controller/PopupComponent';
import DataSender from '../../Utils/DataSender';
import { AbsHandler } from '../../Handler/AbsHandler';
import { HandlerManager } from '../../Manager/HandlerManager';
import { UICanvas } from '../MainUI/UICanvas';
import { t } from '../../../../extensions/i18n/assets/LanguageData';
import GlobalData from '../../Utils/GlobalData';
const { ccclass, property } = _decorator;

@ccclass('PopupFriend')
export class PopupFriend extends AbsHandler {
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
    @property(EditBox)
    public friendName: EditBox = null;

    onLoad() {
        HandlerManager.me().registerHandler(this);
        this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.listFriendNode.active = true;
        this.addFriendNode.active = false;
        this.friendDetailModal.on(Node.EventType.TOUCH_END, this.onCloseFriendDetailModal, this);
    }

    onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
        packetWrapper.packet.forEach((packet) => {
            console.log("PopupFriend load: ", packet);
            if (packet.resFindFriend) {
                if(!packet.resFindFriend.friend){
                    UICanvas.me().showPopupMessage(t("label_text.friend_not_found"));
                    return;
                }
                this.showInfoFriendPopupDetail(packet.resFindFriend.friend.id, packet.resFindFriend.friend.name, packet.resFindFriend.friend.character, packet.resFindFriend.friend.level);
                this.friendDetailNode.active = true;
                this.friendDetailModal.active = true;
            }
        });
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

    onClickFindFriend() {
        if(this.friendName.string == "") {
            UICanvas.me().showPopupMessage(t("label_text.friend_name_empty"));
            return;
        }
        if(this.friendName.string.trim() == GlobalData.me().getMainUser().playerName) {
            UICanvas.me().showPopupMessage(t("label_text.friend_name_invalid"));
            return;
        }
        DataSender.sendReqFindFriend(this.friendName.string);
    }

    showInfoFriendPopupDetail(id: number, name: string, career: string, level: number) {
        const labelContent = this.friendDetailNode.getChildByName("Content").getChildByName("TopInfo").getChildByName("ValueInfo");
        labelContent.getChildByName("IdLabel").getComponent(Label).string = id.toString();
        labelContent.getChildByName("NameLabel").getComponent(Label).string = name;
        labelContent.getChildByName("CareerLabel").getComponent(Label).string = career;
        labelContent.getChildByName("LevelLabel").getComponent(Label).string = level.toString();
    }
}


