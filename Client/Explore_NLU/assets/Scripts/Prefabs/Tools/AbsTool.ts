import { _decorator, Camera, Component, EventMouse, EventTouch, find, Node, sys, UITransform, Vec2, Vec3 } from 'cc';
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
            this.moveNode(event.touch.getLocation());
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

    private moveNode(location: Vec2) {
        const camera = find('Canvas/Camera').getComponent(Camera);
        const worldPos = camera.screenToWorld(new Vec3(location.x, location.y, 0));
        const newLocation = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        this.node.setPosition(newLocation);
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START, this.handleOnTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.handleOnTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.handleOnTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.handleOnTouchCancel, this);
    }
}

