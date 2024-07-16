import {
  _decorator,
  Camera,
  Collider,
  Collider2D,
  Component,
  Contact2DType,
  director,
  EventTouch,
  find,
  IPhysics2DContact,
  Label,
  Node,
  UITransform,
  Vec2,
  Vec3,
} from "cc";
import { Util } from "../../Utils/Util";
const { ccclass, property } = _decorator;

@ccclass("AbsMenuItem")
export abstract class AbsMenuItem extends Component {
  @property(Label) protected amountLabel: Label;
  @property(Collider2D) protected collider: Collider2D;

  protected amount: number = 0;
  protected originalPosition: Vec3;
  protected cameraCanvas: Camera;
  protected cameraInGame: Camera;

  start() {
    this.cameraCanvas = find("UICanvas/Camera").getComponent(Camera);
    this.cameraInGame = find("Canvas/Camera").getComponent(Camera);
    this.originalPosition = this.node.getPosition();
    if (this.node.name == "Pickaxe" || this.node.name == "Sickle") {
      this.originalPosition = new Vec3(0, 0, 0);
    }
    this.node.on(Node.EventType.TOUCH_START, this.handleOnTouchStart, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.handleOnTouchMove, this);
    this.node.on(Node.EventType.TOUCH_END, this.handleOnTouchEnd, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.handleOnTouchCancel, this);

    if (this.amountLabel) {
      this.amountLabel.string = this.amount.toString();
    }

    if (this.collider !== null) {
      this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  protected handleOnTouchStart(event: EventTouch) {
    this.moveNode(event.getLocation());
  }

  protected handleOnTouchMove(event: EventTouch) {
    this.moveNode(event.getLocation());
  }

  protected handleOnTouchEnd(event: EventTouch) {
    this.collider.node.active = false;
    this.node.setPosition(this.originalPosition);
  }

  protected handleOnTouchCancel(event: EventTouch) {
    this.collider.node.active = false;
    this.node.setPosition(this.originalPosition);
  }

  protected moveNode(location: Vec2) {
    this.moveSprite(location);
    this.moveCollider(location);
  }

  public moveSprite(location: Vec2) {
    const worldPos = this.cameraCanvas.screenToWorld(
      new Vec3(location.x, location.y, 0)
    );
    const newLocation = this.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(worldPos);
    this.node.setPosition(newLocation);
  }

  public moveCollider(location: Vec2) {
    const worldPos = this.cameraInGame.screenToWorld(
      new Vec3(location.x, location.y, 0)
    );
    const newLocation = this.collider.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(worldPos);
    this.collider.node.setPosition(newLocation);
    if (!this.collider.node.active) {
      this.collider.node.active = true;
    }
  }

  public setAmount(amount: number) {
    this.amount = amount;
    this.amountLabel.string = Util.formatAmount(this.amount);
  }

  public abstract onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  );

  protected onDestroy(): void {
    this.node.off(Node.EventType.TOUCH_START, this.handleOnTouchStart, this);
    this.node.off(Node.EventType.TOUCH_MOVE, this.handleOnTouchMove, this);
    this.node.off(Node.EventType.TOUCH_END, this.handleOnTouchEnd, this);
    this.node.off(Node.EventType.TOUCH_CANCEL, this.handleOnTouchCancel, this);
  }
}
