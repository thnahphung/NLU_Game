import { _decorator, Component, Node, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LayerComponent")
export class LayerComponent extends Component {
  @property
  private isDynamic: boolean = false;
  start() {
    this.node.setSiblingIndex(this.node.position.y);
  }

  update(deltaTime: number) {
    if (this.isDynamic) {
      const nodes = this.node.parent.children.slice();
      nodes.sort((a, b) => b.position.y - a.position.y);
      for (let i = 0, len = nodes.length; i < len; ++i) {
        nodes[i].setSiblingIndex(i);
      }
    }
  }
}
