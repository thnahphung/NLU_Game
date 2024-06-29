import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
} from "cc";
import { UICanvas } from "../../Scripts/Prefabs/MainUI/UICanvas";
import { Character } from "../../Scripts/Prefabs/Character/Character";
import GlobalData from "./GlobalData";
import { SCENES, SCENES_COMMON } from "./Const";
import { exec } from "child_process";
import DataSender from "./DataSender";
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass("TransitScene")
export class TransitScene extends Component {
  @property({
    type: SCENES_COMMON,
  })
  private areaCommonId: SCENES_COMMON;

  start() {
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
    console.log("onBeginContact", this.areaCommonId);
    if (this.areaCommonId == SCENES_COMMON.NONE) return;
    console.log("send", this.areaCommonId);
    DataSender.sendReqPlayerJoinAreaCommon(this.areaCommonId);
  }
}
