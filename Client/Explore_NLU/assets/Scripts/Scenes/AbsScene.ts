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
    GlobalData.me().setMobileDevice(true);
    if (sys.isMobile === true || sys.isNative === true) {
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
      CHARACTERS.KSCN,
      GlobalData.me().getMainUser()
    );
    mainUserNode.setPosition(
      GlobalData.me().getMainPlayerPosition().x,
      GlobalData.me().getMainPlayerPosition().y
    );

    mainUserNode
      .getComponent(Character)
      .setUserProto(GlobalData.me().getMainUser());

    // mainUserNode.getComponent(Character).setPlayerName("Main Player");
    mainUserNode.getComponent(Character).setIsMainPlayer(true);
    this.playerLayer.addChild(mainUserNode);
    GlobalData.me().setMainPlayerNode(mainUserNode);
  }

  addPlayerToScene(player: Node) {
    this.playerLayer.addChild(player);
  }

  createOtherPlayer() {
    let users = GlobalData.me().getListOtherUser();
    if (users == null || users.length == 0) return;
    users.forEach((user) => {
      let otherUserNode = PlayerManager.me().createCharacter(
        CHARACTERS.BSTY,
        user
      );
      otherUserNode.getComponent(Character).setUserProto(user);
      otherUserNode.getComponent(Character).setIsMainPlayer(false);
      otherUserNode.active = false;
      GlobalData.me().addOtherUserNode(otherUserNode);
      this.playerLayer.addChild(otherUserNode);
    });
  }

  getPlayerLayer() {
    return this.playerLayer;
  }
}
