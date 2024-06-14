import {
  _decorator,
  Camera,
  Canvas,
  Component,
  director,
  EventTouch,
  Input,
  log,
  math,
  Node,
  UITransform,
  Vec2,
  Vec3,
} from "cc";
import { Util } from "../../Utils/Util";

const { ccclass, property } = _decorator;

@ccclass("Joystick")
export class Joystick extends Component {
  @property(Node)
  protected joystickBall: Node;

  @property
  protected joystickMax = 100;

  @property
  public angle: 0;

  protected joystickVector: Vec2 = Vec2.ZERO.clone();

  localTouchPosition: Vec3 = new Vec3();

  protected onLoad(): void {
    // this.joystickVector = Vec2.ZERO.clone();
    this.setJoystickBall();
  }

  protected start() {
    this.node.on(Input.EventType.TOUCH_START, this.joystickTouchStart, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this.joystickTouchMove, this);
    this.node.on(Input.EventType.TOUCH_END, this.joystickTouchEnd, this);
    this.node.on(Input.EventType.TOUCH_CANCEL, this.joystickTouchCancel, this);
  }

  protected joystickTouchStart(event: EventTouch) {
    let touchPosition = event.getUILocation();
    this.localTouchPosition = this.getComponent(
      UITransform
    ).convertToNodeSpaceAR(Util.toVec3(touchPosition));
    this.setJoystickBallPosition(this.localTouchPosition);
  }

  protected joystickTouchMove(event: EventTouch) {
    this.getRotation();
    let touch = event.getTouches()[0];
    let touchPosition = touch.getUILocation();
    this.localTouchPosition = this.getComponent(
      UITransform
    ).convertToNodeSpaceAR(Util.toVec3(touchPosition));
    this.setJoystickBallPosition(this.localTouchPosition);
  }

  protected joystickTouchEnd(event: EventTouch) {
    this.setJoystickBallPosition(Util.toVec3(Vec2.ZERO));
  }

  protected joystickTouchCancel(event: EventTouch) {
    this.setJoystickBallPosition(Util.toVec3(Vec2.ZERO));
  }

  private setJoystickBall() {
    if (this.joystickBall) return;
    this.joystickBall = this.node.getChildByName("JoystickBall");
  }

  private setJoystickBallPosition(position: Vec3) {
    this.limitJoyStick(position);
    this.joystickBall.setPosition(position);
  }

  private limitJoyStick(joyStickVector: Vec3) {
    let distance = joyStickVector.length();
    this.joystickVector = new Vec2(joyStickVector.x, joyStickVector.y);
    if (distance > this.joystickMax) {
      joyStickVector.multiplyScalar(this.joystickMax / distance);
    }
  }

  public getRotation() {
    // console.log("joystickVector", this.joystickVector);
    // console.log("Joystick", this.node);
    // console.log("localtouch", this.localTouchPosition);
    // if (this.joystickVector == null) {
    //   this.joystickVector = Vec2.ZERO.clone().normalize();
    // }
    return this.joystickVector.normalize();
  }

  public getAngle() {
    const angleRadian = Math.atan2(
      this.localTouchPosition.x,
      this.localTouchPosition.y
    );
    return -math.toDegree(angleRadian);
  }

  public getRadian() {
    return Math.atan2(this.localTouchPosition.x, this.localTouchPosition.y);
  }

  public getJoyStickVector() {
    return this.joystickVector;
  }
}
