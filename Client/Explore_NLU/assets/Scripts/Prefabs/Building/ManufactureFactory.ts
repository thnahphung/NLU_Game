import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
} from "cc";
import { Character } from "../Character/Character";
import { UICanvas } from "../MainUI/UICanvas";
const { ccclass, property } = _decorator;

@ccclass("ManufactureFactory")
export class ManufactureFactory extends Component {
  start() {
    let collider = this.node.getComponent(Collider2D);
    if (collider) {
      collider.enabled = true;
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    const playerComponent = otherCollider.node.getComponent(Character);
    if (playerComponent) {
      if (playerComponent.getIsMainPlayer()) {
        UICanvas.me().showPopupManufactureMachine();
        console.log("Main character is in MechanicFactory");
      } else {
        console.log("Other character is in MechanicFactory");
      }
    }
  }
}
