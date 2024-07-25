import { _decorator, Component, tween, Vec3, math } from "cc";
import { Animal } from "./Animal";
import { Util } from "../../Utils/Util";
import { ANIMAL, ANIMAL_STATE, AUDIOS } from "../../Utils/Const";
import { AudioManger } from "../../Manager/AudioManger";
import DataSender from "../../Utils/DataSender";
import GlobalData from "../../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("AnimalMovement")
export class AnimalMovement extends Component {
  @property private duration: number = 0.3;
  @property private target: Vec3 = new Vec3(0, 0, 0);
  @property private interval;
  @property private minDelay = 0;
  @property private maxDelay = 0;
  private isRandomTarget = false;

  movingCallBack = function () {
    this.moving();
  };

  private animalInfo: Animal;
  start() {
    this.animalInfo = this.node.getComponent(Animal);

    this.node.setPosition(this.randomTarget());

    this.isRandomTarget = GlobalData.me().getIsFirstUser();
    if (this.isRandomTarget) {
      this.interval = Util.randomInRange(this.minDelay, this.maxDelay);
      this.schedule(this.movingCallBack, this.interval);
    }
  }

  protected update(dt: number): void {
    if (GlobalData.me().getIsFirstUser() != this.isRandomTarget) {
      this.isRandomTarget = GlobalData.me().getIsFirstUser();
      if (this.isRandomTarget) {
        this.interval = Util.randomInRange(this.minDelay, this.maxDelay);
        this.schedule(this.movingCallBack, this.interval);
      } else {
        this.unschedule(this.movingCallBack);
      }
    }
  }

  public moving() {
    this.target = this.randomTarget();
    const targetProto: proto.IPosition = Util.convertCocosPosToProtoPos(
      this.target
    );
    console.log("moving", this.target);
    if (!this.animalInfo.getIsLockedUp()) {
      DataSender.sendReqAnimalMoving(
        this.animalInfo.getFakeId(),
        GlobalData.me().getArea().areaId,
        targetProto
      );
    } else {
      DataSender.sendReqAnimalMoving(
        this.animalInfo.getAnimal().id,
        GlobalData.me().getArea().areaId,
        targetProto
      );
    }

    if (this.node === null) {
      this.unschedule(this.movingCallBack);
    }
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
      .call(() => this.changeCurrentStateWalk(target))
      .to(this.duration, target, {
        onUpdate: (target: Vec3, ratio: number) => {
          if (this.node === null) return;
          this.node.position = target;
        },
      })
      .call(() => this.changeCurrentStateIdle())
      .start();
  }

  public changeCurrentStateWalk(target: Vec3) {
    if (target.x < this.node.position.x) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.WALK_LEFT);
    } else {
      this.animalInfo.setCurrentState(ANIMAL_STATE.WALK_RIGHT);
    }
  }

  public changeCurrentStateIdle() {
    if (this.animalInfo === null) return;
    if (this.animalInfo.getCurrentState() === ANIMAL_STATE.WALK_LEFT) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.IDLE_LEFT);
    } else if (this.animalInfo.getCurrentState() === ANIMAL_STATE.WALK_RIGHT) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.IDLE_RIGHT);
    }
  }
}
