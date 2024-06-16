import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
  RigidBody2D,
} from "cc";
import { UICanvas } from "../../Scripts/Prefabs/MainUI/UICanvas";
import { Character } from "../../Scripts/Prefabs/Character/Character";
const { ccclass, property } = _decorator;

@ccclass("TransitScene")
export class TransitScene extends Component {
  @property sceneName: string = "";
  rigidBody: RigidBody2D;

  start() {
    this.rigidBody = this.getComponent(RigidBody2D);
    let collider = this.node.getComponent(Collider2D);
    if (collider !== null) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (
      !otherCollider.getComponent(Character) ||
      !otherCollider.getComponent(Character).getIsMainPlayer()
    ) {
      return;
    }
    UICanvas.me().transitScene(this.sceneName);
  }
}
