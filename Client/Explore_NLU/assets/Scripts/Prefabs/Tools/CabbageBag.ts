import { _decorator, Component, EventTouch, Node } from 'cc';
import AbsTool from './AbsTool';
const { ccclass, property } = _decorator;

@ccclass('CabbageBag')
export class CabbageBag extends AbsTool {
    start(): void {
        super.start()
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


