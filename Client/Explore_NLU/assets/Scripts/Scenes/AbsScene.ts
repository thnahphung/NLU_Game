import { _decorator, Component, Node, sys } from "cc";
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
    let mainPlayer = PlayerManager.me().createMainPlayer(CHARACTERS.KSCN);
    mainPlayer.setPosition(
      GlobalData.me().getMainPlayerPosition().x,
      GlobalData.me().getMainPlayerPosition().y
    );
    mainPlayer
      .getComponent(Character)
      .setUserId(GlobalData.me().getMainUser().userId);
    mainPlayer.getComponent(Character).setPlayerName("Main Player");
    mainPlayer.getComponent(Character).setIsMainPlayer(true);
    this.playerLayer.addChild(mainPlayer);
    GlobalData.me().setMainPlayerNode(mainPlayer);
  }

  addPlayerToScene(player: Node) {
    this.playerLayer.addChild(player);
  }

  createOtherPlayer() {
    let players = GlobalData.me().getListOtherPlayer();
    if (players == null || players.length == 0) return;
    players.forEach((player) => {
      let playerNode = PlayerManager.me().createOtherPlayer(CHARACTERS.BSTY);
      playerNode.getComponent(Character).setUserId(player.userId);
      playerNode.getComponent(Character).setPlayerName("Other Player");
      playerNode.getComponent(Character).setIsMainPlayer(false);
      playerNode.active = false;
      GlobalData.me().addOtherPlayerNode(playerNode);
      this.playerLayer.addChild(playerNode);
    });
  }

  getPlayerLayer() {
    return this.playerLayer;
  }
}
