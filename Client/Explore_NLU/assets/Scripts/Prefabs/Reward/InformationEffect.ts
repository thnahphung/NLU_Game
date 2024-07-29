import { _decorator, Component, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("InformationEffect")
export class InformationEffect extends Component {
  @property(Label)
  private nameLabel: Label = null;
  @property(Label)
  private value1Label: Label = null;
  @property(Label)
  private value2Label: Label = null;

  start() {
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.6);
  }

  public setInformation(name: string, value1: string, value2: string) {
    this.nameLabel.string = name;
    this.value1Label.string = value1;
    this.value2Label.string = value2;
  }
}
