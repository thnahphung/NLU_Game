import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import DataSender from '../../../Utils/DataSender';
import GlobalData from '../../../Utils/GlobalData';
import { AbsFriendItem } from './AbsFriendItem';
const { ccclass, property } = _decorator;

@ccclass('ReqAddFriendItem')
export class ReqAddFriendItem extends AbsFriendItem {
    public scrollListFriend: Node = null;

    @property(Prefab)
    public friendItemPrefab: Prefab = null;

    protected start(): void {
        super.start();
    }

    onClickAcceptFriend() {
        console.log("Accept friend");
        const friendItem = instantiate(this.friendItemPrefab);
        const labelInfo = friendItem.getChildByName("ValueInfo");
        labelInfo.getChildByName("NameLabel").getComponent(Label).string = this.friendName;
        labelInfo.getChildByName("CareerLabel").getComponent(Label).string = this.friendCareer;
        labelInfo.getChildByName("LevelLabel").getComponent(Label).string = this.friendLevel;
        labelInfo.getChildByName("IdLabel").getComponent(Label).string = this.friendId;
        this.scrollListFriend.addChild(friendItem);

        let friend = new proto.Friend();
        friend.id = Number.parseInt(this.friendId);
        friend.name = this.friendName;
        friend.character = this.friendCareer;
        friend.level = Number.parseInt(this.friendLevel);

        GlobalData.me().getMainUserFriends().push(friend);
        DataSender.sendReqAcceptFriend(Number.parseInt(this.friendId));
        this.node.destroy();
    }

    onClickRejectFriend() {
        console.log("Reject friend");
    }
}


