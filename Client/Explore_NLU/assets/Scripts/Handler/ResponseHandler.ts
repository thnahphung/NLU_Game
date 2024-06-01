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

    if (packet.resPlayerJoinArea.position == null) {
      // neu tra ve vi tri null thi lay vi tri spawn defaut cua scene
      const position = Util.getSpawnPosSceneNotCurrentScene(
        packet.resPlayerJoinArea.area.typeArea
      );
      const protoPos = Util.convertCocosPosToProtoPos(position);
      GlobalData.me().setMainPlayerPosition(protoPos);
    } else {
      GlobalData.me().setMainPlayerPosition(packet.resPlayerJoinArea.position);
    }

    if (GlobalData.me().getMainPlayerNode() != null) {
      GlobalData.me().getMainPlayerNode().destroy();
    }

    const otherPlayers = packet.resPlayerJoinArea.players.filter(
      (player) => player.userId != GlobalData.me().getMainUser().userId
    );
    GlobalData.me().setListOtherPlayer(otherPlayers);
    GlobalData.me().setArea(packet.resPlayerJoinArea.area);
    GlobalData.me().setListOtherUsers(packet.resPlayerJoinArea.users);
    GlobalData.me().clearOtherPlayersNode();

    UICanvas.me().transitScene(packet.resPlayerJoinArea.area.typeArea);
  }

  onMovingHandler(packet: proto.IPacket) {
    const playerNode = GlobalData.me().getOtherPlayerNode(
      packet.resMoving.userId
    );
    if (playerNode == null || playerNode == undefined) return;
    if (!playerNode.active) playerNode.active = true;
    playerNode.setPosition(
      packet.resMoving.position.x,
      packet.resMoving.position.y,
      0
    );
  }

  onOtherPlayerJoinAreaHandler(packet: proto.IPacket) {
    const scene = director.getScene();
    const canvas = scene.getChildByName("Canvas");
    let playerNode = PlayerManager.me().createOtherPlayer(CHARACTERS.BSTY);
    playerNode
      .getComponent(Character)
      .setUserId(packet.resOtherPlayerJoinArea.user.userId);
    playerNode.setPosition(
      packet.resOtherPlayerJoinArea.position.x,
      packet.resOtherPlayerJoinArea.position.y,
      0
    );
    playerNode.getComponent(Character).setPlayerName("Other Player");
    playerNode.getComponent(Character).setIsMainPlayer(false);
    GlobalData.me().addOtherUser(packet.resOtherPlayerJoinArea.user);
    GlobalData.me().addOtherPlayer(packet.resOtherPlayerJoinArea.player);
    GlobalData.me().addOtherPlayerNode(playerNode);
    canvas.getComponent(AbsScene).addPlayerToScene(playerNode);
  }

  onOtherPlayerLeaveAreaHandler(packet: proto.IPacket) {
    const playerNode = GlobalData.me().getOtherPlayerNode(
      packet.resOtherPlayerLeaveArea.userId
    );
    if (playerNode == null || playerNode == undefined) return;
    GlobalData.me().removeOtherUser(packet.resOtherPlayerLeaveArea.userId);
    GlobalData.me().removeOtherPlayer(packet.resOtherPlayerLeaveArea.userId);
    GlobalData.me().removeOtherPlayerNode(
      packet.resOtherPlayerLeaveArea.userId
    );
    // playerNode.destroy();
  }
}
