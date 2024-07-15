import {
  _decorator,
  Animation,
  Button,
  Component,
  director,
  EventHandler,
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
import { Util } from "../../Utils/Util";
import { Menu } from "../Menu/Menu";
import { PopupCageInformation } from "../Popup/PopupCageInformation";
import { PopupTask } from "../Popup/PopupTask";
import DataSender from "../../Utils/DataSender";
import { PopupFactory } from "../Popup/PopupFactory";
const { ccclass, property } = _decorator;

@ccclass("UICanvas")
export class UICanvas extends Component {
  @property(Label) private userName: Label = null;
  @property(Label) private userLevel: Label = null;
  @property(ProgressBar) private userExp: ProgressBar = null;
  @property(Label) private userGold: Label = null;

  @property(Node) private joystick: Node = null;
  @property(Node) private popupMenuAnimalFood: Node = null;
  @property(Node) private popupMenuToolFarm: Node = null;
  @property(Node) private popupMenuSeedFarm: Node = null;
  @property(Node) private popupFactory: Node = null;

  @property(Prefab) private prefabPopupMessage: Prefab;
  @property(Prefab) private prefabPopupOption: Prefab;
  @property(Prefab) private prefabPopupSetting: Prefab;
  @property(Prefab) private prefabTransitionScene: Prefab;
  @property(Prefab) private buttonBuilding: Prefab = null;
  @property(Prefab) private prefabPopupConnectionNotify: Prefab = null;
  @property(Prefab) private prefabPopupFriend: Prefab = null;
  @property(Prefab) private prefabRewardEffect: Node = null;
  @property(Prefab) private prefabPopupShop: Prefab;
  @property(Prefab) private prefabPopupWarehouse: Prefab;
  @property(Prefab) private prefabPopupCageBuilding: Prefab;
  @property(Prefab) private prefabPopupTask: Prefab;
  @property(Prefab) private prefabPopupCageInformation: Prefab;
  @property(Prefab) private prefabPopupHelp: Prefab;
  @property(Prefab) private prefabPopupFindTime: Prefab;

  protected static _instance: UICanvas;
  private _popupMessage: Node;
  private _popup: Node;
  private _buttonBuilding: Node;
  public _popupConnectionNotify: Node;
  private _popupOption: Node;
  private _popupSetting: Node;
  private _popupFriend: Node;
  private _popupTask: Node;
  private _popupHelp: Node;
  private _popupFindTime: Node;

  //Lock button
  private isLocked: boolean = false;
  private isLockedOpenPopup: boolean = false;

  public static me(): UICanvas {
    return UICanvas._instance;
  }

  protected onLoad(): void {
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
    this.userName.string = mainUser.playerName;
    this.userLevel.string = "Lv " + mainUser.level.toString() + ": ";
    this.userExp.progress = mainUser.experiencePoints / 100;
    this.userGold.string = Util.formatNumber(mainUser.gold);
  }

  loadGold() {
    if (GlobalData.me().getMainUser() == null) return;
    let mainUser = GlobalData.me().getMainUser();
    this.userGold.string = Util.formatNumber(mainUser.gold);
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

  private onLocked1s() {
    if (this.isLocked) {
      return;
    }
    this.isLocked = true;
    this.scheduleOnce(() => (this.isLocked = false), 1);
  }

  showPopupShop(type: proto.ShopItem.TYPE_SHOP | number): Node {
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
        if (!this._popupOption) return;
        this._popupOption.getComponent(PopupComponent).hide();
        this._popupOption.destroy();
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

  transitScene(sceneName: string) {
    let transitScreenNode = instantiate(this.prefabTransitionScene);
    transitScreenNode
      .getComponent(TransitionScenePrefab)
      .setSceneName(sceneName);
    this.node.getChildByName("PopupLayer").addChild(transitScreenNode);
  }

  showRewardEffect(
    name: string,
    quantity: number,
    reward: REWARD_ICONS | string
  ) {
    let rewardEffect = instantiate(this.prefabRewardEffect);
    rewardEffect.getComponent(RewardEffect).setReward(name, quantity, reward);
    this.node.addChild(rewardEffect);
  }

  showPopupWarehouse() {
    const popup = this.node
      .getChildByName("PopupLayer")
      .getChildByName("PopupWarehouse");
    if (!popup) {
      let popupWarehouse = instantiate(this.prefabPopupWarehouse);
      this.node.getChildByName("PopupLayer").addChild(popupWarehouse);
      popupWarehouse.getComponent(PopupComponent).show();
      return;
    }
    if (popup.active) {
      popup.getComponent(PopupComponent).hide();
    } else {
      popup.getComponent(PopupComponent).show();
    }
  }

  showListRewardEffect(
    listReward: {
      name: string;
      quantity: number;
      reward: REWARD_ICONS | string;
    }[]
  ) {
    listReward.forEach((reward, index) => {
      this.scheduleOnce(() => {
        this.showRewardEffect(reward.name, reward.quantity, reward.reward);
      }, index * 0.5);
    });
  }

  showPopupMenuInfoAnimalFood(cage: proto.ICage, callback?: Function) {
    if (!this.popupMenuAnimalFood.active) {
      this.popupMenuAnimalFood
        .getChildByName("CageInformation")
        .getChildByName("InformationButton")
        .once(
          Button.EventType.CLICK,
          () => {
            this.showPopupCageInformation(cage);
          },
          "UICanvas"
        );

      this.popupMenuAnimalFood
        .getChildByName("CageInformation")
        .getChildByName("AddAnimalButton")
        .on(
          Button.EventType.CLICK,
          () => {
            if (callback) {
              callback();
            }
          },
          "UICanvas"
        );
      this.popupMenuAnimalFood.active = true;
    }
  }

  showPopupCageInformation(cage: proto.ICage) {
    const popupCageInformationNode = instantiate(
      this.prefabPopupCageInformation
    );
    popupCageInformationNode.getComponent(PopupCageInformation).init(cage);
    this.node.getChildByName("PopupLayer").addChild(popupCageInformationNode);
    popupCageInformationNode.getComponent(PopupComponent).show();
    this.popupMenuAnimalFood.active = false;
  }

  showPopupMenuToolFarm(nameTool: string) {
    if (this?.popupMenuToolFarm) {
      this.popupMenuToolFarm.active = true;
      this.popupMenuToolFarm.getComponent(Menu).showOneItemMenu(nameTool);
    }
  }

  closePopupMenuToolFarm() {
    if (this?.popupMenuToolFarm) {
      this.popupMenuToolFarm.active = false;
    }
  }

  showPopupMenuSeedFarm() {
    if (this?.popupMenuSeedFarm) {
      this.popupMenuSeedFarm.active = true;
    }
  }

  closePopupMenuSeedFarm() {
    if (this?.popupMenuSeedFarm) {
      this.popupMenuSeedFarm.active = false;
    }
  }

  getMenuSeedFarm(): Node {
    return this.popupMenuSeedFarm;
  }

  getMenuToolFarm(): Node {
    return this.popupMenuToolFarm;
  }

  showPopupOption(handleNode?: Node, lable?: string) {
    if (this.node.getChildByName("BotMid").getChildByName("PopupOption"))
      return;
    this._popupOption = instantiate(this.prefabPopupOption);
    let popupOptionComponent = this._popupOption.getComponent(PopupOption);
    if (handleNode) popupOptionComponent.handleNode = handleNode;
    if (lable) popupOptionComponent.lableString = lable;
    this.node.getChildByName("BotMid").addChild(popupOptionComponent.node);
    this._popupOption.getComponent(PopupComponent).show();
  }

  showPopupCageBuilding() {
    let popupCageBuilding = instantiate(this.prefabPopupCageBuilding);
    this.node.getChildByName("PopupLayer").addChild(popupCageBuilding);
    popupCageBuilding.getComponent(PopupComponent).show();
  }

  showPopupSetting() {
    if (this.node.getChildByName("PopupLayer").getChildByName("PopupSetting")) {
      return;
    }
    this.onLocked1s();
    this._popupSetting = instantiate(this.prefabPopupSetting);
    this.node.getChildByName("PopupLayer").addChild(this._popupSetting);
    this._popupSetting.getComponent(PopupComponent).show();
  }

  showPopupFriend() {
    if (this.node.getChildByName("PopupLayer").getChildByName("PopupFriend")) {
      return;
    }
    this.onLocked1s();
    this._popupFriend = instantiate(this.prefabPopupFriend);
    this.node.getChildByName("PopupLayer").addChild(this._popupFriend);
    this._popupFriend.getComponent(PopupComponent).show();
  }

  showPopupTask() {
    if (this.node.getChildByName("PopupLayer").getChildByName("PopupTask")) {
      return;
    }
    this.onLocked1s();
    this._popupTask = instantiate(this.prefabPopupTask);
    this.node.getChildByName("PopupLayer").addChild(this._popupTask);
    this._popupTask.getComponent(PopupComponent).show();
  }

  reloadPopupTask() {
    if (this._popupTask) {
      this._popupTask.getComponent(PopupTask).instanceItems();
    }
  }

  onClickGoHome() {
    DataSender.sendReqPlayerJoinArea(GlobalData.me().getMainUser().userId);
  }
  showPopupUpgradeMachine() {
    this.popupFactory.getComponent(PopupFactory).showPopupUpgradeMachine();
  }

  getPopupFactory(): Node {
    return this.popupFactory;
  }

  showPopupHelp() {
    if (this.node.getChildByName("PopupLayer").getChildByName("PopupHelp")) {
      if (this._popupFindTime && this._popupFindTime.active) return;
      if (this._popupHelp) {
        this._popupHelp.active = true;
      }
      return;
    }
    this.onLocked1s();
    this._popupHelp = instantiate(this.prefabPopupHelp);
    this.node.getChildByName("PopupLayer").addChild(this._popupHelp);
    this._popupHelp.getComponent(PopupComponent).show();
  }

  closePopupHelp() {
    if (this._popupHelp) {
      this._popupHelp.destroy();
      this._popupHelp = null;
    }
  }

  hidePopupHelp() {
    if (this._popupHelp) {
      this._popupHelp.active = false;
    }
  }

  showPopupFindTime() {
    if (this.node.getChildByName("TopMid").getChildByName("TopMid")) {
      return;
    }
    this.onLocked1s();
    this._popupFindTime = instantiate(this.prefabPopupFindTime);
    this.node.getChildByName("TopMid").addChild(this._popupFindTime);
  }

  closePopupFindTime() {
    if (this._popupFindTime) {
      this._popupFindTime.destroy();
      this._popupFindTime = null;
    }
  }

  getPopupFindTime(): Node {
    return this._popupFindTime;
  }
}
