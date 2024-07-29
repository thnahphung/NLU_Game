import {
  _decorator,
  Button,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  ProgressBar,
  RichText,
  Sprite,
  SpriteFrame,
} from "cc";
import { ResourceManager } from "../../Manager/ResourceManager";
import GlobalData from "../../Utils/GlobalData";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../Utils/Util";
import { UICanvas } from "../MainUI/UICanvas";
import DataSender from "../../Utils/DataSender";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import { InformationEffect } from "../Reward/InformationEffect";
const { ccclass, property } = _decorator;

@ccclass("PopupUpgradeMachine")
export class PopupUpgradeMachine extends AbsHandler {
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
  @property(RichText)
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
  @property(ProgressBar)
  private progressBar: ProgressBar = null;
  @property(Label)
  private progressLabel: Label = null;

  private noGrowthItemId: number = -1;
  private machine: proto.IMachine = null;
  private isLocked: boolean = false;

  private fixFee: number = 100;

  protected onLoad(): void {
    HandlerManager.me().registerHandler(this);
  }

  init(noGrowthItemId: number) {
    this.noGrowthItemId = noGrowthItemId;
    this.setupMachine(noGrowthItemId);
  }

  public setNoGothItemId(noGothItemId: number) {
    this.noGrowthItemId = noGothItemId;
  }

  public setMachine(machine: proto.IMachine) {
    this.machine = machine;
  }

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

  public setupMachine(noGrowthItemId: number) {
    let machine = GlobalData.me().getMachine(noGrowthItemId);
    if (!machine) return;
    this.machine = machine;
    this.noGrowthItemId = noGrowthItemId;
    this.machineName.string = Util.setColorString(
      machine.propertyMachine.numberStar,
      t("label_text." + machine.noGrowthItem.name.toLowerCase())
    );
    this.machineSprite.getComponent(Sprite).spriteFrame =
      ResourceManager.me().getSpriteFrame(machine.noGrowthItem.name);
    this.machineStar.forEach((star, index) => {
      star.active = index < machine.propertyMachine.numberStar;
    });
    this.durabelLabel.string = machine.propertyMachine.durable.toString();
    this.speedLabel.string = machine.propertyMachine.speed.toString();
    this.powerLabel.string = machine.propertyMachine.power.toString();
    this.valueLabel.string = machine.propertyMachine.value.toString();
    this.progressBar.progress = machine.propertyMachine.level / 100;
    this.progressLabel.string = `${machine.propertyMachine.level}/100`;
  }

  onClickFixButton() {
    if (this.isLocked) {
      return;
    }
    this.isLocked = true;
    this.scheduleOnce(() => {
      this.isLocked = false;
    }, 0.5);
    if (!this.machine) {
      UICanvas.me().showPopupMessage("Machine not found");
      return;
    }

    if (this.machine.propertyMachine.level >= 100) {
      UICanvas.me().showPopupMessage(t("label_text.mac_fix_status_max"));
      return;
    }

    if (GlobalData.me().getMainUser().gold < this.fixFee) {
      UICanvas.me().showPopupMessage(
        t("label_text.mac_fix_status_enough_gold")
      );
      return;
    }
    DataSender.sendReqFixMachine(this.machine.noGrowthItem.id);
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    packets.packet.forEach((packet) => {
      if (packet.resFixMachine) {
        this.handleResFixMachine(packet.resFixMachine);
      }
    });
  }

  private handleResFixMachine(resFixMachine: proto.IResFixMachine) {
    let status = resFixMachine.status;
    if (status === 400) {
      UICanvas.me().showPopupMessage("Machine not found");
      return;
    }
    if (status === 401) {
      UICanvas.me().showPopupMessage(t("label_text.mac_fix_status_max"));
      return;
    }
    if (status === 500) {
      UICanvas.me().showPopupMessage(t("label_text.mac_fix_status_error"));
      return;
    }
    if (status === 500) {
      UICanvas.me().showPopupMessage(t("label_text.mac_fix_status_error"));
      return;
    }
    if (status === 403) {
      UICanvas.me().showPopupMessage(t("label_text.mac_fix_status_fail"));
      return;
    }

    let machine = GlobalData.me().getMachine(this.noGrowthItemId);
    machine.propertyMachine.level = resFixMachine.level;
    GlobalData.me().updateMachine(machine);
    this.setupMachine(this.noGrowthItemId);

    let gold = resFixMachine.gold;
    GlobalData.me().getMainUser().gold = gold;
    UICanvas.me().loadGold();

    UICanvas.me().showInformationEffect(
      t("label_text.mac_energy"),
      `${resFixMachine.level}`,
      `+20`
    );
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
