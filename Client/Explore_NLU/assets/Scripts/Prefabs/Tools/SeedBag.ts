import { _decorator, Component, EventTouch, Node } from 'cc';
import AbsTool from './AbsTool';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING } from '../../Utils/Const';
import DataSender from '../../Utils/DataSender';
const { ccclass } = _decorator;

@ccclass('SeedBag')
export class SeedBag extends AbsTool {
    public commonGrowthItemProto: proto.ICommonGrowthItem = null;

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
        console.log("Send request sow...", GlobalData.me().getSowingInformations().sowingInformation);
        //send request sow
        DataSender.sendReqSow(GlobalData.me().getSowingInformations());
        //clear data
        GlobalData.me().setSowingInformations(null);
    }

}


