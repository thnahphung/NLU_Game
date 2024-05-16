import { _decorator, Component, EventMouse, Node } from 'cc';
import AbsTool from './AbsTool';
const { ccclass, property } = _decorator;

@ccclass('Hammer')
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
}