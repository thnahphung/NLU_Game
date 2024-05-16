import { _decorator, Component, Node, tween, Vec3 } from "cc";
import GlobalData from "../../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("CameraFollow")
export class CameraFollow extends Component {
  @property(Node)
  public target: Node = null;

  @property
  public moveSpeed: number = 50;

  protected start(): void {
    this.target = GlobalData.me().getMainPlayerNode();
    console.debug(this.target);
  }

  protected lateUpdate(dt: number): void {
    if (this.target) {
      this.node.position = Vec3.lerp(
        this.node.position,
        this.node.position,
        this.target.position,
        this.moveSpeed * dt
      );
    }
  }
}
