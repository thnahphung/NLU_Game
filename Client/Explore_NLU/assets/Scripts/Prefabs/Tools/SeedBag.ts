import { _decorator, Component, EventTouch, Node } from 'cc';
import AbsTool from './AbsTool';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING } from '../../Utils/Const';
const { ccclass } = _decorator;

@ccclass('SeedBag')
export class SeedBag extends AbsTool {

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
        //this.handleStopSow();
    }

    handleOnTouchCancel(event: EventTouch): void {
        super.handleOnTouchCancel(event)
        //this.handleStopSow();
    }

    handleStopSow(): void{
        GlobalData.me().setSowStatus(false);
        if(GlobalData.me().getSownStatus()){
            CoatingComponent.me().off(COATING.SEED);
        }
        GlobalData.me().setSownStatus(false);
    }

}


