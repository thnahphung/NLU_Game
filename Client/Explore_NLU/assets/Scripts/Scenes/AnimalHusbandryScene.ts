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
import { AnimalMovement } from "../Prefabs/Animal/AnimalMovement";
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
      if (packet.resSellAnimal) {
        this.onSellAnimalHandler(packet);
      }
      if (packet.resDiagnosisAnimal) {
        this.onDiagnosisAnimalHandler(packet.resDiagnosisAnimal);
      }
      if (packet.resDiagnosisOwnerOfAnimal) {
        this.onDiagnosisOwnerOfAnimalHandler(packet.resDiagnosisOwnerOfAnimal);
      }
      if (packet.resDiagnosisAnimalOtherPlayer) {
        this.onDiagnosisAnimalOtherPlayerHandler(
          packet.resDiagnosisAnimalOtherPlayer
        );
      }
      if (packet.resAnimalMoving) {
        this.onAnimalMovingHandler(packet.resAnimalMoving);
      }
      if (packet.resUpgradeCage) {
        this.onUpgradeCageHandler(packet.resUpgradeCage);
      }
    });
  }

  onUpgradeCageHandler(packet: proto.IResUpgradeCage) {
    if (packet.status == 400) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(t("label_text.upgrade_cage_400"));
      return;
    }

    AudioManger.me().playOneShot(AUDIOS.LEVEL_UP);
    const cageProto = packet.cage;
    const oldCageNode = this.getCageNodeById(packet.cage.propertyBuilding.id);
    cageProto.animals = oldCageNode.getComponent(Cage).getCage().animals;
    oldCageNode.destroy();
    this.cagesNode = this.cagesNode.filter(
      (cageNode) =>
        cageNode.getComponent(Cage).getCage().propertyBuilding.id !=
        oldCageNode.getComponent(Cage).getCage().propertyBuilding.id
    );

    const newCageNode = this.createCageNode(packet.cage);
    this.playerLayer.addChild(newCageNode);
    this.cagesNode.push(newCageNode);
    if (GlobalData.me().isMainArea()) {
      GlobalData.me().getMainUser().gold = packet.gold;
      UICanvas.me().loadGold();
    }
  }

  onAnimalMovingHandler(packet: proto.IResAnimalMoving) {
    const animalNode = this.getAnimalNode(packet.animalId);
    if (animalNode) {
      animalNode
        .getComponent(AnimalMovement)
        .movingToTarget(Util.convertProtoPosToCocosPos(packet.targetPosition));
    }
  }

  onDiagnosisAnimalOtherPlayerHandler(
    packet: proto.IResDiagnosisAnimalOtherPlayer
  ) {
    if (packet.status == 200) {
      const animalNode = this.getAnimalNode(packet.animalId);
      animalNode.getComponent(Animal).setIsDiseaseAnimal(false);
    }
  }

  onDiagnosisOwnerOfAnimalHandler(packet: proto.IResDiagnosisOwnerOfAnimal) {
    if (packet.status == 403) {
      UICanvas.me().showPopupMessage(
        t("label_text.diagnosis_owner_of_animal_403")
      );
      return;
    }

    GlobalData.me().getMainUser().gold = packet.gold;
    UICanvas.me().loadGold();

    if (packet.status == 404) {
      UICanvas.me().showPopupMessage(
        t("label_text.diagnosis_owner_of_animal_404")
      );
      return;
    }

    if (packet.status == 200) {
      const animalNode = this.getAnimalNode(packet.animalId);
      animalNode.getComponent(Animal).setIsDiseaseAnimal(false);
      UICanvas.me().showPopupMessage(
        t("label_text.diagnosis_owner_of_animal_200")
      );
      return;
    }
  }

  onDiagnosisAnimalHandler(packet: proto.IResDiagnosisAnimal) {
    if (packet.status == 400) {
      UICanvas.me().showPopupMessage(t("label_text.diagnosis_animal_400"));
      return;
    }
    if (packet.status == 401) {
      UICanvas.me().showPopupMessage(t("label_text.diagnosis_animal_401"));
      return;
    }
    if (packet.status == 402) {
      UICanvas.me().showPopupMessage(t("label_text.diagnosis_animal_402"));
      return;
    }

    GlobalData.me().addWarehouseItem(packet.warehouseItem);
    GlobalData.me().getMainUser().gold = packet.gold;
    UICanvas.me().loadGold();

    if (packet.status == 405) {
      UICanvas.me().showPopupMessage(t("label_text.diagnosis_animal_405"));
      return;
    }

    if (packet.status == 200) {
      UICanvas.me().showPopupMessage(t("label_text.diagnosis_animal_200"));
      const animalNode = this.getAnimalNode(packet.animalId);
      animalNode.getComponent(Animal).setIsDiseaseAnimal(false);
      return;
    }
  }

  onSellAnimalHandler(packet: proto.IPacket) {
    if (packet.resSellAnimal.status == 400) {
      UICanvas.me().showPopupMessage(t("label_text.sell_animal_400"));
      return;
    }

    if (packet.resSellAnimal.status == 402) {
      UICanvas.me().showPopupMessage(t("label_text.sell_animal_402"));
      return;
    }

    const cageNode = this.cagesNode.find(
      (cage) =>
        cage.getComponent(Cage).getCage().propertyBuilding.id ==
        packet.resSellAnimal.cageId
    );
    cageNode.getComponent(Cage).deleteAnimalById(packet.resSellAnimal.animalId);
    if (GlobalData.me().isMainArea()) {
      GlobalData.me().getMainUser().gold = packet.resSellAnimal.gold;
      UICanvas.me().loadGold();
    }
  }

  onAnimalDiseaseHandle(packet: proto.IPacket) {
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
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(
        t("label_text.add_animal_not_enough_animal")
      );
      return;
    }
    if (packet.resAddAnimalToCage.status == 401) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(
        t("label_text.add_animal_not_enough_capacity")
      );
      return;
    }
    for (let cageNode of this.cagesNode) {
      if (
        cageNode.getComponent(Cage).getCage().propertyBuilding.id ==
        packet.resAddAnimalToCage.animal.cageId
      ) {
        cageNode
          .getComponent(Cage)
          .addAnimalData(packet.resAddAnimalToCage.animal);
        cageNode.getComponent(Cage).addAnimal(packet.resAddAnimalToCage.animal);
      }
    }
    if (GlobalData.me().isMainArea()) {
      GlobalData.me().addWarehouseItem(packet.resAddAnimalToCage.warehouseItem);
    }
  }

  onBuyCageHandler(packet: proto.IPacket) {
    if (packet.resBuyCage.status == 400) {
      AudioManger.me().playOneShot(AUDIOS.WRONG);
      UICanvas.me().showPopupMessage(t("label_text.buy_shop_not_enough_gold"));
      return;
    }

    const cageNode = this.createCageNode(packet.resBuyCage.cage);
    this.playerLayer.addChild(cageNode);
    this.cagesNode.push(cageNode);
    if (GlobalData.me().isMainArea()) {
      GlobalData.me().getMainUser().gold = packet.resBuyCage.gold;
      UICanvas.me().loadGold();
    }
  }

  onLoadCagesHandler(packet: proto.IPacket) {
    this.cages = packet.resLoadCages.cages;
    this.createCages();
  }

  onAnimalEatHandle(packet: proto.IPacket) {
    if (packet.resAnimalEat.status == 400) {
      UICanvas.me().showPopupMessage(
        t("label_text.animal_eat_not_enough_food")
      );
      return;
    }
    let animalId = packet.resAnimalEat.propertyAnimalId;
    this.cagesNode.forEach((cageNode) => {
      cageNode.getComponent(Cage).animalEat(animalId);
    });
    if (GlobalData.me().isMainArea()) {
      GlobalData.me().addWarehouseItem(packet.resAnimalEat.warehouseItem);
    }
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

  public getAnimalNode(animalId: number): Node {
    for (let cageNode of this.cagesNode) {
      const animalNode = cageNode.getComponent(Cage).getAnimalById(animalId);
      if (animalNode) {
        return animalNode;
      }
    }
  }

  public getCageNodeById(cageId: number): Node {
    for (let cageNode of this.cagesNode) {
      if (cageNode.getComponent(Cage).getCage().propertyBuilding.id == cageId) {
        return cageNode;
      }
    }
  }
}
