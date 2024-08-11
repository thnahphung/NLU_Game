import {
  _decorator,
  BlockInputEvents,
  find,
  instantiate,
  Node,
  Prefab,
  resources,
  TextAsset,
  UIOpacity,
  Vec3,
} from "cc";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { AUDIOS, REWARD_ICONS, TYPE_ITEM } from "../Utils/Const";
import AbsScene from "../Scenes/AbsScene";
import DataSender from "../Utils/DataSender";
import { PlantingLand } from "../Prefabs/Lands/PlantingLand";
import { TilledLand } from "../Prefabs/Lands/TilledLand";
import GlobalData from "../Utils/GlobalData";
import { CoatingComponent } from "../Controller/CoatingComponent";
import { SeedBag } from "../Prefabs/Tools/SeedBag";
import { Crop } from "../Prefabs/Crop/Crop";
import { Menu } from "../Prefabs/Menu/Menu";
import { SeedInformation } from "../Prefabs/Crop/SeedInformation";
import { t } from "../../../extensions/i18n/assets/LanguageData";
import { Machine } from "../Prefabs/Machine/Machine";
import { MachineInformation } from "../Prefabs/Machine/MachineInformation";
import { Util } from "../Utils/Util";
import { AudioManger } from "../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("FarmScene")
export class FarmScene extends AbsScene {
  @property(Prefab)
  public buildingSystemPrefab: Prefab = null;
  @property(Node)
  private seedMenuContent: Node = null;
  @property(Prefab)
  private bulldorzerPrefab: Prefab = null;
  @property(Prefab)
  private harvesterPrefab: Prefab = null;
  @property([Prefab])
  private buildingFarmPrefab: Prefab[] = [];

  private buildingSystem: Node = null;
  private buildingProtos: proto.IBuilding[] = [];
  private cropsProto: proto.ICrops = null;

  protected onLoad(): void {
    // Load information of farm
    this.loadFarm();

    // Load information of machines if user is supporting
    if (
      GlobalData.me().getMainUser().character.code == "KSCK" &&
      GlobalData.me().getIsSupporting()
    ) {
      this.loadMachines();
    }
  }

  protected start(): void {
    super.start();
    this.loadSeedBag();
  }

  private loadFarm() {
    // basic items
    this.loadItemsOfFarm(GlobalData.me().getArea().areaId);
  }

  private loadItemsOfFarm(areaId: number): void {
    DataSender.sendReqLoadItemsOfFarm(areaId);
  }

  private loadSeedBag(): void {
    //load seed bag
    const menuSeedComponent = UICanvas.me()
      .getMenuSeedFarm()
      .getComponent(Menu);
    GlobalData.me()
      .getWarehouseItems()
      .forEach((warehouseItem) => {
        const nameSeed = warehouseItem.noGrowthItem.name;
        if (warehouseItem.noGrowthItem.type == TYPE_ITEM.SEED) {
          this.seedMenuContent
            .getChildByName(nameSeed)
            .getComponent(SeedInformation)
            .setNoGrowItemSeedBag(warehouseItem.noGrowthItem);
          this.seedMenuContent
            .getChildByName(nameSeed)
            .getComponent(SeedInformation)
            .setQuantity(warehouseItem.quantity);
          menuSeedComponent
            .getMenuItemNode(nameSeed)
            .getComponent(SeedBag)
            .setAmount(warehouseItem.quantity);
        }
      });
  }

  private loadMachines(): void {
    DataSender.sendLoadMachines(GlobalData.me().getMainArea().areaId);
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    packets.packet.forEach((packet) => {
      if (packet.resLoadItemsOfFarm) {
        this.onLoadItemsOfFarmMsgHandler(packet.resLoadItemsOfFarm);
      }
      if (packet.resBuyBuilding) {
        this.handleResBuyBuilding(packet.resBuyBuilding);
      }
      if (packet.resSow) {
        this.handleResSow(packet.resSow);
      }
      if (packet.resHarvest) {
        this.handleResHarvest(packet.resHarvest);
      }
      if (packet.resAddProduct) {
        this.handleResAddProduct(packet.resAddProduct);
      }
      if (packet.resTillLand) {
        this.handleResTillLand(packet.resTillLand);
      }
      if (packet.resTillLandByMachine) {
        this.handleResTillLandByMachine(packet.resTillLandByMachine);
      }
      if (packet.resHarvestByMachine) {
        this.handleResHarvestByMachine(packet.resHarvestByMachine);
      }
      if (packet.resLoadMachines) {
        this.onLoadMachine(packet.resLoadMachines);
      }
      if (packet.resBrokenMachine) {
        this.handleResBrokenMachine(packet.resBrokenMachine);
      }
    });
  }

  private handleResBrokenMachine(
    resBrokenMachine: proto.IResBrokenMachine
  ): void {
    const machineName = resBrokenMachine.machineName;
    const energyMachine = resBrokenMachine.machineEnergy;
    this.setupMachineTool(machineName, energyMachine);
    UICanvas.me().showPopupMessage(t("label_text.mac_reduce_energy"));
  }

  private onLoadMachine(resLoadMachines: proto.IResLoadMachines): void {
    const propertyMachines = resLoadMachines.propertyMachines;
    resLoadMachines.noGrowthItem.forEach((noGrowthItem) => {
      const propertyMachine = propertyMachines.find(
        (propertyMachine) => propertyMachine.noGrowthItemId === noGrowthItem.id
      );
      if (propertyMachine) {
        this.setupMachineTool(
          noGrowthItem.name,
          propertyMachine.energy,
          propertyMachine.speed,
          propertyMachine.power
        );
      }
    });
  }

  private setupMachineTool(
    machineName: string,
    energyMachine: number,
    speedMachine?: number,
    powerMachine?: number
  ): void {
    const menuMachineComponent = UICanvas.me()
      .getMenuMechanical()
      .getComponent(Menu);
    let machineNode = menuMachineComponent.getMenuItemNode(machineName);
    if (!machineNode) return;
    let machineInformation = machineNode.getComponent(MachineInformation);
    if (!speedMachine || !powerMachine) {
      machineInformation.setEnergy(Util.setColorEnergy(energyMachine));
    } else {
      let energy = Util.setColorEnergy(energyMachine);
      let power = powerMachine.toString();
      let speed = speedMachine.toString();
      machineInformation.init(speed, power, energy);
    }
  }

  private handleResTillLand(resTillLand: proto.IResTillLand): void {
    const rewards = resTillLand.rewards;
    const areaId = resTillLand.areaId;
    if (
      rewards &&
      GlobalData.me().getMainArea().areaId != areaId &&
      GlobalData.me().getMainUser().userId == resTillLand.supportUserId
    ) {
      this.displayReward(rewards);
      GlobalData.me().getMainUser().gold = resTillLand.gold;
      GlobalData.me().getMainUser().experiencePoints = resTillLand.exp;
      UICanvas.me().loadGold();
      UICanvas.me().loadExp();
    }
    const tillLandResProtos = resTillLand.tillLands;
    const plantingLandPanel = find("Canvas/BackGroundLayer/PlantingPanel");
    const plantingLands = plantingLandPanel.children;
    // Chỉ lấy những mảnh đất trồng cần xử lý
    let filteredPlantingLands: Node[] = plantingLands.filter((plantingLand) =>
      tillLandResProtos.some(
        (tillLandProto) =>
          tillLandProto.plantingLandId ===
          plantingLand.getComponent(PlantingLand).plantingLandProto
            .propertyBuilding.id
      )
    );

    filteredPlantingLands.forEach((plantingLand: Node) => {
      let component = plantingLand.getComponent(PlantingLand);
      let tillLands = component.getTilledLandPanel().children;
      tillLands.forEach((tillLand: Node) => {
        let tillLandProtos = tillLand
          .getComponent(TilledLand)
          .getTillLandProto();
        // Xử lý cày đất
        let tillLandResProto = tillLandResProtos.find((tillLand) => {
          return tillLand.id == tillLandProtos.id;
        });
        if (tillLandResProto) {
          tillLand.getComponent(TilledLand).handleTilledLand();
        }
      });
    });
  }

  private handleResAddProduct(resAddProduct: proto.IResAddProduct): void {
    const warehouseItems = resAddProduct.warehouseItem;
    if (!warehouseItems || warehouseItems.length == 0) return;
    warehouseItems.forEach((warehouseItem) => {
      GlobalData.me().addWarehouseItem(warehouseItem);
    });
  }

  private handleResHarvest(resHarvest: proto.IResHarvest): void {
    const crops = resHarvest.crops;
    const mainUserId = resHarvest.mainUserId;
    if (
      resHarvest.supportUserId &&
      GlobalData.me().getMainUser().userId == resHarvest.supportUserId
    ) {
      this.displayReward(resHarvest.supportRewards);
      GlobalData.me().getMainUser().gold = resHarvest.supportGold;
      GlobalData.me().getMainUser().experiencePoints = resHarvest.supportExp;
      UICanvas.me().loadGold();
      UICanvas.me().loadExp();
    }
    if (GlobalData.me().getMainUser().userId == mainUserId) {
      this.displayReward(resHarvest.rewards);
      GlobalData.me().getMainUser().experiencePoints = resHarvest.exp;
      UICanvas.me().loadExp();
    }
    this.deleteCropFromLand(crops);
  }

  private displayReward(rewardProtos: proto.IReward[]): void {
    const rewards = [];
    rewardProtos.forEach((rewardProto) => {
      let typeReward = "";
      let name = "";
      if (rewardProto.name == "Experience") {
        name = t("label_text.experience_point");
        typeReward = REWARD_ICONS.EXPERIENCE_POINT;
      } else if (rewardProto.name == "Gold") {
        name = rewardProto.name;
        typeReward = REWARD_ICONS.GOLD;
      } else {
        typeReward = rewardProto.name.toLowerCase();
        console.log(
          "typeReward: ",
          typeReward,
          Util.convertDashToUnderscore(rewardProto.name.toLowerCase())
        );
        name = t(
          "label_text." +
            Util.convertDashToUnderscore(rewardProto.name.toLowerCase())
        );
      }
      rewards.push({
        name: name,
        quantity: rewardProto.quantity,
        reward: typeReward,
      });
    });
    AudioManger.me().playOneShot(AUDIOS.LEVEL_UP);
    UICanvas.me().showListRewardEffect(rewards);
  }

  private deleteCropFromLand(crops: proto.ICrop[]): void {
    const plantingLandPanel = find("Canvas/BackGroundLayer/PlantingPanel");
    const plantingLands = plantingLandPanel.children;
    // Chỉ lấy những mảnh đất trồng có cây trồng cần xóa
    let filteredPlantingLands: Node[] = plantingLands.filter((plantingLand) =>
      crops.some(
        (crop) =>
          crop.tillLand.plantingLandId ===
          plantingLand.getComponent(PlantingLand).plantingLandProto
            .propertyBuilding.id
      )
    );
    filteredPlantingLands.forEach((plantingLand: Node) => {
      let component = plantingLand.getComponent(PlantingLand);
      let tillLands = component.getTilledLandPanel().children;
      tillLands.forEach((tillLand: Node) => {
        let tillLandProto = tillLand
          .getComponent(TilledLand)
          .getTillLandProto();
        // Xóa cây trồng
        let cropProto = crops.filter((crop) => {
          return crop.tillLand.id == tillLandProto.id;
        })[0];
        if (cropProto) {
          tillLand.getComponent(TilledLand).deleteCrop();
        }
      });
    });
  }

  onLoadItemsOfFarmMsgHandler(
    resLoadItemsOfFarm: proto.IResLoadItemsOfFarm
  ): void {
    let plantingLandPanel = find("Canvas/BackGroundLayer/PlantingPanel");
    plantingLandPanel.removeAllChildren();
    // Load tất cả các item cần hiển thị trên trang trại
    resLoadItemsOfFarm.buildingItems.building.forEach((building) => {
      this.buildingProtos.push(building);
    });
    // Lưu lại thông tin của cây trồng
    this.cropsProto = resLoadItemsOfFarm.crops;
    // Hiển thị các item cần thiết lên trang trại
    this.loadBasicItemsToUI();
  }

  private handleResBuyBuilding(resBuyBuilding: proto.IResBuyBuilding): void {
    if (resBuyBuilding.status == 400) {
      UICanvas.me().showPopupMessage("Không đủ tiền mua đất trồng!");
    }
    let plantingLandPanel = find("Canvas/BackGroundLayer/PlantingPanel");
    let plantingLands = plantingLandPanel.children;
    for (let plantingLand of plantingLands) {
      if (plantingLand.uuid == resBuyBuilding.uuid) {
        if (resBuyBuilding.status == 400) {
          plantingLand.destroy();
          return;
        }
        let plantingLandComponent = plantingLand.getComponent(PlantingLand);
        plantingLandComponent.plantingLandProto =
          resBuyBuilding.building.plantingLandBuilding;

        let tillLands = plantingLandComponent.getTilledLandPanel().children;
        tillLands.forEach((tillLand: Node, index: number) => {
          let tillLandProto =
            resBuyBuilding.building.plantingLandBuilding.tillLands[index];
          tillLand.getComponent(TilledLand).setTillLandProto(tillLandProto);
        });
        if (plantingLand.getComponent(UIOpacity))
          plantingLand.removeComponent(UIOpacity);
        if (plantingLand.getComponent(BlockInputEvents))
          plantingLand.removeComponent(BlockInputEvents);
        break;
      }
    }
    const gold = resBuyBuilding.gold;
    if (gold) {
      GlobalData.me().getMainUser().gold = gold;
      UICanvas.me().loadGold();
    }
  }

  private handleResSow(resSow: proto.IResSow): void {
    let plantingLandPanel = find("Canvas/BackGroundLayer/PlantingPanel");
    let plantingLands = plantingLandPanel.children;
    // Lấy ra tất cả mảnh đất trồng
    plantingLands.forEach((plantingLand: Node) => {
      // Lấy ra tất cả ô đất đã cày
      let plantingLandComponent = plantingLand.getComponent(PlantingLand);
      let tilledLands = plantingLandComponent.getTilledLandPanel().children;
      tilledLands.forEach((tilledLand: Node) => {
        let tillLandComponent = tilledLand.getComponent(TilledLand);
        let cropProto = resSow.crops.crops.filter(
          (crop) => crop.tillLand.id == tillLandComponent.getTillLandProto().id
        )[0];
        // Nếu ô đất đã cày và đã gieo hạt
        if (cropProto) {
          if (resSow.mainUserId != GlobalData.me().getMainUser().userId) {
            tillLandComponent.handleDisplayCropsToLand(
              cropProto.CommonGrowthItem.name
            );
          }
          tillLandComponent.seedNode.getComponent(Crop).setCropProto(cropProto);
        }
      });
    });
  }

  private async loadItemsOfFarmOffline(): Promise<void> {
    resources.load("CSV/farm_base_item", TextAsset, (err, asset) => {
      if (err) {
        return;
      }

      const csvText = asset.text; // Get the text content of the CSV file
      this.parseCSV(csvText);
      this.loadBasicItemsToUI();
    });
  }

  private parseCSV(csvText: string): void {
    const lines = csvText.split("\n");
    lines.shift();

    for (let line of lines) {
      if (!line.trim()) continue;
      const building = new proto.Building();
      const values = line.split(",");

      const name = values[0];
      const price = parseInt(values[1]);
      const description = values[2];
      const type = values[3];
      const maxLevel = parseInt(values[4]);
      const currentLevel = parseInt(values[5]);
      const areaId = parseInt(values[6]);
      const positionX = parseInt(values[7]);
      const positionY = parseInt(values[8]);
      const buildingId = parseInt(values[9]);

      const base = new proto.BuildingBase();
      base.name = name;
      base.price = price;
      base.description = description;
      base.type = type;
      base.maxLevel = maxLevel;

      const propertyBuilding = new proto.PropertyBuilding();
      propertyBuilding.currentLevel = currentLevel;
      propertyBuilding.areaId = areaId;
      propertyBuilding.positionX = positionX;
      propertyBuilding.positionY = positionY;
      propertyBuilding.commonBuildingId = buildingId;

      if (type === "PLANTING_LAND") {
        const plantingLandBuilding = new proto.PlantingLandBuilding();
        plantingLandBuilding.base = base;
        plantingLandBuilding.propertyBuilding = propertyBuilding;

        const tillLands = new Array<proto.TillLand>();
        for (let i = 0; i < 30; i++) {
          const tillLand = new proto.TillLand();
          tillLand.statusTilled = false;
          tillLands.push(tillLand);
        }
        plantingLandBuilding.tillLands = tillLands;
        building.plantingLandBuilding = plantingLandBuilding;
      } else {
        const farmBuilding = new proto.FarmBuilding();
        farmBuilding.base = base;
        farmBuilding.propertyBuilding = propertyBuilding;
        building.farmBuilding = farmBuilding;
      }
      this.buildingProtos.push(building);
    }
  }

  private loadBasicItemsToUI(): void {
    // Lấy ra các layer cần hiển thị item
    const midLayer = this.getPlayerLayer();
    const plantingLayer = find("Canvas/BackGroundLayer/PlantingPanel");
    if (this.buildingProtos.length === 0 || !this.buildingProtos) {
      return;
    }
    // Hiển thị item lên trang trại
    this.buildingProtos.forEach((building: proto.Building) => {
      let itemprefab: Node = null;
      let nameBuilding = null;
      let positionX = 0;
      let positionY = 0;
      if (building.farmBuilding) {
        nameBuilding = building.farmBuilding.base.name;
        positionX = building.farmBuilding.propertyBuilding.positionX;
        positionY = building.farmBuilding.propertyBuilding.positionY;
      } else {
        nameBuilding = building.plantingLandBuilding.base.name;
        positionX = building.plantingLandBuilding.propertyBuilding.positionX;
        positionY = building.plantingLandBuilding.propertyBuilding.positionY;
      }
      // Tìm prefab tương ứng với item
      for (let prefab of this.buildingFarmPrefab) {
        if (nameBuilding.toUpperCase() == prefab.name.toUpperCase()) {
          itemprefab = instantiate(prefab);
          itemprefab.setPosition(positionX, positionY);
          if (building.plantingLandBuilding) {
            // Nếu là đất trồng
            let component = itemprefab.getComponent(PlantingLand);
            // Lưu thông tin của đất trồng vào component
            component.setPlantingLandProto(building.plantingLandBuilding);
            // Lưu thông tin của từng ô đất trồng vào component
            let tillLands = component.getTilledLandPanel().children;
            tillLands.forEach((tillLand: Node, index: number) => {
              let tillLandProto = building.plantingLandBuilding.tillLands.find(
                (tillLand) => tillLand.index == index
              );
              let tillLandComponent = tillLand.getComponent(TilledLand);
              tillLandComponent.setTillLandProto(tillLandProto);
              // Kiểm tra xem ô đất đã cày chưa
              let statusTilled = tillLandProto?.statusTilled;
              if (statusTilled)
                tillLand.getComponent(TilledLand).handleTilledLand();
              // Hiển thị cây trồng lên đất
              let cropProto = this.cropsProto.crops.filter((crop) => {
                return (
                  crop.tillLand.id == tillLandComponent.getTillLandProto().id
                );
              })[0];
              if (cropProto) {
                tillLandComponent.handleDisplayCropsToLand(
                  cropProto.CommonGrowthItem.name
                );
                if (!tillLand || !tillLandComponent.seedNode) return;
                tillLandComponent.seedNode.getComponent(Crop).cropProto =
                  cropProto;
              }
            });
          }
          break;
        }
      }

      if (itemprefab) {
        if (building.plantingLandBuilding) {
          plantingLayer.addChild(itemprefab);
        } else {
          midLayer.addChild(itemprefab);
        }
      }
    });
  }

  private onClickBuilding(): void {
    CoatingComponent.me().offAllCoating();
    if (find("Canvas/GameManager/PopupBuildingSystem")) return;
    this.buildingSystem = instantiate(this.buildingSystemPrefab);
    const coating = this.buildingSystem.getChildByName("CoatingBlackPanel");
    coating.on(Node.EventType.TOUCH_START, this.handleCoating, this);
    this.node.addChild(this.buildingSystem);
    this.hiddenUICanvas();
  }

  private handleCoating(): void {
    this.buildingSystem.destroy();
    this.buildingSystem = null;
    this.openUICanvas();
  }

  private hiddenUICanvas(): void {
    const childrenCanvas = find("UICanvas").children;
    childrenCanvas.forEach((child: Node) => {
      if (child.name !== "Camera") child.active = false;
    });
  }

  private openUICanvas(): void {
    const childrenCanvas = find("UICanvas").children;
    childrenCanvas.forEach((child: Node) => {
      if (child.name !== "Camera") child.active = true;
    });
  }

  private getPlantingLandPanel(): Node {
    return find("Canvas/BackGroundLayer/PlantingPanel");
  }

  private onClickTillByMachine() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    UICanvas.me().hidePopupMenuMechanical();
    let plantingLandChosed = GlobalData.me().getPlantingLandChoosed();
    let plantingLandPosition = new proto.Position();

    plantingLandPosition.x = plantingLandChosed.getPosition().x;
    plantingLandPosition.y = plantingLandChosed.getPosition().y;

    DataSender.sendReqTillLandByMachine(
      GlobalData.me().getArea().areaId,
      plantingLandPosition
    );
  }

  private onClickHarvestByMachine() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    UICanvas.me().hidePopupMenuMechanical();
    let plantingLandChosed = GlobalData.me().getPlantingLandChoosed();
    let plantingLandPosition = new proto.Position();

    plantingLandPosition.x = plantingLandChosed.getPosition().x;
    plantingLandPosition.y = plantingLandChosed.getPosition().y;

    DataSender.sendReqHarvestByMachine(
      GlobalData.me().getArea().areaId,
      plantingLandPosition
    );
  }

  private handleResTillLandByMachine(
    resTillLandByMachine: proto.IResTillLandByMachine
  ) {
    let plantingLandPosition = resTillLandByMachine.plantingLandPosition;
    let machineNoGrowItem = resTillLandByMachine.noGrowthItem;
    let propertyMachine = resTillLandByMachine.propertyMachine;
    if (!propertyMachine) return;
    if (propertyMachine.energy <= 0) {
      UICanvas.me().showPopupMessage(t("label_text.mac_not_enough_energy"));
      return;
    }
    const machine = instantiate(this.bulldorzerPrefab);
    machine.getComponent(Machine).init(machineNoGrowItem, propertyMachine);
    this.setMachinePosition(
      machine,
      new Vec3(plantingLandPosition.x, plantingLandPosition.y + 100, 0)
    );
  }

  private setMachinePosition(machine: Node, position: Vec3) {
    console.log("machine start: ", machine);
    machine.setPosition(position.x, position.y, 0);
    const midLayer = this.getTopLayer();
    midLayer.addChild(machine);
  }

  private handleResHarvestByMachine(
    resHarvestByMachine: proto.IResHarvestByMachine
  ) {
    let plantingLandPosition = resHarvestByMachine.plantingLandPosition;
    let machineNoGrowItem = resHarvestByMachine.noGrowthItem;
    let propertyMachine = resHarvestByMachine.propertyMachine;
    if (!propertyMachine) return;
    if (propertyMachine.energy <= 0) {
      UICanvas.me().showPopupMessage(t("label_text.mac_not_enough_energy"));
      return;
    }
    const machine = instantiate(this.harvesterPrefab);
    machine.getComponent(Machine).init(machineNoGrowItem, propertyMachine);
    this.setMachinePosition(
      machine,
      new Vec3(plantingLandPosition.x + 180, plantingLandPosition.y, 0)
    );
  }

  private getTopLayer(): Node {
    return find("Canvas/ObjectLayers/TopLayer");
  }
}
