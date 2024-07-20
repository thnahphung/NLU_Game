import { _decorator, Component, find, instantiate, Node, Prefab } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Lab")
export class Lab extends Component {
  @property(Prefab) private popupLab: Prefab;
  private popupLayer: Node;

  start() {
    this.popupLayer = find("UICanvas/PopupLayer");
    this.node.on(Node.EventType.TOUCH_START, this.handleOpenPopup, this);
  }

  private handleOpenPopup() {
    if (this.node.name === "LabKSCN") return;
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    let popupLab = instantiate(this.popupLab);
    popupLab.getComponent(PopupComponent).show();
    this.popupLayer.addChild(popupLab);
  }
}
