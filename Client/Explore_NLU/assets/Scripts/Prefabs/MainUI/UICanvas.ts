import {
  _decorator,
  Component,
  director,
  instantiate,
  Node,
  Prefab,
  sys,
} from "cc";
import GlobalData from "../../Utils/GlobalData";
import { PopupMessage } from "../Popup/PopupMessage";
import { PopupComponent } from "../../Controller/PopupComponent";
const { ccclass, property } = _decorator;

@ccclass("UICanvas")
export class UICanvas extends Component {
  @property(Node) private joystick: Node = null;
  @property private addToRootNode: boolean = true;
  @property(Prefab) private prefabPopupMessage: Prefab;

  protected static _instance: UICanvas;
  private _popupMessage: Node;

  public static me(): UICanvas {
    return UICanvas._instance;
  }

  protected onLoad(): void {
    if (UICanvas._instance != null)
      console.log("Only 1 InputManager allow to exist");
    UICanvas._instance = this;

    if (!this.addToRootNode) return;

    director.addPersistRootNode(this.node);
  }
  start() {
    if (GlobalData.me().isMobileDevice()) {
      this.joystick.active = true;
    }
  }

  update(deltaTime: number) {}

  showPopupMessage(message: string) {
    this._popupMessage = instantiate(this.prefabPopupMessage);
    this._popupMessage.getComponent(PopupMessage).setMessage(message);
    this.node.getChildByName("PopupLayer").addChild(this._popupMessage);
    this._popupMessage.getComponent(PopupComponent).show();
  }
  closePopupMessage() {
    this._popupMessage.getComponent(PopupComponent).hide();
    this._popupMessage.destroy();
  }
}
