import { _decorator, Component, instantiate, Node, Prefab } from "cc";
import AbsScene from "./AbsScene";
import DataSender from "../Utils/DataSender";
import GlobalData from "../Utils/GlobalData";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { PopupFactory } from "../Prefabs/Popup/PopupFactory";
import { ItemMachine } from "../Prefabs/Popup/ItemPopup/ItemMachine";
import { PopupUpgradeMachine } from "../Prefabs/Popup/PopupUpgradeMachine";
const { ccclass, property } = _decorator;

@ccclass("MehanicalScene")
export class MehanicalScene extends AbsScene {
  @property(Prefab) private itemMachine: Prefab = null;
  protected onLoad(): void {
    super.onLoad();
    this.loadMachines();
  }

  start() {
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
    console.log("Load machines: ", resLoadMachines);
    let popupFactory = UICanvas.me().getPopupFactory();
    let popupUpgradeMachine = popupFactory
      .getComponent(PopupFactory)
      .getPopupUpgradeMachine();
    let scrollViewMachines = popupUpgradeMachine
      .getComponent(PopupUpgradeMachine)
      .getScrollViewUpgradeMachine();

    scrollViewMachines.removeAllChildren();
    const noGrowthItem0 = resLoadMachines.noGrowthItem[0];
    let propertyMachine0 = null;
    const propertyMachines = resLoadMachines.propertyMachines;
    resLoadMachines.noGrowthItem.forEach((noGrowthItem) => {
      const machine = propertyMachines.find(
        (propertyMachine) => propertyMachine.noGrowthItemId === noGrowthItem.id
      );
      if (machine) {
        let itemMachine = instantiate(this.itemMachine);
        itemMachine.getComponent(ItemMachine).init(noGrowthItem, machine);
        scrollViewMachines.addChild(itemMachine);
      }
      if (noGrowthItem.id === noGrowthItem0.id) {
        propertyMachine0 = machine;
      }
    });
    popupUpgradeMachine
      .getComponent(PopupUpgradeMachine)
      .init(noGrowthItem0, propertyMachine0);
  }

  private loadMachines() {
    DataSender.sendLoadMachines(GlobalData.me().getArea().areaId);
  }
}
