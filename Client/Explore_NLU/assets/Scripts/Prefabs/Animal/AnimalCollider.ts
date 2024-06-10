import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
  PhysicsSystem2D,
} from "cc";
import { Animal } from "./Animal";
import { ANIMAL, ANIMAL_FOOD, ANIMAL_STATE } from "../../Utils/Const";
import { MenuItem } from "../Menu/MenuItem";
const { ccclass, property } = _decorator;

@ccclass("AnimalCollider")
export class AnimalCollider extends Component {
  private animalInfo: Animal;
  start() {
    this.animalInfo = this.node.getComponent(Animal);

    let collider = this.animalInfo.getCollider();
    if (collider !== null) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (this.animalInfo.isHungryAnimal() === false) return;
    if (
      this.isCowFood(otherCollider.node) ||
      this.isChickenFood(otherCollider.node)
    ) {
      this.eat(otherCollider.node);
    }
  }
  private eat(otherCollider: Node) {
    if (this.animalInfo.getCurrentState() === ANIMAL_STATE.IDLE_RIGHT) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.EAT_RIGHT);
    } else if (this.animalInfo.getCurrentState() === ANIMAL_STATE.IDLE_LEFT) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.EAT_LEFT);
    }
    otherCollider.getComponent(MenuItem).downAmount();
    this.animalInfo.setIsHungry(false);
  }

  private isCowFood(otherCollider: Node) {
    return (
      this.node.getComponent(Animal).getType() === ANIMAL.COW &&
      otherCollider.name === ANIMAL_FOOD.HAY
    );
  }
  private isChickenFood(otherCollider: Node) {
    return (
      this.node.getComponent(Animal).getType() === ANIMAL.CHICKEN &&
      otherCollider.name === ANIMAL_FOOD.PADDY_GRAIN
    );
  }
}
