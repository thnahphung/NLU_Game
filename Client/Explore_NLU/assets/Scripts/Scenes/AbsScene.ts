import { _decorator, Component, Node, sys, screen, director } from "cc";
import GlobalData from "../Utils/GlobalData";
import { PlayerManager } from "../Manager/PlayerManager";
import { CHARACTERS } from "../Utils/Const";
import { Character } from "../Prefabs/Character/Character";
import { Animal } from "../Prefabs/Animal/Animal";
import { AnimalMovement } from "../Prefabs/Animal/AnimalMovement";
import { Util } from "../Utils/Util";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
const { ccclass, property } = _decorator;

@ccclass("AbsScene")
export default class AbsScene extends Component {
  @property(Node) protected playerLayer: Node = null;
  @property([Node]) protected listAnimalNode: Node[] = [];

  protected onLoad(): void {
    if (sys.isMobile === true || sys.isNative === true) {
      GlobalData.me().setMobileDevice(true);
      screen.requestFullScreen();
    }
  }

  protected start(): void {
    if (GlobalData.me().getMainUser() != null) {
      this.createMainPlayer();
    }
    this.createOtherPlayer();
    this.getAllAnimalInScene();
    this.setupStatusGame();
  }

  setupStatusGame() {
    if (GlobalData.me().getMainUser() == null) {
      return;
    }
    UICanvas.me().setupSupportStatus(GlobalData.me().getIsSupporting());
  }

  onMessageHandler(packets: proto.IPacketWrapper) {
    packets.packet.forEach((packet) => {
      if (packet.resFirstJUserInArea) {
        this.onFirstUserInAreaHandler(packet.resFirstJUserInArea);
      }
      if (packet.resAnimalMoving) {
        this.onAnimalMovingHandlerAbsScene(packet.resAnimalMoving);
      }
    });
  }

  onAnimalMovingHandlerAbsScene(packet: proto.IResAnimalMoving) {
    const animalNode = this.getAnimalNodeInScene(packet.animalId);
    if (animalNode) {
      animalNode
        .getComponent(AnimalMovement)
        .movingToTarget(Util.convertProtoPosToCocosPos(packet.targetPosition));
    }
  }

  public getAllAnimalInScene() {
    if (!this.playerLayer) return;
    for (const child of this.playerLayer.children) {
      if (child.getComponent(Animal)) {
        this.listAnimalNode.push(child);
      }
    }
  }

  public getAnimalNodeInScene(animalId: number): Node {
    for (const animal of this.listAnimalNode) {
      if (animal.getComponent(Animal).getFakeId() == animalId) {
        return animal;
      }
    }
  }

  onFirstUserInAreaHandler(packet: proto.IResFirstJUserInArea) {
    GlobalData.me().setIsFirstUser(true);
  }

  createMainPlayer() {
    let mainUserNode = PlayerManager.me().createCharacter(
      GlobalData.me().getMainUser()
    );
    mainUserNode.setPosition(
      GlobalData.me().getMainUserPosition().x,
      GlobalData.me().getMainUserPosition().y
    );
    mainUserNode.getComponent(Character).setIsMainPlayer(true);
    this.playerLayer.addChild(mainUserNode);
    GlobalData.me().setMainUserNode(mainUserNode);
  }

  addPlayerToScene(player: Node) {
    this.playerLayer.addChild(player);
  }

  createOtherPlayer() {
    let users = GlobalData.me().getListOtherUser();
    if (users == null || users.length == 0) return;
    users.forEach((user) => {
      let otherUserNode = PlayerManager.me().createCharacter(user);
      otherUserNode.getComponent(Character).setIsMainPlayer(false);
      otherUserNode.active = false;
      GlobalData.me().addOtherUsersNode(otherUserNode);
      this.playerLayer.addChild(otherUserNode);
    });
  }

  getPlayerLayer() {
    return this.playerLayer;
  }
}
