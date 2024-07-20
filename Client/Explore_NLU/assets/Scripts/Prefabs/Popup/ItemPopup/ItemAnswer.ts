import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ItemAnswer")
export class ItemAnswer extends Component {
  @property(Label) answerLabel: Label;
  private _disease: proto.IDisease;

  start() {
    this.answerLabel.string = this._disease.name;
  }

  init(disease: proto.IDisease) {
    this._disease = disease;
  }

  update(deltaTime: number) {}
}
