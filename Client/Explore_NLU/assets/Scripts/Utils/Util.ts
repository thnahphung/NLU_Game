import { _decorator, Component, math, Node, Vec2, Vec3 } from "cc";
import { SCENES, SETTING_AREA, TYPE_ITEM } from "./Const";
const { ccclass, property } = _decorator;

@ccclass("Util")
export class Util {
  public static convertAngleToVector(angle: number) {
    return new Vec3(Math.cos(angle), Math.sin(-angle));
  }

  public static toVec3(vec2: Vec2) {
    return new Vec3(vec2.x, vec2.y, 0);
  }

  public static getSpawnPosScene(
    sceneName: string | SCENES,
    oldSceneName?: string | SCENES
  ): Vec3 {
    if (oldSceneName) {
      for (const setting of SETTING_AREA) {
        if (setting.sceneName === sceneName) {
          for (const spawnPos of setting.spawnPos) {
            if (spawnPos.oldSceneName === oldSceneName) {
              return spawnPos.spawnPos;
            }
          }
        }
      }
    }
    for (const setting of SETTING_AREA) {
      if (setting.sceneName === sceneName) {
        return setting.spawnPos[0].spawnPos;
      }
    }
  }

  public static convertProtoPosToCocosPos(protoPos: proto.IPosition): Vec3 {
    return new Vec3(protoPos.x, protoPos.y, 0);
  }

  public static convertCocosPosToProtoPos(cocosPos: Vec3): proto.IPosition {
    const pos: proto.IPosition = new proto.Position();
    pos.x = cocosPos.x;
    pos.y = cocosPos.y;
    return pos;
  }

  public static randomInRange(min: number, max: number): number {
    return Math.floor(math.random() * (max - min + 1) + min);
  }

  public static typeItemfromValue(value: string): TYPE_ITEM {
    for (const key in TYPE_ITEM) {
      if (TYPE_ITEM[key] === value) {
        return key as TYPE_ITEM;
      }
    }
  }

  public static convertDashToUnderscore(str: string): string {
    return str.replace(/-/g, "_");
  }
  public static removeDash(inputString: string): string {
    return inputString.replace(/-/g, "");
  }

  public static formatNumber(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public static formatAmount(n: number): string {
    return n > 99 ? "99+" : n.toString();
  }
}
