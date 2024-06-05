import { _decorator, Component, tween, Vec3, math } from "cc";
import { Animal } from "./Animal";
import { Util } from "../../Utils/Util";
import { ANIMAL_STATE } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("AnimalMovement")
export class AnimalMovement extends Component {
  @property private duration: number = 0.3;
  @property private target: Vec3 = new Vec3(0, 0, 0);
  @property private interval;
  @property private minDelay = 0;
  @property private maxDelay = 0;

  private animalInfo: Animal;
  start() {
    this.animalInfo = this.node.getComponent(Animal);

    this.node.setPosition(this.randomTarget());
    this.interval = Util.randomInRange(this.minDelay, this.maxDelay);

    this.moving();
    this.schedule(function () {
      this.moving();
    }, this.interval);
  }

  update(deltaTime: number) {}

  public moving() {
    this.target = this.randomTarget();
    this.movingToTarget(this.target);
  }

  public randomTarget() {
    const x = Util.randomInRange(
      this.animalInfo.getMaxMovingDistanceX().x,
      this.animalInfo.getMaxMovingDistanceX().y
    );
    const y = Util.randomInRange(
      this.animalInfo.getMaxMovingDistanceY().x,
      this.animalInfo.getMaxMovingDistanceY().y
    );
    return new Vec3(x, y, 0);
  }

  public movingToTarget(target: Vec3) {
    let distance = this.node.position.clone().subtract(target).length();
    this.duration = distance / this.animalInfo.getSpeed();
    tween(this.node.position)
      .call(() => this.changeCurrentStateWalk())
      .to(this.duration, target, {
        onUpdate: (target: Vec3, ratio: number) => {
          this.node.position = target;
        },
      })
      .call(() => this.changeCurrentStateIdle())
      .start();
  }

  public changeCurrentStateWalk() {
    if (this.target.x < this.node.position.x) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.WALK_LEFT);
    } else {
      this.animalInfo.setCurrentState(ANIMAL_STATE.WALK_RIGHT);
    }
  }

  public changeCurrentStateIdle() {
    if (this.animalInfo.getCurrentState() === ANIMAL_STATE.WALK_LEFT) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.IDLE_LEFT);
    } else if (this.animalInfo.getCurrentState() === ANIMAL_STATE.WALK_RIGHT) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.IDLE_RIGHT);
    }
  }
}
