import { _decorator, Component, Label, Node, Sprite } from "cc";
import { ResourceManager } from "../../../Manager/ResourceManager";
import { UICanvas } from "../../MainUI/UICanvas";
import { PopupFactory } from "../PopupFactory";
import { PopupUpgradeMachine } from "../PopupUpgradeMachine";
import { PopupManufactureMachine } from "../PopupManufactureMachine";
import GlobalData from "../../../Utils/GlobalData";
import { AudioManger } from "../../../Manager/AudioManger";
import { AUDIOS } from "../../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("ItemMachine")
export class ItemMachine extends Component {
  @property(Sprite) private sprite: Sprite;
  @property(Node) private focusSprite: Node;
  @property(Node) private starNode: Node;
  @property(Label) private activeLabel: Label;
  @property(Node) private stars: Node[] = [];

  private machineItemId: number = -1;
  private typeItem: number = 0;
  start() {
    this.setUpMachine();
    this.node.on(Node.EventType.TOUCH_START, this.handleOnTouchStart, this);
  }

  private handleOnTouchStart() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_1);
    let pupopFactoryComponent = UICanvas.me()
      .getPopupFactory()
      .getComponent(PopupFactory);
    const machine = GlobalData.me().getMachine(this.machineItemId);
    if (!machine) return;
    if (machine.noGrowthItem.name == "saw_machine") return;
    if (this.typeItem == 0) {
      let popupUpgradeMachineComponent = pupopFactoryComponent
        .getPopupUpgradeMachine()
        .getComponent(PopupUpgradeMachine);
      popupUpgradeMachineComponent.init(machine.noGrowthItem.id);
      popupUpgradeMachineComponent
        .getScrollViewUpgradeMachine()
        .children.forEach((child) => {
          child.getComponent(ItemMachine).setFocus(false);
        });
    } else {
      let popupManufactureMachineComponent = pupopFactoryComponent
        .getPopupManufactureMachine()
        .getComponent(PopupManufactureMachine);
      popupManufactureMachineComponent.init(this.machineItemId);
      popupManufactureMachineComponent
        .getScrollViewMachineManufactureMachine()
        .children.forEach((child) => {
          child.getComponent(ItemMachine).setFocus(false);
        });
    }
    this.setFocus(true);
  }

  public setUpMachine() {
    const machine = GlobalData.me().getMachine(this.machineItemId);
    if (machine) {
      this.sprite.spriteFrame = ResourceManager.me().getSpriteFrame(
        machine.noGrowthItem.name
      );
      if (machine.noGrowthItem.name == "saw_machine") {
        this.sprite.grayscale = true;
        this.starNode.active = false;
        this.activeLabel.node.active = true;
        return;
      }
      const starCount = machine.propertyMachine.numberStar;
      this.stars.forEach((star, index) => {
        star.active = index < starCount;
      });
    }
  }

  public setMachineItemId(machineItemId: number) {
    this.machineItemId = machineItemId;
  }

  public getMachineItemId() {
    return this.machineItemId;
  }

  public setTypeItem(typeItem: number) {
    this.typeItem = typeItem;
  }

  setFocus(isFocus: boolean) {
    this.focusSprite.active = isFocus;
  }
}
