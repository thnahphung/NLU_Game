import { _decorator, Component, game, Node, PhysicsSystem2D } from "cc";
const { ccclass, property } = _decorator;

@ccclass("KiotScene")
export class KiotScene extends Component {
  protected lateUpdate(deltaTime: number): void {
    PhysicsSystem2D.instance.fixedTimeStep = deltaTime;
  }
}
