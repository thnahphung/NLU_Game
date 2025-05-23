import { _decorator, Component, game, Node, PhysicsSystem2D } from "cc";
import AbsScene from "./AbsScene";
const { ccclass, property } = _decorator;

@ccclass("KiotScene")
export class KiotScene extends AbsScene {
  protected onLoad(): void {
    super.onLoad();
  }
  start() {
    super.start();
  }

  update(deltaTime: number) {
    super.update(deltaTime);
  }
}
