import { _decorator, Component, Node, UITransform } from "cc";
import { ANIMAL_STATE } from "../../Utils/Const";
import { Animal } from "./Animal";
const { ccclass, property } = _decorator;

@ccclass("AnimalAnimation")
export class AnimalAnimation extends Component {
  private animalInfo: Animal;
  private oldAnimation: ANIMAL_STATE;
  @property private interval: number = 10;
  private animationCount = 0;
  start() {
    this.animalInfo = this.node.getComponent(Animal);
    this.schedule(function () {
      this.showEmote();
    }, this.interval);
  }

  update(deltaTime: number) {
    this.changeAnimation(this.animalInfo.getCurrentState());
    const position = this.animalInfo
      .getEmoteLayer()
      .getComponent(UITransform)
      .convertToNodeSpaceAR(this.animalInfo.node.worldPosition);
    this.animalInfo
      .getEmoteAnimation()
      .node.setPosition(position.x, position.y + 40);
  }

  changeAnimation(state: ANIMAL_STATE) {
    if (this.oldAnimation === state) return;
    this.oldAnimation = state;
    this.animalInfo.getAnimation().play(state);
  }

  public showEmote() {
    if (this.animationCount % 2 == 0 && this.animalInfo.isHungryAnimal()) {
      this.animalInfo.getEmoteAnimation().play("hungry-emote");
    } else if (
      this.animationCount % 2 == 1 &&
      this.animalInfo.isPregnantAnimal()
    ) {
      this.animalInfo.getEmoteAnimation().play("pregnant-emote");
    }
    this.animationCount++;
  }
}
