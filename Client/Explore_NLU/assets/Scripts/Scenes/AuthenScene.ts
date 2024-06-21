import { _decorator, instantiate, Node, Prefab, sys, Toggle } from "cc";
import AbsScene from "./AbsScene";
import { PopupComponent } from "../Controller/PopupComponent";
import DataSender from "../Utils/DataSender";
import { StorageManager } from "../Manager/StorageManger";
import GlobalData from "../Utils/GlobalData";
import { LOCAL_STORAGE, POPUP, POPUP_MESSAGE } from "../Utils/Const";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
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
    GlobalData.me().setMobileDevice(sys.isMobile || sys.isNative);

    this.popupLoadingNode = instantiate(this.popupLoading);
    this.popupLoadingNode.active = false;
    this.node.addChild(this.popupLoadingNode);
    let username = StorageManager.me().getItem(LOCAL_STORAGE.USERNAME);
    let token = StorageManager.me().getItem(LOCAL_STORAGE.TOKEN);
    let autoLogin = StorageManager.me().getItem(LOCAL_STORAGE.AUTO_LOGIN);
    if (autoLogin == "true" && username && token) {
      this.popupGeneral.active = false;
      DataSender.sendReqRelogin(username, token);
      this.popupLoadingNode.active = true;
    }
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
    });
  }

  onLoginMsgHandler(resLogin: proto.IResLogin) {
    if (resLogin.status === 400) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.LOGIN_FAILED_400);
      return;
    }
    if (resLogin.status === 401) {
      console.log("Fail relogin!");
      this.popupGeneral.active = true;
      return;
    }
    if (resLogin.status === 402) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.LOGIN_FAILED_402);
      return;
    }
    if (resLogin.status === 403) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.LOGIN_FAILED_403);
      return;
    }
    if (resLogin.status === 500) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.SERVER_ERROR);
      return;
    }
    if (resLogin.status === 200) {
      //RememberLogin
      StorageManager.me().saveItem(LOCAL_STORAGE.USERNAME, resLogin.user.username);
      StorageManager.me().saveItem(LOCAL_STORAGE.AUTO_LOGIN, this.rememberMe.isChecked);
      StorageManager.me().saveItem(LOCAL_STORAGE.TOKEN, resLogin.token);
      GlobalData.me().setMainUser(resLogin.user);
      GlobalData.me().setIsUserOffline(false);
    }
  }

  onRegisterMsgHandler(resRegister: proto.IResRegister) {
    if (resRegister.status === 400) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_FAILED_400);
    } else if (resRegister.status === 401) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_FAILED_401);
    } else if (resRegister.status === 403) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_FAILED_403);
    } else if (resRegister.status === 402) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_FAILED_402);
    } else if (resRegister.status === 500) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.SERVER_ERROR);
    } else if (resRegister.status === 200) {
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_SUCCESS_200);
    }
  }

  onClickSignIn() {
    this.popupGeneral.active = false;
    this.popupSignIn.getComponent(PopupComponent).show();
  }

  onClickSignUp() {
    this.popupGeneral.active = false;
    this.popupSignUp.getComponent(PopupComponent).show();
  }

  onClickSetting() {
    UICanvas.me().showPopup(POPUP.POPUP_SETTING);
  }

  onClickForgetPassword() {
    this.popupGeneral.active = false;
    this.popupSignIn.active = false;
    this.popupForgetPassword.getComponent(PopupComponent).show();
  }

  onClickBack() {
    this.popupSignIn.getComponent(PopupComponent).hide();
    this.popupSignUp.getComponent(PopupComponent).hide();
    this.popupGeneral.active = true;
  }

  onClickBackLogin(){
    this.popupForgetPassword.getComponent(PopupComponent).hide();
    this.popupSignIn.getComponent(PopupComponent).show();
  }
}
