import { _decorator, EditBox, find, Node, Prefab } from 'cc';
import AbsScene from '../../Scenes/AbsScene';
import DataSender from '../../Utils/DataSender';
import { PopupManager } from '../../Manager/PopupManager';
const { ccclass, property } = _decorator;

@ccclass('PopupSignUp')
export class PopupSignUp extends AbsScene {
    // Khai bao register
    @property(EditBox)
    public usernameRegister: EditBox = null!;
  
    @property(EditBox)
    public passwordRegister: EditBox = null!;
  
    @property(EditBox)
    public rePasswordRegister: EditBox = null!;

    @property(EditBox)
    public emailRegister: EditBox = null!;
    // Khai bao popupNotify
    @property(Prefab)
    public popupNotifySimple: Prefab = null!;

    start() {

    }

    onClickRegisterReq(){
        //Check không để trống username hoặc password
        var username = this.usernameRegister.string.trim();
        var password = this.passwordRegister.string;
        var rePassword = this.rePasswordRegister.string;
        var email = this.emailRegister.string;
        if(username === '' || password === '' || this.rePasswordRegister.string === ''){
            PopupManager.me().showPopupMessage("Tên đăng nhập hoặc mật khẩu không được để trống!");
            return;
        }
        
        //Check valid username
        if(this.hasSpace(username)){
            PopupManager.me().showPopupMessage("Tên đăng nhập không được chưa khoảng trắng!");
            return;
        }

        //Check không trùng khớp mật khẩu
        if(password !== rePassword){
            PopupManager.me().showPopupMessage("Mật khẩu không trùng khớp!");
            return;
        }

        //Check verify email
        if(!this.isEmail(email)){
            PopupManager.me().showPopupMessage("Email không hợp lệ!");
            return;
        }

        var popupLoadingNode = find("Canvas/LoadingPrefab");
        if(popupLoadingNode){
             popupLoadingNode.active = true;
        }
        DataSender.sendReqSignUp(username, password, email);
    }

    isEmail(search:string): boolean {
        var serchfind:boolean;
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        serchfind = regexp.test(search);
        return serchfind
    }

    hasSpace(str: string): boolean {
        return /\s/.test(str);
    }
}


