import { _decorator, Component, Node, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PopupComponent")
export class PopupComponent extends Component {
  protected onLoad(): void {
    this.node.scale = new Vec3(0, 0, 0);
  }
  // protected start(): void {

  // }

  public show() {
    tween(this.node)
      .call(() => {
        this.node.active = true;
      })
      .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: "backOut" })
      .start();
  }

  public hide() {
    tween(this.node)
      .to(0.3, { scale: new Vec3(0, 0, 0) }, { easing: "backIn" })
      .call(() => {
        this.node.active = false;
      })
      .start();
  }
}
