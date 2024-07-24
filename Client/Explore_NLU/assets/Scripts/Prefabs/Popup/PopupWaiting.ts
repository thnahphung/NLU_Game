import { _decorator, Component, Node } from "cc";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { UICanvas } from "../MainUI/UICanvas";
const { ccclass, property } = _decorator;

@ccclass("PopupWaiting")
export class PopupWaiting extends Component {
  start() {}
  onClickExitPopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    UICanvas.me().showPopupAid();
    this.node.destroy();
  }
}
