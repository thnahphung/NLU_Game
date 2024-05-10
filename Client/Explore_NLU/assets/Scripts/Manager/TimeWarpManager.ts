import { _decorator, Component, director, Node, PhysicsSystem2D } from "cc";
const { ccclass, property } = _decorator;

@ccclass("TimeWarpManager")
export class TimeWarpManager extends Component {
  protected static _instance: TimeWarpManager;
  public static me(): TimeWarpManager {
    return this._instance;
  }

  protected onLoad(): void {
    if (TimeWarpManager._instance != null) {
      console.log("Only 1 TimeWarpManager allow to exist");
      this.node.destroy();
      return;
    }
    TimeWarpManager._instance = this;
    director.addPersistRootNode(this.node);
  }
  protected lateUpdate(dt: number): void {
    PhysicsSystem2D.instance.fixedTimeStep = dt;
  }
}
