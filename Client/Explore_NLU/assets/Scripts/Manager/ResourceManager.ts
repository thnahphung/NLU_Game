import { _decorator, Component, director, Node, Prefab, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ResourceManager")
export class ResourceManager extends Component {
  protected static _instance: ResourceManager;
  @property([SpriteFrame]) private spriteFrames: SpriteFrame[] = [];
  @property([Prefab]) private prefabs: Prefab[] = [];

  protected onLoad(): void {
    if (ResourceManager._instance != null) {
      console.log("Only 1 ResourceManager allow to exist");
      this.node.destroy();
      return;
    }
    ResourceManager._instance = this;
    director.addPersistRootNode(this.node);
  }

  public static me(): ResourceManager {
    return this._instance;
  }

  public getSpriteFrame(name: string): SpriteFrame {
    for (let spriteFrame of this.spriteFrames) {
      if (spriteFrame.name == name) {
        return spriteFrame;
      }
    }
    return null;
  }
}
