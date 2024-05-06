import {
  _decorator,
  Component,
  Input,
  input,
  sys,
  Vec2,
  EventKeyboard,
  KeyCode,
  find,
} from "cc";
import { Joystick } from "../Prefabs/Joystick/Joystick";
const { ccclass, property } = _decorator;

@ccclass("InputManager")
export class InputManager extends Component {
  @property(Joystick) private joystick: Joystick = null;
  protected static _instance: InputManager;
  private _direction: Vec2 = new Vec2(0, 0);

  private _moveUp = false;
  private _moveDown = false;
  private _moveLeft = false;
  private _moveRight = false;

  private _moveHorizontal = false;
  private _moveVertical = false;

  public static me(): InputManager {
    return this._instance;
  }

  protected onLoad(): void {
    if (InputManager._instance != null)
      console.log("Only 1 InputManager allow to exist");
    InputManager._instance = this;
  }

  start() {
    if (sys.isMobile || sys.isNative) {
      this.joystick = find("UICanvas/BotLeft/Joystick")?.getComponent(Joystick);
      return;
    }

    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  update(deltaTime: number) {
    this.setDirection();
  }

  public getDirection(): Vec2 {
    return this._direction;
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
    this._direction.x = 0;
    this._direction.y = 0;
  }

  private setDirection() {
    if (sys.isMobile || sys.isNative) {
      this._direction = this.joystick.getRotation();
      return;
    } else {
      this.resetDirection();
      if (this._moveHorizontal) {
        this._moveLeft && (this._direction.x = -1);
        this._moveRight && (this._direction.x = 1);
      } else {
        this._moveRight && (this._direction.x = 1);
        this._moveLeft && (this._direction.x = -1);
      }
      if (this._moveVertical) {
        this._moveUp && (this._direction.y = 1);
        this._moveDown && (this._direction.y = -1);
      } else {
        this._moveDown && (this._direction.y = -1);
        this._moveUp && (this._direction.y = 1);
      }
      this._direction.normalize();
    }
  }
}
