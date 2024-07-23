import { _decorator, Component, Label, Node, Sprite } from "cc";
import { ResourceManager } from "../../Manager/ResourceManager";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
const { ccclass, property } = _decorator;

@ccclass("PopupManufactureResult")
export class PopupManufactureResult extends Component {
  @property(Label)
  private title: Label = null;
  @property(Label)
  private speedLabel: Label = null;
  @property(Label)
  private powerLabel: Label = null;
  @property(Label)
  private valueLabel: Label = null;
  @property(Label)
  private durabilityLabel: Label = null;
  @property(Node)
  private machineSprite: Node = null;
  initSuccess(
    speed: number,
    power: number,
    value: number,
    durability: number,
    machineSprite: string
  ) {
    this.speedLabel.string = speed.toString();
    this.powerLabel.string = power.toString();
    this.valueLabel.string = value.toString();
    this.durabilityLabel.string = durability.toString();
    this.machineSprite.getComponent(Sprite).spriteFrame =
      ResourceManager.me().getSpriteFrame(machineSprite);
  }

  initFail(machineSprite: string) {
    this.machineSprite.getComponent(Sprite).spriteFrame =
      ResourceManager.me().getSpriteFrame(machineSprite);
  }

  start() {}

  setUpFail() {
    this.title.string = t("label_text.mac_manufacture_fail");
    this.speedLabel.node.active = false;
    this.powerLabel.node.active = false;
    this.valueLabel.node.active = false;
    this.durabilityLabel.node.active = false;
    this.machineSprite.getComponent(Sprite).grayscale = true;
  }

  onClickContinue() {
    this.node.destroy();
  }
}
