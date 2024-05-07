import { _decorator, instantiate, Node, Prefab, Toggle } from "cc";
import AbsScene from "./AbsScene";
import { PopupComponent } from "../Controller/PopupComponent";
import DataSender from "../Utils/DataSender";
import { TransitionScenePrefab } from "../Prefabs/TransitionScene/TransitionScenePrefab";
import { StorageManager } from "../Manager/StorageManger";
import { PopupManager } from "../Manager/PopupManager";
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
  public popupLoadingNode: Node = null;
  start() {
  }
  protected onLoad(): void {
    this.popupLoadingNode = instantiate(this.popupLoading)
    this.popupLoadingNode.active = false;
    this.node.addChild(this.popupLoadingNode);
    let username = StorageManager.me().getItem("USERNAME");
    let token = StorageManager.me().getItem("TOKEN");
    let autoLogin = StorageManager.me().getItem("AUTO_LOGIN");
    if (autoLogin == "true" && username && token) {
      this.popupGeneral.active = false;
      DataSender.sendReqRelogin(username, token);
      this.popupLoadingNode.active = true;
    }
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    let transitScreenNode = instantiate(this.transitScreen);
    this.popupLoadingNode.active = false;
    super.onMessageHandler(packets);
    packets.packet.forEach((packet) => {
      let resLogin = packet.resLogin;
      if (resLogin) {
        if (resLogin.status === 400) {
          PopupManager.me().showPopupMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
          return;
        }
        if (resLogin.status === 401) {
          console.log("Fail relogin!");
          this.popupGeneral.active = true;
          return;
        }        
        if (resLogin.status === 402) {
          PopupManager.me().showPopupMessage("Tài khoản đã bị khóa!");
          return;
        }
        if (resLogin.status === 403) {
          PopupManager.me().showPopupMessage("Tài khoản đang đăng nhập ở thiết bị khác!");
          return;
        }
        if (resLogin.status === 500) {
          PopupManager.me().showPopupMessage("Lỗi server!");
          return;
        }
        if (resLogin.status === 200) {
          //RememberLogin
          StorageManager.me().saveItem(
            "USERNAME",
            packet.resLogin.user.username
          );
          StorageManager.me().saveItem("AUTO_LOGIN", this.rememberMe.isChecked);
          StorageManager.me().saveItem("TOKEN", resLogin.token);
          //Chuyển scene
          var hasCharacter = packet.resLogin.user.hasCharacter;
          console.log("hasCharacter", hasCharacter);
          if (hasCharacter == 0) {
            transitScreenNode
              .getComponent(TransitionScenePrefab)
              .setSceneName("PickCharacterScene");
              this.node.addChild(transitScreenNode);
          } else {
            transitScreenNode
            .getComponent(TransitionScenePrefab)
            .setSceneName("KiotScene");
            this.node.addChild(transitScreenNode);
          }
        }
      }
      let resRegister = packet.resRegister;
      if (resRegister) {
        if (resRegister.status === 400) {
          PopupManager.me().showPopupMessage("Tên đăng nhập đã tồn tại!");
        } else if (resRegister.status === 401) {
          PopupManager.me().showPopupMessage("Tên đăng nhập hoặc mật khẩu không thể để trống!");
        } else if (resRegister.status === 403) {
          PopupManager.me().showPopupMessage("Email này đã được sử dụng!");
        } else if (resRegister.status === 402) {
          PopupManager.me().showPopupMessage("Mật khẩu không trùng khớp!");
        } else if (resRegister.status === 500) {
          PopupManager.me().showPopupMessage("Lỗi server!");
        } else if (resRegister.status === 200) {
          PopupManager.me().showPopupMessage("Đăng ký thành công!");
        }
      }
    });
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
    let setting = instantiate(this.popupSetting);
    let btnLogout = setting
      .getChildByName("OtherSetting")
      .getChildByName("ButtonLogout");
    btnLogout.destroy();
    this.node.addChild(setting);
    // this.popupGeneral.active = false;
    // this.popupSignIn.active = true;
  }

  onClickBack() {
    this.popupSignIn.getComponent(PopupComponent).hide();
    this.popupSignUp.getComponent(PopupComponent).hide();
    this.popupGeneral.active = true;
  }
}
