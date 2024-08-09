import {
  _decorator,
  Button,
  Component,
  director,
  find,
  instantiate,
  Label,
  Node,
  Prefab,
  ProgressBar,
  Sprite,
  SpriteFrame,
  sys,
  WebView,
} from "cc";
import GlobalData from "../../Utils/GlobalData";
import { PopupMessage } from "../Popup/PopupMessage";
import { PopupComponent } from "../../Controller/PopupComponent";
import { AUDIOS, POPUP, REWARD_ICONS, SCENES } from "../../Utils/Const";
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
import { AudioManger } from "../../Manager/AudioManger";
import { ResourceManager } from "../../Manager/ResourceManager";
import { PopupDiagnosis } from "../Popup/PopupDiagnosis";
import { PopupManufactureResult } from "../Popup/PopupManufactureResult";
import { PopupAcceptSupport } from "../Popup/PopupAcceptSupport";
import { PopupWaiting } from "../Popup/PopupWaiting";
import { PopupInformationAmphitheater } from "../Popup/PopupInformationAmphitheater";
import { PopupMatchMaking } from "../Popup/PopupMatchMaking";
import { InformationEffect } from "../Reward/InformationEffect";
const { ccclass, property } = _decorator;

@ccclass("UICanvas")
export class UICanvas extends Component {
  @property(Label) private userName: Label = null;
  @property(Label) private userLevel: Label = null;
  @property(ProgressBar) private userExp: ProgressBar = null;
  @property(Label) private userGold: Label = null;
  @property(Sprite) private userAvatar: Sprite = null;
  @property(Node) private joystick: Node = null;
  @property(Node) private popupMenuAnimalFood: Node = null;
  @property(Node) private popupMenuToolFarm: Node = null;
  @property(Node) private popupMenuSeedFarm: Node = null;
  @property(Node) private popupMenuMechanical: Node = null;
  @property(Node) private popupFactory: Node = null;
  @property(Node) private healingPanel: Node = null;

  @property(Prefab) private prefabPopupMessage: Prefab;
  @property(Prefab) private prefabPopupOption: Prefab;
  @property(Prefab) private prefabPopupSetting: Prefab;
  @property(Prefab) private prefabTransitionScene: Prefab;
  @property(Prefab) private prefabPopupConnectionNotify: Prefab = null;
  @property(Prefab) private prefabPopupFriend: Prefab = null;
  @property(Prefab) private prefabRewardEffect: Node = null;
  @property(Prefab) private prefabPopupShop: Prefab;
  @property(Prefab) private prefabPopupWarehouse: Prefab;
  @property(Prefab) private prefabPopupCageBuilding: Prefab;
  @property(Prefab) private prefabPopupTask: Prefab;
  @property(Prefab) private prefabPopupCageInformation: Prefab;
  @property(Prefab) private prefabPopupMatchMaking: Prefab;
  @property(Prefab) private prefabPopupFindTime: Prefab;
  @property(Prefab) private prefabPopupWaiting: Prefab;
  @property(Prefab) private prefabPopupAcceptSupport: Prefab;
  @property(Prefab) private prefabPopupAid: Prefab;
  @property(Prefab) private prefabPopupCraftingMedicines: Prefab;
  @property(Prefab) private prefabPopupDiagnosis: Prefab;
  @property(Prefab) private prefabPopupManufactureResult: Prefab;
  @property(Prefab) private prefabPopupInformationAmphitheater: Prefab;
  @property(Prefab) private prefabPopupSupport: Prefab;
  @property(Prefab) private informationEffectPrefab: Prefab = null;

  protected static _instance: UICanvas;
  private _popupMessage: Node;
  private _popup: Node;
  public _popupConnectionNotify: Node;
  private _popupOption: Node;
  private _popupSetting: Node;
  private _popupFriend: Node;
  private _popupTask: Node;
  private _popupMatchMaking: Node;
  private _popupFindTime: Node;
  private _popupWaiting: Node;
  private _popupAcceptSupport: Node;
  private _popupCageInformation: Node;
  private _popupAid: Node;
  private _popupManufactureResult: Node;
  private _popupSupport: Node;

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
    this.userAvatar.spriteFrame = ResourceManager.me().getChacracterFrame(
      mainUser.character.code
    );
  }

  getMainUserAvatar(): SpriteFrame {
    return this.userAvatar.spriteFrame;
  }

  loadGold() {
    if (GlobalData.me().getMainUser() == null) return;
    let mainUser = GlobalData.me().getMainUser();
    this.userGold.string = Util.formatNumber(mainUser.gold);
  }

  loadExp() {
    if (GlobalData.me().getMainUser() == null) return;
    let mainUser = GlobalData.me().getMainUser();
    this.userExp.progress = mainUser.experiencePoints / 100;
  }

  showPopupMessage(message: string) {
    if (this.node.getChildByName("PopupLayer").getChildByName("PopupMessage")) {
      return;
    }
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
    if (listReward.length == 0) return;
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
            AudioManger.me().playOneShot(AUDIOS.CLICK_2);
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
              AudioManger.me().playOneShot(AUDIOS.CLICK_1);
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
    this._popupCageInformation = popupCageInformationNode;
  }

  public getPopupCageInformation(): Node {
    return this._popupCageInformation;
  }

  showPopupMenuToolFarm(nameTool: string) {
    if (this?.popupMenuToolFarm) {
      this.popupMenuToolFarm.active = true;
      this.popupMenuToolFarm.getComponent(Menu).showOneItemMenu(nameTool);
    }
  }

  showPopupMenuMechanical(nameTool: string) {
    if (this?.popupMenuMechanical) {
      this.popupMenuMechanical.active = true;
      this.popupMenuMechanical.getComponent(Menu).showOneItemMenu(nameTool);
    }
  }

  hidePopupMenuMechanical() {
    if (this?.popupMenuMechanical) {
      this.popupMenuMechanical.active = false;
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

  getMenuMechanical(): Node {
    return this.popupMenuMechanical;
  }

  showPopupOption(handleNode?: Node, lable?: string) {
    if (this.node.getChildByName("BotMid").getChildByName("PopupOption"))
      return;
    this._popupOption = instantiate(this.prefabPopupOption);
    let popupOptionComponent = this._popupOption.getComponent(PopupOption);
    if (handleNode) popupOptionComponent.handleNode = handleNode;
    if (lable) popupOptionComponent.labelString = lable;
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

  showPopupUpgradeMachine() {
    this.popupFactory.getComponent(PopupFactory).showPopupUpgradeMachine();
  }

  showPopupManufactureMachine() {
    this.popupFactory.getComponent(PopupFactory).showPopupManufactureMachine();
  }

  getPopupFactory(): Node {
    return this.popupFactory;
  }

  onClickGoHome() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    DataSender.sendReqPlayerJoinArea(GlobalData.me().getMainUser().userId);
  }
  onClickShowPopupSetting() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.showPopupSetting();
  }

  onClickShowPopupFriend() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.showPopupFriend();
  }

  onClickShowPopupTask() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.showPopupTask();
  }

  onClickShowPopupWarehouse() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.showPopupWarehouse();
  }

  onClickShowPopupCageBuilding() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.showPopupCageBuilding();
  }

  showPopupMatchMaking(status?: number) {
    if (
      this.node.getChildByName("PopupLayer").getChildByName("PopupMatchMaking")
    ) {
      if (this._popupFindTime && this._popupFindTime.active) return;
      if (this._popupMatchMaking) {
        if (status) {
          this._popupMatchMaking
            .getComponent(PopupMatchMaking)
            .setStatus(status);
        } else {
          this._popupMatchMaking.getComponent(PopupMatchMaking).init();
        }
        this._popupMatchMaking.active = true;
      }
      return;
    }
    this._popupMatchMaking = instantiate(this.prefabPopupMatchMaking);
    if (status) {
      this._popupMatchMaking.getComponent(PopupMatchMaking).setStatus(status);
    } else {
      this._popupMatchMaking.getComponent(PopupMatchMaking).init();
    }
    this.node.getChildByName("PopupLayer").addChild(this._popupMatchMaking);
    this._popupMatchMaking.getComponent(PopupComponent).show();
  }

  closePopupMatchMaking() {
    if (this._popupMatchMaking) {
      this._popupMatchMaking.destroy();
      this._popupMatchMaking = null;
    }
  }

  hidePopupMatchMaking() {
    if (this._popupMatchMaking) {
      this._popupMatchMaking.active = false;
    }
  }

  hidePopupAid() {
    if (this._popupAid) {
      this._popupAid.active = false;
    }
  }

  showPopupFindTime() {
    if (this.node.getChildByName("TopMid").getChildByName("PopupFindTime")) {
      return;
    }
    this.onLocked1s();
    this._popupFindTime = instantiate(this.prefabPopupFindTime);
    this.node.getChildByName("TopMid").addChild(this._popupFindTime);
  }

  showPopupWaiting() {
    if (this.node.getChildByName("TopMid").getChildByName("PopupWaiting")) {
      return;
    }
    this.onLocked1s();
    this._popupWaiting = instantiate(this.prefabPopupWaiting);
    this.node.getChildByName("TopMid").addChild(this._popupWaiting);
  }

  showPopupAcceptSupport(userInvite: proto.IUser) {
    this._popupAcceptSupport = instantiate(this.prefabPopupAcceptSupport);
    this._popupAcceptSupport.getComponent(PopupAcceptSupport).init(userInvite);
    this._popupAcceptSupport.setPosition(200, -160);
    this.node.getChildByName("MidRight").addChild(this._popupAcceptSupport);
    this._popupAcceptSupport.getComponent(PopupComponent).showSlideIn();
  }

  closePopupFindTime() {
    if (this._popupFindTime) {
      this._popupFindTime.destroy();
      this._popupFindTime = null;
    }
  }

  closePopupWaiting() {
    if (this._popupWaiting) {
      this._popupWaiting.destroy();
      this._popupWaiting = null;
    }
  }

  getPopupFindTime(): Node {
    return this._popupFindTime;
  }

  showPopupAid() {
    if (this.node.getChildByName("PopupLayer").getChildByName("PopupAid")) {
      if (this._popupFindTime && this._popupFindTime.active) return;
      if (this._popupWaiting && this._popupWaiting.active) return;
      if (this._popupAid) {
        this._popupAid.active = true;
      }
      return;
    }
    this.onLocked1s();
    this._popupAid = instantiate(this.prefabPopupAid);
    this.node.getChildByName("PopupLayer").addChild(this._popupAid);
    this._popupAid.getComponent(PopupComponent).show();
  }

  getPopupAid(): Node {
    return this._popupAid;
  }

  getPopupMatchMaking(): Node {
    return this._popupMatchMaking;
  }

  createNewPopupMatchMaking() {
    if (
      this.node.getChildByName("PopupLayer").getChildByName("PopupMatchMaking")
    ) {
      if (this._popupMatchMaking) {
        this._popupMatchMaking.active = true;
      }
      return;
    }
    this._popupMatchMaking = instantiate(this.prefabPopupMatchMaking);
    this.node.getChildByName("PopupLayer").addChild(this._popupMatchMaking);
    return this._popupMatchMaking;
  }

  showPopupCraftingMedicines() {
    let popupCraftingMedicines = instantiate(this.prefabPopupCraftingMedicines);
    this.node.getChildByName("PopupLayer").addChild(popupCraftingMedicines);
    popupCraftingMedicines.getComponent(PopupComponent).show();
  }

  showHealingButton(animal: proto.IAnimal) {
    this.healingPanel.active = true;
    this.healingPanel.getChildByName("HealingButton").on(
      Button.EventType.CLICK,
      () => {
        this.showPopupDiagnosis(animal);
      },
      this
    );
  }

  showPopupDiagnosis(animal: proto.IAnimal) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.healingPanel.active = false;
    let popupDiagnosis = instantiate(this.prefabPopupDiagnosis);
    popupDiagnosis.getComponent(PopupDiagnosis).init(animal);
    this.node.getChildByName("PopupLayer").addChild(popupDiagnosis);
    popupDiagnosis.getComponent(PopupComponent).show();
  }

  showPopupManufactureResult(
    noGrowthItem: proto.INoGrowthItem,
    propertyMachine: proto.IPropertyMachine,
    status: number
  ) {
    if (
      this.node
        .getChildByName("PopupLayer")
        .getChildByName("PopupManufactureResult")
    ) {
      return;
    }
    let popupManufactureResult = instantiate(this.prefabPopupManufactureResult);
    if (status == 200) {
      popupManufactureResult
        .getComponent(PopupManufactureResult)
        .initSuccess(
          propertyMachine.speed,
          propertyMachine.power,
          propertyMachine.value,
          propertyMachine.durable,
          noGrowthItem.name,
          propertyMachine.numberStar
        );
    } else {
      popupManufactureResult
        .getComponent(PopupManufactureResult)
        .initFail(noGrowthItem.name);
    }
    this.node.getChildByName("PopupLayer").addChild(popupManufactureResult);
    popupManufactureResult.getComponent(PopupComponent).show();
  }

  closePopupManufactureResult() {
    if (this._popupManufactureResult) {
      this._popupManufactureResult.destroy();
      this._popupManufactureResult = null;
    }
  }

  showPopupInformationAmphitheater(amphitheaterName: string) {
    let popupInformationAmphitheater = instantiate(
      this.prefabPopupInformationAmphitheater
    );
    this.node
      .getChildByName("PopupLayer")
      .addChild(popupInformationAmphitheater);
    popupInformationAmphitheater
      .getComponent(PopupInformationAmphitheater)
      .init(amphitheaterName);
    popupInformationAmphitheater.getComponent(PopupComponent).show();
  }
  showPopupSupport() {
    if (this.node.getChildByName("PopupLayer").getChildByName("PopupSupport")) {
      if (this._popupFindTime && this._popupFindTime.active) return;
      if (this._popupWaiting && this._popupWaiting.active) return;
      if (this._popupSupport) {
        this._popupSupport.active = true;
      }
      return;
    }
    this.onLocked1s();
    this._popupSupport = instantiate(this.prefabPopupSupport);
    this.node.getChildByName("PopupLayer").addChild(this._popupSupport);
    this._popupSupport.getComponent(PopupComponent).show();
  }

  getPopupSupport(): Node {
    return this._popupSupport;
  }

  hidePopupSupport() {
    if (this._popupSupport) {
      this._popupSupport.active = false;
    }
  }

  setupSupportStatus(status: boolean) {
    const component = this.node.getChildByName("BotRight").children;
    if (status) {
      component.forEach((element) => {
        if (!element) return;
        if (element.name == "StopSupportButton") {
          element.active = true;
        } else {
          element.active = false;
        }
      });
      if (find("Canvas/BackGroundLayer/TransitScenePanel"))
        find("Canvas/BackGroundLayer/TransitScenePanel").active = false;
    } else {
      component.forEach((element) => {
        if (!element) return;
        if (element.name == "StopSupportButton") {
          element.active = false;
        } else {
          element.active = true;
        }
      });
      if (find("Canvas/BackGroundLayer/TransitScenePanel"))
        find("Canvas/BackGroundLayer/TransitScenePanel").active = true;
    }
  }

  onClickStopSupport() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    DataSender.sendReqStopSupport(
      GlobalData.me().getAidUser().userId,
      GlobalData.me().getSupportUser().userId
    );
  }

  showInformationEffect(name: string, value1: string, value2: string) {
    let effect = instantiate(this.informationEffectPrefab);
    effect.getComponent(InformationEffect).setInformation(name, value1, value2);
    this.node.addChild(effect);
  }
}
