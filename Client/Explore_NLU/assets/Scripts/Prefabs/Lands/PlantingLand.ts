import { _decorator, BlockInputEvents, Component, find, Node} from 'cc';
import { TYPE_TOOL } from '../../Utils/Const';
import GlobalData from '../../Utils/GlobalData';
import { UICanvas } from '../MainUI/UICanvas';
const { ccclass, property } = _decorator;

@ccclass('PlantingLand')
export class PlantingLand extends Component {
    @property(Node)
    private tilledLandPanel: Node = null;
    public plantingLandProto: proto.IPlantingLandBuilding = null;
    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START, this.handleGetMenuTool, this);
    }

    private handleGetMenuTool(): void {
        if(!GlobalData.me().isMainArea()) return;
        if(this.node.getComponent(BlockInputEvents)) return;
        if(GlobalData.me().getMoveBuildingStatus() || GlobalData.me().getSowStatus()) return;
        UICanvas.me().showPopupMenuToolFarm(TYPE_TOOL.PICKAXE);
    }

    public getTilledLandPanel(): Node {
        return this.tilledLandPanel;
    }

    public setTilledLandPanel(tilledLandPanel: Node): void {
        this.tilledLandPanel = tilledLandPanel;
    }

    getPlantingLandProto(): proto.IPlantingLandBuilding {
        return this.plantingLandProto;
    }

    setPlantingLandProto(plantingLandProto: proto.IPlantingLandBuilding): void {
        this.plantingLandProto = plantingLandProto;
    }
}


