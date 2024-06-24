import { _decorator, Component, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FriendListItem')
export class FriendListItem extends Component {
    
    start() {
        this.node.on(Node.EventType.TOUCH_END, this.handleTouchFriendListItem, this);
    }

    private handleTouchFriendListItem(): void {
        console.log("Touch friend list item");
        this.openFriendDetail().active = true;
        this.openFriendDetail().getChildByName("Modal").active = true;
        this.openFriendDetail().getChildByName("Content").getChildByName("BotInfo").getChildByName("AddFriendButton").active = false;
    }

    private openFriendDetail(): Node {
        const modal = find("UICanvas/PopupLayer/PopupFriend/PopupInfoFriendDetail");
        return modal;
    }
}


