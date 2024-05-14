import { Component, Node, Prefab, _decorator, instantiate } from 'cc';
import GlobalData from '../Utils/GlobalData';
const { ccclass, property } = _decorator;

@ccclass('CoatingComponent')
export class CoatingComponent extends Component{
    private static instance: CoatingComponent;
    private nodeCoatingMap: Map<string, CoatingModel> = new Map<string, CoatingModel>();
    private coatingNode: Node = null;

    @property(Prefab)
    public coatingPrefab: Prefab = null;

    public static me(): CoatingComponent {
        return CoatingComponent.instance;
    }

    protected onLoad(): void {
        CoatingComponent.instance = this;
    }

    public setCoating(key: string, node: Node, nodeHide?: Node): void {
        this.nodeCoatingMap.set(key, new CoatingModel(node, nodeHide));
    }

    public showCoating(key: string): void {
        const coatingModel = this.nodeCoatingMap.get(key);
        if(!coatingModel) return;

        const nodeCoating = coatingModel.getNodeCoating();
        if(nodeCoating.getChildByName('CoatingPanel')) {
            nodeCoating.getChildByName('CoatingPanel').active = true;
            return;
        }

        this.coatingNode = instantiate(this.coatingPrefab);
        nodeCoating.addChild(this.coatingNode);
    }

    public getCoating(key: string): Node {
         let coatingModel = this.nodeCoatingMap.get(key);
         if(!coatingModel) return null;
         const nodeCoating = coatingModel.getNodeCoating();
         return nodeCoating.getChildByName('CoatingPanel');
    }

    public off(key: string): void {
        const nodeCoating = this.getCoatingNode(key);
        if(!nodeCoating) return;
        const nodeHide = this.getNodeHide(key);
        if(nodeCoating) nodeCoating.active = false;
        if(nodeHide) nodeHide.active = false;
    }

    public autoOff(key: string): void {
        this.getCoatingNode(key).on(Node.EventType.TOUCH_START, () => {
            this.off(key);
            this.getCoatingNode(key).off(Node.EventType.TOUCH_START);
            switch(key) {
                case "SEED":
                    GlobalData.me().setSowStatus(false);
                    break;
            }
        });
    }
    
    private getCoatingNode(key: string): Node {
        let coatingModel = this.nodeCoatingMap.get(key);
        if(!coatingModel) return null;
        return coatingModel.getNodeCoating().getChildByName('CoatingPanel');
    }

    private getNodeHide(key: string): Node {
        let coatingModel = this.nodeCoatingMap.get(key);
        if(!coatingModel) return null;
        return coatingModel.getNodeHide();
    }

}

export class CoatingModel {

    public nodeCoating: Node = null;
    public nodeHide: Node = null;

    constructor(nodeCoating: Node, nodeHide: Node) {
        this.nodeCoating = nodeCoating;
        this.nodeHide = nodeHide;
    }

    public getNodeCoating(): Node {
        return this.nodeCoating;
    }

    public getNodeHide(): Node {
        return this.nodeHide;
    }

    public setNodeCoating(node: Node): void {
        this.nodeCoating = node;
    }

    public setNodeHide(node: Node): void {
        this.nodeHide = node;
    }

}


