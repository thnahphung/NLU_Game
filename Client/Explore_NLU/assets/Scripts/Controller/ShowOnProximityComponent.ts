import {
  _decorator,
  CircleCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
  tween,
  Vec3,
} from "cc";
import { Character } from "../Prefabs/Character/Character";
const { ccclass, property } = _decorator;

@ccclass("ShowOnProximityComponent")
export class ShowOnProximityComponent extends Component {
  @property(Node) private target: Node;

  protected start(): void {
    let collider = this.getComponent(CircleCollider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    console.log("onBeginContact", selfCollider, otherCollider);
    if (
      selfCollider.tag != 1 &&
      !otherCollider?.getComponent(Character)?.getIsMainPlayer()
    )
      return;
    this.target.active = true;
    this.tweenShowTarget();
  }

  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (
      selfCollider.tag != 1 &&
      !otherCollider?.getComponent(Character)?.getIsMainPlayer()
    )
      return;
    this.target.active = false;
  }

  tweenShowTarget() {
    if (!this.target) return;
    const end = this.target?.getPosition();
    const start = this.target?.getPosition().subtract(new Vec3(0, 50, 0));
    this.target.setPosition(start);
    tween(this.target.position)
      .to(0.3, { x: end.x, y: end.y, z: end.z }, { easing: "backOut" })
      .start();
  }
}
