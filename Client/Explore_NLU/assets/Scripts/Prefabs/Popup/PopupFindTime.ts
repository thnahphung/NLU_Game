import { _decorator, Component, Label, Node } from "cc";
import { UICanvas } from "../MainUI/UICanvas";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("PopupFindTime")
export class PopupFindTime extends Component {
  @property(Label)
  private labelTime: Label = null;
  start() {
    this.labelTime.string = "0:0";
    this.risingTime();
  }

  onClickExitPopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    UICanvas.me().showPopupHelp();
    this.node.destroy();
  }
  // Tăng từng giây bắt đầu từ 0:0 tối đa là 5 phút
  risingTime() {
    let time = 0;
    this.schedule(() => {
      time++;
      if (time >= 300) {
        this.unscheduleAllCallbacks();
        UICanvas.me().closePopupHelp();
      }
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      this.labelTime.string = `${minutes}:${seconds}`;
    }, 1);
  }
}
