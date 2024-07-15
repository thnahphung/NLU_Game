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
    this.currentTimeOfDay = GlobalData.me()?.getGameState()?.timesOfDay;
    this.changeBrightness(false);
  }

  update(deltaTime: number) {
    if (this.currentTimeOfDay == GlobalData.me()?.getGameState()?.timesOfDay)
      return;
    this.currentTimeOfDay = GlobalData.me()?.getGameState()?.timesOfDay;
    this.changeBrightness();
  }

  changeBrightness(isSmooth: boolean = true) {
    let opacity = 0;
    if (this.currentTimeOfDay >= 7 && this.currentTimeOfDay <= 15) {
      opacity = 0;
    } else if (this.currentTimeOfDay >= 16 && this.currentTimeOfDay <= 17) {
      opacity = 70;
    } else if (this.currentTimeOfDay >= 18 && this.currentTimeOfDay <= 19) {
      opacity = 140;
    } else if (this.currentTimeOfDay >= 20 && this.currentTimeOfDay <= 21) {
      opacity = 200;
    } else if (this.currentTimeOfDay >= 22 && this.currentTimeOfDay <= 24) {
      opacity = 255;
    } else if (this.currentTimeOfDay >= 1 && this.currentTimeOfDay <= 2) {
      opacity = 200;
    } else if (this.currentTimeOfDay >= 3 && this.currentTimeOfDay <= 4) {
      opacity = 140;
    } else if (this.currentTimeOfDay >= 5 && this.currentTimeOfDay <= 6) {
      opacity = 60;
    }
    if (
      GlobalData.me()?.getGameState()?.currentWeather ==
      proto.GameState.Weather.RAINY
    ) {
      opacity += 50;
    }
    this.smoothChangeBrightness(opacity, isSmooth);
  }

  smoothChangeBrightness(alpha: number, isSmooth: boolean = true) {
    if (!isSmooth) {
      this.uiOpacity.opacity = alpha;
      return;
    }
    tween(this.uiOpacity)
      .to(5, { opacity: alpha }, { easing: "smooth" })
      .start();
  }
}
