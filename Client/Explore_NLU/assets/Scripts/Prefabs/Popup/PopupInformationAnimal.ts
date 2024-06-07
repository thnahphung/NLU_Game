import { _decorator, Button, Component, Label, Node, RichText } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
const { ccclass, property } = _decorator;

@ccclass("PopupInformationAnimal")
export class PopupInformationAnimal extends Component {
  @property(Label) private nameLabel: Label;
  @property(Label) private ageLabel: Label;
  @property(RichText) private healthLabel: RichText;
  @property(Label) private pregnantLabel: Label;
  @property(Button) private buttonInformation: Button;

  private detailDisease: Node;

  protected start(): void {
    this.detailDisease = this.node.getChildByName("DetailDisease");
  }

  public setInformationAnimal(
    name: string,
    age: number,
    disease: boolean,
    pregnant: boolean
  ) {
    this.nameLabel.string = name;
    this.ageLabel.string =
      age.toString() + " " + t("label_text.animal_age_day");
    this.healthLabel.string = disease
      ? "<color=#d14431>" + t("label_text.animal_health_disease") + "</color>"
      : "<color=#479757>" + t("label_text.animal_health_good") + "</color>";

    this.buttonInformation.node.active = disease;

    this.pregnantLabel.string = pregnant
      ? t("label_text.animal_pregnant_yes")
      : t("label_text.animal_pregnant_no");
  }

  public showHide(
    name: string,
    age: number,
    disease: boolean,
    pregnant: boolean
  ) {
    if (this.node.active) {
      this.node.getComponent(PopupComponent).hide();
      return;
    }
    this.setInformationAnimal(name, age, disease, pregnant);
    this.node.getComponent(PopupComponent).show();
  }

  public onClickButtonInformation() {
    if (this.detailDisease.active) {
      this.detailDisease.getComponent(PopupComponent).hide();
    } else {
      this.detailDisease.getComponent(PopupComponent).show();
    }
  }
}
