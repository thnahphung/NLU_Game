import { _decorator, Collider2D, EventTouch, IPhysics2DContact } from "cc";
import GlobalData from "../../Utils/GlobalData";
import { CoatingComponent } from "../../Controller/CoatingComponent";
import { COATING } from "../../Utils/Const";
import DataSender from "../../Utils/DataSender";
import { AbsMenuItem } from "../Menu/AbsMenuItem";
const { ccclass, property } = _decorator;

@ccclass("Sickle")
export class Sickle extends AbsMenuItem {
  start() {
    super.start();
  }

  handleOnTouchStart(event: EventTouch): void {
    super.handleOnTouchStart(event);
  }

  handleOnTouchMove(event: EventTouch): void {
    super.handleOnTouchMove(event);
  }

  handleOnTouchEnd(event: EventTouch): void {
    super.handleOnTouchEnd(event);
    this.handleCheckHarvest();
    this.handleSendRequestHarvest();
  }

  handleOnTouchCancel(event: EventTouch): void {
    super.handleOnTouchCancel(event);
    this.handleCheckHarvest();
  }

  private handleCheckHarvest(): void {
    GlobalData.me().setHarvestStatus(false);
    if (GlobalData.me().getHarvestedStatus()) {
      CoatingComponent.me().off(COATING.HARVEST);
      return;
    }
    GlobalData.me().setHarvestedStatus(false);
  }

  handleSendRequestHarvest(): void {
    if (
      GlobalData.me().getHarvestingInformation() == null ||
      GlobalData.me().getHarvestingInformation().crop.length == 0
    ) {
      return;
    }
    //send request harvest
    DataSender.sendReqHarvest(
      GlobalData.me().getHarvestingInformation(),
      GlobalData.me().getMainArea().areaId,
      GlobalData.me().getMainUser().userId
    );
    //clear data
    GlobalData.me().setHarvestingInformation(null);
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {}
}
