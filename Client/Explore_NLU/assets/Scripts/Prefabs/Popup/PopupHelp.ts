import { _decorator, Component, Node, Sprite } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { UICanvas } from "../MainUI/UICanvas";
import GlobalData from "../../Utils/GlobalData";
import { ResourceManager } from "../../Manager/ResourceManager";
const { ccclass, property } = _decorator;

@ccclass("PopupHelp")
export class PopupHelp extends Component {
  @property(Sprite)
  private spriteMainUser: Sprite = null;
  @property(Sprite)
  private spriteFindUser: Sprite = null;
  start() {
    this.spriteMainUser.spriteFrame = UICanvas.me().getMainUserAvatar();
  }

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
