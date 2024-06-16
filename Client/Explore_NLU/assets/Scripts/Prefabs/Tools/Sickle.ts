import { _decorator, Component, EventMouse, EventTouch, Node } from 'cc';
import AbsTool from './AbsTool';
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
    }

    handleOnTouchCancel(event: EventTouch): void {
        super.handleOnTouchCancel(event)
    }
}


