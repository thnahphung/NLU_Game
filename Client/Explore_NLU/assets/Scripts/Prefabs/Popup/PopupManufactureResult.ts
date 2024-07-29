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
  @property(Node)
  private machineStar: Node = null;
  @property(Node)
  private stars: Node[] = [];
  initSuccess(
    speed: number,
    power: number,
    value: number,
    durability: number,
    machineSprite: string,
    numberStar: number
  ) {
    this.title.string = t("label_text.mac_manufacture_success");
    this.speedLabel.string = speed.toString();
    this.powerLabel.string = power.toString();
    this.valueLabel.string = value.toString();
    this.durabilityLabel.string = durability.toString();
    this.machineSprite.getComponent(Sprite).spriteFrame =
      ResourceManager.me().getSpriteFrame(machineSprite);
    this.stars.forEach((star, index) => {
      star.active = index < numberStar;
    });
    this.machineStar.active = true;
  }

  initFail(machineSprite: string) {
    this.setUpFail();
    this.machineSprite.getComponent(Sprite).spriteFrame =
      ResourceManager.me().getSpriteFrame(machineSprite);
  }

  start() {}

  setUpFail() {
    this.title.string = t("label_text.mac_manufacture_fail");
    this.speedLabel.string = "+0";
    this.powerLabel.string = "+0";
    this.valueLabel.string = "+0";
    this.durabilityLabel.string = "+0";
    this.machineSprite.getComponent(Sprite).grayscale = true;
    this.machineStar.active = false;
  }

  onClickContinue() {
    this.node.destroy();
  }
}
