import { _decorator, Component, Node } from "cc";
import DataSender from "../../Utils/DataSender";
import GlobalData from "../../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("LandPurchase")
export class LandPurchase extends Component {
  start() {}

  update(deltaTime: number) {}

  showLandPurchaseLayer() {
    this.node.children.forEach((child) => {
      child.active = true;
    });
  }

  hideLandPurchaseLayer() {
    this.node.children.forEach((child) => {
      child.active = false;
    });
  }

  onClickBuyCage(event: Event, customEventData: string) {
    console.log("Buy cage", customEventData);
    DataSender.sendReqBuyCage(
      GlobalData.me()?.getPickCageItem().id,
      parseInt(customEventData)
    );
    this.hideLandPurchaseLayer();
  }
}
