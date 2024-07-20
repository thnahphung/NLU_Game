import { _decorator, Component, Label, Node, Sprite } from "cc";
import { ResourceManager } from "../../Manager/ResourceManager";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import DataSender from "../../Utils/DataSender";
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
  private machineStar: Node[] = [];
  @property(Node)
  private machinePart: Node[] = [];

  private noGothItem: proto.INoGrowthItem;
  private propertyMachine: proto.IPropertyMachine;

  init(
    noGrowthItem: proto.INoGrowthItem,
    propertyMachine: proto.IPropertyMachine
  ) {
    this.setUpMachine(noGrowthItem, propertyMachine);
    if (noGrowthItem) DataSender.sendReqLoadPartOfMachine(noGrowthItem);
  }

  onLoad() {
    HandlerManager.me().registerHandler(this);
  }

  start() {}

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
      if (packet.resLoadPartsOfMachine) {
        this.machinePart.forEach((part, index) => {
          let namePart =
            packet.resLoadPartsOfMachine?.noGrowthItems[index]?.name;
          if (namePart)
            part.getComponent(Sprite).spriteFrame =
              ResourceManager.me().getMachinePartFrame(
                packet.resLoadPartsOfMachine.noGrowthItems[index].name
              );
        });
      }
    });
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
