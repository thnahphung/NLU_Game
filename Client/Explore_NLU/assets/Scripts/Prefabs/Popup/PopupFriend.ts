import {
  _decorator,
  Button,
  Component,
  EditBox,
  instantiate,
  Label,
  Node,
  Prefab,
  Sprite,
  SpriteFrame,
} from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import DataSender from "../../Utils/DataSender";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import { UICanvas } from "../MainUI/UICanvas";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import GlobalData from "../../Utils/GlobalData";
import { ReqAddFriendItem } from "./ItemPopup/ReqAddFriendItem";
const { ccclass, property } = _decorator;

@ccclass("PopupFriend")
export class PopupFriend extends AbsHandler {
  @property(SpriteFrame)
  public btnPressedSprite: SpriteFrame;
  @property(SpriteFrame)
  public btnNormalSprite: SpriteFrame;
  @property(Button)
  public btnListFriend: Button = null;
  @property(Button)
  public btnAddFriend: Button = null;
  @property(Node)
  public listFriendNode: Node = null;
  @property(Node)
  public addFriendNode: Node = null;
  @property(Node)
  public friendDetailModal: Node = null;
  @property(Node)
  public friendDetailNode: Node = null;
  @property(EditBox)
  public friendName: EditBox = null;
  @property(Button)
  public btnRequestFriend: Button = null;
  @property(Node)
  public requestFriendNode: Node = null;
  @property(Prefab)
  public friendItemPrefab: Prefab = null;
  @property(Node)
  public scrollViewListFriend: Node = null;
  @property(Prefab)
  public friendItemRequestPrefab: Prefab = null;
  @property(Node)
  public scrollViewRequestFriend: Node = null;
  @property(Node)
  public scrollViewSuggestFriend: Node = null;
  @property(Prefab)
  public addFriendItemPrefab: Prefab = null;

  @property(SpriteFrame)
  protected bstySprite: SpriteFrame;
  @property(SpriteFrame)
  protected ksckSprite: SpriteFrame;
  @property(SpriteFrame)
  protected ksnnSprite: SpriteFrame;
  @property(SpriteFrame)
  protected kschSprite: SpriteFrame;

  private requestFriendListLoaded: boolean = false;
  private suggestFriendListLoaded: boolean = false;

  onLoad() {
    HandlerManager.me().registerHandler(this);
    this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
    this.btnRequestFriend.getComponent(Sprite).spriteFrame =
      this.btnNormalSprite;
    this.listFriendNode.active = true;
    this.addFriendNode.active = false;
    this.onLoadListFriend();
    this.friendDetailModal.on(
      Node.EventType.TOUCH_END,
      this.onCloseFriendDetailModal,
      this
    );
  }

  onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
    packetWrapper.packet.forEach((packet) => {
      if (packet.resFindFriend) {
        if (!packet.resFindFriend.friend) {
          UICanvas.me().showPopupMessage(t("label_text.friend_not_found"));
          return;
        }
        this.showInfoFriendPopupDetail(
          packet.resFindFriend.friend.id,
          packet.resFindFriend.friend.name,
          packet.resFindFriend.friend.character,
          packet.resFindFriend.friend.level
        );
        this.friendDetailNode.active = true;
        this.friendDetailModal.active = true;
      }

      if (packet.resLoadFriendList) {
        this.onLoadFriendListHandle(packet.resLoadFriendList);
      }

      if (packet.resAcceptFriend) {
        this.onAcceptedFriendHandle(packet.resAcceptFriend);
      }

      if (packet.resAddFriend) {
        this.onRequestAddFriendHandle(packet.resAddFriend);
      }
    });
  }

  onClickExitPopup() {
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  onClickListFriend() {
    console.log("List friend");
    this.btnListFriend.getComponent(Sprite).spriteFrame = this.btnPressedSprite;
    this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
    this.btnRequestFriend.getComponent(Sprite).spriteFrame =
      this.btnNormalSprite;
    this.listFriendNode.active = true;
    this.addFriendNode.active = false;
    this.requestFriendNode.active = false;
  }

  onClickAddFriend() {
    console.log("Add friend");
    this.btnListFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
    this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnPressedSprite;
    this.btnRequestFriend.getComponent(Sprite).spriteFrame =
      this.btnNormalSprite;
    this.listFriendNode.active = false;
    this.addFriendNode.active = true;
    this.requestFriendNode.active = false;
    if (!this.suggestFriendListLoaded) {
      DataSender.sendReqLoadFriend(4);
      this.suggestFriendListLoaded = true;
    }
  }

  onClickRequestFriend() {
    console.log("Request friend");
    this.btnRequestFriend.getComponent(Sprite).spriteFrame =
      this.btnPressedSprite;
    this.btnListFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
    this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
    this.listFriendNode.active = false;
    this.addFriendNode.active = false;
    this.requestFriendNode.active = true;

    if (!this.requestFriendListLoaded) {
      DataSender.sendReqLoadFriend(1);
      this.requestFriendListLoaded = true;
    }
  }

  onClickAcceptFriend() {
    console.log("Accept friend");
  }

  onCloseFriendDetailModal() {
    this.friendDetailModal.active = false;
    this.friendDetailNode.active = false;
  }

  onClickFindFriend() {
    if (this.friendName.string == "") {
      UICanvas.me().showPopupMessage(t("label_text.friend_name_empty"));
      return;
    }
    if (
      this.friendName.string.trim() == GlobalData.me().getMainUser().playerName
    ) {
      UICanvas.me().showPopupMessage(t("label_text.friend_name_invalid"));
      return;
    }

    if (GlobalData.me().getMainUserFriends() != null) {
      for (let i = 0; i < GlobalData.me().getMainUserFriends().length; i++) {
        if (
          GlobalData.me().getMainUserFriends()[i].name == this.friendName.string
        ) {
          UICanvas.me().showPopupMessage(t("label_text.friend_already_exist"));
          return;
        }
      }
    }
    DataSender.sendReqFindFriend(this.friendName.string);
  }

  showInfoFriendPopupDetail(
    id: number,
    name: string,
    career: string,
    level: number
  ) {
    const labelContent = this.friendDetailNode
      .getChildByName("Content")
      .getChildByName("TopInfo")
      .getChildByName("ValueInfo");
    labelContent.getChildByName("IdLabel").getComponent(Label).string =
      id.toString();
    labelContent.getChildByName("NameLabel").getComponent(Label).string = name;
    labelContent.getChildByName("CareerLabel").getComponent(Label).string =
      career;
    labelContent.getChildByName("LevelLabel").getComponent(Label).string =
      level.toString();
    let sprite = this.friendDetailNode
      .getChildByName("Content")
      .getChildByName("TopInfo")
      .getChildByName("Avatar")
      .getChildByName("Sprite")
      .getComponent(Sprite);
    if (career.trim() == "Bác sĩ thú y") {
      sprite.spriteFrame = this.bstySprite;
    } else if (career.trim() == "Kỹ sư cơ khí") {
      sprite.spriteFrame = this.ksckSprite;
    } else if (career.trim() == "Kỹ sư nông nghiệp") {
      sprite.spriteFrame = this.ksnnSprite;
    } else if (career.trim() == "Kỹ sư chăn nuôi") {
      sprite.spriteFrame = this.kschSprite;
    }
    const visitButton = this.friendDetailNode
      .getChildByName("Content")
      .getChildByName("BotInfo")
      .getChildByName("VisitingButton")
      .getComponent(Button);
    console.log(visitButton);
    visitButton.node.on(
      Button.EventType.CLICK,
      () => this.onClickVisitFriend(id),
      this
    );
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }

  onClickVisitFriend(id: number) {
    console.log("Visit friend", id);
  }

  onClickAddNewFriend(): void {
    const labelContent = this.friendDetailNode
      .getChildByName("Content")
      .getChildByName("TopInfo")
      .getChildByName("ValueInfo");
    const friendId = labelContent
      .getChildByName("IdLabel")
      .getComponent(Label).string;
    if (friendId) {
      DataSender.sendReqAddFriend(Number.parseInt(friendId));
    } else {
      UICanvas.me().showPopupMessage(t("label_text.error_common"));
    }
  }

  onLoadListFriend(): void {
    if (GlobalData.me().getMainUser() == null) return;
    DataSender.sendReqLoadFriend(2);
  }

  onLoadFriendListHandle(resLoadFriendList: proto.IResLoadFriendList): void {
    console.log("Load friend list success");
    const listFriend = resLoadFriendList.friends;
    const status = resLoadFriendList.status;
    if (listFriend.length == 0) {
      return;
    }
    listFriend.forEach((friend) => {
      if (status == 2) {
        const friendItem = instantiate(this.friendItemPrefab);
        const labelInfo = friendItem.getChildByName("ValueInfo");
        labelInfo.getChildByName("NameLabel").getComponent(Label).string =
          friend.name;
        labelInfo.getChildByName("CareerLabel").getComponent(Label).string =
          friend.character;
        labelInfo.getChildByName("LevelLabel").getComponent(Label).string =
          friend.level.toString();
        labelInfo.getChildByName("IdLabel").getComponent(Label).string =
          friend.id.toString();
        this.scrollViewListFriend.addChild(friendItem);

        if (
          GlobalData.me().getMainUserFriends() == null ||
          GlobalData.me().getMainUserFriends().length == 0
        ) {
          GlobalData.me().setMainUserFriends(listFriend);
        }
      }

      if (status == 1) {
        const friendItem = instantiate(this.friendItemRequestPrefab);
        friendItem.getComponent(ReqAddFriendItem).scrollListFriend =
          this.scrollViewListFriend;
        const labelInfo = friendItem.getChildByName("ValueInfo");
        labelInfo.getChildByName("NameLabel").getComponent(Label).string =
          friend.name;
        labelInfo.getChildByName("CareerLabel").getComponent(Label).string =
          friend.character;
        labelInfo.getChildByName("LevelLabel").getComponent(Label).string =
          friend.level.toString();
        labelInfo.getChildByName("IdLabel").getComponent(Label).string =
          friend.id.toString();
        this.scrollViewRequestFriend.addChild(friendItem);
      }

      if (status == 4) {
        const addFriendItem = instantiate(this.addFriendItemPrefab);
        const labelInfo = addFriendItem.getChildByName("ValueInfo");
        labelInfo.getChildByName("NameLabel").getComponent(Label).string =
          friend.name;
        labelInfo.getChildByName("CareerLabel").getComponent(Label).string =
          friend.character;
        labelInfo.getChildByName("LevelLabel").getComponent(Label).string =
          friend.level.toString();
        labelInfo.getChildByName("IdLabel").getComponent(Label).string =
          friend.id.toString();
        this.scrollViewSuggestFriend.addChild(addFriendItem);
      }
    });
  }

  onAcceptedFriendHandle(resAcceptFriend: proto.IResAcceptFriend): void {
    console.log("Accept friend success");
    const friend = resAcceptFriend.receiver;
    const friendItem = instantiate(this.friendItemPrefab);
    const labelInfo = friendItem.getChildByName("ValueInfo");
    labelInfo.getChildByName("NameLabel").getComponent(Label).string =
      friend.name;
    labelInfo.getChildByName("CareerLabel").getComponent(Label).string =
      friend.character;
    labelInfo.getChildByName("LevelLabel").getComponent(Label).string =
      friend.level.toString();
    labelInfo.getChildByName("IdLabel").getComponent(Label).string =
      friend.id.toString();
    this.scrollViewListFriend.addChild(friendItem);
    GlobalData.me().getMainUserFriends().push(friend);
  }

  onRequestAddFriendHandle(resAddFriend: proto.IResAddFriend): void {
    const sender = resAddFriend.sender;
    const friendItem = instantiate(this.friendItemRequestPrefab);
    friendItem.getComponent(ReqAddFriendItem).scrollListFriend =
      this.scrollViewListFriend;
    const labelInfo = friendItem.getChildByName("ValueInfo");
    labelInfo.getChildByName("NameLabel").getComponent(Label).string =
      sender.name;
    labelInfo.getChildByName("CareerLabel").getComponent(Label).string =
      sender.character;
    labelInfo.getChildByName("LevelLabel").getComponent(Label).string =
      sender.level.toString();
    labelInfo.getChildByName("IdLabel").getComponent(Label).string =
      sender.id.toString();
    this.scrollViewRequestFriend.addChild(friendItem);
  }
}
