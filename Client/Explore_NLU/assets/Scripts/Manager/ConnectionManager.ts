import { _decorator, Component, director } from "cc";
import { WS } from "../Socket/WS";
const { ccclass, property } = _decorator;

@ccclass("ConnectionManager")
export class ConnectionManager extends Component {
  protected static _instance: ConnectionManager;

  protected onLoad(): void {
    if (ConnectionManager._instance != null) {
      console.log("Only 1 ConnectionManager allow to exist");
      this.node.destroy();
      return;
    }
    ConnectionManager._instance = this;
    director.addPersistRootNode(this.node);
  }

  update(deltaTime: number) {
    WS.me().sendWithBuffer();
    WS.me().checkAndReconnect();
  }
}
