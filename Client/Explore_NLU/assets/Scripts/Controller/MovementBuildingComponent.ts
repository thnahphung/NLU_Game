import { _decorator, Component, EventTouch, find, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { UICanvas } from '../Prefabs/MainUI/UICanvas';
import { CUSTOM_EVENT, POPUP } from '../Utils/Const';
import { off } from 'process';
import GlobalData from '../Utils/GlobalData';
const { ccclass, property } = _decorator;

@ccclass('MovementBuildingComponent')
export class MovementBuildingComponent extends Component {
    private buttonMove: Node = null;
    private menuToolBuilding : Node = null;
    private effectMove: Node = null;
    private resizeValue : number = 1.4;
    private originPosition: Vec3 = null;
    private coatingNode: Node = null;
    @property(Prefab) 
    public menuToolBuildingPrefab: Prefab = null;
    @property(Prefab)
    public effectMovePrefab: Prefab = null;
    @property(Prefab)
    public coatingPrefab: Prefab = null;

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

        effectRight.getComponent(UITransform).priority = -100000000;
        this.effectMove.active = true;
        this.node.addChild(this.effectMove);

        nodeChildrenMove.forEach((node) => {
            if(node && node.name != this.effectMove.name) node.getComponent(UITransform).priority = node.getComponent(UITransform).priority + 100
        })
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
        const delta = event.getDelta();
        this.node.setPosition(this.node.getPosition().add3f(delta.x, delta.y, 0));
    }

    private handleClickCancel(event: CustomEvent): void {
        this.node.setPosition(this.originPosition);
        this.handleStopMoveLand();
        this.hidePopupOption();
    }

    private handleClickComplete(event: CustomEvent): void {
        //Todo: 
        this.handleStopMoveLand();
        this.hidePopupOption();
    }

    private handleStopMoveLand(): void {
        GlobalData.me().setMoveBuildingStatus(false);
        this.handleDestroyEffectMove();
        this.node.off(Node.EventType.TOUCH_MOVE, this.handleMoveLand, this);
        this.node.on(Node.EventType.TOUCH_END, this.handleOpenMenuToolBuilding, this);
    }

    private getMenuTopLayerNode(): Node {
        return find('Canvas/ObjectLayers/TopLayer');
    }

    private handleDestroyEffectMove(): void {
        if(this.effectMove) {
            this.effectMove.destroy();
            this.effectMove = null;
        }
    }

    private handleDestroyMenuToolBuilding(): void {
        if(this.buttonMove) this.buttonMove.off(Node.EventType.TOUCH_END, this.onClickMoveLand, this);
        if(this.menuToolBuilding) this.menuToolBuilding.destroy();
    }

    private hideTool(): void {
        var menuTool = this.getMenuToolNode();
        if(menuTool) menuTool.active = false;
        if(this.menuToolBuilding) this.menuToolBuilding.active = false;
    }

    private getMenuToolNode(): Node {
        return find('Canvas/ObjectLayers/TopLayer/MenuToolPanel');
    }

    protected onDestroy(): void {
        if(this.buttonMove) this.node.off(Node.EventType.TOUCH_MOVE, this.handleMoveLand, this);
    }

    private handleTouchCoating(): void {
        if(this.menuToolBuilding) this.menuToolBuilding.active = false;
        this.hideMenuToolBuilding();
        this.hideTool();
        this.hideCoatingNode();
    }

    private hideMenuToolBuilding(): void {
        
    }

    private hideCoatingNode(): void {
        this.coatingNode.off(Node.EventType.TOUCH_START, this.handleTouchCoating, this);
        this.coatingNode.active = false;
    }

    private showCoatingNode(): void {
        if(this.coatingNode) {
            this.coatingNode.active = true;
            this.coatingNode.on(Node.EventType.TOUCH_START, this.handleTouchCoating, this);
            return;
        }
        var parentNode = this.node.parent;
        this.coatingNode = instantiate(this.coatingPrefab);
        parentNode.addChild(this.coatingNode);
        this.coatingNode.on(Node.EventType.TOUCH_START, this.handleTouchCoating, this);
    }
}


