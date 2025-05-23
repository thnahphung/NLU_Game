import {
  _decorator,
  Component,
  director,
  misc,
  Node,
  screen,
  UITransform,
  Vec3,
  view,
} from "cc";
import GlobalData from "../../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("CameraFollow")
export class CameraFollow extends Component {
  @property(Node) public target: Node = null;
  @property public moveSpeed: number = 50;
  @property private backgroundWidth: number = 0;
  @property private backgroundHeight: number = 0;

  private canvasWidth: number;
  private canvasHeight: number;
  private isChangeScene: boolean = false;

  protected start(): void {
    if (this.target == null) this.target = GlobalData.me().getMainUserNode();
    const ratioWindow = screen.windowSize.width / screen.windowSize.height;
    const ratioDesign =
      view.getDesignResolutionSize().width /
      view.getDesignResolutionSize().height;
    this.canvasHeight =
      view.getDesignResolutionSize().height +
      ((ratioDesign - ratioWindow) / 2) * view.getDesignResolutionSize().height;
    director
      .getScene()
      .getChildByName("UICanvas")
      .getComponent(UITransform)
      .setContentSize(view.getDesignResolutionSize().width, this.canvasHeight);
    this.canvasWidth = view.getDesignResolutionSize().width;
  }

  protected lateUpdate(dt: number): void {
    if (this.target != null && this.target.position != null) {
      const targetPosition: Vec3 = this.target.getPosition();
      const maxX = (this.backgroundWidth - this.canvasWidth) / 2;
      const maxY = (this.backgroundHeight - this.canvasHeight) / 2;
      targetPosition.x = misc.clampf(targetPosition.x, -maxX, maxX);
      targetPosition.y = misc.clampf(targetPosition.y, -maxY, maxY);
      if (!this.isChangeScene) {
        this.node.setPosition(new Vec3(targetPosition.x, targetPosition.y, 0));
        this.isChangeScene = true;
        return;
      }
      this.node.position = Vec3.lerp(
        this.node.position,
        this.node.position,
        targetPosition,
        this.moveSpeed * dt
      );
    }
  }

  updateTargetFollow(target: Node): void {
    this.target = target;
  }
}
