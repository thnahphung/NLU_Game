import { _decorator, find, Label, Node, SpriteFrame } from 'cc';
import { UICanvas } from '../../MainUI/UICanvas';
import { t } from '../../../../../extensions/i18n/assets/LanguageData';
import DataSender from '../../../Utils/DataSender';
import { AbsFriendItem } from './AbsFriendItem';
const { ccclass, property } = _decorator;

@ccclass('AddFriendItem')
export class AddFriendItem extends AbsFriendItem {
    start() {
        super.start();
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

    onClickAddNewFriend():void {
        if(this.friendId && this.friendId !== "") {
            DataSender.sendReqAddFriend(Number.parseInt(this.friendId));
        }else{
            UICanvas.me().showPopupMessage(t("label_text.error_common"));
        }
    }
}


