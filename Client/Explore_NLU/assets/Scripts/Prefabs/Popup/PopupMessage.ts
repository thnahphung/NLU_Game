import { _decorator, Component, Label, Node } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("PopupMessage")
export class PopupMessage extends Component {
  @property
  private message: string;

  @property(Label)
  private LabelMessage: Label;

  public setMessage(message: string) {
    this.message = message;
  }
  start() {
    this.LabelMessage.string = this.message;
  }
  onClosePopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }
}
