import { _decorator, Component, Node, UITransform } from "cc";
import { Animal } from "./Animal";
import { PopupComponent } from "../../Controller/PopupComponent";
import { PopupInformationAnimal } from "../Popup/PopupInformationAnimal";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("AnimalInformation")
export class AnimalInformation extends Component {
  private animalInfo: Animal;

  protected start(): void {
    this.animalInfo = this.node.getComponent(Animal);
    this.animalInfo
      .getBlockInputPanel()
      .on(Node.EventType.TOUCH_START, this.onClickShowPopupInformation, this);
  }

  protected update(dt: number): void {
    if (this.animalInfo.getPopupInformationAnimal().active) {
      const position = this.animalInfo
        .getAnimalInformationLayer()
        .getComponent(UITransform)
        .convertToNodeSpaceAR(this.animalInfo.node.worldPosition);
      this.animalInfo
        .getPopupInformationAnimal()
        .setPosition(position.x, position.y + 80);
    }
  }

  public onClickShowPopupInformation() {
    if (this.animalInfo.getPopupInformationAnimal().active) {
      AudioManger.me().playOneShot(AUDIOS.CLICK_3);
      this.animalInfo
        .getPopupInformationAnimal()
        .getComponent(PopupComponent)
        .hide();
      return;
    }
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.animalInfo
      .getPopupInformationAnimal()
      .getComponent(PopupInformationAnimal)
      .showHide(
        this.animalInfo.getAnimalName(),
        this.animalInfo.getDaysOld(),
        this.animalInfo.isDiseaseAnimal(),
        this.animalInfo.isPregnantAnimal(),
        this.animalInfo.getAnimal().propertyGrowthItem.currentDiseaseId
      );
  }
}
