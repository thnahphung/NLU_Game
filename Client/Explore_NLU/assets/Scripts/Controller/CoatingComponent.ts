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

    @property(Prefab)
    public coatingBlackPrefab: Prefab = null;

    public static me(): CoatingComponent {
        return CoatingComponent.instance;
    }

    protected onLoad(): void {
        CoatingComponent.instance = this;
    }

    public setCoating(key: string, node: Node, nodeHide?: Node): void {
        this.nodeCoatingMap.set(key, new CoatingModel(node, nodeHide));
    }

    public showCoating(key: string, isBlackBackground?: boolean): void {
        const coatingModel = this.nodeCoatingMap.get(key);
        if(!coatingModel) return;

        const nodeCoating = coatingModel.getNodeCoating();
        if(nodeCoating.getChildByName('CoatingPanel')) {
            nodeCoating.getChildByName('CoatingPanel').active = true;
            return;
        }

        if(isBlackBackground === true) {
            this.coatingNode = instantiate(this.coatingBlackPrefab);
        }else{
            this.coatingNode = instantiate(this.coatingPrefab);
        }

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

        const nodeHide = this.getNodeHide(key);
        if(nodeCoating) nodeCoating.destroy();

        const nodeBlackCoating = this.getCoatingBlackNode(key);
        if(nodeBlackCoating) nodeBlackCoating.destroy();

        if(nodeHide) nodeHide.active = false;

        this.nodeCoatingMap.delete(key);
    }

    public autoOff(key: string): void {
        if(!this.getCoatingNode(key)) return;
        this.getCoatingNode(key).on(Node.EventType.TOUCH_START, () => {
            this.getCoatingNode(key).off(Node.EventType.TOUCH_START);
            this.off(key);
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

    private getCoatingBlackNode(key: string): Node {
        let coatingModel = this.nodeCoatingMap.get(key);
        if(!coatingModel) return null;
        return coatingModel.getNodeCoating().getChildByName('CoatingBlackPanel');
    }

    private getNodeHide(key: string): Node {
        let coatingModel = this.nodeCoatingMap.get(key);
        if(!coatingModel) return null;
        return coatingModel.getNodeHide();
    }

    public offAllCoating() {
        if(this.nodeCoatingMap.size === 0) return;
        this.nodeCoatingMap.forEach((value: CoatingModel, key: string) => {
            console.log('offAllCoating', key);
            this.off(key);
        });
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


