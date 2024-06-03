import {
  _decorator,
  Button,
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
import { BUTTON, POPUP } from "../../Utils/Const";
import { PopupOption } from "../Popup/PopupOption";
import { TransitionScenePrefab } from "../TransitionScene/TransitionScenePrefab";
import { Joystick } from "../Joystick/Joystick";
const { ccclass, property } = _decorator;

@ccclass("UICanvas")
export class UICanvas extends Component {
  @property(Node) private joystick: Node = null;
  @property public addToRootNode: boolean = true;
  @property(Prefab) private prefabPopupMessage: Prefab;
  @property(Prefab) private prefabPopupOption: Prefab;
  @property(Prefab) private prefabPopupSetting: Prefab;
  @property(Prefab) private prefabTransitionScene: Prefab;
  @property(Prefab) private buttonBuilding: Prefab = null;

  protected static _instance: UICanvas;
  private _popupMessage: Node;
  private _popupOption: PopupOption;
  private _popup: Node;
  private _buttonBuilding: Node;

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

  public getJoyStick(): Joystick {
    return this.joystick.getComponent(Joystick);
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

  showButton(buttonName: BUTTON) {
    switch (buttonName) {
      case BUTTON.UI_BUTTON_BUILDING:
        this._buttonBuilding = instantiate(this.buttonBuilding);
        this.node.getChildByName("BotRight").addChild(this._buttonBuilding);
        break;
      default:
        return;
    }
    this._buttonBuilding.getComponent(PopupComponent).show();
  }

  getButton(buttonName: BUTTON): Node {
    switch (buttonName) {
      case BUTTON.UI_BUTTON_BUILDING:
        return this._buttonBuilding;
      default:
        return;
    }
  }

  hideButton(buttonName: BUTTON) {
    switch (buttonName) {
      case BUTTON.UI_BUTTON_BUILDING:
        this._buttonBuilding.destroy();
        break;
      default:
        return;
    }
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

  transitScene(sceneName: string) {
    let transitScreenNode = instantiate(this.prefabTransitionScene);
    transitScreenNode
      .getComponent(TransitionScenePrefab)
      .setSceneName(sceneName);
    this.node.getChildByName("PopupLayer").addChild(transitScreenNode);
  }
}
