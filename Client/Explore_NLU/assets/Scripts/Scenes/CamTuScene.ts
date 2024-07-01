import { _decorator, Component, Node } from "cc";
import AbsScene from "./AbsScene";
const { ccclass, property } = _decorator;

@ccclass("CamTuScene")
export class CamTuScene extends AbsScene {
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
