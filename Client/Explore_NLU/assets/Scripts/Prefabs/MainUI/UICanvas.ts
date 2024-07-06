import {
  _decorator,
  Animation,
  Button,
  Component,
  director,
  instantiate,
  Label,
  Node,
  Prefab,
  ProgressBar,
  sys,
} from "cc";
import GlobalData from "../../Utils/GlobalData";
import { PopupMessage } from "../Popup/PopupMessage";
import { PopupComponent } from "../../Controller/PopupComponent";
import { BUTTON, POPUP, REWARD_ICONS, SCENES } from "../../Utils/Const";
import { PopupOption } from "../Popup/PopupOption";
import { TransitionScenePrefab } from "../TransitionScene/TransitionScenePrefab";
import { Joystick } from "../Joystick/Joystick";
import { RewardEffect } from "../Reward/RewardEffect";
import { PopupShop } from "../Popup/PopupShop";
const { ccclass, property } = _decorator;

@ccclass("UICanvas")
export class UICanvas extends Component {
  @property(Label) private userName: Label = null;
  @property(Label) private userLevel: Label = null;
  @property(ProgressBar) private userExp: ProgressBar = null;
  @property(Label) private userGold: Label = null;

  @property(Node) private joystick: Node = null;

  @property(Prefab) private prefabPopupMessage: Prefab;
  @property(Prefab) private prefabPopupOption: Prefab;
  @property(Prefab) private prefabPopupSetting: Prefab;
  @property(Prefab) private prefabTransitionScene: Prefab;
  @property(Prefab) private buttonBuilding: Prefab = null;
  @property(Prefab) private prefabPopupConnectionNotify: Prefab = null;
  @property(Prefab) private prefabPopupFriend: Prefab = null;
  @property(Prefab) private prefabRewardEffect: Node = null;
  @property(Prefab) private prefabPopupShop: Prefab;

  protected static _instance: UICanvas;
  private _popupMessage: Node;
  private _popupOption: PopupOption;
  private _popup: Node;
  private _buttonBuilding: Node;
  public _popupConnectionNotify: Node;
  //Lock button
  private isLocked: boolean = false;

  public static me(): UICanvas {
    return UICanvas._instance;
  }

  protected onLoad(): void {
    this._popupOption = new PopupOption();
    UICanvas._instance = this;
  }

  start() {
    if (GlobalData.me().isMobileDevice()) {
      this.joystick.active = true;
    }
    this.loadUserInfo();
  }

  loadUserInfo() {
    if (
      GlobalData.me().getMainUser() == null ||
      director.getScene().name === SCENES.PICK_CHARACTER.toString()
    )
      return;
    let mainUser = GlobalData.me().getMainUser();
    this.userName.string = mainUser.username;
    this.userLevel.string = "Lv " + mainUser.level.toString() + ": ";
    this.userExp.progress = mainUser.experiencePoints / 100;
    this.userGold.string = mainUser.gold.toString();
  }

  showPopupMessage(message: string) {
    this._popupMessage = instantiate(this.prefabPopupMessage);
    this._popupMessage.setPosition(-100, 120);
    this._popupMessage.getComponent(PopupMessage).setMessage(message);
    this.node.getChildByName("PopupLayer").addChild(this._popupMessage);
    this._popupMessage.getComponent(PopupComponent).show();
  }

  showPopupConnectionNotify() {
    this._popupConnectionNotify = instantiate(this.prefabPopupConnectionNotify);
    this.node
      .getChildByName("PopupLayer")
      .addChild(this._popupConnectionNotify);
    this._popupConnectionNotify.getComponent(PopupComponent).show();
  }

  closePopupConnectionNotify() {
    if (this._popupConnectionNotify == null) return;
    this._popupConnectionNotify.destroy();
    this._popupConnectionNotify = null;
  }

  public getJoyStick(): Joystick {
    return this.joystick.getComponent(Joystick);
  }

  showPopup(popupName: POPUP, handleNode?: Node, lable?: string) {
    if (this.isLocked) {
      return;
    }
    this.isLocked = true;
    switch (popupName) {
      case POPUP.POPUP_OPTION:
        if (this.node.getChildByName("BotMid").getChildByName("PopupOption")) {
          return;
        }
        this._popup = instantiate(this.prefabPopupOption);
        this._popup.components.find((component) => {
          if (component instanceof PopupOption) {
            this._popupOption = component;
            if (handleNode) this._popupOption.handleNode = handleNode;
            if (lable) this._popupOption.lableString = lable;
          }
        });
        this.node.getChildByName("BotMid").addChild(this._popupOption.node);
        this._popupOption.node.getComponent(PopupComponent).show();
        return;
      case POPUP.POPUP_SETTING:
        if (
          this.node.getChildByName("PopupLayer").getChildByName("PopupSetting")
        ) {
          return;
        }
        this._popup = instantiate(this.prefabPopupSetting);
        this.node.getChildByName("PopupLayer").addChild(this._popup);
        break;
      case POPUP.POPUP_FRIEND:
        if (
          this.node.getChildByName("PopupLayer").getChildByName("PopupFriend")
        ) {
          return;
        }
        this._popup = instantiate(this.prefabPopupFriend);
        this.node.getChildByName("PopupLayer").addChild(this._popup);
        break;
      default:
        return;
    }
    this._popup?.getComponent(PopupComponent).show();
    this.scheduleOnce(() => {
      this.isLocked = false;
    }, 1);
  }

  showPopupShop(type: proto.ShopItem.TYPE_SHOP): Node {
    if (this.node.getChildByName("PopupLayer").getChildByName("PopupShop")) {
      return;
    }
    let popupShopNode = instantiate(this.prefabPopupShop);
    popupShopNode.getComponent(PopupShop).init(type);
    this.node.getChildByName("PopupLayer").addChild(popupShopNode);
    popupShopNode.getComponent(PopupComponent).show();
    return popupShopNode;
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

  onTouchFriend(): void {
    this.showPopup(POPUP.POPUP_FRIEND);
  }

  transitScene(sceneName: string) {
    let transitScreenNode = instantiate(this.prefabTransitionScene);
    transitScreenNode
      .getComponent(TransitionScenePrefab)
      .setSceneName(sceneName);
    this.node.getChildByName("PopupLayer").addChild(transitScreenNode);
  }

  showRewardEffect(name: string, quantity: number, reward: REWARD_ICONS) {
    let rewardEffect = instantiate(this.prefabRewardEffect);
    rewardEffect.getComponent(RewardEffect).setReward(name, quantity, reward);
    this.node.addChild(rewardEffect);
  }

  showListRewardEffect(
    listReward: { name: string; quantity: number; reward: REWARD_ICONS }[]
  ) {
    listReward.forEach((reward, index) => {
      console.log(reward.name, reward.quantity, reward.reward);
      this.scheduleOnce(() => {
        this.showRewardEffect(reward.name, reward.quantity, reward.reward);
      }, index * 0.5);
    });
  }
}
