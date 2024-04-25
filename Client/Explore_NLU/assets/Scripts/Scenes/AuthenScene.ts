import {
  _decorator,
  instantiate,
  Node,
  Prefab,
  Toggle,
} from "cc";
import AbsScene from "./AbsScene";
import { PopupComponent } from "../Controller/PopupComponent";
import { LocalStorage } from "../Utils/LocalStorage";
import DataSender from "../Utils/DataSender";
import { TransitionScenePrefab } from "../Others/TransitionScenePrefab";
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
  // Khai bao setting 
  @property(Prefab)
  public popupSetting: Prefab = null;

  start() {}
  protected onLoad(): void {
    let username = LocalStorage.me().getItem("USERNAME");
    let token = LocalStorage.me().getItem("TOKEN");
    let autoLogin = LocalStorage.me().getItem("AUTO_LOGIN");
    if (autoLogin == "true" && username && token) {
      console.log("Relogin ...::", username, token);
      DataSender.sendReqRelogin(username, token);
    }else{
      console.log("No auto login", username, token, autoLogin);
    }
    console.log("AuthenScene", this.transitScreen);
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    let transitScreenNode = instantiate(this.transitScreen);
    super.onMessageHandler(packets);
    packets.packet.forEach((packet) => {
            let resLogin = packet.resLogin;
            if (resLogin) {
                if(resLogin.status === 400){
                    confirm("Tên đăng nhập hoặc mật khẩu không đúng!");
                    return;
                } 
                if(resLogin.status === 402){
                    confirm("Tài khoản đã bị khóa!");
                    return;
                } 
                if(resLogin.status === 403){
                    confirm("Tài khoản đang đăng nhập ở thiết bị khác!");
                    return;
                } 
                if(resLogin.status === 500){
                    confirm("Lỗi server!");
                    return;
                } 
                if(resLogin.status === 200) {
                    console.log("Đăng nhập thành công!");
                    //RememberLogin
                    LocalStorage.me().saveItem("USERNAME", packet.resLogin.user.username);
                    LocalStorage.me().saveItem("AUTO_LOGIN", this.rememberMe.isChecked);
                    LocalStorage.me().saveItem("TOKEN", resLogin.token);
                    //Chuyển scene
                    transitScreenNode.getComponent(TransitionScenePrefab).setSceneName("scene-2d-test");
                    this.node.addChild(transitScreenNode);
                }
            }
            let resRegister = packet.resRegister;
            if(resRegister){
                if (resRegister.status === 400) {
                    confirm("Tên đăng nhập đã tồn tại!");
                }else if(resRegister.status === 401){
                    confirm("Tên đăng nhập hoặc mật khẩu không được để trống!");
                }else if(resRegister.status === 402){
                    confirm("Mật khẩu không trùng khớp!");
                }else if(resRegister.status === 500){
                    confirm("Lỗi server!");
                }else if(resRegister.status === 200){
                    confirm("Đăng ký thành công!");
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
    let btnLogout = setting.getChildByName("OtherSetting").getChildByName("ButtonLogout");
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
