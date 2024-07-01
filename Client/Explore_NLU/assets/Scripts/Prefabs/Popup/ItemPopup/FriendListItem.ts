import { _decorator, Button, find, Label, Node } from "cc";
import { AbsFriendItem } from "./AbsFriendItem";
import DataSender from "../../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("FriendListItem")
export class FriendListItem extends AbsFriendItem {
  start() {
    super.start();
    this.node.on(
      Node.EventType.TOUCH_END,
      this.handleTouchFriendListItem,
      this
    );
  }

  private handleTouchFriendListItem(): void {
    console.log("Touch friend list item");
    this.openFriendDetail().active = true;
    this.openFriendDetail().getChildByName("Modal").active = true;
    this.openFriendDetail()
      .getChildByName("Content")
      .getChildByName("BotInfo")
      .getChildByName("AddFriendButton").active = false;

    const content = this.openFriendDetail()
      .getChildByName("Content")
      .getChildByName("TopInfo")
      .getChildByName("ValueInfo");
    content.getChildByName("NameLabel").getComponent(Label).string =
      this.friendName;
    content.getChildByName("CareerLabel").getComponent(Label).string =
      this.friendCareer;
    content.getChildByName("LevelLabel").getComponent(Label).string =
      this.friendLevel;
    content.getChildByName("IdLabel").getComponent(Label).string =
      this.friendId;

    const visitButton = this.openFriendDetail()
      .getChildByName("Content")
      .getChildByName("BotInfo")
      .getChildByName("VisitingButton")
      .getComponent(Button);
    visitButton.node.on(
      Button.EventType.CLICK,
      () => this.onClickVisitFriend(Number(this.friendId)),
      this
    );
  }

  onClickVisitFriend(id: number) {
    DataSender.sendReqPlayerJoinArea(id);
  }

  private openFriendDetail(): Node {
    const modal = find("UICanvas/PopupLayer/PopupFriend/PopupInfoFriendDetail");
    return modal;
  }
}
