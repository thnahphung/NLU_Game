import { _decorator, Button, Component, Label, Node, RichText } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
const { ccclass, property } = _decorator;

@ccclass("PopupYesNo")
export class PopupYesNo extends Component {
  @property(RichText) private content: RichText;
  @property(Button) private yesButton: Button;
  @property(Button) private noButton: Button;

  public setContent(content: string) {
    this.content.string = content;
  }

  public onClickYes(callback: Function) {
    this.yesButton.node.on(Button.EventType.CLICK, () => {
      callback();
      this.node.getComponent(PopupComponent).hide();
    });
  }

  public onClickNo(callback: Function) {
    this.noButton.node.on(Button.EventType.CLICK, () => {
      callback();
      this.node.getComponent(PopupComponent).hide();
    });
  }
}
