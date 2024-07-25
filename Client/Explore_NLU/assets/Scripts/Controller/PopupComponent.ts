import {
  _decorator,
  Component,
  Node,
  tween,
  UIOpacity,
  UITransform,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PopupComponent")
export class PopupComponent extends Component {
  private background: Node = null;
  private originalScale: Vec3 = null;
  protected onLoad(): void {
    this.background = this.node.getChildByName("BlackBackground");
    this.originalScale = this.background ? this.background.scale.clone() : null;
    this.node.scale = new Vec3(0, 0, 0);
  }

  public show() {
    tween(this.node)
      .call(() => {
        if (this.background) this.background.active = true;
        this.node.active = true;
      })
      .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: "backOut" })
      .start();
  }

  public hide() {
    tween(this.node)
      .call(() => {
        if (this.background) this.background.active = false;
      })
      .to(0.3, { scale: new Vec3(0, 0, 0) }, { easing: "backIn" })
      .call(() => {
        this.node.active = false;
      })
      .start();
  }

  showSlideIn() {
    const uiTransform = this.node.getComponent(UITransform);
    tween(this.node)
      .call(() => {
        this.node.scale = new Vec3(1, 1, 1);
        this.node.active = true;
      })
      .to(0.5, { position: new Vec3(-300, -160, 0) }, { easing: "backOut" })
      .start();
  }

  update(deltaTime: number) {
    if (!this.background) return;
    const nodeScale = this.node.scale;
    const counterScale = new Vec3(
      1 / nodeScale.x + 0.1,
      1 / nodeScale.y + 0.1,
      1 / nodeScale.z + 0.1
    );
    this.background.scale = this.originalScale.clone().multiply(counterScale);
  }
}
