import { _decorator, Component, Label, Node } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
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
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }
}
