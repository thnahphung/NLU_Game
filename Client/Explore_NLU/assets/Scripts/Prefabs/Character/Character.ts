import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Character")
export class Character extends Component {
  private userId = null;

  public setUserId(userId: number) {
    this.userId = userId;
  }

  public getUserId() {
    return this.userId;
  }
}
