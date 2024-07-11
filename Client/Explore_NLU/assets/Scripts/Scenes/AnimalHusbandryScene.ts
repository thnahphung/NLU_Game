import { _decorator, Node } from "cc";
import AbsScene from "./AbsScene";
const { ccclass, property } = _decorator;

@ccclass("AnimalHusbandryScene")
export class AnimalHusbandryScene extends AbsScene {
  protected onLoad(): void {
    super.onLoad();
  }
  start() {
    super.start();
  }

  update(deltaTime: number) {
    super.update(deltaTime);
  }

  onClickBuyCage() {}
}
