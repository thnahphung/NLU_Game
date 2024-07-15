import { _decorator, Component, Label, Node } from "cc";
import { UICanvas } from "../MainUI/UICanvas";
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
    UICanvas.me().showPopupHelp();
    this.node.destroy();
  }
  // Tăng từng giây bắt đầu từ 0:0
  // Kiểm tra nếu quá 5 phút thì ngưng tăng
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
