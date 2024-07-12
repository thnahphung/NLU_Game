import { _decorator, instantiate, Node, Prefab } from "cc";
import AbsScene from "./AbsScene";
import DataSender from "../Utils/DataSender";
import GlobalData from "../Utils/GlobalData";
import { Util } from "../Utils/Util";
import { Cage } from "../Prefabs/Cage/Cage";
const { ccclass, property } = _decorator;

@ccclass("AnimalHusbandryScene")
export class AnimalHusbandryScene extends AbsScene {
  @property([Prefab]) cagesPrefab: Prefab[] = [];

  protected onLoad(): void {
    super.onLoad();
  }

  start() {
    super.start();
    DataSender.sendReqLoadCages(GlobalData.me().getArea().areaId);
  }

  update(deltaTime: number) {}

  onMessageHandler(packets: proto.IPacketWrapper) {
    super.onMessageHandler(packets);
    packets.packet.forEach((packet) => {
      if (packet.resLoadCages) {
        this.onLoadCagesHandler(packet);
      }
    });
  }

  onLoadCagesHandler(packet: proto.IPacket) {
    let cages = packet.resLoadCages.cages;
    GlobalData.me().setCages(cages);
    this.createCages();
  }

  createCages() {
    let cages = GlobalData.me().getCages();
    cages.forEach((cage) => {
      const cageNode = this.createCageNode(cage);
      cageNode.getComponent(Cage).init(cage);
      cageNode.setPosition(
        cage.propertyBuilding.positionX,
        cage.propertyBuilding.positionY,
        0
      );
      this.playerLayer.addChild(cageNode);
    });
  }

  createCageNode(cage: proto.ICage): Node {
    for (let cagePrefab of this.cagesPrefab) {
      if (
        cagePrefab.name.toLowerCase() ==
        Util.removeDash(cage.upgrade.name.toLowerCase())
      ) {
        return instantiate(cagePrefab);
      }
    }
  }
}
