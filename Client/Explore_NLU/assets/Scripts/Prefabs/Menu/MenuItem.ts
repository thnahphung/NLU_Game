import {
  _decorator,
  Camera,
  Component,
  director,
  EventTouch,
  find,
  Label,
  Node,
  UITransform,
  Vec2,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("MenuItem")
export class MenuItem extends Component {
  private originalPosition: Vec3;
  @property private amount: number = 0;
  @property(Label) private amountLabel: Label;

  start() {
    this.originalPosition = this.node.getPosition();
    this.node.on(Node.EventType.TOUCH_START, this.handleOnTouchStart, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.handleOnTouchMove, this);
    this.node.on(Node.EventType.TOUCH_END, this.handleOnTouchEnd, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.handleOnTouchCancel, this);

    this.amountLabel.string = this.amount.toString();
  }

  private handleOnTouchStart(event: EventTouch) {
    this.moveNode(event.getLocation());
  }

  private handleOnTouchMove(event: EventTouch) {
    this.moveNode(event.getLocation());
  }

  private handleOnTouchEnd(event: EventTouch) {
    this.node.setPosition(this.originalPosition);
  }

  private handleOnTouchCancel(event: EventTouch) {
    this.node.setPosition(this.originalPosition);
  }

  private moveNode(location: Vec2) {
    const camera = find("Canvas/Camera").getComponent(Camera);
    const worldPos = camera.screenToWorld(new Vec3(location.x, location.y, 0));
    const newLocation = this.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(worldPos);
    this.node.setPosition(newLocation);
  }

  public downAmount(downNumber?: number) {
    if (downNumber) {
      this.amount -= downNumber;
    } else {
      this.amount--;
    }
    this.amountLabel.string = this.amount.toString();
  }
}
