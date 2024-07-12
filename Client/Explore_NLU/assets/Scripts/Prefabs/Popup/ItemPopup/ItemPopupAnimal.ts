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
const { ccclass, property } = _decorator;

@ccclass("ItemPopupAnimal")
export class ItemPopupAnimal extends Component {
  @property(Sprite) private animalSprite: Sprite = null;
  @property(Label) private animalType: Label = null;
  @property(Label) private animalAge: Label = null;
  @property(RichText) private animalDisease: RichText = null;
  @property(Label) private animalPregnant: Label = null;
  @property(SpriteFrame) private listImageAnimal: SpriteFrame[] = [];
  // private animalData: any = null;
  private animal: proto.IAnimal;

  public setAnimalData(animal: proto.IAnimal, image: SpriteFrame) {
    this.animal = animal;
    this.setAnimalSprite(image);
    this.setAnimalType(animal.commonGrowthItem.name);
    this.setAnimalAge(
      (
        GlobalData.me().getGameState().currentDate -
        animal.propertyGrowthItems.startDate
      ).toString()
    );
    this.setAnimalDisease(animal.propertyGrowthItems.isDisease);
    this.setAnimalPregnant(animal.isPregnant > 0);
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
