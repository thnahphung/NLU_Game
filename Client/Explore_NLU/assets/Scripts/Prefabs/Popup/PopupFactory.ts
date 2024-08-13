import { _decorator, Component, find, Node } from "cc";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("PopupFactory")
export class PopupFactory extends Component {
  @property(Node)
  private popupUpgradeMachine: Node = null;
  @property(Node)
  private popupManufactureMachine: Node = null;
  start() {
    find("UICanvas").children.forEach((child) => {
      if (child.name === "TopRight") child.setSiblingIndex(20);
    });
  }

  public showPopupUpgradeMachine() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.active = true;
    this.popupUpgradeMachine.active = true;
    this.popupManufactureMachine.active = false;
  }

  public showPopupManufactureMachine() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.active = true;
    this.popupManufactureMachine.active = true;
    this.popupUpgradeMachine.active = false;
  }

  public closePopupUpgradeMachine() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.popupUpgradeMachine.active = false;
  }

  public closePopupManufactureMachine() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.popupManufactureMachine.active = false;
  }

  public closePopup() {
    this.node.active = false;
    this.popupUpgradeMachine.active = false;
    this.popupManufactureMachine.active = false;
  }

  getPopupUpgradeMachine(): Node {
    return this.popupUpgradeMachine;
  }

  getPopupManufactureMachine(): Node {
    return this.popupManufactureMachine;
  }
}
