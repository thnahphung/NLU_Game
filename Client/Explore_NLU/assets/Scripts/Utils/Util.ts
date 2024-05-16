import { _decorator, Component, Node, Vec2, Vec3 } from "cc";
import { ANIMAL_HUSBANDRY_AREA, SCENES, VETERINARIAN_AREA } from "./Const";
const { ccclass, property } = _decorator;

@ccclass("Util")
export class Util {
  public static convertAngleToVector(angle: number) {
    return new Vec3(Math.cos(angle), Math.sin(-angle));
  }

  public static toVec3(vec2: Vec2) {
    return new Vec3(vec2.x, vec2.y, 0);
  }

  public static getSpawnPosSceneNotCurrentScene(targetScene: string): Vec3 {
    switch (targetScene) {
      case SCENES.FARM:
        return new Vec3(0, 0, 0);
      case SCENES.ANIMAL_HUSBANDRY:
        return ANIMAL_HUSBANDRY_AREA.SPAWN_POS;
      case SCENES.MECHANICAL:
        return new Vec3(0, 0, 0);
      case SCENES.VETERINARIAN:
        return VETERINARIAN_AREA.SPAWN_POS;
      default:
        return new Vec3(0, 0, 0);
    }
  }

  public static convertProtoPosToCocosPos(protoPos: proto.IPosition): Vec3 {
    return new Vec3(protoPos.x, protoPos.y, 0);
  }

  public static convertCocosPosToProtoPos(cocosPos: Vec3): proto.IPosition {
    const pos: proto.IPosition = new proto.Position();
    pos.x = cocosPos.x;
    pos.y = cocosPos.y;
    console.debug("convertCocosPosToProtoPos", pos);
    return pos;
  }
}
