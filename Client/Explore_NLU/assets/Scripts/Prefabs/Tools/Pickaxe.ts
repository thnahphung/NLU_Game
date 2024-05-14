import { _decorator, Component, EventMouse, EventTouch, find, Node } from 'cc';
import AbsTool from './AbsTool';
import GlobalData from '../../Utils/GlobalData';
import { UI } from '../../../../extensions/i18n/@types/editor/ui-kit';
import { UICanvas } from '../MainUI/UICanvas';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING } from '../../Utils/Const';
const { ccclass, property } = _decorator;

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
    
}


