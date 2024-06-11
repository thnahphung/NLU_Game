import { _decorator, Button, Component, EventTouch, find, Node } from 'cc';
import { COATING, CUSTOM_EVENT, POPUP } from '../../Utils/Const';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
const { ccclass, property } = _decorator;

@ccclass('PlantingLand')
export class PlantingLand extends Component {

    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START, this.handleGetMenuTool, this);
    }

    private handleGetMenuTool(): void {
        if(GlobalData.me().getMoveBuildingStatus() || GlobalData.me().getSowStatus()) return;
        const menuToolNode = this.getMenuToolNode();
        menuToolNode.setPosition(this.node.getPosition().x, this.node.getPosition().y + 125, 0);
        menuToolNode.active = true;
        CoatingComponent.me().setCoating(COATING.TILL, this.node.parent, menuToolNode);
        CoatingComponent.me().showCoating(COATING.TILL);
    }

    private getMenuToolNode(): Node {
        return find('Canvas/PopupGameLayer/MenuToolPanel');
    }

}


