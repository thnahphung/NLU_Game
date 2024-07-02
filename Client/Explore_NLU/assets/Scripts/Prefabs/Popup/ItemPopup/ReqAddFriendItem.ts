import { _decorator, Component, instantiate, Label, Node, Prefab, SpriteFrame } from 'cc';
import DataSender from '../../../Utils/DataSender';
import GlobalData from '../../../Utils/GlobalData';
import { AbsFriendItem } from './AbsFriendItem';
import { FriendListItem } from './FriendListItem';
const { ccclass, property } = _decorator;

@ccclass('ReqAddFriendItem')
export class ReqAddFriendItem extends AbsFriendItem {
    public friendDetailNode: Node = null;
    public scrollListFriend: Node = null;

    @property(Prefab)
    public friendItemPrefab: Prefab = null;

    protected start(): void {
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

    public setFriendDetailNode(node: Node) {
        this.friendDetailNode = node;
    }

    onClickAcceptFriend() {
        const friendItem = instantiate(this.friendItemPrefab);
        const friendItemComponent = friendItem.getComponent(FriendListItem);
        friendItemComponent.setFriendName(this.friendName);
        friendItemComponent.setFriendCareer(this.friendCareer);
        friendItemComponent.setFriendLevel(this.friendLevel);
        friendItemComponent.setFriendId(this.friendId);
        friendItemComponent.setAvatarSprite(this.avatarSprite.spriteFrame);
        friendItemComponent.setFriendCharacterProto(this.friendCharacterProto);
        friendItemComponent.setFriendDetailNode(this.friendDetailNode);
        this.scrollListFriend.addChild(friendItem);

        let friend = new proto.Friend();
        friend.id = Number.parseInt(this.friendId);
        friend.name = this.friendName;
        friend.character = this.friendCharacterProto;
        friend.level = Number.parseInt(this.friendLevel);

        GlobalData.me().getMainUserFriends().push(friend);
        DataSender.sendReqAcceptFriend(Number.parseInt(this.friendId));
        this.node.destroy();
    }

    onClickRejectFriend() {
        let friend = new proto.Friend();
        friend.id = Number.parseInt(this.friendId);
        friend.name = this.friendName;
        friend.character = this.friendCharacterProto;
        friend.level = Number.parseInt(this.friendLevel);
        DataSender.sendReqRejectFriend(Number.parseInt(this.friendId));
        this.node.destroy();
    }
}


