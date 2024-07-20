import { _decorator, Component, Node, Sprite } from "cc";
import { ResourceManager } from "../../../Manager/ResourceManager";
import { UICanvas } from "../../MainUI/UICanvas";
import { PopupFactory } from "../PopupFactory";
import { PopupUpgradeMachine } from "../PopupUpgradeMachine";
import { PopupManufactureMachine } from "../PopupManufactureMachine";
const { ccclass, property } = _decorator;

@ccclass("ItemMachine")
export class ItemMachine extends Component {
  @property(Sprite) private sprite: Sprite;
  @property(Node) private stars: Node[] = [];

  private noGrowthItem: proto.INoGrowthItem;
  private propertyupMachine: proto.IPropertyMachine;
  private typeItem: number;
  public init(
    noGrowthItem: proto.INoGrowthItem,
    propertyMachine: proto.IPropertyMachine,
    typeItem: number
  ) {
    this.noGrowthItem = noGrowthItem;
    this.propertyupMachine = propertyMachine;
    this.typeItem = typeItem;
  }
  start() {
    this.setUpMachine();
    this.node.on(Node.EventType.TOUCH_START, this.handleOnTouchStart, this);
  }

  private handleOnTouchStart() {
    let pupopFactoryComponent = UICanvas.me()
      .getPopupFactory()
      .getComponent(PopupFactory);
    console.log(this.typeItem);
    if (this.typeItem == 0) {
      console.log("click showPopupUpgradeMachine");
      let popupUpgradeMachineComponent = pupopFactoryComponent
        .getPopupUpgradeMachine()
        .getComponent(PopupUpgradeMachine);
      popupUpgradeMachineComponent.init(
        this.noGrowthItem,
        this.propertyupMachine
      );
    } else {
      let popupManufactureMachineComponent = pupopFactoryComponent
        .getPopupManufactureMachine()
        .getComponent(PopupManufactureMachine);
      popupManufactureMachineComponent.init(
        this.noGrowthItem,
        this.propertyupMachine
      );
    }
  }

  private setUpMachine() {
    this.sprite.spriteFrame = ResourceManager.me().getSpriteFrame(
      this.noGrowthItem.name
    );
    const starCount = this.propertyupMachine.numberStar;
    this.stars.forEach((star, index) => {
      star.active = index < starCount;
    });
  }
}
