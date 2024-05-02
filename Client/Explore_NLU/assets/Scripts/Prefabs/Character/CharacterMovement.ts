import {
  _decorator,
  Component,
  EventKeyboard,
  game,
  Input,
  input,
  KeyCode,
  Node,
  RigidBody2D,
  sys,
  Vec2,
} from "cc";
import { Joystick } from "../Joystick/Joystick";
const { ccclass, property } = _decorator;

@ccclass("CharacterMovement")
export class CharacterMovement extends Component {
  @property
  public speed: number = 500;

  @property(Joystick)
  private joystick: Joystick = null;

  private _rb: RigidBody2D;

  private direction: Vec2;

  private _moveUp = false;
  private _moveDown = false;
  private _moveLeft = false;
  private _moveRight = false;

  private _moveHorizontal = false;
  private _moveVertical = false;

  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    this._rb = this.node.getComponent(RigidBody2D);
    this.direction = new Vec2(0, 0);
  }

  update(deltaTime: number) {
    this.setDirection();
    this.setVelocity();
  }

  onKeyDown(event: EventKeyboard) {
    if (
      event.keyCode === KeyCode.ARROW_LEFT ||
      event.keyCode === KeyCode.KEY_A
    ) {
      this._moveLeft = true;
      this._moveHorizontal = false;
    } else if (
      event.keyCode === KeyCode.ARROW_RIGHT ||
      event.keyCode === KeyCode.KEY_D
    ) {
      this._moveRight = true;
      this._moveHorizontal = true;
    } else if (
      event.keyCode === KeyCode.ARROW_UP ||
      event.keyCode === KeyCode.KEY_W
    ) {
      this._moveUp = true;
      this._moveVertical = false;
    } else if (
      event.keyCode === KeyCode.ARROW_DOWN ||
      event.keyCode === KeyCode.KEY_S
    ) {
      this._moveDown = true;
      this._moveVertical = true;
    }
  }

  onKeyUp(event: EventKeyboard) {
    if (
      event.keyCode === KeyCode.ARROW_LEFT ||
      event.keyCode === KeyCode.KEY_A
    ) {
      this._moveLeft = false;
    } else if (
      event.keyCode === KeyCode.ARROW_RIGHT ||
      event.keyCode === KeyCode.KEY_D
    ) {
      this._moveRight = false;
    } else if (
      event.keyCode === KeyCode.ARROW_UP ||
      event.keyCode === KeyCode.KEY_W
    ) {
      this._moveUp = false;
    } else if (
      event.keyCode === KeyCode.ARROW_DOWN ||
      event.keyCode === KeyCode.KEY_S
    ) {
      this._moveDown = false;
    }
  }

  private resetDirection() {
    this.direction.x = 0;
    this.direction.y = 0;
  }

  private setDirection() {
    if (sys.isMobile || sys.isNative) {
      this.direction = this.joystick.getRotation();
      return;
    } else {
      this.resetDirection();
      if (this._moveHorizontal) {
        this._moveLeft && (this.direction.x = -1);
        this._moveRight && (this.direction.x = 1);
      } else {
        this._moveRight && (this.direction.x = 1);
        this._moveLeft && (this.direction.x = -1);
      }
      if (this._moveVertical) {
        this._moveUp && (this.direction.y = 1);
        this._moveDown && (this.direction.y = -1);
      } else {
        this._moveDown && (this.direction.y = -1);
        this._moveUp && (this.direction.y = 1);
      }
      this.direction.normalize();
    }
  }

  private setVelocity() {
    this._rb.linearVelocity = new Vec2(
      this.direction.x * this.speed * game.deltaTime,
      this.direction.y * this.speed * game.deltaTime
    );
  }
}
