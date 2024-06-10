import { _decorator, Component, game, Vec2 } from "cc";
import { Character } from "./Character";
import { InputManager } from "../../Manager/InputManager";
import { CHARACTER_STATE } from "../../Utils/Const";
import DataSender from "../../Utils/DataSender";
import GlobalData from "../../Utils/GlobalData";

const { ccclass, property } = _decorator;

@ccclass("CharacterMovement")
export class CharacterMovement extends Component {
  private characterInfo: Character;
  private direction: Vec2;

  start() {
    this.characterInfo = this.node.getComponent(Character);
    this.direction = new Vec2(0, 0);
  }

  update(deltaTime: number) {
    if (!this.characterInfo.getIsMainPlayer()) return;
    this.setDirection();
    this.setVelocity();
    this.changeState();
    this.sendReqMoving();
  }

  private setDirection() {
    this.direction = InputManager.me().getDirection();
  }

  private setVelocity() {
    this.characterInfo.getRigidBody().linearVelocity = new Vec2(
      this.direction.x * this.characterInfo.getSpeed() * game.deltaTime,
      this.direction.y * this.characterInfo.getSpeed() * game.deltaTime
    );
  }

  changeState() {
    if (
      this.direction.x > 0 &&
      this.direction.y <= 0.8 &&
      this.direction.y >= -0.8
    ) {
      this.characterInfo.setCurrentState(CHARACTER_STATE.WALK_RIGHT);
    } else if (
      this.direction.x < 0 &&
      this.direction.y <= 0.8 &&
      this.direction.y >= -0.8
    ) {
      this.characterInfo.setCurrentState(CHARACTER_STATE.WALK_LEFT);
    } else if (
      this.direction.y > 0 &&
      this.direction.x < 0.2 &&
      this.direction.x > -0.2
    ) {
      this.characterInfo.setCurrentState(CHARACTER_STATE.WALK_UP);
    } else if (
      this.direction.y < 0 &&
      this.direction.x < 0.2 &&
      this.direction.x > -0.2
    ) {
      this.characterInfo.setCurrentState(CHARACTER_STATE.WALK_DOWN);
    } else if (this.direction.x === 0 && this.direction.y === 0) {
      if (this.characterInfo.getCurrentState() === CHARACTER_STATE.WALK_DOWN) {
        this.characterInfo.setCurrentState(CHARACTER_STATE.IDLE_DOWN);
      } else if (
        this.characterInfo.getCurrentState() === CHARACTER_STATE.WALK_UP
      ) {
        this.characterInfo.setCurrentState(CHARACTER_STATE.IDLE_UP);
      } else if (
        this.characterInfo.getCurrentState() === CHARACTER_STATE.WALK_LEFT
      ) {
        this.characterInfo.setCurrentState(CHARACTER_STATE.IDLE_LEFT);
      } else if (
        this.characterInfo.getCurrentState() === CHARACTER_STATE.WALK_RIGHT
      ) {
        this.characterInfo.setCurrentState(CHARACTER_STATE.IDLE_RIGHT);
      }
    }
  }
  private sendReqMoving() {
    if (GlobalData.me().getArea() == null) return;
    DataSender.sendReqMoving(
      GlobalData.me().getArea().areaId,
      this.node.position.x,
      this.node.position.y
    );
  }
}
