import { _decorator, instantiate, Node, Prefab } from "cc";
import AbsScene from "./AbsScene";
import DataSender from "../Utils/DataSender";
import GlobalData from "../Utils/GlobalData";
import { Util } from "../Utils/Util";
import { Cage } from "../Prefabs/Cage/Cage";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { t } from "../../../extensions/i18n/assets/LanguageData";
import { Animal } from "../Prefabs/Animal/Animal";
import { AudioManger } from "../Manager/AudioManger";
import { AUDIOS } from "../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("AnimalHusbandryScene")
export class AnimalHusbandryScene extends AbsScene {
  @property([Prefab]) private cagesPrefab: Prefab[] = [];
  private cagesNode: Node[] = [];
  private cages: proto.ICage[] = [];

  protected onLoad(): void {
    super.onLoad();
  }

  start() {
    super.start();
    DataSender.sendReqLoadCages(GlobalData.me().getArea().areaId);
  }

  onMessageHandler(packets: proto.IPacketWrapper) {
    super.onMessageHandler(packets);
    packets.packet.forEach((packet) => {
      if (packet.resLoadCages) {
        this.onLoadCagesHandler(packet);
      }
      if (packet.resAnimalEat) {
        this.onAnimalEatHandle(packet);
      }
      if (packet.resBuyCage) {
        this.onBuyCageHandler(packet);
      }
      if (packet.resAddAnimalToCage) {
        this.onAddAnimalToCageHandler(packet);
      }
      if (packet.resAnimalDisease) {
        this.onAnimalDiseaseHandle(packet);
      }
    });
  }

  onAnimalDiseaseHandle(packet: proto.IPacket) {
    console.log("onAnimalDiseaseHandle", packet);

    for (let cageNode of this.cagesNode) {
      cageNode.getComponent(Cage).changeAnimalNewDay();
    }

    for (let animalDisease of packet.resAnimalDisease.animals) {
      for (let cageNode of this.cagesNode) {
        let animalNode = cageNode
          .getComponent(Cage)
          .getAnimalById(animalDisease.id);
        if (animalNode) {
          animalNode.getComponent(Animal).setIsDiseaseAnimal(true);
        }
      }
    }
  }

  onAddAnimalToCageHandler(packet: proto.IPacket) {
    if (packet.resAddAnimalToCage.status == 400) {
      UICanvas.me().showPopupMessage(
        t("label_text.add_animal_not_enough_animal")
      );
      return;
    }
    if (packet.resAddAnimalToCage.status == 401) {
      UICanvas.me().showPopupMessage(
        t("label_text.add_animal_not_enough_capacity")
      );
      return;
    }
    GlobalData.me().addWarehouseItem(packet.resAddAnimalToCage.warehouseItem);
    for (let cageNode of this.cagesNode) {
      if (
        cageNode.getComponent(Cage).getCage().propertyBuilding.id ==
        packet.resAddAnimalToCage.animal.cageId
      )
        cageNode.getComponent(Cage).addAnimal(packet.resAddAnimalToCage.animal);
    }
  }

  onBuyCageHandler(packet: proto.IPacket) {
    if (packet.resBuyCage.status == 400) {
      UICanvas.me().showPopupMessage(t("label_text.buy_shop_not_enough_gold"));
      return;
    }

    const cageNode = this.createCageNode(packet.resBuyCage.cage);
    this.playerLayer.addChild(cageNode);
    this.cagesNode.push(cageNode);
    GlobalData.me().getMainUser().gold = packet.resBuyCage.gold;
    UICanvas.me().loadGold();
  }

  onLoadCagesHandler(packet: proto.IPacket) {
    this.cages = packet.resLoadCages.cages;
    this.createCages();
  }

  onAnimalEatHandle(packet: proto.IPacket) {
    if (packet.resAnimalEat.status == 400) {
      UICanvas.me().showPopupMessage("label_text.animal_eat_not_enough_food");
      return;
    }
    GlobalData.me().addWarehouseItem(packet.resAnimalEat.warehouseItem);
    let animalId = packet.resAnimalEat.propertyAnimalId;
    this.cagesNode.forEach((cageNode) => {
      cageNode.getComponent(Cage).animalEat(animalId);
    });
  }

  createCages() {
    this.cages.forEach((cage) => {
      const cageNode = this.createCageNode(cage);
      this.playerLayer.addChild(cageNode);
      this.cagesNode.push(cageNode);
    });
  }

  createCageNode(cage: proto.ICage): Node {
    for (let cagePrefab of this.cagesPrefab) {
      if (
        cagePrefab.name.toLowerCase() ==
        Util.removeDash(cage.upgrade.name.toLowerCase())
      ) {
        const cageNode = instantiate(cagePrefab);
        cageNode.getComponent(Cage).init(cage);
        cageNode.setPosition(
          cage.propertyBuilding.positionX,
          cage.propertyBuilding.positionY,
          0
        );
        return cageNode;
      }
    }
  }

  public getCagesNode(): Node[] {
    return this.cagesNode;
  }

  public getCages(): proto.ICage[] {
    return this.cages;
  }

  public isContainCageNode(positionX: number, positionY: number): boolean {
    for (let cageNode of this.cagesNode) {
      if (
        cageNode.position.x == positionX &&
        cageNode.position.y == positionY
      ) {
        return true;
      }
    }
    return false;
  }
}
