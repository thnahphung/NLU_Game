import { _decorator, Button, Component, EventTouch, find, Node } from 'cc';
import { UICanvas } from '../MainUI/UICanvas';
import { CUSTOM_EVENT, POPUP } from '../../Utils/Const';
import { CustomEvent } from '../../Utils/CustomEvent';
import GlobalData from '../../Utils/GlobalData';
const { ccclass, property } = _decorator;

@ccclass('PlantingLand')
export class PlantingLand extends Component {

    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START, this.handleGetMenuTool, this);
    }

    private handleGetMenuTool(): void {
        if(GlobalData.me().getMoveBuildingStatus()) return;
        const menuToolNode = this.getMenuToolNode();
        menuToolNode.setPosition(this.node.getPosition().x, this.node.getPosition().y + 125, 0);
        menuToolNode.active = true;
    }

    private getMenuToolNode(): Node {
        return find('Canvas/ObjectLayers/TopLayer/MenuToolPanel');
    }

}


