import { _decorator, Button, Component, find, instantiate, Node, Prefab } from 'cc';
import { CUSTOM_EVENT, PLANTING_LAND, POPUP } from '../../Utils/Const';
import { CameraFollow } from '../Camera/CameraFollow';
import { UICanvas } from '../MainUI/UICanvas';
import GlobalData from '../../Utils/GlobalData';
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

    private handleNode: Node = null;

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
            plantingLand.setPosition(0, -100, 0);
        }

        plantingPanel.addChild(plantingLand);
        this.node.active = false;
        this.openUICanvas();

        this.cameraFollowTarget(plantingLand);

        this.handleNode = plantingLand;
        this.showPopupOption();
    }

    private showPopupOption(): void {
        UICanvas.me().showPopup(POPUP.POPUP_OPTION, this.handleNode, 'Mua: 10G');
        this.handleNode.on(CUSTOM_EVENT.LISTEN_CANCEL, this.handleClickCancel, this);
        this.handleNode.on(CUSTOM_EVENT.LISTEN_COMPLETE, this.handleClickComplete, this);
    }

    private handleClickCancel(event: CustomEvent): void {
        this.handleNode.destroy();
        this.hidePopupOption();
        this.node.destroy();
        this.cameraFollowTarget(GlobalData.me().getMainPlayerNode());
    }

    private handleClickComplete(event: CustomEvent): void {
        this.hidePopupOption();
        this.node.destroy();
        this.cameraFollowTarget(GlobalData.me().getMainPlayerNode());
    }

    private hidePopupOption(): void {
        UICanvas.me().closePopup(POPUP.POPUP_OPTION);
        this.handleNode.off(CUSTOM_EVENT.LISTEN_CANCEL, this.handleClickCancel, this);
        this.handleNode.off(CUSTOM_EVENT.LISTEN_COMPLETE, this.handleClickComplete, this);
        console.log('Hide Popup Option', this.handleNode);
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

    private cameraFollowTarget(target: Node): void {
        let CameraFollowComponent = find('Canvas/Camera').getComponent(CameraFollow);
        CameraFollowComponent.updateTargetFollow(target);
    }

    openUICanvas(): void {
        const childrenCanvas = find('UICanvas').children;
        childrenCanvas.forEach((child: Node) => {
            if(child.name !== 'Camera')
            child.active = true;
        });
    }
}
