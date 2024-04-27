import { _decorator, Component, Node, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Util")
export class Util extends Component {
  public static convertAngleToVector(angle: number) {
    return new Vec3(Math.cos(angle), Math.sin(-angle));
  }
  public static toVec3(vec2: Vec2) {
    return new Vec3(vec2.x, vec2.y, 0);
  }
}
