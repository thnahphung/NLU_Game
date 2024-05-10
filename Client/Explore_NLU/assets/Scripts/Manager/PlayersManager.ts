import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerManager")
export class PlayerManager extends Component {
  protected static _instance: PlayerManager;

  public static me(): PlayerManager {
    return this._instance;
  }

  protected onLoad(): void {
    if (PlayerManager._instance != null) {
      console.log("Only 1 PlayerManager allow to exist");
      this.node.destroy();
      return;
    }
    PlayerManager._instance = this;
    director.addPersistRootNode(this.node);
  }

  addPlayer() {}
  addAllPLayers() {}
}
