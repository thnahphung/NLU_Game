import {
  _decorator,
  Color,
  Component,
  Node,
  Sprite,
  tween,
  UIOpacity,
} from "cc";
import GlobalData from "../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("LightManager")
export class LightManager extends Component {
  private currentTimeOfDay: number = 0;
  private uiOpacity: UIOpacity;
  start() {
    this.uiOpacity = this.node.getComponent(UIOpacity);
    this.currentTimeOfDay = GlobalData.me()?.getGameState().timesOfDay;
    this.changeBrightness();
  }

  update(deltaTime: number) {
    if (this.currentTimeOfDay == GlobalData.me()?.getGameState().timesOfDay)
      return;
    this.currentTimeOfDay = GlobalData.me()?.getGameState().timesOfDay;
    this.changeBrightness();
  }

  changeBrightness() {
    if (this.currentTimeOfDay >= 7 && this.currentTimeOfDay <= 15) {
      this.smoothChangeBrightness(0);
    } else if (this.currentTimeOfDay >= 16 && this.currentTimeOfDay <= 17) {
      this.smoothChangeBrightness(70);
    } else if (this.currentTimeOfDay >= 18 && this.currentTimeOfDay <= 19) {
      this.smoothChangeBrightness(140);
    } else if (this.currentTimeOfDay >= 20 && this.currentTimeOfDay <= 21) {
      this.smoothChangeBrightness(200);
    } else if (this.currentTimeOfDay >= 22 && this.currentTimeOfDay <= 24) {
      this.smoothChangeBrightness(255);
    } else if (this.currentTimeOfDay >= 1 && this.currentTimeOfDay <= 2) {
      this.smoothChangeBrightness(200);
    } else if (this.currentTimeOfDay >= 3 && this.currentTimeOfDay <= 4) {
      this.smoothChangeBrightness(140);
    } else if (this.currentTimeOfDay >= 5 && this.currentTimeOfDay <= 6) {
      this.smoothChangeBrightness(60);
    }
  }

  smoothChangeBrightness(alpha: number) {
    tween(this.uiOpacity)
      .to(5, { opacity: alpha }, { easing: "smooth" })
      .start();
  }
}
