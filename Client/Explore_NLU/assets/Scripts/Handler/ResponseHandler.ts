import { _decorator, Component, director, instantiate, Node, Prefab } from "cc";
import { AbsHandler } from "./AbsHandler";
import GlobalData from "../Utils/GlobalData";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { HandlerManager } from "../Manager/HandlerManager";
import { Util } from "../Utils/Util";
import AbsScene from "../Scenes/AbsScene";
import { PlayerManager } from "../Manager/PlayerManager";
import { Character } from "../Prefabs/Character/Character";
import { t } from "../../../extensions/i18n/assets/LanguageData";
import DataSender from "../Utils/DataSender";
import { CHARACTERS, REWARD_ICONS } from "../Utils/Const";
import { PopupMatchMaking } from "../Prefabs/Popup/PopupMatchMaking";
const { ccclass, property } = _decorator;

@ccclass("ResponseHandler")
export class ResponseHandler extends AbsHandler {
  protected static _instance: ResponseHandler;

  protected onLoad(): void {
    if (ResponseHandler._instance != null) {
      console.log("Only 1 ResponseHandler allow to exist");
      this.node.destroy();
      return;
    }
    ResponseHandler._instance = this;
    director.addPersistRootNode(this.node);
    HandlerManager.me().registerHandler(this);
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    super.onMessageHandler(packets);
    packets.packet.forEach((packet) => {
      if (packet.resPlayerJoinArea) {
        this.onJoinAreaHandler(packet);
      }
      if (packet.resMoving) {
        this.onMovingHandler(packet);
      }
      if (packet.resOtherPlayerJoinArea) {
        this.onOtherPlayerJoinAreaHandler(packet);
      }
      if (packet.resOtherPlayerLeaveArea) {
        this.onOtherPlayerLeaveAreaHandler(packet);
      }
      if (packet.resGameState) {
        this.onGameStateHandler(packet);
      }
      if (packet.resLoadItemsOfWarehouse) {
        this.onLoadWarehouseItemsHandler(packet);
      }
      if (packet.resBuyItemShop) {
        this.onResBuyItemShop(packet);
      }
      if (packet.resLoadTask) {
        this.onResLoadTask(packet);
      }
      if (packet.resUpdateProgressTask) {
        this.onResUpdateProgressTask(packet);
      }
      if (packet.resCompleteTask) {
        this.onResCompleteTask(packet);
      }
      if (packet.resMatchmaking) {
        this.onResMatchmaking(packet);
      }
      if (packet.resInviteSupport) {
        this.onResInviteSupport(packet);
      }
      if (packet.resRejectInviteSupport) {
        this.onResRejectInviteSupport(packet);
      }
      if (packet.resSupportFriend) {
        this.onResSupportFriend(packet);
      }
      if (packet.resStopSupport) {
        this.onResStopSupport(packet);
      }
    });
  }

  onClosed(): void {
    super.onClosed();
    let loginScene = director.getScene().name;
    if (loginScene == "AuthenScene") {
      return;
    }
    UICanvas.me().transitScene("AuthenScene");
  }

  onJoinAreaHandler(packet: proto.IPacket) {
    if (GlobalData.me().getMainUser() == null) return;
    const position = Util.getSpawnPosScene(
      packet.resPlayerJoinArea.area.typeArea,
      packet.resPlayerJoinArea?.oldAreaType
    );

    GlobalData.me().setMainUserPosition(position);

    if (GlobalData.me().getMainUserNode() != null) {
      GlobalData.me().getMainUserNode().destroy();
    }
    GlobalData.me().setArea(packet.resPlayerJoinArea.area);
    if (
      GlobalData.me().getMainArea() == null &&
      packet.resPlayerJoinArea.area.userId ==
        GlobalData.me().getMainUser().userId
    ) {
      GlobalData.me().setMainArea(packet.resPlayerJoinArea.area);
    }
    const otherUser = packet.resPlayerJoinArea.users.filter(
      (user) => user.userId != GlobalData.me().getMainUser().userId
    );
    GlobalData.me().setListOtherUsers(otherUser);
    GlobalData.me().emptyOtherUsersNode();

    UICanvas.me().transitScene(packet.resPlayerJoinArea.area.typeArea);
  }

  onMovingHandler(packet: proto.IPacket) {
    const userNode = GlobalData.me().getOtherUsersNode(packet.resMoving.userId);
    if (userNode == null || userNode == undefined) return;
    if (!userNode.active) userNode.active = true;
    userNode.setPosition(
      packet.resMoving.position.x,
      packet.resMoving.position.y,
      0
    );
    userNode
      .getComponent(Character)
      .setCurrentState(packet.resMoving.currentState);
  }

  onOtherPlayerJoinAreaHandler(packet: proto.IPacket) {
    // if (PlayerManager.me() == null) return;
    const scene = director.getScene();
    const canvas = scene.getChildByName("Canvas");
    const otherUserNode = PlayerManager.me().createCharacter(
      packet.resOtherPlayerJoinArea.user
    );
    const position = Util.getSpawnPosScene(director.getScene().name);
    otherUserNode.setPosition(position);
    otherUserNode.active = false;
    otherUserNode.getComponent(Character).setIsMainPlayer(false);
    GlobalData.me().addOtherUser(packet.resOtherPlayerJoinArea.user);
    GlobalData.me().addOtherUsersNode(otherUserNode);
    canvas.getComponent(AbsScene).addPlayerToScene(otherUserNode);
  }

  onOtherPlayerLeaveAreaHandler(packet: proto.IPacket) {
    const otherUserNode = GlobalData.me().getOtherUsersNode(
      packet.resOtherPlayerLeaveArea.userId
    );
    if (otherUserNode == null || otherUserNode == undefined) return;
    GlobalData.me().removeOtherUser(packet.resOtherPlayerLeaveArea.userId);
    GlobalData.me().removeOtherUsersNode(packet.resOtherPlayerLeaveArea.userId);
  }

  onGameStateHandler(packet: proto.IPacket) {
    GlobalData.me().setGameState(packet.resGameState.gameState);
  }

  onLoadWarehouseItemsHandler(packet: proto.IPacket) {
    GlobalData.me().setWarehouseItems(
      packet.resLoadItemsOfWarehouse.listWarehouseItem
    );
  }

  onResBuyItemShop(packet: proto.IPacket) {
    if (packet.resBuyItemShop.status == 400) {
      UICanvas.me().showPopupMessage(t("label_text.buy_shop_not_enough_gold"));
      return;
    }

    GlobalData.me().addWarehouseItem(packet.resBuyItemShop.warehouseItem);
    GlobalData.me().getMainUser().gold = packet.resBuyItemShop.gold;
    UICanvas.me().loadGold();
  }

  onResLoadTask(packet: proto.IPacket) {
    GlobalData.me().setTasks(packet.resLoadTask.activities);
    GlobalData.me().setProgressTasks(packet.resLoadTask.progressActivities);
    UICanvas.me().reloadPopupTask();
  }

  onResUpdateProgressTask(packet: proto.IPacket) {
    for (let processTask of packet.resUpdateProgressTask.progressActivities)
      GlobalData.me().updateProgressTask(processTask);
  }

  onResCompleteTask(packet: proto.IPacket) {
    const rewards = [];
    const gold = packet.resCompleteTask.gold;
    const exp = packet.resCompleteTask.exp;
    GlobalData.me().updateProgressTask(packet.resCompleteTask.progressActivity);
    if (gold) {
      GlobalData.me().getMainUser().gold = gold;
      UICanvas.me().loadGold();
      rewards.push({
        name: "Gold",
        quantity: gold,
        reward: REWARD_ICONS.GOLD,
      });
    }
    if (exp) {
      GlobalData.me().getMainUser().experiencePoints = exp;
      UICanvas.me().loadExp();
      rewards.push({
        name: "Exp",
        quantity: exp,
        reward: REWARD_ICONS.EXPERIENCE_POINT,
      });
    }
    UICanvas.me().showListRewardEffect(rewards);
  }

  onResMatchmaking(packet: proto.IPacket) {
    let matchmakedUser = packet.resMatchmaking.matchmakedUser;
    let popupSupport = UICanvas.me().getPopupMatchMaking();
    if (!popupSupport) popupSupport = UICanvas.me().createNewPopupMatchMaking();
    if (!popupSupport) return;
    let popupSupportComponent = popupSupport.getComponent(PopupMatchMaking);
    popupSupportComponent.setMatchmakedUser(matchmakedUser);
    UICanvas.me().closePopupFindTime();
    popupSupportComponent.showPopup();
    // Join area
    let code = GlobalData.me().getMainUser().character.code;
    if (code == CHARACTERS.BSTY || code == CHARACTERS.KSCK) {
      popupSupportComponent.setMatchmakingNotify();
      GlobalData.me().setSupportUser(GlobalData.me().getMainUser());
      GlobalData.me().setAidUser(matchmakedUser);
      this.scheduleOnce(() => {
        DataSender.sendReqPlayerJoinArea(matchmakedUser.userId);
      }, 3);
    }
    if (code == CHARACTERS.KSCN || code == CHARACTERS.KSNN) {
      popupSupportComponent.setMatchmakingOK();
      GlobalData.me().setSupportUser(matchmakedUser);
      GlobalData.me().setAidUser(GlobalData.me().getMainUser());
      UICanvas.me().closePopupWaiting();
      UICanvas.me().setupSupportStatus(true);
    }
    // Set status support
    GlobalData.me().setIsSupporting(true);
  }

  onResInviteSupport(packet: proto.IPacket) {
    const inviteSupport = packet.resInviteSupport;
    const status = inviteSupport.status;
    if (status == proto.User.STATUS.BUSY) {
      UICanvas.me().showPopupMessage(t("label_text.aid_status_invite_busy"));
      return;
    }
    if (status == proto.User.STATUS.OFFLINE) {
      UICanvas.me().showPopupMessage(t("label_text.aid_status_invite_offline"));
      return;
    }
    if (status == proto.User.STATUS.ONLINE) {
      if (
        GlobalData.me().getMainUser().character.code == CHARACTERS.KSNN ||
        GlobalData.me().getMainUser().character.code == CHARACTERS.KSCN
      ) {
        UICanvas.me().showPopupWaiting();
        UICanvas.me().hidePopupAid();
      } else {
        UICanvas.me().showPopupAcceptSupport(inviteSupport.user);
      }
    }
  }

  onResRejectInviteSupport(packet: proto.IPacket) {
    const rejectInviteSupport = packet.resRejectInviteSupport;
    const user = rejectInviteSupport.user;
    if (user) {
      UICanvas.me().closePopupWaiting();
      UICanvas.me().showPopupMessage(
        `${user.playerName} ${t("label_text.aid_status_invite_reject")}`
      );
      UICanvas.me().showPopupAid();
      return;
    }
  }

  onResSupportFriend(packet: proto.IPacket) {
    const supportFriend = packet.resSupportFriend;
    UICanvas.me().showPopupMessage(
      `${supportFriend.user.playerName} ${t(
        "label_text.support_fail_supported"
      )}`
    );
  }

  onResStopSupport(packet: proto.IPacket) {
    const stopSupport = packet.resStopSupport;
    const status = stopSupport.status;
    if (status == 500) {
      return;
    }
    if (
      GlobalData.me().getMainUser().character.code == CHARACTERS.KSNN ||
      GlobalData.me().getMainUser().character.code == CHARACTERS.KSCN
    ) {
      if (status == 200) {
        UICanvas.me().showPopupMatchMaking(200);
      }
    } else {
      if (status == 200) {
        DataSender.sendReqPlayerJoinArea(GlobalData.me().getMainUser().userId);
      } else {
        UICanvas.me().showPopupMatchMaking(201);
      }
    }
    GlobalData.me().setIsSupporting(false);
    GlobalData.me().setSupportUser(null);
    GlobalData.me().setAidUser(null);
    UICanvas.me().setupSupportStatus(false);
  }
}
