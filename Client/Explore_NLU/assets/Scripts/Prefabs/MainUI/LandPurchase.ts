import { _decorator, Component, find, Node } from "cc";
import DataSender from "../../Utils/DataSender";
import GlobalData from "../../Utils/GlobalData";
import { Animal } from "../Animal/Animal";
import { AnimalHusbandryScene } from "../../Scenes/AnimalHusbandryScene";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("LandPurchase")
export class LandPurchase extends Component {
  private animalHusbandryScene: AnimalHusbandryScene;
  start() {
    this.animalHusbandryScene =
      find("Canvas").getComponent(AnimalHusbandryScene);
  }

  showLandPurchaseLayer() {
    this.node.children.forEach((child) => {
      if (
        !this.animalHusbandryScene.isContainCageNode(
          child.position.x,
          child.position.y
        )
      ) {
        child.active = true;
      }
    });
  }

  hideLandPurchaseLayer() {
    this.node.children.forEach((child) => {
      child.active = false;
    });
  }

  onClickBuyCage(event: Event, customEventData: string) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    DataSender.sendReqBuyCage(
      GlobalData.me()?.getPickCageItem().id,
      parseInt(customEventData)
    );
    this.hideLandPurchaseLayer();
  }
}
