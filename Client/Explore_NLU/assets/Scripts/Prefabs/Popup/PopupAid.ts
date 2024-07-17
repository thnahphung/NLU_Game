import { _decorator, Button, Component, Node } from "cc";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { PopupComponent } from "../../Controller/PopupComponent";
import { UICanvas } from "../MainUI/UICanvas";
const { ccclass, property } = _decorator;

@ccclass("PopupAid")
export class PopupAid extends Component {
  start() {}

  private onClickExitPopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  private onClickInviteRandom() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    UICanvas.me().showPopupHelp();
    this.node.active = false;
  }

  private onClickInviteFriend() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
  }
}
