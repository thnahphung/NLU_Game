import { _decorator, Collider2D, Component, IPhysics2DContact, Node } from "cc";
import { AbsMenuItem } from "./AbsMenuItem";
import { Animal } from "../Animal/Animal";
import { ANIMAL } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("MenuAnimalFoodItem")
export class MenuAnimalFoodItem extends AbsMenuItem {
  @property private typeAnimal: string;

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    const animal = otherCollider.getComponent(Animal);
    if (animal.getType() === this.typeAnimal && animal.isHungryAnimal()) {
      this.setAmount(this.amount - 1);
    }
  }
}
