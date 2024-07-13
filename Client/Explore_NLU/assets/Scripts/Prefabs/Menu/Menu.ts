import { _decorator, Button, Component, Node } from "cc";
import { TYPE_TOOL } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Menu")
export class Menu extends Component {
  @property(Node)
  private menuModal: Node = null;
  @property(Node)
  private menuContent: Node = null;
  @property(Node)
  private menuItem: Node[] = [];

  start() {
    this.menuModal.on(
      Node.EventType.TOUCH_START,
      this.handleOnTouchStartModal,
      this
    );
  }
  handleOnTouchStartModal() {
    this.node.active = false;
    const informationButton = this.node
      .getChildByName("CageInformation")
      .getChildByName("InformationButton");
    if (informationButton) {
      informationButton.targetOff("UICanvas");
      informationButton.off(Button.EventType.CLICK);
    }

    const addAnimalButton = this.node
      .getChildByName("CageInformation")
      .getChildByName("AddAnimalButton");
    if (addAnimalButton) {
      console.log("addAnimalButton", addAnimalButton);
      addAnimalButton.targetOff("UICanvas");
      addAnimalButton.off(Button.EventType.CLICK);
    }
  }

  public getMenuModalNode(): Node {
    return this.menuModal;
  }

  public getMenuContentNode(): Node {
    return this.menuContent;
  }

  public getMenuItemNode(name: string): Node {
    for (let i = 0; i < this.menuItem.length; i++) {
      if (this.menuItem[i].name == name) {
        return this.menuItem[i];
      }
    }
    return null;
  }

  public showOneItemMenu(nameMenuItem: string): void {
    for (let i = 0; i < this.menuItem.length; i++) {
      const menuItem = this.menuItem[i];
      if (menuItem.name != nameMenuItem) {
        menuItem.active = false;
      } else {
        menuItem.active = true;
      }
    }
  }
}
