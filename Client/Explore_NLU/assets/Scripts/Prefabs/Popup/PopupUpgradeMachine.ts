import {
  _decorator,
  Button,
  Component,
  Label,
  Node,
  Sprite,
  SpriteFrame,
} from "cc";
import { ResourceManager } from "../../Manager/ResourceManager";
const { ccclass, property } = _decorator;

@ccclass("PopupUpgradeMachine")
export class PopupUpgradeMachine extends Component {
  @property(Button)
  private specButton: Button = null;
  @property(Button)
  private riseStarButton: Button = null;
  @property(SpriteFrame)
  private buttonNormal: SpriteFrame = null;
  @property(SpriteFrame)
  private buttonPressed: SpriteFrame = null;
  @property(Node)
  private specContent: Node = null;
  @property(Node)
  private riseStarContent: Node = null;
  @property(Node)
  private scrollViewUpgradeMachine: Node = null;
  @property(Label)
  private machineName: Label = null;
  @property(Node)
  private machineSprite: Node = null;
  @property(Node)
  private machineStar: Node[] = [];
  @property(Label)
  private durabelLabel: Label = null;
  @property(Label)
  private speedLabel: Label = null;
  @property(Label)
  private powerLabel: Label = null;
  @property(Label)
  private valueLabel: Label = null;

  private noGothItem: proto.INoGrowthItem;
  private propertyMachine: proto.IPropertyMachine;

  init(
    noGrowthItem: proto.INoGrowthItem,
    propertyMachine: proto.IPropertyMachine
  ) {
    this.setUpMachine(noGrowthItem, propertyMachine);
  }

  start() {}

  onSpecButtonClicked() {
    this.specContent.active = true;
    this.riseStarContent.active = false;
    this.specButton.normalSprite = this.buttonPressed;
    this.specButton.hoverSprite = this.buttonPressed;
    this.riseStarButton.normalSprite = this.buttonNormal;
  }

  onRiseStarButtonClicked() {
    this.specContent.active = false;
    this.riseStarContent.active = true;
    this.specButton.normalSprite = this.buttonNormal;
    this.riseStarButton.hoverSprite = this.buttonPressed;
    this.riseStarButton.normalSprite = this.buttonPressed;
  }

  public getScrollViewUpgradeMachine() {
    return this.scrollViewUpgradeMachine;
  }

  public setUpMachine(
    noGothItem: proto.INoGrowthItem,
    propertyMachine: proto.IPropertyMachine
  ) {
    this.noGothItem = noGothItem;
    this.propertyMachine = propertyMachine;
    this.machineName.string = noGothItem.name;
    this.machineSprite.getComponent(Sprite).spriteFrame =
      ResourceManager.me().getSpriteFrame(noGothItem.name);
    this.machineStar.forEach((star, index) => {
      star.active = index < propertyMachine.numberStar;
    });
    this.durabelLabel.string = propertyMachine.durable.toString();
    this.speedLabel.string = propertyMachine.speed.toString();
    this.powerLabel.string = propertyMachine.power.toString();
    this.valueLabel.string = propertyMachine.value.toString();
  }
}
