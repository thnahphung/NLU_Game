import {
  _decorator,
  Component,
  Label,
  Node,
  RichText,
  Sprite,
  WebView,
} from "cc";
import { ResourceManager } from "../../Manager/ResourceManager";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../Utils/Util";
import { PopupComponent } from "../../Controller/PopupComponent";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { nlu360Config } from "../../Config/Config";

const { ccclass, property } = _decorator;

@ccclass("PopupInformationAmphitheater")
export class PopupInformationAmphitheater extends Component {
  @property(Node) private blackBackground: Node;
  @property(Label) private title: Label;
  @property(WebView) private webView: WebView;
  private url: string =
    nlu360Config.host + ":" + nlu360Config.port + nlu360Config.path + "/";

  protected start(): void {
    this.blackBackground.on(Node.EventType.TOUCH_START, () => {
      this.onClickExit();
    });
  }

  init(amphitheaterName: string) {
    this.title.string = t(
      "label_text.nlu_360_title_" +
        Util.convertDashToUnderscore(amphitheaterName)
    );
    this.webView.url = this.url + amphitheaterName + ".jsp";
    console.log(this.webView.url);
  }

  onClickExit() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }
}
