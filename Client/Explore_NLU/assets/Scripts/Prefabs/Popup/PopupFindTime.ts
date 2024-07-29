import { _decorator, Component, Label, Node } from "cc";
import { UICanvas } from "../MainUI/UICanvas";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import DataSender from "../../Utils/DataSender";
import GlobalData from "../../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("PopupFindTime")
export class PopupFindTime extends Component {
  @property(Label)
  private labelTime: Label = null;
  onEnable() {
    this.labelTime.string = "0:0";
    this.risingTime();
  }

  onClickExitPopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    DataSender.sendReqStopSupportFind();
    this.node.active = false;
    if (
      GlobalData.me().getMainUser().character.code == "KSNN" ||
      GlobalData.me().getMainUser().character.code == "KSCN"
    ) {
      UICanvas.me().showPopupAid();
    } else {
      console.log("showPopupHelp");
      UICanvas.me().showPopupMatchMaking();
    }
    this.node.destroy();
  }
  // Tăng từng giây bắt đầu từ 0:0 tối đa là 5 phút
  risingTime() {
    let time = 0;
    this.schedule(() => {
      time++;
      if (time >= 300) {
        this.unscheduleAllCallbacks();
        UICanvas.me().closePopupMatchMaking();
      }
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      this.labelTime.string = `${minutes}:${seconds}`;
    }, 1);
  }
}
