import { _decorator, Component, Label, Node, Sprite } from "cc";
import { ResourceManager } from "../../Manager/ResourceManager";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import DataSender from "../../Utils/DataSender";
import { MachinePart } from "../Machine/MachinePart";
import { UICanvas } from "../MainUI/UICanvas";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
const { ccclass, property } = _decorator;

@ccclass("PopupManufactureMachine")
export class PopupManufactureMachine extends AbsHandler {
  @property(Node)
  private scrollViewManufactureMachine: Node = null;
  @property(Label)
  private machineName: Label = null;
  @property(Node)
  private machineSprite: Node = null;
  @property(Label)
  private durabelLabel: Label = null;
  @property(Label)
  private speedLabel: Label = null;
  @property(Label)
  private powerLabel: Label = null;
  @property(Label)
  private valueLabel: Label = null;
  @property(Label)
  private descriptionLabel: Label = null;
  @property(Node)
  private machinePartPanel: Node = null;
  @property(Node)
  private machineStar: Node[] = [];
  @property(Node)
  private machinePart: Node[] = [];

  private noGothItem: proto.INoGrowthItem;
  private propertyMachine: proto.IPropertyMachine;
  private machine: proto.IMachine;
  init(
    noGrowthItem: proto.INoGrowthItem,
    propertyMachine: proto.IPropertyMachine
  ) {
    this.setUpMachine(noGrowthItem, propertyMachine);
    if (noGrowthItem && noGrowthItem.id > 0)
      DataSender.sendReqLoadFormulaOfMachine(noGrowthItem);
  }

  onLoad() {
    HandlerManager.me().registerHandler(this);
  }

  onStart(): void {
    DataSender.sendReqLoadAllMachineFormula();
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
    this.descriptionLabel.string = noGothItem.description;
  }

  public getScrollViewMachineManufactureMachine() {
    return this.scrollViewManufactureMachine;
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    packets.packet.forEach((packet) => {
      console.log(packet);
      if (packet.resLoadFormulasOfMachine) {
        const machine = packet.resLoadFormulasOfMachine.Machine;
        if (!machine) {
          return;
        } else {
          this.machine = machine;
        }
        const formulas = machine.FormulaMachines;
        this.machinePart.forEach((part, index) => {
          let namePart = formulas[index].noGrowthItem.name;
          if (namePart)
            part.getChildByName("Sprite").getComponent(Sprite).spriteFrame =
              ResourceManager.me().getSpriteFrame(namePart);
          part.getChildByName("Quantity").getComponent(Label).string =
            formulas[index].userQuantity +
            "/" +
            formulas[index].quantity.toString();
        });
      }

      if (packet.resLoadAllMachineFormula) {
        const machinePartPanels = this.machinePartPanel.children;
        packet.resLoadAllMachineFormula.noGrowthItems.forEach((item, index) => {
          machinePartPanels[index].getComponent(MachinePart).init(item);
        });
      }

      if (packet.resManufactureMachine) {
        console.log("Manufacture machine: ", packet.resManufactureMachine);
        const status = packet.resManufactureMachine.status;
        let propertyMachine = packet.resManufactureMachine.PropertyMachine;
        if (status == 400) {
          UICanvas.me().showPopupMessage(
            t("label_text.mac_manufacture_fail_400")
          );
        }
        if (status == 401) {
          UICanvas.me().showPopupMessage(
            t("label_text.mac_manufacture_fail_401")
          );
        }
        if (status == 201) {
          UICanvas.me().showPopupManufactureResult(
            0,
            0,
            0,
            0,
            this.noGothItem.name,
            status
          );
        }
        if (status == 200) {
          UICanvas.me().showPopupManufactureResult(
            propertyMachine.speed,
            propertyMachine.power,
            propertyMachine.value,
            propertyMachine.durable,
            this.noGothItem.name,
            status
          );

          this.setUpMachine(this.noGothItem, propertyMachine);
        }
      }
    });
  }

  onClickManufacture() {
    if (this.machine) {
      DataSender.sendReqManufactureMachine(this.machine);
      console.log("Manufacture machine: ", this.machine);
    }
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
