import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Machine")
export class Machine extends Component {
  private noGrowthItem: proto.INoGrowthItem;
  private propertyMachine: proto.IPropertyMachine;

  init(
    noGrowthItem: proto.INoGrowthItem,
    propertyMachine: proto.IPropertyMachine
  ) {
    this.noGrowthItem = noGrowthItem;
    this.propertyMachine = propertyMachine;
  }

  getSpeed(): number {
    return this.propertyMachine.speed;
  }
}
