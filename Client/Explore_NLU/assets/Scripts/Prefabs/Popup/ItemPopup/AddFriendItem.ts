import { _decorator, find, Label, Node } from 'cc';
import { UICanvas } from '../../MainUI/UICanvas';
import { t } from '../../../../../extensions/i18n/assets/LanguageData';
import DataSender from '../../../Utils/DataSender';
import { AbsFriendItem } from './AbsFriendItem';
const { ccclass, property } = _decorator;

@ccclass('AddFriendItem')
export class AddFriendItem extends AbsFriendItem {
    start() {
        super.start();
        this.node.on(Node.EventType.TOUCH_END, this.handleTouchAddFriendItem, this);
    }

    private handleTouchAddFriendItem(): void {
        console.log("Touch friend list item");
        this.openFriendDetail().active = true;
        this.openFriendDetail().getChildByName("Modal").active = true;
        this.openFriendDetail().getChildByName("Content").getChildByName("BotInfo").getChildByName("AddFriendButton").active = true;
    }

    private openFriendDetail(): Node {
        const modal = find("UICanvas/PopupLayer/PopupFriend/PopupInfoFriendDetail");
        return modal;
    }

    onClickAddNewFriend():void {
        const valueInfo = this.node.getChildByName("ValueInfo");
        const friendId = valueInfo.getChildByName("IdLabel").getComponent(Label).string;
        if(friendId) {
            DataSender.sendReqAddFriend(Number.parseInt(friendId));
        }else{
            UICanvas.me().showPopupMessage(t("label_text.error_common"));
        }
    }
}


