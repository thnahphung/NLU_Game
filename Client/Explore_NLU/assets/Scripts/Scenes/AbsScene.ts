import { _decorator, Component, Node, sys, screen, director } from "cc";
import GlobalData from "../Utils/GlobalData";
import { PlayerManager } from "../Manager/PlayerManager";
import { CHARACTERS } from "../Utils/Const";
import { Character } from "../Prefabs/Character/Character";
const { ccclass, property } = _decorator;

@ccclass("AbsScene")
export default class AbsScene extends Component {
  @property(Node) private playerLayer: Node = null;

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
  }

  onMessageHandler(packets: proto.IPacketWrapper) {
    //TODO: xử lý chung như thông báo...
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
