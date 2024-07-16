import { _decorator, Animation, Component, Node, Sprite, UIOpacity } from "cc";
import GlobalData from "../../Utils/GlobalData";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Weather")
export class Weather extends Component {
  private currentWeather: proto.GameState.Weather =
    proto.GameState.Weather.SUNNY;
  private animation: Animation;
  private uiOpacity: UIOpacity;
  start() {
    this.animation = this.node.getComponent(Animation);
    this.uiOpacity = this.node.getComponent(UIOpacity);
    this.updateWeather();
  }

  update(deltaTime: number) {
    this.updateWeather();
  }

  updateWeather() {
    if (GlobalData.me()?.getGameState() == null) return;
    if (
      this.currentWeather != GlobalData.me()?.getGameState()?.currentWeather
    ) {
      this.currentWeather = GlobalData.me()?.getGameState()?.currentWeather;
      if (this.currentWeather == proto.GameState.Weather.SUNNY) {
        this.animation.stop();
        this.uiOpacity.opacity = 0;
        if (AudioManger.me().getCurrentMusic() != AUDIOS.BACKGROUND) {
          AudioManger.me().play(AUDIOS.BACKGROUND, true);
        }
      } else {
        this.uiOpacity.opacity = 255;
        this.animation.play();
        if (AudioManger.me().getCurrentMusic() != AUDIOS.RAIN) {
          AudioManger.me().play(AUDIOS.RAIN, true);
        }
      }
    }
  }
}
