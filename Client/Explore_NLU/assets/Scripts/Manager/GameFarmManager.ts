import { _decorator, Component, find, instantiate, Node, Prefab } from 'cc';
import { UICanvas } from '../Prefabs/MainUI/UICanvas';
import { BUTTON, POPUP } from '../Utils/Const';
const { ccclass, property } = _decorator;

@ccclass('GameFarmManager')
export class GameFarmManager extends Component {
    @property(Prefab)
    public buildingSystemPrefab: Prefab = null;

    private buildingSystem: Node = null;

    protected start(): void {
        // Open building function
        UICanvas.me().showButton(BUTTON.UI_BUTTON_BUILDING);
        UICanvas.me().getButton(BUTTON.UI_BUTTON_BUILDING).on(Node.EventType.TOUCH_END, this.onClickBuilding, this);
    }

    protected onLoad(): void {

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
            if(child.name !== 'Camera')
            child.active = true;
        });
    }


    protected onDestroy(): void {
        UICanvas.me().hideButton(BUTTON.UI_BUTTON_BUILDING);
    }
}


