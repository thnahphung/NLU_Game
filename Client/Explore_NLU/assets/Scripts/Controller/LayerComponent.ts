import { _decorator, Component, Node, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LayerComponent")
export class LayerComponent extends Component {
  @property
  private isDynamic: boolean = false;
  start() {
    this.node.getComponent(UITransform).priority = -this.node.position.y;
  }

  update(deltaTime: number) {
    if (this.isDynamic) {
      this.node.getComponent(UITransform).priority = -this.node.position.y;
    }
  }
}
