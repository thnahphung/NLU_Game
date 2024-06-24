import { _decorator, Component, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AddFriendItem')
export class AddFriendItem extends Component {
    start() {
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

}


