import { Component, Node, Prefab, _decorator, director, instantiate } from "cc";
import { PopupComponent } from "../Controller/PopupComponent";
import { PopupMessage } from "../Prefabs/Popup/PopupMessage";
const { ccclass, property } = _decorator;

@ccclass("PopupManager")
export class PopupManager extends Component {
  @property(Prefab)
  private prefabPopupMessage: Prefab;
  private static _instance: PopupManager;
  private _popupMessage: Node;

  private _uiCanvas: Node;

  public static me(): PopupManager {
    return this._instance;
  }

  protected onLoad(): void {
    console.log("PopupManager loaded");
    if (PopupManager._instance != null)
      console.log("Only 1 PopupManager allow to exist");
    PopupManager._instance = this;
    director.addPersistRootNode(this.node);
  }

  showPopupMessage(message: string) {
    this._uiCanvas = director.getScene().getChildByName("UICanvas");
    this._popupMessage = instantiate(this.prefabPopupMessage);
    this._popupMessage.getComponent(PopupMessage).setMessage(message);
    this._uiCanvas.getChildByName("PopupLayer").addChild(this._popupMessage);
    this._popupMessage.getComponent(PopupComponent).show();
  }
  closePopupMessage() {
    this._popupMessage.getComponent(PopupComponent).hide();
    this._popupMessage.destroy();
  }
}
