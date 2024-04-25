import { _decorator, EditBox, Prefab } from 'cc';
import AbsScene from '../../Scenes/AbsScene';
import DataSender from '../../Utils/DataSender';
const { ccclass, property } = _decorator;

@ccclass('PopupSignIn')
export class PopupSignIn extends AbsScene {
    // Khai bao login
    @property(EditBox)
    public usernameLogin: EditBox = null!;

    @property(EditBox)
    public passwordLogin: EditBox = null!;

    // Khai bao popupNotify
    @property(Prefab)
    public popupNotifySimple: Prefab = null!;

    start() {
    }

    onClickLoginReq(){
        //Check không để trống username hoặc password
        if(this.usernameLogin.string === '' || this.passwordLogin.string === ''){
           confirm("Tên đăng nhập hoặc mật khẩu không thể trống!");
           return;
        }
       //Xử lý khi click login
       DataSender.sendReqSignIn(this.usernameLogin.string, this.passwordLogin.string);
   }

}


