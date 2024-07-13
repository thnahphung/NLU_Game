import {
  _decorator,
  Button,
  Collider2D,
  Component,
  EPhysics2DDrawFlags,
  find,
  instantiate,
  Node,
  PhysicsSystem2D,
  Prefab,
} from "cc";
import { CoatingComponent } from "../../Controller/CoatingComponent";
import { COATING } from "../../Utils/Const";
import { PopupComponent } from "../../Controller/PopupComponent";
import { PopupCageInformation } from "../Popup/PopupCageInformation";
import { UICanvas } from "../MainUI/UICanvas";
import { ResourceManager } from "../../Manager/ResourceManager";
import { Animal } from "../Animal/Animal";
import { Util } from "../../Utils/Util";
import { AnimalAnimation } from "../Animal/AnimalAnimation";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("Cage")
export class Cage extends Component {
  @property(Prefab) private popupCageInformation: Prefab;
  @property(Node) private animalPanel: Node;
  private menuNode: Node;
  private cage: proto.ICage;
  start() {
    this.menuNode = this.getCageInformation();
    this.node.on(Node.EventType.TOUCH_START, this.handleGetMenuFood, this);
    this.loadAnimals();
  }

  init(cage: proto.ICage) {
    this.cage = cage;
  }

  loadAnimals() {
    this.cage.animals.forEach((animal) => {
      this.addAnimal(animal);
    });
  }

  addAnimal(animal: proto.IAnimal) {
    let stage = animal.propertyGrowthItem.stage;
    let risingTimes: proto.ICommonRisingTime[] = animal.commonRisingTimes;
    risingTimes.sort((a, b) => a.stage - b.stage);
    for (let risingTime of risingTimes) {
      if (animal.propertyGrowthItem.developedDays >= risingTime.time) {
        stage = risingTime.stage;
        break;
      }
    }

    const animalPrefab: Prefab = ResourceManager.me().getAnimalPrefab(
      Util.removeDash(
        animal.commonGrowthItem.name.toLowerCase() +
          "lv" +
          animal.propertyGrowthItem.stage
      )
    );
    if (!animalPrefab) return;
    const animalNode = instantiate(animalPrefab);
    animalNode.getComponent(Animal).init(animal);
    this.animalPanel.addChild(animalNode);
  }

  public animalEat(animalId: number) {
    this.animalPanel.children.forEach((animalNode) => {
      const animal = animalNode.getComponent(Animal);
      if (animal.getAnimal().id === animalId) {
        animal.setIsHungryAnimal(0);
        animal.getComponent(AnimalAnimation).playEatAnimation();
      }
    });
  }

  private handleGetMenuFood(): void {
    UICanvas.me().showPopupMenuInfoAnimalFood(this.cage, () => {
      console.log("showPopupMenuInfoAnimalFood", this.cage.propertyBuilding.id);
      DataSender.sendReqAddAnimalToCage(this.cage.propertyBuilding.id);
    });
  }

  public onClickShowPopupCageInformation(): void {
    let popupCageInformation = this.getPopupCageInformation();
    if (popupCageInformation) {
      popupCageInformation.getComponent(PopupComponent).show();
      return;
    }
    popupCageInformation = instantiate(this.popupCageInformation);
    popupCageInformation.getComponent(PopupCageInformation).init(this.cage);
    popupCageInformation.parent = find("UICanvas/PopupLayer");
    popupCageInformation.getComponent(PopupComponent).show();

    CoatingComponent.me().off(COATING.FEED, () => {
      this.menuNode
        .getChildByName("InformationButton")
        .off(
          Button.EventType.CLICK,
          this.onClickShowPopupCageInformation,
          this
        );
    });
  }

  public getCageInformation(): Node {
    return find("Canvas/PopupGameLayer/MenuLayer/CageInformation");
  }

  public getPopupCageInformation(): Node {
    return find("Canvas/PopupGameLayer/PopupCageInformation");
  }

  public getCoatingLayer(): Node {
    return find("Canvas/PopupGameLayer/CoatingLayer");
  }
  public getCage(): proto.ICage {
    return this.cage;
  }
}
