import { _decorator, Component, Node } from "cc";
import GlobalData from "../../Utils/GlobalData";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { PopupComponent } from "../../Controller/PopupComponent";
const { ccclass, property } = _decorator;

@ccclass("PopupGuidance")
export class PopupGuidance extends Component {
  @property(Node)
  private scrollViewGuidance: Node = null;
  start() {
    const code = GlobalData.me().getMainUser()?.character?.code;
    if (!code) return;
    // chỉ active những node con của scrollViewGuidance có chứa code
    for (let i = 0; i < this.scrollViewGuidance.children.length; i++) {
      const node = this.scrollViewGuidance.children[i];
      if (node.name.includes(code)) {
        node.active = true;
      } else {
        node.active = false;
      }
    }
  }
  private onClickExit() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }
}
