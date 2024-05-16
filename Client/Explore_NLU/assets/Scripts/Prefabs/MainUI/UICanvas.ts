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
import { POPUP } from "../../Utils/Const";
import { PopupOption } from "../Popup/PopupOption";
const { ccclass, property } = _decorator;

@ccclass("UICanvas")
export class UICanvas extends Component {
  @property(Node) private joystick: Node = null;
  @property public addToRootNode: boolean = true;
  @property(Prefab) private prefabPopupMessage: Prefab;
  @property(Prefab) private prefabPopupOption: Prefab;
  @property(Prefab) private prefabPopupSetting: Prefab;

  protected static _instance: UICanvas;
  private _popupMessage: Node;
  private _popupOption: PopupOption;
  private _popup: Node;

  public static me(): UICanvas {
    return UICanvas._instance;
  }

  protected onLoad(): void {
    if (UICanvas._instance != null) {
      if (UICanvas._instance.addToRootNode) {
        UICanvas._instance.node.destroy();
        UICanvas._instance = this;
        director.addPersistRootNode(this.node);
        return;
      }
    }
    this._popupOption = new PopupOption();
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

  showPopup(popupName: POPUP, nodeMove?: Node) {
    switch (popupName) {
      case POPUP.POPUP_OPTION:
        if (this.node.getChildByName("BotMid").getChildByName("PopupOption")) {
          return;
        }
        this._popup = instantiate(this.prefabPopupOption);
        this._popup.components.find((component) => {
          if (component instanceof PopupOption) {
            this._popupOption = component;
            this._popupOption.nodeMove = nodeMove;
          }
        });
        this.node.getChildByName("BotMid").addChild(this._popupOption.node);
        this._popupOption.node.getComponent(PopupComponent).show();
        return;
      case POPUP.POPUP_SETTING:
        this._popup = instantiate(this.prefabPopupSetting);
        this.node.getChildByName("PopupLayer").addChild(this._popup);
        break;
      default:
        return;
    }
    this._popup.getComponent(PopupComponent).show();
  }

  closePopupMessage() {
    this._popupMessage.getComponent(PopupComponent).hide();
    this._popupMessage.destroy();
  }

  closePopup(popupName: POPUP) {
    switch (popupName) {
      case POPUP.POPUP_OPTION:
        if (!this._popupOption || !this._popupOption.node) return;
        this._popupOption.node.getComponent(PopupComponent).hide();
        this._popupOption.node.destroy();
        break;
      case POPUP.POPUP_SETTING:
        if (!this._popup) return;
        this._popup.getComponent(PopupComponent).hide();
        this._popup.destroy();
        break;
      default:
        return;
    }
  }

  onTouchSetting(): void {
    this.showPopup(POPUP.POPUP_SETTING);
  }
}
