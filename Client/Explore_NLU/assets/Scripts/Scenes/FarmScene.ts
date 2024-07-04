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
import { BUTTON, TYPE_ITEM } from "../Utils/Const";
import AbsScene from "../Scenes/AbsScene";
import DataSender from "../Utils/DataSender";
import { PlantingLand } from "../Prefabs/Lands/PlantingLand";
import { TilledLand } from "../Prefabs/Lands/TilledLand";
import GlobalData from "../Utils/GlobalData";
import { CoatingComponent } from "../Controller/CoatingComponent";
import { SeedBag } from "../Prefabs/Tools/SeedBag";
import { Crop } from "../Prefabs/Crop/Crop";
import { Menu } from "../Prefabs/Menu/Menu";
const { ccclass, property } = _decorator;

@ccclass('FarmScene')
export class FarmScene extends AbsScene {

  @property(Prefab)
  public buildingSystemPrefab: Prefab = null;

  @property([Prefab])
  private buildingFarmPrefab: Prefab[] = [];

  private buildingSystem: Node = null;
  private buildingProtos: proto.IBuilding[] = [];
  private cropsProto: proto.ICrops = null;


  protected onLoad(): void {
    this.loadCommonCrop();
    // Load information of farm
    this.loadFarm();
  }

  protected start(): void{
    super.start();
        // Open building function
    UICanvas.me().showButton(BUTTON.UI_BUTTON_BUILDING);
    UICanvas.me()
      .getButton(BUTTON.UI_BUTTON_BUILDING)
      .on(Node.EventType.TOUCH_END, this.onClickBuilding, this);
  }

  onMessageHandler(packets: proto.IPacketWrapper): void {
    packets.packet.forEach((packet) => {
      if (packet.resLoadItemsOfFarm) {
        this.onLoadItemsOfFarmMsgHandler(packet.resLoadItemsOfFarm);
      }
      if (packet.resBuyBuilding) {
        this.handleResBuyBuilding(packet.resBuyBuilding);
      }
      if (packet.resLoadCommonCrops) {
        this.handleResLoadCommonCrop(packet.resLoadCommonCrops);
      }
      if (packet.resSow) {
        this.handleResSow(packet.resSow);
      }
      if(packet.resLoadItemsOfWarehouse){
        this.handleResLoadItemsOfWarehouse(packet.resLoadItemsOfWarehouse);
      }
    });
  }

  handleResLoadItemsOfWarehouse(resLoadItemsOfWarehouse: proto.IResLoadItemsOfWarehouse): void {
    console.log(resLoadItemsOfWarehouse);
    const menuSeedComponent = this.getMenuSeed().getComponent(Menu);
    resLoadItemsOfWarehouse.warehouseItems.warehouseItem.forEach((warehouseItem) => {
      const item = warehouseItem.noGrowthItem;
      if(!item) return;
      if(item.type == TYPE_ITEM.SEED) {
        const seedBag = menuSeedComponent.getMenuItemNode(warehouseItem.noGrowthItem.name);
        seedBag.getComponent(SeedBag).setQuantityLabel(warehouseItem.quantity);
        seedBag.getComponent(SeedBag).setNoGrowItemSeedBag(warehouseItem.noGrowthItem);
      }
    });
  }

  onLoadItemsOfFarmMsgHandler(resLoadItemsOfFarm: proto.IResLoadItemsOfFarm): void {
    let plantingLandPanel = find("Canvas/BackgroundLayers/PlantingPanel");
    plantingLandPanel.removeAllChildren();
    resLoadItemsOfFarm.buildingItems.building.forEach((building) => {
      this.buildingProtos.push(building);
    });
    this.cropsProto = resLoadItemsOfFarm.crops;
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

        let tillLands = plantingLand.getChildByName("TilledLandPanel").children;
        tillLands.forEach((tillLand: Node, index: number) => {
          let tillLandProto =
            resBuyBuilding.building.plantingLandBuilding.tillLands.tillLand[
              index
            ];
          tillLand.getComponent(TilledLand).tillLandProto = tillLandProto;
        });
      }
      if (plantingLand.getComponent(UIOpacity))
        plantingLand.removeComponent(UIOpacity);
      if (plantingLand.getComponent(BlockInputEvents))
        plantingLand.removeComponent(BlockInputEvents);
    });
  }

  handleResLoadCommonCrop(resLoadCommonCrops: proto.IResLoadCommonCrops): void {
    let menuSeenContent = this.getMenuSeenContent();
    resLoadCommonCrops.commonGrowthItem.forEach((commonGrowthItem) => {
      menuSeenContent.getChildByName(commonGrowthItem.name).getComponent(SeedBag).commonGrowthItemProto = commonGrowthItem;
    });
  }

  handleResSow(resSow: proto.IResSow): void {
    let plantingLandPanel = find("Canvas/BackgroundLayers/PlantingPanel");
    let plantingLands = plantingLandPanel.children;
    plantingLands.forEach((plantingLand: Node) => {
      let tilledLands = plantingLand.getChildByName("TilledLandPanel").children;
      tilledLands.forEach((tilledLand: Node) => {
        let cropProto = resSow.crops.crops.filter((crop) => crop.tillLand.id == tilledLand.getComponent(TilledLand).tillLandProto.id)[0];
        if (cropProto) {
          tilledLand.getComponent(TilledLand).seedNode.getComponent(Crop).cropProto = cropProto;
        }
      });
    });
  }

  handleDisplayCropsToUI(crops: proto.ICrops): void {
    let plantingLandPanel = find("Canvas/BackgroundLayers/PlantingPanel");
    let plantingLands = plantingLandPanel.children;
    plantingLands.forEach((plantingLand: Node) => {
    let tilledLands = plantingLand.getChildByName("TilledLandPanel").children;
    tilledLands.forEach((tilledLand: Node) => {
        let cropProto = crops.crops.filter((crop) => {
          return crop.tillLand.id == tilledLand.getComponent(TilledLand).tillLandProto.id;
        })[0];
        if (cropProto) {
          tilledLand.getComponent(TilledLand).handleDisplayCropsToLand(cropProto.CommonGrowthItem.name);
          if(!tilledLand || !tilledLand.getComponent(TilledLand).seedNode) {
            return;
          }
          tilledLand.getComponent(TilledLand).seedNode.getComponent(Crop).cropProto = cropProto;
        }
      });
    });
  }

  private loadFarm() {
    // basic items
    this.loadItemsOfFarm();
    this.loadWarehouseItems();
  }

  private loadItemsOfFarm(): void {
    if (GlobalData.me().getIsUserOffline()) {
      this.loadItemsOfFarmOffline();
    } else {
      DataSender.sendReqLoadItemsOfFarm();
    }
  }

  private loadWarehouseItems(){
    DataSender.sendReqLoadItemsOfWarehouse();
  }

  private async loadItemsOfFarmOffline(): Promise<void> {
    resources.load("CSV/farm_base_item", TextAsset, (err, asset) => {
      if (err) {
        console.error("File không tồn tại hoặc có lỗi khi load file!", err);
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

        const tillLands = new proto.TillLands();
        for (let i = 0; i < 30; i++) {
          const tillLand = new proto.TillLand();
          tillLand.statusTilled = false;
          tillLands.tillLand.push(tillLand);
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

    const midLayer = find("Canvas/ObjectLayers/MidLayer");
    const plantingLayer = find("Canvas/BackgroundLayers/PlantingPanel");
    if (this.buildingProtos.length === 0 || !this.buildingProtos) {
      console.error("No building protos");
      return;
    }

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

      for (let prefab of this.buildingFarmPrefab) {
        if (nameBuilding.toUpperCase() == prefab.name.toUpperCase()) {
          itemprefab = instantiate(prefab);
          if (building.plantingLandBuilding) {
            let component = itemprefab.getComponent(PlantingLand);
            component.plantingLandProto = building.plantingLandBuilding;
            let tillLands =
              itemprefab.getChildByName("TilledLandPanel").children;
            tillLands.forEach((tillLand: Node, index: number) => {
              let tillLandProto =
                building.plantingLandBuilding.tillLands.tillLand[index];
              tillLand.getComponent(TilledLand).tillLandProto = tillLandProto;
              let statusTilled = tillLandProto?.statusTilled;
              if (statusTilled)
                tillLand.getComponent(TilledLand).handleTilledLand();
            });
          }
          break;
        }
      }

      if (itemprefab) {
        itemprefab.setPosition(positionX, positionY);
        if (building.plantingLandBuilding) {
          plantingLayer.addChild(itemprefab);
        } else {
          midLayer.addChild(itemprefab);
        }
      }
    });
    this.handleDisplayCropsToUI(this.cropsProto);
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

  private getMenuSeenContent(){
    return find('Canvas/PopupGameLayer/MenuSeedPanel/MenuSeedContent');
  }

  private getMenuSeed(){
    return find('Canvas/PopupGameLayer/MenuSeedPanel');
  }
}


