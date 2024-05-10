import { _decorator, Component, director, Node, sys } from "cc";
import GlobalData from "../../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("UICanvas")
export class UICanvas extends Component {
  protected static _instance: UICanvas;
  @property(Node) private joystick: Node = null;

  protected onLoad(): void {
    if (UICanvas._instance != null)
      console.log("Only 1 InputManager allow to exist");
    UICanvas._instance = this;
    director.addPersistRootNode(this.node);
  }
  start() {
    if (GlobalData.me().isMobileDevice()) {
      this.joystick.active = true;
    }
  }

  update(deltaTime: number) {}
}
