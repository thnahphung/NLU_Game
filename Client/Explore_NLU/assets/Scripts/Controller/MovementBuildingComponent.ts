import { _decorator, Camera, Component, EventTouch, find, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { UICanvas } from '../Prefabs/MainUI/UICanvas';
import { COATING, CUSTOM_EVENT, POPUP } from '../Utils/Const';
import GlobalData from '../Utils/GlobalData';
import { CoatingComponent } from './CoatingComponent';
const { ccclass, property } = _decorator;

@ccclass('MovementBuildingComponent')
export class MovementBuildingComponent extends Component {
    private buttonMove: Node = null;
    private menuToolBuilding : Node = null;
    private effectMove: Node = null;
    private resizeValue : number = 1.4;
    private originPosition: Vec3 = null;
    @property(Prefab) 
    public menuToolBuildingPrefab: Prefab = null;
    @property(Prefab)
    public effectMovePrefab: Prefab = null;
    @property(Node) 
    public shadowNode: Node = null;

    protected onLoad(): void {
        this.originPosition = this.node.getPosition();
        this.node.on(Node.EventType.TOUCH_END, this.handleOpenMenuToolBuilding, this);
    }

    private handleOpenMenuToolBuilding(): void {
        if(GlobalData.me().getMoveBuildingStatus()) return;
        if(this.menuToolBuilding) {
            this.menuToolBuilding.active = true;
            this.showCoatingNode();
            return;
        }
        this.menuToolBuilding = instantiate(this.menuToolBuildingPrefab);
        this.menuToolBuilding.active = true;
        this.menuToolBuilding.setPosition(this.node.getPosition().x, this.node.getPosition().y - 115, 0);
        this.buttonMove = this.menuToolBuilding.getChildByName('MenuToolContent').getChildByName('ButtonMove');
        this.getMenuTopLayerNode().addChild(this.menuToolBuilding);
        this.buttonMove.on(Node.EventType.TOUCH_END, this.onClickMoveLand, this);
        this.showCoatingNode();
    }

    private onClickMoveLand(): void {
        this.node.off(Node.EventType.TOUCH_END, this.handleOpenMenuToolBuilding, this);
        if(this.shadowNode) this.shadowNode.active = true;
        if(GlobalData.me().getMoveBuildingStatus()) return; 
        GlobalData.me().setMoveBuildingStatus(true);
        this.hideTool();
        this.handleOpenEffectMove();
        this.hideCoatingNode();
        this.showPopupOption();
        this.listenActionMoveLand();
    }

    private handleOpenEffectMove(): void {
        if(this.effectMove) {
            this.effectMove.active = true;
            return;
        }
        this.effectMove = instantiate(this.effectMovePrefab);
        this.effectMove.setPosition(0, 0, 0);
        var sizeNodeMove = this.node.getComponent(UITransform).getBoundingBox();
        var effectTop = this.effectMove.getChildByName('Top');
        var effectLeft = this.effectMove.getChildByName('Left');
        var effectBottom = this.effectMove.getChildByName('Bottom');
        var effectRight = this.effectMove.getChildByName('Right');
        var fixSizeValue = 0;
        if(sizeNodeMove.height < sizeNodeMove.width) {
            fixSizeValue = sizeNodeMove.height;
        }else {
            fixSizeValue = sizeNodeMove.width;
        }

        effectTop.setPosition(0, fixSizeValue / this.resizeValue, 0);
        effectLeft.setPosition(-fixSizeValue / this.resizeValue, 0, 0);
        effectBottom.setPosition(0, -fixSizeValue / this.resizeValue, 0);
        effectRight.setPosition(fixSizeValue / this.resizeValue, 0, 0);
        var nodeChildrenMove = this.node.children;

        //effectRight.getComponent(UITransform).priority = -100000000;
        this.effectMove.active = true;
        this.node.addChild(this.effectMove);

        // nodeChildrenMove.forEach((node) => {
        //     if(node && node.name != this.effectMove.name) node.getComponent(UITransform).priority = node.getComponent(UITransform).priority + 100
        // })
    }

    private showPopupOption(): void {
        UICanvas.me().showPopup(POPUP.POPUP_OPTION, this.node);
        this.node.on(CUSTOM_EVENT.LISTEN_CANCEL, this.handleClickCancel, this);
        this.node.on(CUSTOM_EVENT.LISTEN_COMPLETE, this.handleClickComplete, this);
    }

    private hidePopupOption(): void {
        UICanvas.me().closePopup(POPUP.POPUP_OPTION);
        this.node.off(CUSTOM_EVENT.LISTEN_CANCEL, this.handleClickCancel, this);
        this.node.off(CUSTOM_EVENT.LISTEN_COMPLETE, this.handleClickComplete, this);
    }   

    private listenActionMoveLand(): void {
        this.node.on(Node.EventType.TOUCH_MOVE, this.handleMoveLand, this);
    }

    private handleMoveLand(event: EventTouch): void {
        const touchPos = event.getLocation();
        // Chuyển đổi vị trí chạm từ không gian màn hình sang không gian thế giới
        const camera = find('Canvas/Camera').getComponent(Camera);
        const worldPos = camera.screenToWorld(new Vec3(touchPos.x, touchPos.y, 0));
        let newLocation = new Vec3(0, 0, 0);
        if(this.node.parent == null) {
            newLocation = this.node.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        }else{
             newLocation = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        }
        // Đặt vị trí mới cho node
        this.node.setPosition(newLocation);
    }

    private handleClickCancel(event: CustomEvent): void {
        this.node.setPosition(this.originPosition);
        this.handleStopMoveLand();
        this.hidePopupOption();
    }

    private handleClickComplete(event: CustomEvent): void {
        //Todo: Database
        this.handleStopMoveLand();
        this.hidePopupOption();
    }

    private handleStopMoveLand(): void {
        if(this.shadowNode) this.shadowNode.active = false;
        GlobalData.me().setMoveBuildingStatus(false);
        this.handleDestroyEffectMove();
        this.node.off(Node.EventType.TOUCH_MOVE, this.handleMoveLand, this);
        this.node.on(Node.EventType.TOUCH_END, this.handleOpenMenuToolBuilding, this);
    }

    private getMenuTopLayerNode(): Node {
        return find('Canvas/PopupGameLayer');
    }

    private handleDestroyEffectMove(): void {
        if(this.effectMove) {
            this.effectMove.destroy();
            this.effectMove = null;
        }
    }

    private hideTool(): void {
        var menuTool = this.getMenuToolNode();
        if(menuTool) menuTool.active = false;
        if(this.menuToolBuilding) this.menuToolBuilding.active = false;
    }

    private getMenuToolNode(): Node {
        return find('Canvas/PopupGameLayer/MenuToolPanel');
    }

    protected onDestroy(): void {
        if(this.buttonMove) this.node.off(Node.EventType.TOUCH_MOVE, this.handleMoveLand, this);
    }

    private handleTouchCoating(): void {
        if(this.menuToolBuilding) this.menuToolBuilding.active = false;
        CoatingComponent.me().getCoating(COATING.MOVE).off(Node.EventType.TOUCH_START, this.handleTouchCoating, this);
        CoatingComponent.me().offAllCoating();
    }

    private hideCoatingNode(): void {
        CoatingComponent.me().getCoating(COATING.MOVE).off(Node.EventType.TOUCH_START, this.handleTouchCoating, this);
        CoatingComponent.me().offAllCoating();
    }

    private showCoatingNode(): void {
        let coatingNode = CoatingComponent.me().getCoating(COATING.MOVE);
        if(coatingNode) {
            coatingNode.active = true;
            coatingNode.on(Node.EventType.TOUCH_START, this.handleTouchCoating, this);
            return;
        }
        CoatingComponent.me().setCoating(COATING.MOVE, this.node.parent, this.menuToolBuilding);
        CoatingComponent.me().showCoating(COATING.MOVE);
        var coating = CoatingComponent.me().getCoating(COATING.MOVE);
        coating.on(Node.EventType.TOUCH_START, this.handleTouchCoating, this);
    }
}


