import { _decorator, Component, director, Node, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("UICanvas")
export class UICanvas extends Component {
  @property(Node) private joystick: Node = null;

  protected onLoad(): void {
    if (sys.isMobile || sys.isNative) {
      this.joystick.active = true;
    }
    director.addPersistRootNode(this.node);
  }
  start() {}

  update(deltaTime: number) {}
}
