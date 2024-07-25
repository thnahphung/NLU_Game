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
    if (!this.animalInfo.getIsLockedUp()) return;
    this.schedule(function () {
      this.showEmote();
    }, this.interval);
  }

  update(deltaTime: number) {
    this.changeAnimation(this.animalInfo.getCurrentState());
    if (!this.animalInfo.getIsLockedUp()) return;

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

  playEatAnimation() {
    if (this.animalInfo.getCurrentState() === ANIMAL_STATE.IDLE_RIGHT) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.EAT_RIGHT);
    } else if (this.animalInfo.getCurrentState() === ANIMAL_STATE.IDLE_LEFT) {
      this.animalInfo.setCurrentState(ANIMAL_STATE.EAT_LEFT);
    }
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
