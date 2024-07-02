import { _decorator, Button, find, Label, Node, SpriteFrame } from "cc";
import { AbsFriendItem } from "./AbsFriendItem";
import DataSender from "../../../Utils/DataSender";
import { UICanvas } from "../../MainUI/UICanvas";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
const { ccclass, property } = _decorator;

@ccclass("FriendDetailItem")
export class FriendDetailItem extends AbsFriendItem {
    @property(Node)
    private modalNode: Node = null;
    @property(Node)
    private addFriendButton: Node = null;
    start() {
        this.modalNode.on(
            Node.EventType.TOUCH_END,
            this.onCloseFriendDetailModal,
            this
        );
        this.setCharacterSprite();
    }

    setCharacterSprite() {
        super.setCharacterSprite();
    }

    public setFriendName(name: string) {
        super.setFriendName(name);
    }

    public setFriendCareer(career: string) {
        super.setFriendCareer(career);
    }

    public setFriendLevel(level: string) {
        super.setFriendLevel(level);
    }

    public setFriendId(id: string) {
        super.setFriendId(id);
    }

    public setAvatarSprite(spriteFrame: SpriteFrame) {
        super.setFriendAvatar(spriteFrame);
    }

    public setFriendCharacterProto(characterProto: proto.ICharacter) {
        super.setFriendCharacterProto(characterProto);
    }

    public getAddFriendButton() {
        return this.addFriendButton;
    }

    public getModalNode() {
        return this.modalNode;
    }

    onClickVisitFriend() {
        if(!this.friendId || this.friendId == "") return;
        DataSender.sendReqPlayerJoinArea(Number.parseInt(this.friendId));
    }

    onCloseFriendDetailModal() {
        this.modalNode.active = false;
        this.node.active = false;
    }

    onClickAddNewFriend(): void {
        if (this.friendId) {
            DataSender.sendReqAddFriend(Number.parseInt(this.friendId));
            this.modalNode.active = false;
            this.node.active = false;
        } else {
            UICanvas.me().showPopupMessage(t("label_text.error_common"));
        }
    }
}
