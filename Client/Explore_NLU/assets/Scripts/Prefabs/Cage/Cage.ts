import {
  _decorator,
  Button,
  Component,
  find,
  instantiate,
  Node,
  Prefab,
} from "cc";
import { CoatingComponent } from "../../Controller/CoatingComponent";
import { COATING } from "../../Utils/Const";
import { PopupComponent } from "../../Controller/PopupComponent";
import { PopupCageInformation } from "../Popup/PopupCageInformation";
const { ccclass, property } = _decorator;

export class CageInfo {
  public capacity: number;
  public level: number;
  public maxLevel: number;
  public animals: Array<any>;
  constructor(
    capacity: number,
    level: number,
    maxLevel: number,
    animals: Array<string>
  ) {
    this.capacity = capacity;
    this.level = level;
    this.maxLevel = maxLevel;
    this.animals = animals;
  }
}
@ccclass("Cage")
export class Cage extends Component {
  @property(Prefab) private popupCageInformation: Prefab;
  private menuNode: Node;
  private cageInfo: CageInfo = {
    capacity: 6,
    level: 2,
    maxLevel: 5,
    animals: [
      {
        id: 5,
        name: "Gà vàng",
        type: "chicken",
        age: 1,
        isDisease: false,
        isPregnant: false,
      },
      {
        id: 6,
        name: "Gà vàng",
        type: "chicken",
        age: 1,
        isDisease: false,
        isPregnant: true,
      },
      {
        id: 7,
        name: "Gà vàng",
        type: "chicken",
        age: 1,
        isDisease: false,
        isPregnant: false,
      },
      {
        id: 8,
        name: "Gà vàng",
        type: "chicken",
        age: 1,
        isDisease: false,
        isPregnant: false,
      },
      {
        id: 9,
        name: "Gà vàng",
        type: "chicken",
        age: 1,
        isDisease: false,
        isPregnant: false,
      },
      {
        id: 10,
        name: "Gà vàng",
        type: "chicken",
        age: 1,
        isDisease: false,
        isPregnant: false,
      },
    ],
  };
  start() {
    this.menuNode = this.getCageInformation();
    this.node.on(Node.EventType.TOUCH_START, this.handleGetMenu, this);
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
      .setInformationCage(this.cageInfo);
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
