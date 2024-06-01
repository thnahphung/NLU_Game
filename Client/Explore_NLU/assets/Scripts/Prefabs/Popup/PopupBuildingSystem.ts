import { _decorator, Button, Component, find, instantiate, Node, Prefab } from 'cc';
import { PLANTING_LAND } from '../../Utils/Const';
const { ccclass, property } = _decorator;

@ccclass('PopupBuildingSystem')
export class PopupBuildingSystem extends Component {
    @property(Button)
    public buttonPlantingLand: Button = null;
    @property(Button)
    public buttHouse: Button = null;
    @property(Button)
    public buttonWarehouse: Button = null;
    @property(Button)
    public buttonTree: Button = null;

    @property(Prefab)
    public plantingLandPrefab: Prefab = null;

    start() {
        this.buttonPlantingLand.node.on(Node.EventType.TOUCH_END, this.handlePlantingBuilding, this);
        this.buttHouse.node.on(Node.EventType.TOUCH_END, this.handleHouseBuilding, this);
        this.buttonWarehouse.node.on(Node.EventType.TOUCH_END, this.handleWarehouseBuilding, this);
        this.buttonTree.node.on(Node.EventType.TOUCH_END, this.handleTreeBuilding, this);
    }

    private handlePlantingBuilding(event: Event, customEventData: string) {
        console.log('Plant');
        const plantingLand = instantiate(this.plantingLandPrefab);
        const plantingPanel = find('Canvas/BackgroundLayers/PlantingPanel');

        const lastNode = plantingPanel.children[plantingPanel.children.length - 1];

        if (lastNode) {
            plantingLand.setPosition(lastNode.position.x + 50 + PLANTING_LAND.WIDTH, lastNode.position.y, lastNode.position.z);
        } else {
            plantingLand.setPosition(0, 0, 0);
        }

        plantingPanel.addChild(plantingLand);
        this.node.destroy();
        this.openUICanvas();
    }

    private handleHouseBuilding(event: Event, customEventData: string) {
        console.log('House');
    }

    private handleWarehouseBuilding(event: Event, customEventData: string) {
        console.log('Warehouse');
    }

    private handleTreeBuilding(event: Event, customEventData: string) {
        console.log('Tree');
    }

    openUICanvas(): void {
        const childrenCanvas = find('UICanvas').children;
        childrenCanvas.forEach((child: Node) => {
            if(child.name !== 'Camera')
            child.active = true;
        });
    }
}
