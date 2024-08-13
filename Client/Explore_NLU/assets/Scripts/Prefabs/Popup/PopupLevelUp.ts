import { _decorator, Component, Node } from "cc";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("PopupLevelUp")
export class PopupLevelUp extends Component {
  start() {
    // Detroy the node after 2 seconds
    AudioManger.me().playOneShot(AUDIOS.LEVEL_UP_EFFECT);
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 2);
  }
}
