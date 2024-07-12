import { _decorator, Component, Input, Node } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
const { ccclass, property } = _decorator;

@ccclass("PopupTask")
export class PopupTask extends Component {
  @property(Node) private blackBackground: Node;
  start() {
    this.blackBackground.on(Input.EventType.TOUCH_START, this.hidePopup, this);
  }
  public hidePopup() {
    console.log("Hide task");
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => this.node.destroy(), 0.3)
  }
}
