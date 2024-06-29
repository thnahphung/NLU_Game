import { _decorator, Component, EditBox, find, Prefab } from 'cc';
import DataSender from '../../Utils/DataSender';
import { UICanvas } from '../MainUI/UICanvas';
import { t } from '../../../../extensions/i18n/assets/LanguageData';
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
            UICanvas.me().showPopupMessage(t('label_text.register_failed_401'));
            return;
        }
        
        //Check valid username
        if(this.hasSpace(username)){
            UICanvas.me().showPopupMessage(t('label_text.register_failed_input'));
            return;
        }

        //Check không trùng khớp mật khẩu
        if(password !== rePassword){
            UICanvas.me().showPopupMessage(t('label_text.register_failed_402'));
            return;
        }

        //Check verify email
        if(!this.isEmail(email)){
            UICanvas.me().showPopupMessage(t('label_text.register_failed_email'));
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


