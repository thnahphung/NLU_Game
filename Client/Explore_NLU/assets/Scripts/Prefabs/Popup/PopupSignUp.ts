import { _decorator, Component, EditBox, Node, Prefab } from 'cc';
import { WS } from '../../Socket/WS';
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

    // Khai bao popupNotify
    @property(Prefab)
    public popupNotifySimple: Prefab = null!;

    start() {

    }

    onMessageHandler(packetWrapper: proto.IPacketWrapper) {
        packetWrapper.packet.forEach((packet) => {
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
        DataSender.sendReqSignUp(this.usernameRegister.string, this.passwordRegister.string);
    }
}


