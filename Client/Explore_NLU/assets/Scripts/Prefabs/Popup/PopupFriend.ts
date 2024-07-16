import {
  _decorator,
  Button,
  EditBox,
  instantiate,
  Label,
  Node,
  Prefab,
  ScrollView,
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
import { FriendListItem } from "./ItemPopup/FriendListItem";
import { AddFriendItem } from "./ItemPopup/AddFriendItem";
import { FriendDetailItem } from "./ItemPopup/FriendDetailItem";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
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
  @property(Sprite)
  public addFriendNotify: Sprite = null;

  @property(SpriteFrame)
  protected characterSprite: SpriteFrame[] = [];

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
  }

  onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
    packetWrapper.packet.forEach((packet) => {
      if (packet.resFindFriend) {
        this.onHandleResFindFriend(packet.resFindFriend);
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
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  onClickListFriend() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_1);
    this.btnListFriend.getComponent(Sprite).spriteFrame = this.btnPressedSprite;
    this.btnAddFriend.getComponent(Sprite).spriteFrame = this.btnNormalSprite;
    this.btnRequestFriend.getComponent(Sprite).spriteFrame =
      this.btnNormalSprite;
    this.listFriendNode.active = true;
    this.addFriendNode.active = false;
    this.requestFriendNode.active = false;
  }

  onClickAddFriend() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_1);
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
    AudioManger.me().playOneShot(AUDIOS.CLICK_1);
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
    this.addFriendNotify.node.active = false;
  }

  onClickFindFriend() {
    if (this.friendName.string == "") {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(t("label_text.friend_name_empty"));
      return;
    }
    if (
      this.friendName.string.trim() == GlobalData.me().getMainUser().playerName
    ) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(t("label_text.friend_name_invalid"));
      return;
    }
    AudioManger.me().playOneShot(AUDIOS.CLICK_1);
    if (GlobalData.me().getMainUserFriends() != null) {
      for (let i = 0; i < GlobalData.me().getMainUserFriends().length; i++) {
        if (
          GlobalData.me().getMainUserFriends()[i].name == this.friendName.string
        ) {
          AudioManger.me().playOneShot(AUDIOS.WRONG);
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
    career: proto.ICharacter,
    level: number
  ) {
    const friendDetailNodeComponent =
      this.friendDetailNode.getComponent(FriendDetailItem);
    friendDetailNodeComponent.setFriendName(name);
    friendDetailNodeComponent.setFriendCareer(career.name);
    friendDetailNodeComponent.setFriendLevel(level.toString());
    friendDetailNodeComponent.setFriendId(id.toString());
    friendDetailNodeComponent.setFriendCharacterProto(career);
    friendDetailNodeComponent.getModalNode().active = true;
    friendDetailNodeComponent.getAddFriendButton().active = true;
    this.friendDetailNode.active = true;
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }

  onLoadListFriend(): void {
    if (GlobalData.me().getMainUser() == null) return;
    DataSender.sendReqLoadFriend(2);
  }

  onHandleResFindFriend(resFindFriend: proto.IResFindFriend): void {
    if (!resFindFriend.friend) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(t("label_text.friend_not_found"));
      return;
    }
    this.showInfoFriendPopupDetail(
      resFindFriend.friend.id,
      resFindFriend.friend.name,
      resFindFriend.friend.character,
      resFindFriend.friend.level
    );
  }

  onLoadFriendListHandle(resLoadFriendList: proto.IResLoadFriendList): void {
    const listFriend = resLoadFriendList.friends;
    const status = resLoadFriendList.status;
    if (listFriend.length == 0) {
      return;
    }
    listFriend.forEach((friend) => {
      const career = friend.character.name;
      if (status == 2) {
        const friendItem = instantiate(this.friendItemPrefab);
        const friendComponent = friendItem.getComponent(FriendListItem);
        friendComponent.setFriendName(friend.name);
        friendComponent.setFriendCareer(career);
        friendComponent.setFriendLevel(friend.level.toString());
        friendComponent.setFriendId(friend.id.toString());
        friendComponent.setFriendCharacterProto(friend.character);
        friendComponent.setFriendDetailNode(this.friendDetailNode);
        this.scrollViewListFriend.addChild(friendItem);
        this.scrollViewListFriend.parent.parent
          .getComponent(ScrollView)
          .scrollToTop();
        if (
          GlobalData.me().getMainUserFriends() == null ||
          GlobalData.me().getMainUserFriends().length == 0
        ) {
          GlobalData.me().setMainUserFriends(listFriend);
        }
      }

      if (status == 1) {
        this.scrollViewRequestFriend.removeAllChildren();
        const friendItem = instantiate(this.friendItemRequestPrefab);
        friendItem.getComponent(ReqAddFriendItem).scrollListFriend =
          this.scrollViewListFriend;
        const friendComponent = friendItem.getComponent(ReqAddFriendItem);
        friendComponent.setFriendName(friend.name);
        friendComponent.setFriendCareer(career);
        friendComponent.setFriendLevel(friend.level.toString());
        friendComponent.setFriendId(friend.id.toString());
        friendComponent.setFriendCharacterProto(friend.character);
        friendComponent.setFriendDetailNode(this.friendDetailNode);
        this.scrollViewRequestFriend.addChild(friendItem);
        this.scrollViewRequestFriend.parent.parent
          .getComponent(ScrollView)
          .scrollToTop();
      }

      if (status == 4) {
        const addFriendItem = instantiate(this.addFriendItemPrefab);
        const addFriendComponent = addFriendItem.getComponent(AddFriendItem);
        addFriendComponent.setFriendName(friend.name);
        addFriendComponent.setFriendCareer(career);
        addFriendComponent.setFriendLevel(friend.level.toString());
        addFriendComponent.setFriendId(friend.id.toString());
        addFriendComponent.setFriendCharacterProto(friend.character);
        this.scrollViewSuggestFriend.addChild(addFriendItem);
        this.scrollViewSuggestFriend.parent.parent
          .getComponent(ScrollView)
          .scrollToTop();
      }
    });
  }

  onAcceptedFriendHandle(resAcceptFriend: proto.IResAcceptFriend): void {
    const friend = resAcceptFriend.receiver;
    const friendItem = instantiate(this.friendItemPrefab);
    const friendComponent = friendItem.getComponent(FriendListItem);
    friendComponent.setFriendName(friend.name);
    friendComponent.setFriendCareer(friend.character.name);
    friendComponent.setFriendLevel(friend.level.toString());
    friendComponent.setFriendId(friend.id.toString());
    friendComponent.setFriendCharacterProto(friend.character);
    friendComponent.setFriendDetailNode(this.friendDetailNode);
    this.scrollViewListFriend.addChild(friendItem);
    GlobalData.me().getMainUserFriends().push(friend);
  }

  onRequestAddFriendHandle(resAddFriend: proto.IResAddFriend): void {
    const sender = resAddFriend.sender;
    const friendItem = instantiate(this.friendItemRequestPrefab);
    friendItem.getComponent(ReqAddFriendItem).scrollListFriend =
      this.scrollViewListFriend;
    const friendComponent = friendItem.getComponent(ReqAddFriendItem);
    friendComponent.setFriendName(sender.name);
    friendComponent.setFriendCareer(sender.character.name);
    friendComponent.setFriendLevel(sender.level.toString());
    friendComponent.setFriendId(sender.id.toString());
    friendComponent.setFriendCharacterProto(sender.character);
    this.scrollViewRequestFriend.addChild(friendItem);
    this.addFriendNotify.node.active = true;
  }
}
