import { _decorator, Component, Node, ProgressBar } from "cc";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { UICanvas } from "../MainUI/UICanvas";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("PopupWaiting")
export class PopupWaiting extends Component {
  @property(ProgressBar)
  progressBar: ProgressBar = null;
  private duration: number = 60;
  private elapsedTime: number = 0;

  protected onLoad(): void {
    this.progressBar.progress = 1;
  }

  onClickClosePopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.closePopup();
  }

  closePopup() {
    UICanvas.me().showPopupAid();
    this.node.destroy();
  }

  update(deltaTime: number) {
    if (this.elapsedTime < this.duration) {
      this.elapsedTime += deltaTime;
      const progress = 1 - this.elapsedTime / this.duration;
      this.progressBar.progress = progress;
    } else {
      this.progressBar.progress = 0;
      this.closePopup();
    }
  }
}
