import { _decorator, Component, instantiate, Node, Prefab } from "cc";
import AbsScene from "./AbsScene";
import DataSender from "../Utils/DataSender";
import GlobalData from "../Utils/GlobalData";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { PopupFactory } from "../Prefabs/Popup/PopupFactory";
import { ItemMachine } from "../Prefabs/Popup/ItemPopup/ItemMachine";
import { PopupUpgradeMachine } from "../Prefabs/Popup/PopupUpgradeMachine";
import { PopupManufactureMachine } from "../Prefabs/Popup/PopupManufactureMachine";
const { ccclass, property } = _decorator;

@ccclass("MehanicalScene")
export class MehanicalScene extends AbsScene {
  @property(Prefab) private itemMachine: Prefab = null;

  private popupManufactureMachineComponent: PopupManufactureMachine = null;
  private popupUpgradeMachineComponent: PopupUpgradeMachine = null;
  private scrollViewManufactureMachines: Node = null;
  private scrollViewUpgradeMachine: Node = null;
  protected onLoad(): void {
    super.onLoad();
    this.node.on(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, () => {
      if (this.node.active) {
        this.loadMachines();
      }
    });
  }

  protected start(): void {
    let popupFactory = UICanvas.me().getPopupFactory();
    let popupUpgradeMachine = popupFactory
      .getComponent(PopupFactory)
      .getPopupUpgradeMachine();
    let popupManufactureMachine = popupFactory
      .getComponent(PopupFactory)
      .getPopupManufactureMachine();
    this.popupManufactureMachineComponent =
      popupManufactureMachine.getComponent(PopupManufactureMachine);
    this.popupUpgradeMachineComponent =
      popupUpgradeMachine.getComponent(PopupUpgradeMachine);

    this.scrollViewManufactureMachines =
      this.popupManufactureMachineComponent.getScrollViewMachineManufactureMachine();
    this.scrollViewUpgradeMachine =
      this.popupUpgradeMachineComponent.getScrollViewUpgradeMachine();
    this.loadMachines();
    super.start();
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    packets.packet.forEach((packet) => {
      if (packet.resLoadMachines) {
        this.onLoadMachine(packet.resLoadMachines);
      }
    });
  }

  onLoadMachine(resLoadMachines: proto.IResLoadMachines) {
    this.scrollViewUpgradeMachine.removeAllChildren();
    this.scrollViewManufactureMachines.removeAllChildren();

    const noGrowthItem0 =
      resLoadMachines.noGrowthItem[0].name == "saw_machine"
        ? resLoadMachines.noGrowthItem[1]
        : resLoadMachines.noGrowthItem[0];
    const propertyMachines = resLoadMachines.propertyMachines;
    let machineNoActive1 = null;
    let machineNoActive2 = null;
    resLoadMachines.noGrowthItem.forEach((noGrowthItem) => {
      const propertyMachine = propertyMachines.find(
        (propertyMachine) => propertyMachine.noGrowthItemId === noGrowthItem.id
      );
      if (propertyMachine) {
        let itemMachineUpgrade = instantiate(this.itemMachine);
        let itemMachineUpgradeComponent =
          itemMachineUpgrade.getComponent(ItemMachine);
        itemMachineUpgradeComponent.setMachineItemId(noGrowthItem.id);
        itemMachineUpgradeComponent.setTypeItem(0);
        if (noGrowthItem.name != "saw_machine") {
          this.scrollViewUpgradeMachine.addChild(itemMachineUpgrade);
        } else {
          machineNoActive1 = itemMachineUpgrade;
        }
        let itemMachineManufacture = instantiate(this.itemMachine);
        let itemMachineManufactureComponent =
          itemMachineManufacture.getComponent(ItemMachine);
        itemMachineManufactureComponent.setMachineItemId(noGrowthItem.id);
        itemMachineManufactureComponent.setTypeItem(1);
        if (noGrowthItem.name != "saw_machine") {
          this.scrollViewManufactureMachines.addChild(itemMachineManufacture);
        } else {
          machineNoActive2 = itemMachineManufacture;
        }
        const machine = new proto.Machine();
        machine.noGrowthItem = noGrowthItem;
        machine.propertyMachine = propertyMachine;
        GlobalData.me().addMachine(machine);
      }
    });
    if (machineNoActive1) {
      this.scrollViewUpgradeMachine.addChild(machineNoActive1);
    }
    if (machineNoActive2) {
      this.scrollViewManufactureMachines.addChild(machineNoActive2);
    }
    this.setupFirstMachine(noGrowthItem0.id);
  }

  private loadMachines() {
    DataSender.sendLoadMachines(GlobalData.me().getArea().areaId);
  }

  private setupFirstMachine(noGrowthItemId: number) {
    this.popupUpgradeMachineComponent.init(noGrowthItemId);
    this.popupUpgradeMachineComponent.setMachine(
      GlobalData.me().getMachine(noGrowthItemId)
    );
    this.scrollViewUpgradeMachine.children[0]
      .getComponent(ItemMachine)
      .setFocus(true);

    this.popupManufactureMachineComponent.setNoGothItemId(noGrowthItemId);
    this.popupManufactureMachineComponent.setMachine(
      GlobalData.me().getMachine(noGrowthItemId)
    );
    this.scrollViewManufactureMachines.children[0]
      .getComponent(ItemMachine)
      .setFocus(true);
  }
}
