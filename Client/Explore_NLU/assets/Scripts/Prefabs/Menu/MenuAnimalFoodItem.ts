import { _decorator, Collider2D, Component, IPhysics2DContact, Node } from "cc";
import { AbsMenuItem } from "./AbsMenuItem";
import { Animal } from "../Animal/Animal";
import { ANIMAL } from "../../Utils/Const";
import GlobalData from "../../Utils/GlobalData";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("MenuAnimalFoodItem")
export class MenuAnimalFoodItem extends AbsMenuItem {
  @property private typeAnimal: string;
  private amountFood: number = 0;

  start(): void {
    super.start();
    this.amountFood = this.getAmountFood();
    this.setAmount(this.amountFood);
  }

  protected update(dt: number): void {
    if (this.amountFood !== this.getAmountFood()) {
      this.amountFood = this.getAmountFood();
      this.setAmount(this.amountFood);
    }
  }

  public getAmountFood(): number {
    let typeFood: string;
    switch (this.typeAnimal) {
      case ANIMAL.COW:
        typeFood = "hay";
        break;
      case ANIMAL.CHICKEN:
        typeFood = "paddy-grain";
        break;
    }
    return (
      GlobalData.me()
        .getWarehouseItems()
        .find((item) => item.noGrowthItem.name === typeFood)?.quantity || 0
    );
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    const animal = otherCollider.getComponent(Animal);
    if (animal.getType() === this.typeAnimal && animal.isHungryAnimal()) {
      DataSender.sendReqAnimalEat(animal.getAnimal().id);
    }
  }
}
