import {
  _decorator,
  Animation,
  Collider2D,
  Component,
  Node,
  UITransform,
  Vec2,
} from "cc";
import { AnimalAnimation } from "./AnimalAnimation";
import { AnimalMovement } from "./AnimalMovement";
import { ANIMAL, ANIMAL_STATE } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Animal")
export class Animal extends Component {
  @property private type: ANIMAL = ANIMAL.COW;
  @property private currentState: ANIMAL_STATE = ANIMAL_STATE.IDLE_RIGHT;
  @property private speed: number = 100;
  @property private isHungry: boolean = false;

  @property maxMovingDistanceX: Vec2 = new Vec2(0, 0);
  @property maxMovingDistanceY: Vec2 = new Vec2(0, 0);

  private animalAnimation: AnimalAnimation;
  private animalMovement: AnimalMovement;
  private animation: Animation;
  private collider: Collider2D;

  protected onLoad(): void {
    this.init();
  }

  init() {
    this.animalAnimation = this.node.getComponent(AnimalAnimation);
    this.animalMovement = this.node.getComponent(AnimalMovement);
    this.animation = this.node.getComponent(Animation);
    this.collider = this.node.getComponent(Collider2D);
    this.createMaxMovingDistance();
  }

  public createMaxMovingDistance() {
    this.maxMovingDistanceX.x =
      -this.node.getParent().getComponent(UITransform).contentSize.width / 2;
    this.maxMovingDistanceX.y =
      this.node.getParent().getComponent(UITransform).contentSize.width / 2;
    this.maxMovingDistanceY.x =
      -this.node.getParent().getComponent(UITransform).contentSize.height / 2;
    this.maxMovingDistanceY.y =
      this.node.getParent().getComponent(UITransform).contentSize.height / 2;
  }

  public getSpeed() {
    return this.speed;
  }
  public setCurrentState(newState: ANIMAL_STATE) {
    this.currentState = newState;
  }
  public getCurrentState() {
    return this.currentState;
  }
  public getAnimation() {
    return this.animation;
  }
  public getAnimalMovement() {
    return this.animalMovement;
  }
  public getAnimalAnimation() {
    return this.animalAnimation;
  }
  public getMaxMovingDistanceX() {
    return this.maxMovingDistanceX;
  }
  public getMaxMovingDistanceY() {
    return this.maxMovingDistanceY;
  }
  public getCollider() {
    return this.collider;
  }
  public isHungryAnimal() {
    return this.isHungry;
  }
  public setIsHungry(isHungry: boolean) {
    this.isHungry = isHungry;
  }
  public getType() {
    return this.type;
  }
}
