import { _decorator, Component, Node } from 'cc';
import AbsScene from './AbsScene';
const { ccclass, property } = _decorator;

@ccclass('AuthenScene')
export class AuthenScene extends AbsScene {

    @property(Node)
    private popupGeneral: Node = null;

    @property(Node)
    private popupSignIn: Node = null;

    @property(Node)
    private popupSignUp: Node = null;



    start() {

    }

    onMessageHandler(packets: proto.IPacketWrapper): void {
        super.onMessageHandler(packets);
    }

    onClickSignIn() {
        this.popupGeneral.active = false;
        this.popupSignIn.active = true;
    }

    onClickSignUp() {
        this.popupGeneral.active = false;
        this.popupSignUp.active = true;
    }

    onClickSetting() {
        // this.popupGeneral.active = false;
        // this.popupSignIn.active = true;
    }

    onClickBack() {
        this.popupGeneral.active = true;
        this.popupSignIn.active = false;
        this.popupSignUp.active = false;
    }



}


