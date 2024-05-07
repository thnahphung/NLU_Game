import { _decorator, EditBox, find, instantiate, Prefab } from 'cc';
import AbsScene from '../../Scenes/AbsScene';
import DataSender from '../../Utils/DataSender';
import { PopupManager } from '../../Manager/PopupManager';
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
           PopupManager.me().showPopupMessage("Tên đăng nhập hoặc mật khẩu không thể trống!");
           return;
        }
       //Xử lý khi click login
       var popupLoadingNode = find("Canvas/LoadingPrefab");
       if(popupLoadingNode){
            popupLoadingNode.active = true;
       }
       DataSender.sendReqSignIn(this.usernameLogin.string, this.passwordLogin.string);
   }

}


