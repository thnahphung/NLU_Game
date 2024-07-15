import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PopupFactory")
export class PopupFactory extends Component {
  @property(Node)
  private popupUpgradeMachine: Node = null;

  start() {
    this.node.active = false;
    this.popupUpgradeMachine.active = false;
  }

  public showPopupUpgradeMachine() {
    this.node.active = true;
    this.popupUpgradeMachine.active = true;
  }

  public closePopupUpgradeMachine() {
    this.popupUpgradeMachine.active = false;
  }

  public closePopup() {
    this.node.active = false;
    this.popupUpgradeMachine.active = false;
  }

  getPopupUpgradeMachine(): Node {
    return this.popupUpgradeMachine;
  }
}
