import { _decorator, Component, find, instantiate, Node, Prefab } from 'cc';
import { UICanvas } from '../Prefabs/MainUI/UICanvas';
import { BUTTON, POPUP, TYPE_ITEM } from '../Utils/Const';
import AbsScene from '../Scenes/AbsScene';
import { FarmBuilding } from '../Models/FarmBuilding';
import DataSender from '../Utils/DataSender';
import { ABuilding } from '../Models/ABuilding';
import { Util } from '../Utils/Util';
import { PlantingLand } from '../Models/PlantingLand';
const { ccclass, property } = _decorator;

@ccclass('GameFarmManager')
export class GameFarmManager extends AbsScene {
    @property(Prefab)
    public buildingSystemPrefab: Prefab = null;

    private buildingSystem: Node = null;

    private buildings: ABuilding[] = [];

    // ItemPrefab
    @property(Prefab)
    private mainHousePrefab: Prefab = null;
    @property(Prefab)
    private tree4Prefab: Prefab = null;
    @property(Prefab)
    private tree5Prefab: Prefab = null;
    @property(Prefab)
    private tree6Prefab: Prefab = null;
    @property(Prefab)
    private tree7Prefab: Prefab = null;
    @property(Prefab)
    private tree8Prefab: Prefab = null;
    @property(Prefab)
    private tree9Prefab: Prefab = null;
    @property(Prefab)
    private stone1Prefab: Prefab = null;
    @property(Prefab)
    private stone2Prefab: Prefab = null;
    @property(Prefab)
    private stone3Prefab: Prefab = null;
    @property(Prefab)
    private stone4Prefab: Prefab = null;
    @property(Prefab)
    private stone5Prefab: Prefab = null;
    @property(Prefab)
    private stone6Prefab: Prefab = null;
    @property(Prefab)
    private stone7Prefab: Prefab = null;
    @property(Prefab)
    private stone8Prefab: Prefab = null;
    @property(Prefab)
    private stone9Prefab: Prefab = null;
    @property(Prefab)
    private root1Prefab: Prefab = null;
    @property(Prefab)
    private plantingLandPrefab: Prefab = null;

    protected onLoad(): void {
        // Load information of farm
        this.loadFarm();
    }
    protected start(): void {
        // Open building function
        UICanvas.me().showButton(BUTTON.UI_BUTTON_BUILDING);
        UICanvas.me().getButton(BUTTON.UI_BUTTON_BUILDING).on(Node.EventType.TOUCH_END, this.onClickBuilding, this);
    }

    onMessageHandler(packets: proto.IPacketWrapper): void {
        packets.packet.forEach((packet) => {
            if (packet.resLoadItemsOfFarm) {
              this.onLoadItemsOfFarmMsgHandler(packet.resLoadItemsOfFarm);
            }
          });
    }

    onLoadItemsOfFarmMsgHandler(resLoadItemsOfFarm: proto.IResLoadItemsOfFarm): void {
        this.buildings = [];
        resLoadItemsOfFarm.buildingItems.building.forEach((building) => {
            if(building.farmBuilding){
                let basebuildingItem = building.farmBuilding.base;
                let propertyBuilding = building.farmBuilding.propertyBuilding;
                const farmBuilding = new FarmBuilding(basebuildingItem.id, basebuildingItem.name, basebuildingItem.description, basebuildingItem.price, Util.typeItemfromValue(basebuildingItem.type), basebuildingItem.maxLevel, propertyBuilding.upgradeId, propertyBuilding.currentLevel, propertyBuilding.areaId, propertyBuilding.positionX, propertyBuilding.positionY);
                this.buildings.push(farmBuilding);
            }
            if(building.plantingLandBuilding){
                let basebuildingItem = building.plantingLandBuilding.base;
                let tillLands = building.plantingLandBuilding.tillLand;
                let propertyBuilding = building.plantingLandBuilding.propertyBuilding;
                const plantingLandBuilding = new PlantingLand(basebuildingItem.id, basebuildingItem.name, basebuildingItem.description, basebuildingItem.price, Util.typeItemfromValue(basebuildingItem.type), basebuildingItem.maxLevel,  propertyBuilding.upgradeId, propertyBuilding.currentLevel, propertyBuilding.areaId, propertyBuilding.positionX, propertyBuilding.positionY);
                plantingLandBuilding.setTillLands(tillLands);
                this.buildings.push(plantingLandBuilding);
            }
        });

        this.loadBasicItemsToUI();
    }
    private loadFarm(){
        // basic items
        this.loadItemsOfFarm();
    }

    private loadItemsOfFarm(): void {
        DataSender.sendReqLoadItemsOfFarm();
    }


    private loadBasicItemsToUI(): void {
        const midLayer = find('Canvas/ObjectLayers/MidLayer');
        const plantingLayer = find('Canvas/BackgroundLayers/PlantingPanel');
        if(this.buildings.length === 0) {
            console.log("No building in farm");
            return;
        }

        this.buildings.forEach((item: ABuilding) => {
            let itemprefab = null;
            let nameItem = item.getName();
            switch (nameItem) {
                case 'mainhouse':
                    itemprefab = instantiate(this.mainHousePrefab);
                    break;
                case 'tree4':
                    itemprefab = instantiate(this.tree4Prefab);
                    break;
                case 'tree5':
                    itemprefab = instantiate(this.tree5Prefab);
                    break;
                case 'tree6':
                    itemprefab = instantiate(this.tree6Prefab);
                    break;
                case 'tree7':
                    itemprefab = instantiate(this.tree7Prefab);
                    break;
                case 'tree8':
                    itemprefab = instantiate(this.tree8Prefab);
                    break;
                case 'tree9':
                    itemprefab = instantiate(this.tree9Prefab);
                    break;
                case 'stone1':
                    itemprefab = instantiate(this.stone1Prefab);
                    break;
                case 'stone2':
                    itemprefab = instantiate(this.stone2Prefab);
                    break;
                case 'stone3':
                    itemprefab = instantiate(this.stone3Prefab);
                    break;
                case 'stone4':
                    itemprefab = instantiate(this.stone4Prefab);
                    break;
                case 'stone5':
                    itemprefab = instantiate(this.stone5Prefab);
                    break;
                case 'stone6':
                    itemprefab = instantiate(this.stone6Prefab);
                    break;
                case 'stone7':
                    itemprefab = instantiate(this.stone7Prefab);
                    break;
                case 'stone8':
                    itemprefab = instantiate(this.stone8Prefab);
                    break;
                case 'stone9':
                    itemprefab = instantiate(this.stone9Prefab);
                    break;
                case 'root1':
                    itemprefab = instantiate(this.root1Prefab);
                    break;
                case 'plantingland':
                    itemprefab = instantiate(this.plantingLandPrefab);
                    break;

            }
            if(itemprefab) {
                itemprefab.setPosition(item.getPositionX(), item.getPositionY());
                if(item.getType() === TYPE_ITEM.PLANTING_LAND) {
                    plantingLayer.addChild(itemprefab);
                }else{
                    midLayer.addChild(itemprefab);
                }
            }
        });
    }

    public onClickBuilding(): void {
        if(find('Canvas/GameManager/PopupBuildingSystem')) return;
        this.buildingSystem = instantiate(this.buildingSystemPrefab);
        const coating = this.buildingSystem.getChildByName('CoatingBlackPanel');
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
        const childrenCanvas = find('UICanvas').children;
        childrenCanvas.forEach((child: Node) => {
            if(child.name !== 'Camera')
            child.active = false;
        });
    }

    openUICanvas(): void {
        const childrenCanvas = find('UICanvas').children;
        childrenCanvas.forEach((child: Node) => {
            if (child.name !== 'Camera')
                child.active = true;
        });
    }


    protected onDestroy(): void {
        UICanvas.me().hideButton(BUTTON.UI_BUTTON_BUILDING);
    }
}