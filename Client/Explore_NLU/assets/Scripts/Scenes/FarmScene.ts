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
} from "cc";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { BUTTON, REWARD_ICONS, TYPE_ITEM } from "../Utils/Const";
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
const { ccclass, property } = _decorator;

@ccclass("FarmScene")
export class FarmScene extends AbsScene {
  @property(Prefab)
  public buildingSystemPrefab: Prefab = null;
  @property(Node)
  private seedMenuContent: Node = null;
  @property([Prefab])
  private buildingFarmPrefab: Prefab[] = [];

  private buildingSystem: Node = null;
  private buildingProtos: proto.IBuilding[] = [];
  private cropsProto: proto.ICrops = null;

  protected onLoad(): void {
    // Load information of farm
    this.loadFarm();
  }

  protected start(): void {
    super.start();
    // Open building function
    UICanvas.me().showButton(BUTTON.UI_BUTTON_BUILDING);
    UICanvas.me()
      .getButton(BUTTON.UI_BUTTON_BUILDING)
      .on(Node.EventType.TOUCH_END, this.onClickBuilding, this);

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
    });
  }

  handleResAddProduct(resAddProduct: proto.IResAddProduct): void {
    const warehouseItems = resAddProduct.warehouseItem;
    if (!warehouseItems || warehouseItems.length == 0) return;
    warehouseItems.forEach((warehouseItem) => {
      GlobalData.me().addWarehouseItem(warehouseItem);
    });
  }

  handleResHarvest(resHarvest: proto.IResHarvest): void {
    const rewards = [];
    resHarvest.rewards.reward.forEach((rewardProto) => {
      let typeReward = "";
      let name = "";
      if (rewardProto.name == "Experience") {
        name = t("label_text.experience_point");
        typeReward = REWARD_ICONS.EXPERIENCE_POINT;
      } else {
        typeReward = rewardProto.name.toLowerCase();
        name = t("label_text." + rewardProto.name.toLowerCase());
      }
      rewards.push({
        name: name,
        quantity: rewardProto.quantity,
        reward: typeReward,
      });
    });
    UICanvas.me().showListRewardEffect(rewards);
  }

  onLoadItemsOfFarmMsgHandler(
    resLoadItemsOfFarm: proto.IResLoadItemsOfFarm
  ): void {
    let plantingLandPanel = find("Canvas/BackgroundLayers/PlantingPanel");
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

  handleResBuyBuilding(resBuyBuilding: proto.IResBuyBuilding): void {
    let plantingLandPanel = find("Canvas/BackgroundLayers/PlantingPanel");
    let plantingLands = plantingLandPanel.children;
    plantingLands.forEach((plantingLand: Node) => {
      if (plantingLand.uuid == resBuyBuilding.uuid) {
        let plantingLandComponent = plantingLand.getComponent(PlantingLand);
        plantingLandComponent.plantingLandProto =
          resBuyBuilding.building.plantingLandBuilding;

        let tillLands = plantingLandComponent.getTilledLandPanel().children;
        tillLands.forEach((tillLand: Node, index: number) => {
          let tillLandProto =
            resBuyBuilding.building.plantingLandBuilding.tillLands[index];
          tillLand.getComponent(TilledLand).tillLandProto = tillLandProto;
        });
      }
      if (plantingLand.getComponent(UIOpacity))
        plantingLand.removeComponent(UIOpacity);
      if (plantingLand.getComponent(BlockInputEvents))
        plantingLand.removeComponent(BlockInputEvents);
    });
  }

  handleResSow(resSow: proto.IResSow): void {
    let plantingLandPanel = find("Canvas/BackgroundLayers/PlantingPanel");
    let plantingLands = plantingLandPanel.children;
    // Lấy ra tất cả mảnh đất trồng
    plantingLands.forEach((plantingLand: Node) => {
      // Lấy ra tất cả ô đất đã cày
      let plantingLandComponent = plantingLand.getComponent(PlantingLand);
      let tilledLands = plantingLandComponent.getTilledLandPanel().children;
      tilledLands.forEach((tilledLand: Node) => {
        let cropProto = resSow.crops.crops.filter(
          (crop) =>
            crop.tillLand.id ==
            tilledLand.getComponent(TilledLand).tillLandProto.id
        )[0];
        // Nếu ô đất đã cày và đã gieo hạt
        if (cropProto) {
          tilledLand
            .getComponent(TilledLand)
            .seedNode.getComponent(Crop).cropProto = cropProto;
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
    const plantingLayer = find("Canvas/BackgroundLayers/PlantingPanel");
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
            component.plantingLandProto = building.plantingLandBuilding;
            // Lưu thông tin của từng ô đất trồng vào component
            let tillLands = component.getTilledLandPanel().children;
            tillLands.forEach((tillLand: Node, index: number) => {
              let tillLandProto =
                building.plantingLandBuilding.tillLands[index];
              let tillLandComponent = tillLand.getComponent(TilledLand);
              tillLandComponent.tillLandProto = tillLandProto;
              // Kiểm tra xem ô đất đã cày chưa
              let statusTilled = tillLandProto?.statusTilled;
              if (statusTilled)
                tillLand.getComponent(TilledLand).handleTilledLand();
              // Hiển thị cây trồng lên đất
              let cropProto = this.cropsProto.crops.filter((crop) => {
                return crop.tillLand.id == tillLandComponent.tillLandProto.id;
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

  public onClickBuilding(): void {
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

  hiddenUICanvas(): void {
    const childrenCanvas = find("UICanvas").children;
    childrenCanvas.forEach((child: Node) => {
      if (child.name !== "Camera") child.active = false;
    });
  }

  openUICanvas(): void {
    const childrenCanvas = find("UICanvas").children;
    childrenCanvas.forEach((child: Node) => {
      if (child.name !== "Camera") child.active = true;
    });
  }

  protected onDestroy(): void {
    UICanvas.me().hideButton(BUTTON.UI_BUTTON_BUILDING);
  }

  private loadCommonCrop(): void {
    DataSender.sendReqLoadCommonCrop();
  }
}
