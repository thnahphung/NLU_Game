import {
  _decorator,
  Component,
  ImageAsset,
  Label,
  RichText,
  Sprite,
  SpriteFrame,
} from "cc";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import GlobalData from "../../../Utils/GlobalData";
import { ResourceManager } from "../../../Manager/ResourceManager";
import { Util } from "../../../Utils/Util";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupAnimal")
export class ItemPopupAnimal extends Component {
  @property(Sprite) private animalSprite: Sprite = null;
  @property(Label) private animalType: Label = null;
  @property(Label) private animalAge: Label = null;
  @property(RichText) private animalDisease: RichText = null;
  @property(Label) private animalPregnant: Label = null;
  private animal: proto.IAnimal;

  protected start(): void {
    this.setAnimalData();
  }

  init(animal: proto.IAnimal) {
    this.animal = animal;
  }

  public setAnimalData() {
    this.setAnimalSprite(
      ResourceManager.me().getSpriteFrame(
        this.animal.commonGrowthItem.name +
          "-lv" +
          this.animal.propertyGrowthItem.stage
      )
    );
    this.setAnimalType(
      t(
        "label_text." +
          Util.convertDashToUnderscore(
            this.animal.commonGrowthItem.name +
              "-lv" +
              this.animal.propertyGrowthItem.stage
          )
      )
    );
    this.setAnimalAge(
      (
        GlobalData.me().getGameState().currentDate -
        this.animal.propertyGrowthItem.startDate
      ).toString()
    );
    this.setAnimalDisease(this.animal.propertyGrowthItem.isDisease);
    this.setAnimalPregnant(this.animal.isPregnant > 0);
  }

  public getAnimalData() {
    return this.animal;
  }

  public getAnimalSprite() {
    return this.animalSprite.spriteFrame;
  }
  public setAnimalSprite(image: SpriteFrame) {
    this.animalSprite.spriteFrame = image;
  }

  public getAnimalType() {
    return this.animalType.string;
  }

  public setAnimalType(type: string) {
    this.animalType.string = type;
  }

  public getAnimalAge() {
    return this.animalAge.string;
  }

  public setAnimalAge(age: string) {
    this.animalAge.string = age;
  }

  public getAnimalDisease() {
    return this.animalDisease.string;
  }

  public setAnimalDisease(isDisease: boolean) {
    if (isDisease) {
      this.animalDisease.string =
        "<color=#d14431>" + t("label_text.animal_health_disease") + "</color>";
    } else {
      this.animalDisease.string =
        "<color=#479757>" + t("label_text.animal_health_good") + "</color>";
    }
  }

  public getAnimalPregnant() {
    return this.animalPregnant.string;
  }

  public setAnimalPregnant(isPregnant: boolean) {
    if (isPregnant) {
      this.animalPregnant.string = t("label_text.animal_pregnant_yes");
    } else {
      this.animalPregnant.string = t("label_text.animal_pregnant_no");
    }
  }
}
