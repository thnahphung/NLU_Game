import { _decorator, Button, Component, Event, find, Label, Node } from "cc";
import { CustomEvent } from "../../Utils/CustomEvent";
import { CUSTOM_EVENT } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("PopupOption")
export class PopupOption extends Component {
  @property(Button)
  public buttonCancel: Button = null;
  @property(Button)
  public buttonComplete: Button = null;
  @property(Label)
  public label: Label = null;

  public handleNode: Node = null;
  public labelString: string = null;
  protected onLoad(): void {
    this.buttonCancel.node.on(
      Node.EventType.TOUCH_END,
      this.onClickCancel,
      this
    );
    this.buttonComplete.node.on(
      Node.EventType.TOUCH_END,
      this.onClickComplete,
      this
    );
    if (this.labelString && this.label) {
      this.label.string = this.labelString;
      this.label.node.active = true;
    }
    if (!this.labelString || !this.label) this.label.node.active = false;
  }

  private onClickCancel(): void {
    if (!this.handleNode) return;
    let event = new CustomEvent(CUSTOM_EVENT.LISTEN_CANCEL, true);
    this.handleNode.dispatchEvent(event);
  }

  private onClickComplete(): void {
    if (!this.handleNode) return;
    let event = new CustomEvent(CUSTOM_EVENT.LISTEN_COMPLETE, true);
    this.handleNode.dispatchEvent(event);
  }

  setComponent(component: Node) {
    this.handleNode = component;
  }
}
