import { _decorator, Component, Node } from "cc";
import GlobalData from "../Utils/GlobalData";
import { PlayerManager } from "../Manager/PlayerManager";
import { CHARACTERS } from "../Utils/Const";
import { Character } from "../Prefabs/Character/Character";
const { ccclass, property } = _decorator;

@ccclass("AbsScene")
export default class AbsScene extends Component {
  @property(Node) private playerLayer: Node = null;

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
    this.playerLayer.addChild(mainPlayer);
    GlobalData.me().setMainPlayerNode(mainPlayer);
  }

  addPlayerToScene(player: Node) {
    this.playerLayer.addChild(player);
  }

  createOtherPlayer() {
    let players = GlobalData.me().getPlayers();
    if (players == null || players.length == 0) return;
    players.forEach((player) => {
      let playerNode = PlayerManager.me().createOtherPlayer(CHARACTERS.BSTY);
      playerNode.getComponent(Character).setUserId(player.userId);
      playerNode.active = false;
      GlobalData.me().addPlayerNode(playerNode);
      this.playerLayer.addChild(playerNode);
    });
  }
}
