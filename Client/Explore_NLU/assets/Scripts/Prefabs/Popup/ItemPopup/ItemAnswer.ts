import { _decorator, Component, Label, Node } from "cc";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../../Utils/Util";
const { ccclass, property } = _decorator;

@ccclass("ItemAnswer")
export class ItemAnswer extends Component {
  @property(Label) answerLabel: Label;
  private _disease: proto.IDisease;

  start() {
    this.answerLabel.string = t(
      "label_text." + Util.convertDashToUnderscore(this._disease.name)
    );
  }

  init(disease: proto.IDisease) {
    this._disease = disease;
  }

  public getDisease(): proto.IDisease {
    return this._disease;
  }
}
