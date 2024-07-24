import { _decorator, instantiate, Node, Prefab, sys, Toggle } from "cc";
import AbsScene from "./AbsScene";
import { PopupComponent } from "../Controller/PopupComponent";
import DataSender from "../Utils/DataSender";
import { StorageManager } from "../Manager/StorageManger";
import GlobalData from "../Utils/GlobalData";
import { AUDIOS, LOCAL_STORAGE, POPUP, SCENES } from "../Utils/Const";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { t } from "../../../extensions/i18n/assets/LanguageData";
import { AudioManger } from "../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("AuthenScene")
export class AuthenScene extends AbsScene {
  @property(Node)
  private popupGeneral: Node = null;

  @property(Node)
  private popupSignIn: Node = null;

  @property(Node)
  private popupSignUp: Node = null;

  @property(Toggle)
  public rememberMe: Toggle = null!;
  // Khai bao transitScreen
  @property(Prefab)
  public transitScreen: Prefab = null;
  // Khai bao transitScreen
  @property(Prefab)
  public popupLoading: Prefab = null;
  // Khai bao setting
  @property(Prefab)
  public popupSetting: Prefab = null;
  // Khai bao forget password
  @property(Node)
  public popupForgetPassword: Node = null;

  public popupLoadingNode: Node = null;

  protected onLoad(): void {
    super.onLoad();

    this.popupLoadingNode = instantiate(this.popupLoading);
    this.popupLoadingNode.active = false;
    this.node.addChild(this.popupLoadingNode);
    let username = StorageManager.me().getItem(LOCAL_STORAGE.USERNAME);
    let token = StorageManager.me().getItem(LOCAL_STORAGE.TOKEN);
    let autoLogin = StorageManager.me().getItem(LOCAL_STORAGE.AUTO_LOGIN);
    if (autoLogin == "true" && token) {
      this.popupGeneral.active = false;
      DataSender.sendReqRelogin(username, token);
      this.popupLoadingNode.active = true;
    }
  }

  protected start(): void {
    AudioManger.me().play(AUDIOS.BACKGROUND, true);
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    this.popupLoadingNode.active = false;
    super.onMessageHandler(packets);
    packets.packet.forEach((packet) => {
      if (packet.resLogin) {
        this.onLoginMsgHandler(packet.resLogin);
      }
      if (packet.resRegister) {
        this.onRegisterMsgHandler(packet.resRegister);
      }
      if (packet.resEmailForgetPassword) {
        this.onCheckEmailForgetHandler(packet.resEmailForgetPassword);
      }
      if (packet.resRecoverPassword) {
        this.onRecoverPasswordHandler(packet.resRecoverPassword);
      }
      if (packet.resLoginGoogle) {
        this.onLoginGoogleHandler(packet.resLoginGoogle);
      }
    });
  }

  onLoginGoogleHandler(resLoginGoogle: proto.IResLoginGoogle) {
    sys.openURL(resLoginGoogle.url);
  }

  onLoginMsgHandler(resLogin: proto.IResLogin) {
    if (resLogin.status !== 200) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
    }
    if (resLogin.status === 400) {
      UICanvas.me().showPopupMessage(t("label_text.login_failed_400"));
      return;
    }
    if (resLogin.status === 401) {
      console.log("Fail relogin!");
      this.popupGeneral.active = true;
      return;
    }
    if (resLogin.status === 402) {
      UICanvas.me().showPopupMessage(t("label_text.login_failed_402"));
      return;
    }
    if (resLogin.status === 403) {
      UICanvas.me().showPopupMessage(t("label_text.login_failed_403"));
      return;
    }
    if (resLogin.status === 500) {
      UICanvas.me().showPopupMessage(t("label_text.login_failed_500"));
      return;
    }
    if (resLogin.status === 200) {
      //RememberLogin
      StorageManager.me().saveItem(
        LOCAL_STORAGE.USERNAME,
        resLogin.user.username
      );
      StorageManager.me().saveItem(
        LOCAL_STORAGE.AUTO_LOGIN,
        this.rememberMe.isChecked
      );
      StorageManager.me().saveItem(LOCAL_STORAGE.TOKEN, resLogin.token);
      GlobalData.me().setMainUser(resLogin.user);
      GlobalData.me().setIsUserOffline(false);
      const userProto = resLogin.user;
      const hasCharacter = userProto.hasCharacter;
      if (hasCharacter == 0) UICanvas.me().transitScene(SCENES.PICK_CHARACTER);
    }
  }

  onRegisterMsgHandler(resRegister: proto.IResRegister) {
    if (resRegister.status !== 200) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
    }
    if (resRegister.status === 400) {
      UICanvas.me().showPopupMessage(t("label_text.register_failed_400"));
    } else if (resRegister.status === 401) {
      UICanvas.me().showPopupMessage(t("label_text.register_failed_401"));
    } else if (resRegister.status === 403) {
      UICanvas.me().showPopupMessage(t("label_text.register_failed_403"));
    } else if (resRegister.status === 402) {
      UICanvas.me().showPopupMessage(t("label_text.register_failed_402"));
    } else if (resRegister.status === 500) {
      UICanvas.me().showPopupMessage(t("label_text.server_error"));
    } else if (resRegister.status === 200) {
      UICanvas.me().showPopupMessage(t("label_text.register_success_200"));
    }
  }

  onCheckEmailForgetHandler(
    resEmailForgetPassword: proto.IResEmailForgetPassword
  ) {
    if (resEmailForgetPassword.status === 400) {
      UICanvas.me().showPopupMessage(
        t("label_text.forget_password_failed_400")
      );
    } else {
      this.popupForgetPassword.getChildByName("Form1").active = false;
      this.popupForgetPassword.getChildByName("Form2").active = true;
    }
  }

  onRecoverPasswordHandler(resRecoverPassword: proto.IResRecoverPassword) {
    if (resRecoverPassword.status === 402) {
      UICanvas.me().showPopupMessage(
        t("label_text.recover_password_failed_token_402")
      );
    } else if (resRecoverPassword.status === 403) {
      UICanvas.me().showPopupMessage(
        t("label_text.recover_password_failed_time_403")
      );
    } else if (resRecoverPassword.status === 500) {
      UICanvas.me().showPopupMessage(
        t("label_text.recover_password_failed_500")
      );
    } else if (resRecoverPassword.status === 200) {
      UICanvas.me().showPopupMessage(t("label_text.recover_password_success"));
    }
  }
  onClickSignIn() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.popupGeneral.active = false;
    this.popupSignIn.getComponent(PopupComponent).show();
  }

  onClickSignUp() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.popupGeneral.active = false;
    this.popupSignUp.getComponent(PopupComponent).show();
  }

  onClickSetting() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    UICanvas.me().showPopupSetting();
  }

  onClickForgetPassword() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    this.popupGeneral.active = false;
    this.popupSignIn.active = false;
    this.popupForgetPassword.getComponent(PopupComponent).show();
    this.popupForgetPassword.getChildByName("Form1").active = true;
    this.popupForgetPassword.getChildByName("Form2").active = false;
  }

  onClickBack() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.popupSignIn.getComponent(PopupComponent).hide();
    this.popupSignUp.getComponent(PopupComponent).hide();
    this.popupGeneral.active = true;
  }

  onClickBackLogin() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.popupForgetPassword.getComponent(PopupComponent).hide();
    this.popupSignIn.getComponent(PopupComponent).show();
  }
}
