import { _decorator, Collider2D, Component, EventTouch, IPhysics2DContact, Label, Node } from 'cc';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING } from '../../Utils/Const';
import DataSender from '../../Utils/DataSender';
import { AbsMenuItem } from '../Menu/AbsMenuItem';
const { ccclass, property } = _decorator;

@ccclass('SeedBag')
export class SeedBag extends AbsMenuItem {
    start(): void {
        super.start()
    }

    handleOnTouchStart(event: EventTouch): void {
        GlobalData.me().setSownStatus(false);
        super.handleOnTouchStart(event)
    }

    handleOnTouchMove(event: EventTouch): void {
        super.handleOnTouchMove(event)
    }

    handleOnTouchEnd(event: EventTouch): void {
        super.handleOnTouchEnd(event)
        this.handleStopSow();
        this.handleSendRequestSow();
    }

    handleOnTouchCancel(event: EventTouch): void {
        super.handleOnTouchCancel(event)
        this.handleStopSow();
    }

    handleStopSow(): void{
        GlobalData.me().setSowStatus(false);
        if(GlobalData.me().getSownStatus()){
            CoatingComponent.me().off(COATING.SEED);
        }
        GlobalData.me().setSownStatus(false);
    }

    handleSendRequestSow(): void {
        if(GlobalData.me().getSowingInformations() == null || GlobalData.me().getSowingInformations() == null || GlobalData.me().getSowingInformations().length == 0) return;
        //send request sow
        DataSender.sendReqSow(GlobalData.me().getSowingInformations());
        //clear data
        GlobalData.me().setSowingInformations(null);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

    }
}


