import {
  _decorator,
  Component,
  EventKeyboard,
  find,
  game,
  Input,
  input,
  KeyCode,
  Node,
  PhysicsSystem2D,
  RigidBody2D,
  UITransform,
  Vec2,
  Vec3,
} from "cc";
import { Joystick } from "../Joystick/Joystick";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  @property
  speed: number = 10;

  private _rb: RigidBody2D;

  private direction: Vec2;

  private _isMoving: boolean = false;

  @property(Joystick)
  private joystick: Joystick = null;

  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_PRESSING, this.onKeyPress, this);
    input.on(Input.EventType.KEY_UP, this.stop, this);

    // this.node.getComponent(UITransform).priority = this.node.position.y + 1000;
    this._rb = this.node.getComponent(RigidBody2D);
    this.direction = new Vec2(0, 0);
  }

  update(deltaTime: number) {
    // this._rb.linearVelocity = new Vec2(
    //   this.direction.x * this.speed * deltaTime,
    //   this.direction.y * this.speed * deltaTime
    // );
    this.direction = this.joystick.getRotation();

    this._rb.linearVelocity = new Vec2(
      this.direction.x * this.speed * deltaTime,
      this.direction.y * this.speed * deltaTime
    );
  }

  stop(event: EventKeyboard) {
    this._isMoving = false;
    if (
      event.keyCode === KeyCode.ARROW_LEFT ||
      event.keyCode === KeyCode.KEY_A ||
      event.keyCode === KeyCode.ARROW_RIGHT ||
      event.keyCode === KeyCode.KEY_D
    ) {
      this.direction.x = 0;
    } else if (
      event.keyCode === KeyCode.ARROW_UP ||
      event.keyCode === KeyCode.KEY_W ||
      event.keyCode === KeyCode.ARROW_DOWN ||
      event.keyCode === KeyCode.KEY_S
    ) {
      this.direction.y = 0;
    }
  }

  onKeyDown(event: EventKeyboard) {
    if (this._isMoving) return;
    this._isMoving = true;
    this.moving(event);
  }

  onKeyPress(event: EventKeyboard) {
    if (this._isMoving) return;
    this._isMoving = true;
    this.moving(event);
  }

  moving(event: EventKeyboard) {
    if (
      event.keyCode === KeyCode.ARROW_LEFT ||
      event.keyCode === KeyCode.KEY_A
    ) {
      this.direction.x = -1;
    } else if (
      event.keyCode === KeyCode.ARROW_RIGHT ||
      event.keyCode === KeyCode.KEY_D
    ) {
      this.direction.x = 1;
    } else if (
      event.keyCode === KeyCode.ARROW_UP ||
      event.keyCode === KeyCode.KEY_W
    ) {
      this.direction.y = 1;
    } else if (
      event.keyCode === KeyCode.ARROW_DOWN ||
      event.keyCode === KeyCode.KEY_S
    ) {
      this.direction.y = -1;
    }
  }
}
