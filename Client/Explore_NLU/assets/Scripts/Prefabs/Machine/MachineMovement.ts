import { _decorator, Component, Node, tween, Vec3 } from "cc";
import { Machine } from "./Machine";
import GlobalData from "../../Utils/GlobalData";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("MachineMovement")
export class MachineMovement extends Component {
  private machine: Machine;
  private duration: number = 0.2;

  start() {
    this.machine = this.node.getComponent(Machine);
    this.movingToTarget(
      new Vec3(this.node.getPosition().x, this.node.getPosition().y - 200, 0)
    );
  }

  public movingToTarget(target: Vec3) {
    let distance = this.node.position.clone().subtract(target).length();
    this.duration = distance / this.machine.getSpeed();
    tween(this.node.position)
      .to(this.duration, target, {
        onUpdate: (target: Vec3, ratio: number) => {
          if (this.node === null) return;
          this.node.position = target;
        },
      })
      .call(() => {
        this.handleTilledLand();
        this.node.destroy();
      })
      .start();
  }

  handleTilledLand(): void {
    if (
      GlobalData.me().getTilledLands() == null ||
      GlobalData.me().getTilledLands().length == 0
    ) {
      return;
    }
    DataSender.sendReqTilledLand(
      GlobalData.me().getTilledLands(),
      GlobalData.me().getArea().areaId,
      GlobalData.me().getMainUser().userId
    );
    console.log("Tilled lands: ", GlobalData.me().getTilledLands());
    GlobalData.me().setTilledLands(null);
  }
}
