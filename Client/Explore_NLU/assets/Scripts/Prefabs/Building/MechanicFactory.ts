import { _decorator, Component, Node } from "cc";
import { UICanvas } from "../MainUI/UICanvas";
import GlobalData from "../../Utils/GlobalData";
const { ccclass } = _decorator;

@ccclass("MechanicFactory")
export class MechanicFactory extends Component {
  start() {
    this.node.on(Node.EventType.TOUCH_START, this.handleOpenPopup, this);
  }

  private handleOpenPopup() {
    if (GlobalData.me().isMainArea()) UICanvas.me().showPopupUpgradeMachine();
  }
}
