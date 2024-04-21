import { _decorator, EditBox, Prefab } from 'cc';
import { WS } from '../../Socket/WS';
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

    onMessageHandler(packetWrapper: proto.IPacketWrapper) {
        packetWrapper.packet.forEach((packet) => {
            let resLogin = packet.resLogin;
            if (resLogin) {
                if(resLogin.status === 400){
                    confirm("Tên đăng nhập hoặc mật khẩu không đúng!");
                }else if(resLogin.status === 402){
                    confirm("Tài khoản đã bị khóa!");
                }else if(resLogin.status === 403){
                    confirm("Tài khoản đang đăng nhập ở thiết bị khác!");
                }else if(resLogin.status === 500){
                    confirm("Lỗi server!");
                }else if(resLogin.status === 200) {
                    confirm("Đăng nhập thành công!");
                }
            }
        });
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


