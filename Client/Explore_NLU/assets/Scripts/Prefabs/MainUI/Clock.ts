import { _decorator, Component, Node, Sprite, SpriteFrame } from "cc";
import GlobalData from "../../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("Clock")
export class Clock extends Component {
  private currentTimeOfDay: number = 0;
  @property([SpriteFrame]) clockSpriteFrames: SpriteFrame[] = [];

  start() {
    this.currentTimeOfDay = GlobalData.me()?.getGameState()?.timesOfDay;
    this.node.getComponent(Sprite).spriteFrame =
      this.clockSpriteFrames[this.calculateTime(this.currentTimeOfDay) - 1];
  }

  update(deltaTime: number) {
    if (this.currentTimeOfDay != GlobalData.me()?.getGameState()?.timesOfDay) {
      this.currentTimeOfDay = GlobalData.me().getGameState().timesOfDay;
      this.node.getComponent(Sprite).spriteFrame =
        this.clockSpriteFrames[this.calculateTime(this.currentTimeOfDay) - 1];
    }
  }

  calculateTime(time: number) {
    return time > 12 ? time - 12 : time;
  }
}
