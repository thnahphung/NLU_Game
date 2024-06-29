import { _decorator, find, Label, Node } from 'cc';
import { AbsFriendItem } from './AbsFriendItem';
const { ccclass, property } = _decorator;

@ccclass('FriendListItem')
export class FriendListItem extends AbsFriendItem {
    start() {
        super.start();
        this.node.on(Node.EventType.TOUCH_END, this.handleTouchFriendListItem, this);
    }

    private handleTouchFriendListItem(): void {
        console.log("Touch friend list item");
        this.openFriendDetail().active = true;
        this.openFriendDetail().getChildByName("Modal").active = true;
        this.openFriendDetail().getChildByName("Content").getChildByName("BotInfo").getChildByName("AddFriendButton").active = false;
       
        const content = this.openFriendDetail().getChildByName("Content").getChildByName("TopInfo").getChildByName("ValueInfo");
        content.getChildByName("NameLabel").getComponent(Label).string = this.friendName;
        content.getChildByName("CareerLabel").getComponent(Label).string = this.friendCareer;
        content.getChildByName("LevelLabel").getComponent(Label).string = this.friendLevel;
        content.getChildByName("IdLabel").getComponent(Label).string = this.friendId;
    }

    private openFriendDetail(): Node {
        const modal = find("UICanvas/PopupLayer/PopupFriend/PopupInfoFriendDetail");
        return modal;
    }
}


