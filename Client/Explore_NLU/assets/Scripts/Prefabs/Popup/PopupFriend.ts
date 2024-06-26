import { _decorator, Button, Component, EditBox, instantiate, Label, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import { PopupComponent } from '../../Controller/PopupComponent';
import DataSender from '../../Utils/DataSender';
import { AbsHandler } from '../../Handler/AbsHandler';
import { HandlerManager } from '../../Manager/HandlerManager';
import { UICanvas } from '../MainUI/UICanvas';
import { t } from '../../../../extensions/i18n/assets/LanguageData';
import GlobalData from '../../Utils/GlobalData';
import { ReqAddFriendItem } from './ItemPopup/ReqAddFriendItem';
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
    @property(Button)
    public btnRequestFriend: Button = null;
    @property(Node)
    public requestFriendNode: Node = null;
    @property(Prefab)
    public friendItemPrefab: Prefab = null;
    @property(Node)
    public scrollViewListFriend: Node = null;
    @property(Prefab)
    public friendItemRequestPrefab: Prefab = null;
    @property(Node)
    public scrollViewRequestFriend: Node = null;
    @property(Node)
    public scrollViewSuggestFriend: Node = null;
    @property(Prefab)
    public addFriendItemPrefab: Prefab = null;

    private requestFriendListLoaded: boolean = false;
    private suggestFriendListLoaded: boolean = false;

    onLoad() {
        HandlerManager.me().registerHandler(this);
        this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.btnRequestFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.listFriendNode.active = true;
        this.addFriendNode.active = false;
        this.onLoadListFriend();
        this.friendDetailModal.on(Node.EventType.TOUCH_END, this.onCloseFriendDetailModal, this);
    }

    onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
        packetWrapper.packet.forEach((packet) => {
            if (packet.resFindFriend) {
                if(!packet.resFindFriend.friend){
                    UICanvas.me().showPopupMessage(t("label_text.friend_not_found"));
                    return;
                }
                this.showInfoFriendPopupDetail(packet.resFindFriend.friend.id, packet.resFindFriend.friend.name, packet.resFindFriend.friend.character, packet.resFindFriend.friend.level);
                this.friendDetailNode.active = true;
                this.friendDetailModal.active = true;
            }

            if (packet.resLoadFriendList) {
                this.onLoadFriendListHandle(packet.resLoadFriendList);
            }

            if(packet.resAcceptFriend) {
                this.onAcceptedFriendHandle(packet.resAcceptFriend);
            }

            if(packet.resAddFriend) {
                this.onRequestAddFriendHandle(packet.resAddFriend);
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
        this.btnRequestFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.listFriendNode.active = true;
        this.addFriendNode.active = false;
        this.requestFriendNode.active = false;
    }

    onClickAddFriend() {
        console.log("Add friend");
        this.btnListFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnPressedSprite;
        this.btnRequestFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.listFriendNode.active = false;
        this.addFriendNode.active = true;
        this.requestFriendNode.active = false;
        if(!this.suggestFriendListLoaded) {
            DataSender.sendReqLoadFriend(4);
            this.suggestFriendListLoaded = true;
        }
    }

    onClickRequestFriend() {
        console.log("Request friend");
        this.btnRequestFriend.getComponent(Sprite).spriteFrame = this.btnPressedSprite;
        this.btnListFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
        this.listFriendNode.active = false;
        this.addFriendNode.active = false;
        this.requestFriendNode.active = true;

        if(!this.requestFriendListLoaded) {
            DataSender.sendReqLoadFriend(1);
            this.requestFriendListLoaded = true;
        }
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

    protected onDestroy(): void {
        HandlerManager.me().unRegisterHandler(this);
    }

    onClickAddNewFriend():void {
        const labelContent = this.friendDetailNode.getChildByName("Content").getChildByName("TopInfo").getChildByName("ValueInfo");
        const friendId = labelContent.getChildByName("IdLabel").getComponent(Label).string;
        if(friendId) {
            DataSender.sendReqAddFriend(Number.parseInt(friendId));
        }else{
            UICanvas.me().showPopupMessage(t("label_text.error_common"));
        }
    }

    onLoadListFriend(): void {
        if(GlobalData.me().getMainUser() == null) return;
        DataSender.sendReqLoadFriend(2);
    }

    onLoadFriendListHandle(resLoadFriendList: proto.IResLoadFriendList): void{
        console.log("Load friend list success");
        const listFriend = resLoadFriendList.friends;
        const status = resLoadFriendList.status;
        if(listFriend.length == 0) {
            return;
        }
        listFriend.forEach((friend) => {
            if(status == 2) {
                const friendItem = instantiate(this.friendItemPrefab);
                const labelInfo = friendItem.getChildByName("ValueInfo");
                labelInfo.getChildByName("NameLabel").getComponent(Label).string = friend.name;
                labelInfo.getChildByName("CareerLabel").getComponent(Label).string = "Hiện chưa có";
                labelInfo.getChildByName("LevelLabel").getComponent(Label).string = friend.level.toString();
                labelInfo.getChildByName("IdLabel").getComponent(Label).string = friend.id.toString();
                this.scrollViewListFriend.addChild(friendItem);
            }

            if(status == 1) {
                const friendItem = instantiate(this.friendItemRequestPrefab);
                friendItem.getComponent(ReqAddFriendItem).scrollListFriend = this.scrollViewListFriend;
                const labelInfo = friendItem.getChildByName("ValueInfo");
                labelInfo.getChildByName("NameLabel").getComponent(Label).string = friend.name;
                labelInfo.getChildByName("CareerLabel").getComponent(Label).string = "Hiện chưa có";
                labelInfo.getChildByName("LevelLabel").getComponent(Label).string = friend.level.toString();
                labelInfo.getChildByName("IdLabel").getComponent(Label).string = friend.id.toString();
                this.scrollViewRequestFriend.addChild(friendItem);
            }

            if(status == 4){
                const addFriendItem = instantiate(this.addFriendItemPrefab);
                const labelInfo = addFriendItem.getChildByName("ValueInfo");
                labelInfo.getChildByName("NameLabel").getComponent(Label).string = friend.name;
                labelInfo.getChildByName("CareerLabel").getComponent(Label).string = "Hiện chưa có";
                labelInfo.getChildByName("LevelLabel").getComponent(Label).string = friend.level.toString();
                labelInfo.getChildByName("IdLabel").getComponent(Label).string = friend.id.toString();
                this.scrollViewSuggestFriend.addChild(addFriendItem);
            }
        });
    }

    onAcceptedFriendHandle(resAcceptFriend: proto.IResAcceptFriend): void {
        console.log("Accept friend success");
        const friend = resAcceptFriend.receiver;
        const friendItem = instantiate(this.friendItemPrefab);
        const labelInfo = friendItem.getChildByName("ValueInfo");
        labelInfo.getChildByName("NameLabel").getComponent(Label).string = friend.name;
        labelInfo.getChildByName("CareerLabel").getComponent(Label).string = "Hiện chưa có";
        labelInfo.getChildByName("LevelLabel").getComponent(Label).string = friend.level.toString();
        labelInfo.getChildByName("IdLabel").getComponent(Label).string = friend.id.toString();
        this.scrollViewListFriend.addChild(friendItem);
    }

    onRequestAddFriendHandle(resAddFriend: proto.IResAddFriend): void {
        const sender = resAddFriend.sender;
        const friendItem = instantiate(this.friendItemRequestPrefab);
        friendItem.getComponent(ReqAddFriendItem).scrollListFriend = this.scrollViewListFriend;
        const labelInfo = friendItem.getChildByName("ValueInfo");
        labelInfo.getChildByName("NameLabel").getComponent(Label).string = sender.name;
        labelInfo.getChildByName("CareerLabel").getComponent(Label).string = "Hiện chưa có";
        labelInfo.getChildByName("LevelLabel").getComponent(Label).string = sender.level.toString();
        labelInfo.getChildByName("IdLabel").getComponent(Label).string = sender.id.toString();
        this.scrollViewRequestFriend.addChild(friendItem);
    }
}


