import { _decorator, Component, Node, UITransform } from "cc";
import { Animal } from "./Animal";
import { PopupComponent } from "../../Controller/PopupComponent";
import { PopupInformationAnimal } from "../Popup/PopupInformationAnimal";
const { ccclass, property } = _decorator;

@ccclass("AnimalInformation")
export class AnimalInformation extends Component {
  private animalInfo: Animal;

  protected start(): void {
    this.animalInfo = this.node.getComponent(Animal);
    this.animalInfo
      .getBlockInputPanel()
      .on(Node.EventType.TOUCH_START, this.showPopupInformation, this);
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

  public showPopupInformation() {
    if (this.animalInfo.getPopupInformationAnimal().active) {
      this.animalInfo
        .getPopupInformationAnimal()
        .getComponent(PopupComponent)
        .hide();
      return;
    }

    this.animalInfo
      .getPopupInformationAnimal()
      .getComponent(PopupInformationAnimal)
      .showHide(
        this.animalInfo.getAnimalName(),
        this.animalInfo.getDaysOld(),
        this.animalInfo.isDiseaseAnimal(),
        this.animalInfo.isPregnantAnimal()
      );
  }
}
