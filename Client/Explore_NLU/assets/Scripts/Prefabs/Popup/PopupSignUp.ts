import { _decorator, Component, EditBox, find, Prefab } from 'cc';
import DataSender from '../../Utils/DataSender';
import { UICanvas } from '../MainUI/UICanvas';
import { POPUP_MESSAGE } from '../../Utils/Const';
const { ccclass, property } = _decorator;

@ccclass('PopupSignUp')
export class PopupSignUp extends Component {
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
            UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_FAILED_401);
            return;
        }
        
        //Check valid username
        if(this.hasSpace(username)){
            UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_FAILED_INPUT);
            return;
        }

        //Check không trùng khớp mật khẩu
        if(password !== rePassword){
            UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_FAILED_402);
            return;
        }

        //Check verify email
        if(!this.isEmail(email)){
            UICanvas.me().showPopupMessage(POPUP_MESSAGE.REGISTER_FAILED_EMAIL);
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


