import { _decorator, Button, Component, EditBox, find, Node } from 'cc';
import { UICanvas } from '../MainUI/UICanvas';
import { t } from '../../../../extensions/i18n/assets/LanguageData';
import DataSender from '../../Utils/DataSender';
const { ccclass, property } = _decorator;

@ccclass('PopupForgetPassword')
export class PopupForgetPassword extends Component {
    @property(EditBox)
    private email: EditBox = null;
    @property(EditBox)
    private newPassword: EditBox = null;
    @property(EditBox)
    private token: EditBox = null;
    onClickContinueForgetPassword() {
        if (this.email.string.trim() === '') {
            UICanvas.me().showPopupMessage(t('label_text.forget_password_failed_401'));
            return;
        }
        if(!this.isEmail(this.email.string)){
            UICanvas.me().showPopupMessage(t('label_text.forget_password_failed_403'));
            return;
        }

       var popupLoadingNode = find("Canvas/LoadingPrefab");
       if(popupLoadingNode){
            popupLoadingNode.active = true;
       }

       DataSender.sendReqEmailForgetPassword(this.email.string);
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

    onClickSubmitForgetPassword() {
        if (this.newPassword.string === '' || this.token.string === '') {
            UICanvas.me().showPopupMessage(t('label_text.forget_password_failed_401'));
            return;
        }
        var popupLoadingNode = find("Canvas/LoadingPrefab");
        if(popupLoadingNode){
            popupLoadingNode.active = true;
        }
        DataSender.sendReqRecoverPassword(this.email.string, this.newPassword.string, this.token.string);
    }
}


