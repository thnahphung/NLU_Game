import { _decorator, Component, EventMouse, EventTouch, find, Node } from 'cc';
import AbsTool from './AbsTool';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING } from '../../Utils/Const';
import DataSender from '../../Utils/DataSender';
const { ccclass } = _decorator;

@ccclass('Pickaxe')
export class Pickaxe extends AbsTool {
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
        GlobalData.me().setTillStatus(true);
        super.handleOnTouchStart(event)
    }

    handleOnTouchMove(event: EventTouch): void {
        super.handleOnTouchMove(event)
    }

    handleOnTouchEnd(event: EventTouch): void {
        GlobalData.me().setTillStatus(false);
        super.handleOnTouchEnd(event)
        if(GlobalData.me().getTilledStatus()){
            CoatingComponent.me().off(COATING.TILL);
            CoatingComponent.me().off(COATING.MOVE);
        }
        GlobalData.me().setTilledStatus(false);
        this.handleTilledLand();
    }

    handleOnTouchCancel(event: EventTouch): void {
        GlobalData.me().setTillStatus(false);
        super.handleOnTouchCancel(event)
        if(GlobalData.me().getTilledStatus()){
            CoatingComponent.me().off(COATING.TILL);
            CoatingComponent.me().off(COATING.MOVE);
        }
        GlobalData.me().setTilledStatus(false);
    }
    
    handleTilledLand(): void {
        if(GlobalData.me().getTilledLandListProto().tillLand == null || GlobalData.me().getTilledLandListProto().tillLand.length == 0){
            console.log("Null land tilled")
            return;
        }
        console.log("Save land tilled")
        DataSender.sendReqTilledLand(GlobalData.me().getTilledLandListProto());
    }
}


