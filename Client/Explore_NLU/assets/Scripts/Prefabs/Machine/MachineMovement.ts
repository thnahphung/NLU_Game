import { _decorator, Component, Node, tween, Vec3 } from "cc";
import { Machine } from "./Machine";
import GlobalData from "../../Utils/GlobalData";
import DataSender from "../../Utils/DataSender";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("MachineMovement")
export class MachineMovement extends Component {
  private machine: Machine;
  private duration: number = 0.2;

  start() {
    this.machine = this.node.getComponent(Machine);
    this.movingToTarget(this.getTargetMove());
  }

  public movingToTarget(target: Vec3) {
    let distance = this.node.position.clone().subtract(target).length();
    this.duration = distance / this.machine.getSpeed();
    tween(this.node.position)
      .call(() => {
        AudioManger.me().playOneShot(AUDIOS.MACHINE);
      })
      .to(this.duration, target, {
        onUpdate: (target: Vec3, ratio: number) => {
          if (this.node === null) return;
          this.node.position = target;
        },
      })
      .call(() => {
        AudioManger.me().stop();
        this.node.name == "HarvesterMachine"
          ? this.handleHarvest()
          : this.handleTilledLand();
        this.node.destroy();
      })
      .start();
  }

  private handleTilledLand(): void {
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
    GlobalData.me().setTilledLands(null);
  }

  private handleHarvest(): void {
    if (
      GlobalData.me().getHarvestingInformation() == null ||
      GlobalData.me().getHarvestingInformation().crop.length == 0
    ) {
      return;
    }
    //send request harvest
    DataSender.sendReqHarvest(
      GlobalData.me().getHarvestingInformation(),
      GlobalData.me().getArea().areaId,
      GlobalData.me().getMainUser().userId
    );
    //clear data
    GlobalData.me().setHarvestingInformation(null);
  }

  private getTargetMove(): Vec3 {
    if (this.node.name == "HarvesterMachine") {
      return new Vec3(
        this.node.getPosition().x - 165,
        this.node.getPosition().y,
        0
      );
    } else {
      return new Vec3(
        this.node.getPosition().x,
        this.node.getPosition().y - 200,
        0
      );
    }
  }
}
