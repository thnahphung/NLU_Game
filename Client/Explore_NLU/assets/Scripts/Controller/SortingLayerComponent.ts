import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SortingLayerComponent")
export class SortingLayerComponent extends Component {
  private timeToSort = 0.1;
  private time = 0;

  protected start(): void {
    this.time = this.timeToSort;
  }

  update(deltaTime: number) {
    this.time -= deltaTime;
    if (this.time > 0) return;
    this.time = this.timeToSort;

    const nodes = this.node.children.slice();
    nodes.sort((a, b) => b.position.y - a.position.y);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].setSiblingIndex(i);
    }
  }
}
