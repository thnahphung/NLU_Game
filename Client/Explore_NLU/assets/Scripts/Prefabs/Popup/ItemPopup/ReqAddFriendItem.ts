import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import DataSender from '../../../Utils/DataSender';
const { ccclass, property } = _decorator;

@ccclass('ReqAddFriendItem')
export class ReqAddFriendItem extends Component {
    public scrollListFriend: Node = null;

    @property(Prefab)
    public friendItemPrefab: Prefab = null;
    private friendName: string = "";
    private friendCareer: string = "";
    private friendLevel: string = "";
    private friendId: string = "";
    onLoad() {
        const labelInfo = this.node.getChildByName("ValueInfo");
        this.friendName = labelInfo.getChildByName("NameLabel").getComponent(Label).string;
        this.friendCareer = labelInfo.getChildByName("CareerLabel").getComponent(Label).string;
        this.friendLevel = labelInfo.getChildByName("LevelLabel").getComponent(Label).string;
        this.friendId = labelInfo.getChildByName("IdLabel").getComponent(Label).string;
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
        console.log("Accept friend id: ", this.friendId);
        DataSender.sendReqAcceptFriend(Number.parseInt(this.friendId));
        this.node.destroy();
    }

    onClickRejectFriend() {
        console.log("Reject friend");
    }
}


