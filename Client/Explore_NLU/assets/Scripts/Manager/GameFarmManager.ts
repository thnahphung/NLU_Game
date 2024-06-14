import { _decorator, BlockInputEvents, find, instantiate, Node, Prefab, UIOpacity } from 'cc';
import { UICanvas } from '../Prefabs/MainUI/UICanvas';
import { BUTTON } from '../Utils/Const';
import AbsScene from '../Scenes/AbsScene';
import DataSender from '../Utils/DataSender';
import { ABuilding } from '../Models/ABuilding';
import { PlantingLand } from '../Prefabs/Lands/PlantingLand';
import { TilledLand } from '../Prefabs/Lands/TilledLand';
const { ccclass, property } = _decorator;

@ccclass('GameFarmManager')
export class GameFarmManager extends AbsScene {
    @property(Prefab)
    public buildingSystemPrefab: Prefab = null;

    private buildingSystem: Node = null;

    private buildings: ABuilding[] = [];
    private buildingProtos: proto.IBuilding[] = [];
    @property([Prefab])
    private buildingFarmPrefab: Prefab[] = [];

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
            if(packet.resBuyBuilding){
                this.handleResBuyBuilding(packet.resBuyBuilding);
            }
          });
    }

    onLoadItemsOfFarmMsgHandler(resLoadItemsOfFarm: proto.IResLoadItemsOfFarm): void {
        this.buildings = [];
        resLoadItemsOfFarm.buildingItems.building.forEach((building) => {
            this.buildingProtos.push(building);
        });
        console.log("Building Protos 1", this.buildingProtos);
        this.loadBasicItemsToUI();
    }

    handleResBuyBuilding(resBuyBuilding: proto.IResBuyBuilding): void {
        let plantingLandPanel = find('Canvas/BackgroundLayers/PlantingPanel');
        let plantingLands = plantingLandPanel.children;
        plantingLands.forEach((plantingLand: Node) => {
            if(plantingLand.uuid == resBuyBuilding.uuid){
                let plantingLandComponent = plantingLand.getComponent(PlantingLand);
                plantingLandComponent.plantingLandProto = resBuyBuilding.building.plantingLandBuilding;
                
                let tillLands = plantingLand.getChildByName("TilledLandPanel").children;
                tillLands.forEach((tillLand: Node, index: number) => {
                    let tillLandProto = resBuyBuilding.building.plantingLandBuilding.tillLands.tillLand[index];
                    tillLand.getComponent(TilledLand).tillLandProto = tillLandProto;
                });
            }
            if(plantingLand.getComponent(UIOpacity))plantingLand.removeComponent(UIOpacity)
            if(plantingLand.getComponent(BlockInputEvents))plantingLand.removeComponent(BlockInputEvents);
        });
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
        if(this.buildingProtos.length === 0 || !this.buildingProtos) {
            return;
        }

        this.buildingProtos.forEach((building: proto.Building) => {
            let itemprefab: Node = null;
            let nameBuilding = null;
            let positionX = 0;
            let positionY = 0;
            if(building.farmBuilding){
                nameBuilding = building.farmBuilding.base.name;
                positionX = building.farmBuilding.propertyBuilding.positionX;
                positionY = building.farmBuilding.propertyBuilding.positionY;
            }else{
                nameBuilding = building.plantingLandBuilding.base.name;
                positionX = building.plantingLandBuilding.propertyBuilding.positionX;
                positionY = building.plantingLandBuilding.propertyBuilding.positionY;
            }


            for(let prefab of this.buildingFarmPrefab) {
                  if(nameBuilding.toUpperCase() == prefab.name.toUpperCase()){
                    itemprefab = instantiate(prefab);
                    if(building.plantingLandBuilding) {
                        let component = itemprefab.getComponent(PlantingLand);
                        component.plantingLandProto = building.plantingLandBuilding;
                        let tillLands = itemprefab.getChildByName("TilledLandPanel").children;
                        tillLands.forEach((tillLand: Node, index: number) => {
                            let tillLandProto = building.plantingLandBuilding.tillLands.tillLand[index];
                            tillLand.getComponent(TilledLand).tillLandProto = tillLandProto;
                            let statusTilled = tillLandProto?.statusTilled;
                            if(statusTilled) tillLand.getComponent(TilledLand).handleTillLand();
                        });
                    }
                    break;
                }
            }

            if(itemprefab) {
                itemprefab.setPosition(positionX, positionY);
                if(building.plantingLandBuilding) {
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