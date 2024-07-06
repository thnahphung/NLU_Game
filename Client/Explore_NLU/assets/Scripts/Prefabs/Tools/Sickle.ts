import { _decorator, Component, EventMouse, EventTouch, Node } from 'cc';
import AbsTool from './AbsTool';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING } from '../../Utils/Const';
import DataSender from '../../Utils/DataSender';
const { ccclass, property } = _decorator;

@ccclass('Sickle')
export class Sickle extends AbsTool {
    start() {
        super.start()
    }

     handleOnMouseDown(event: EventMouse) {
        super.handleOnMouseDown(event)
    }

    handleOnMouseMove(event: EventMouse): void {
        super.handleOnMouseMove(event)
    }

    handleOnMouseUp(event: EventMouse): void {
        super.handleOnMouseUp(event)
    }

    handleOnTouchStart(event: EventTouch): void {
        super.handleOnTouchStart(event)
    }

    handleOnTouchMove(event: EventTouch): void {
        super.handleOnTouchMove(event)
    }

    handleOnTouchEnd(event: EventTouch): void {
        super.handleOnTouchEnd(event)
        this.handleCheckHarvest();
        this.scheduleOnce(this.handleSendRequestHarvest, 0.1);
    }

    handleOnTouchCancel(event: EventTouch): void {
        super.handleOnTouchCancel(event)
        this.handleCheckHarvest();
    }

    private handleCheckHarvest(): void {
        GlobalData.me().setHarvestStatus(false);
        if(GlobalData.me().getHarvestedStatus()){
            CoatingComponent.me().off(COATING.HARVEST);
            return;
        }
        GlobalData.me().setHarvestedStatus(false);
    }

    handleSendRequestHarvest(): void {
        if(GlobalData.me().getHarvestingInformations() == null || GlobalData.me().getHarvestingInformations().crop.length == 0){
            return;
        }
        //send request harvest
        DataSender.sendReqHarvest(GlobalData.me().getHarvestingInformations());
        //clear data
        GlobalData.me().setHarvestingInformations(null);
    }
}


