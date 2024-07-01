import { _decorator, Component, Node } from "cc";
import { PlayerManager } from "../Manager/PlayerManager";
import { CHARACTERS } from "../Utils/Const";
import AbsScene from "./AbsScene";
import GlobalData from "../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("VeterinarianScene")
export class VeterinarianScene extends AbsScene {
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
