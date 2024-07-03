import { _decorator, Component, director, instantiate, Node, Prefab } from "cc";
import { AbsHandler } from "./AbsHandler";
import GlobalData from "../Utils/GlobalData";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { HandlerManager } from "../Manager/HandlerManager";
import { Util } from "../Utils/Util";
import AbsScene from "../Scenes/AbsScene";
import { PlayerManager } from "../Manager/PlayerManager";
import { CHARACTERS } from "../Utils/Const";
import { Character } from "../Prefabs/Character/Character";
import { user } from "../../../extensions/i18n/@types/editor/i18n/languages/en";
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
    // playerNode.destroy();
  }
}
