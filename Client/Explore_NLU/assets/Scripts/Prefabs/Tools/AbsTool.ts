import { _decorator, Component, EventMouse, EventTouch, Node, sys, UITransform, Vec2, Vec3 } from 'cc';
import { Util } from '../../../Scripts/Utils/Util';
const { ccclass, property } = _decorator;

@ccclass('AbsTool')
export default class AbsTool extends Component {
    public originalPosition: Vec3 = new Vec3();
    private isMove: boolean = false;
    
    start(): void {
        this.originalPosition = this.node.getPosition();
        this.node.on(Node.EventType.TOUCH_START, this.handleOnTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.handleOnTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.handleOnTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.handleOnTouchCancel, this);
    }

    update(deltaTime: number) {
        
    }

    handleOnMouseDown(event: EventMouse) {
    }

    handleOnMouseMove(event: EventMouse) {

    }

    handleOnMouseUp(event: EventMouse) {

    }

    handleOnMouseLeave(event: EventMouse) {

    }

    handleOnTouchStart(event: EventTouch) {
        this.setMove()
    }

    handleOnTouchMove(event: EventTouch) {
        if (this.isMove) {
            this.moveNode(event.touch.getDelta())
        }
    }

    handleOnTouchEnd(event: EventTouch) {
        this.setUnMove();
        this.setPositionNode(this.originalPosition);
    }

    handleOnTouchCancel(event: EventTouch) {
        this.setUnMove();
        this.setPositionNode(this.originalPosition);
    }

    private setPositionNode(position: Vec3) {
        this.node.setPosition(position);
    }

    private setMove(): void {
        this.isMove = true;
    }

    private setUnMove(): void {
        this.isMove = false;
    }

    private moveNode(delta: Vec2) {
        var movePosition = this.node.position.add3f(delta.x, delta.y, 0);
        this.setPositionNode(movePosition);
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START, this.handleOnTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.handleOnTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.handleOnTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.handleOnTouchCancel, this);
    }
}

