import { _decorator, Component, Node } from "cc";
import { ANIMAL_STATE } from "../../Utils/Const";
import { Animal } from "./Animal";
const { ccclass, property } = _decorator;

@ccclass("AnimalAnimation")
export class AnimalAnimation extends Component {
  private animalInfo: Animal;
  private oldAnimation: ANIMAL_STATE;
  start() {
    this.animalInfo = this.node.getComponent(Animal);
  }

  update(deltaTime: number) {
    this.changeAnimation(this.animalInfo.getCurrentState());
  }

  changeAnimation(state: ANIMAL_STATE) {
    if (this.oldAnimation === state) return;
    this.oldAnimation = state;
    this.animalInfo.getAnimation().play(state);
  }
}
