import { _decorator, Component } from "cc";
import { Character } from "./Character";
import { CharacterState } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("CharacterAnimation")
export class CharacterAnimation extends Component {
  private characterInfo: Character;
  private oldAnimation: string;

  start() {
    this.characterInfo = this.node.getComponent(Character);
  }

  protected update(dt: number): void {
    this.changeAnimation(this.characterInfo.getCurrentState());
  }

  changeAnimation(state: CharacterState) {
    if (this.oldAnimation === state) return;
    this.oldAnimation = state;
    this.characterInfo.getAnimation().play(state);
  }
}
