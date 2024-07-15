import { _decorator, Component, Node } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { UICanvas } from "../MainUI/UICanvas";
const { ccclass, property } = _decorator;

@ccclass("PopupHelp")
export class PopupHelp extends Component {
  start() {}

  onClickExitPopup() {
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  onClickFindUser() {
    console.log("Find user");
    UICanvas.me().showPopupFindTime();
    UICanvas.me().hidePopupHelp();
  }
}
