import { _decorator, Component, Node } from "cc";
import { PlayerManager } from "../Manager/PlayerManager";
import GlobalData from "../Utils/GlobalData";
import { CHARACTERS } from "../Utils/Const";
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
}
