import { _decorator, Component, game, RigidBody2D, Vec2 } from "cc";
// import { InputManager } from "../../../Test/Scripts/InputManager";
import { InputManager } from "../../Manager/InputManager";
import DataSender from "../../Utils/DataSender";
import GlobalData from "../../Utils/GlobalData";

const { ccclass, property } = _decorator;

@ccclass("CharacterMovement")
export class CharacterMovement extends Component {
  @property
  public speed: number = 500;

  private _rb: RigidBody2D;

  private direction: Vec2;

  start() {
    this._rb = this.node.getComponent(RigidBody2D);
    this.direction = new Vec2(0, 0);
  }

  update(deltaTime: number) {
    this.setDirection();
    this.setVelocity();
    DataSender.sendReqMoving(
      GlobalData.me().getArea().areaId,
      this.node.position.x,
      this.node.position.y
    );
  }

  private setDirection() {
    this.direction = InputManager.me().getDirection();
  }

  private setVelocity() {
    this._rb.linearVelocity = new Vec2(
      this.direction.x * this.speed * game.deltaTime,
      this.direction.y * this.speed * game.deltaTime
    );
  }
}
