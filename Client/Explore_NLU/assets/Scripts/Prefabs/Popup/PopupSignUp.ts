import { _decorator, EditBox, find, Node, Prefab } from 'cc';
import AbsScene from '../../Scenes/AbsScene';
import DataSender from '../../Utils/DataSender';
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
        if(this.usernameRegister.string === '' || this.passwordRegister.string === '' || this.rePasswordRegister.string === ''){
            confirm("Tên đăng nhập hoặc mật khẩu không được để trống!");
            return;
        }

        //Check không trùng khớp mật khẩu
        if(this.passwordRegister.string !== this.rePasswordRegister.string){
            confirm("Mật khẩu không trùng khớp!");
            return;
        }

        //Check verify email
        if(!this.isEmail(this.emailRegister.string)){
            confirm("Email không hợp lệ!");
            return;
        }

        var popupLoadingNode = find("Canvas/LoadingPrefab");
        if(popupLoadingNode){
             popupLoadingNode.active = true;
        }
        DataSender.sendReqSignUp(this.usernameRegister.string, this.passwordRegister.string, this.emailRegister.string);
    }

    isEmail(search:string): boolean {
        var serchfind:boolean;
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        serchfind = regexp.test(search);
        return serchfind
    }

}


