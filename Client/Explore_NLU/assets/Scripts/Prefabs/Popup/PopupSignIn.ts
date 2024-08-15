import {
  _decorator,
  Component,
  EditBox,
  EventKeyboard,
  find,
  input,
  Input,
  KeyCode,
  Prefab,
} from "cc";
import DataSender from "../../Utils/DataSender";
import { UICanvas } from "../MainUI/UICanvas";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("PopupSignIn")
export class PopupSignIn extends Component {
  // Khai bao login
  @property(EditBox)
  public usernameLogin: EditBox = null!;

  @property(EditBox)
  public passwordLogin: EditBox = null!;

  // Khai bao popupNotify
  @property(Prefab)
  public popupNotifySimple: Prefab = null!;

  start() {
    this.passwordLogin.node.on(
      "editing-did-ended",
      () => {
        input.on(Input.EventType.KEY_DOWN, this.onEnterLogin, this);
      },
      this
    );
  }

  onClickLoginReq() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    //Check không để trống username hoặc password
    if (this.usernameLogin.string === "" || this.passwordLogin.string === "") {
      UICanvas.me().showPopupMessage(t("label_text.login_failed_401"));
      return;
    }
    //Xử lý khi click login
    var popupLoadingNode = find("Canvas/LoadingPrefab");
    if (popupLoadingNode) {
      popupLoadingNode.active = true;
    }
    DataSender.sendReqSignIn(
      this.usernameLogin.string,
      this.passwordLogin.string
    );
  }

  onClickSignInGoogle() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    DataSender.sendReqLoginGoogle();
  }

  // lắng nghe nhấn nút enter trên bàn phím
  onEnterLogin(event: EventKeyboard) {
    console.log("onEnterLogin", event.keyCode);
    if (event.keyCode === KeyCode.ENTER) {
      this.onClickLoginReq();
    }
  }
}
