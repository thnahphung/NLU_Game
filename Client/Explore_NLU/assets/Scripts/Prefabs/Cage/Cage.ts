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
      const animalPrefab: Prefab = ResourceManager.me().getAnimalPrefab(
        Util.removeDash(
          animal.commonGrowthItem.name.toLowerCase() +
            "lv" +
            animal.propertyGrowthItems.stage
        )
      );
      if (!animalPrefab) return;
      const animalNode = instantiate(animalPrefab);
      animalNode.getComponent(Animal).init(animal);
      this.animalPanel.addChild(animalNode);
    });
  }

  private handleGetMenuFood(): void {
    UICanvas.me().showPopupMenuInfoAnimalFood();
  }

  private handleGetMenu(): void {
    this.menuNode.setPosition(
      this.node.getPosition().x,
      this.node.getPosition().y - 150,
      0
    );
    this.menuNode.active = true;
    this.menuNode
      .getChildByName("InformationButton")
      .on(Button.EventType.CLICK, this.onClickShowPopupCageInformation, this);
    CoatingComponent.me().setCoating(
      COATING.FEED,
      this.getCoatingLayer(),
      this.menuNode
    );
    CoatingComponent.me().showCoating(COATING.FEED);
    CoatingComponent.me().autoOff(COATING.FEED, () => {
      console.log("autoOff");
      this.menuNode
        .getChildByName("InformationButton")
        .off(
          Button.EventType.CLICK,
          this.onClickShowPopupCageInformation,
          this
        );
    });
  }

  public onClickShowPopupCageInformation(): void {
    let popupCageInformation = this.getPopupCageInformation();
    if (popupCageInformation) {
      popupCageInformation.getComponent(PopupComponent).show();
      return;
    }
    popupCageInformation = instantiate(this.popupCageInformation);
    popupCageInformation
      .getComponent(PopupCageInformation)
      .setInformationCage(this.cage);
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
}
