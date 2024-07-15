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
import { ANIMAL, AUDIOS, COATING } from "../../Utils/Const";
import { PopupComponent } from "../../Controller/PopupComponent";
import { PopupCageInformation } from "../Popup/PopupCageInformation";
import { UICanvas } from "../MainUI/UICanvas";
import { ResourceManager } from "../../Manager/ResourceManager";
import { Animal } from "../Animal/Animal";
import { Util } from "../../Utils/Util";
import { AnimalAnimation } from "../Animal/AnimalAnimation";
import DataSender from "../../Utils/DataSender";
import { AudioManger } from "../../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("Cage")
export class Cage extends Component {
  @property(Prefab) private popupCageInformation: Prefab;
  @property(Node) private animalPanel: Node;
  private menuNode: Node;
  private cage: proto.ICage;

  private interval = 0;

  start() {
    this.interval = Util.randomInRange(5, 15);
    this.schedule(this.playAnimalSound, this.interval);

    this.menuNode = this.getCageInformation();
    this.node.on(Node.EventType.TOUCH_START, this.handleGetMenuFood, this);
    this.loadAnimals();
  }

  protected onDestroy(): void {
    this.unschedule(this.playAnimalSound);
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
    let stage = 1;
    if (
      animal.propertyGrowthItem.developedDays >=
      animal.commonRisingTimes.sort((a, b) => a.stage - b.stage)[0].time
    ) {
      stage = 2;
    }
    const animalPrefab: Prefab = ResourceManager.me().getAnimalPrefab(
      Util.removeDash(animal.commonGrowthItem.name.toLowerCase() + "lv" + stage)
    );
    if (!animalPrefab) return;
    const animalNode = instantiate(animalPrefab);
    animalNode.getComponent(Animal).init(animal);
    animalNode.getComponent(Animal).setStage(stage);
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
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    UICanvas.me().showPopupMenuInfoAnimalFood(this.cage, () => {
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

  public getAnimalById(id: number): Node {
    return this.animalPanel.children.find((animalNode) => {
      return animalNode.getComponent(Animal).getAnimal().id === id;
    });
  }

  public changeAnimalNewDay() {
    this.animalPanel.children.forEach((animalNode) => {
      animalNode.getComponent(Animal).clearWhenNewDay();
    });
  }

  public playAnimalSound() {
    if (!this.node) return;

    const animal = this.animalPanel.children[0]?.getComponent(Animal);
    if (!animal) return;
    if (animal.getType() === ANIMAL.COW) {
      AudioManger.me().playOneShot(AUDIOS.COW);
    } else if (animal.getType() === ANIMAL.CHICKEN) {
      AudioManger.me().playOneShot(AUDIOS.CHICKEN);
    }
  }
}
