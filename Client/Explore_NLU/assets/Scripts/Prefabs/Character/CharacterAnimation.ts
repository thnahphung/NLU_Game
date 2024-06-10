import { _decorator, Component } from "cc";
import { Character } from "./Character";
import { CHARACTER_STATE } from "../../Utils/Const";
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

  changeAnimation(state: CHARACTER_STATE) {
    if (this.oldAnimation === state) return;
    this.oldAnimation = state;
    this.characterInfo.getAnimation().play(state);
  }
}
