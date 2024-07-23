import { _decorator, Component, Node, Sprite } from "cc";
import { ResourceManager } from "../../Manager/ResourceManager";
const { ccclass, property } = _decorator;

@ccclass("MachinePart")
export class MachinePart extends Component {
  @property(Node) sprite: Node = null;

  private noGothItem: proto.INoGrowthItem;

  init(noGothItem: proto.INoGrowthItem) {
    this.noGothItem = noGothItem;
    this.setUpMachinePart(noGothItem);
  }
  start() {}

  setUpMachinePart(noGothItem: proto.INoGrowthItem) {
    if (!noGothItem && !noGothItem.name) return;
    this.sprite.getComponent(Sprite).spriteFrame =
      ResourceManager.me().getSpriteFrame(noGothItem.name);
  }
}
