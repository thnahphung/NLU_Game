import { _decorator, BlockInputEvents, Collider2D, Component, Contact2DType, EventTouch, find, ICollisionEvent, instantiate, IPhysics2DContact, Node, PhysicsSystem2D, Prefab, RigidBody, Sprite, UITransform, Vec3 } from 'cc';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING, SEED_BAG } from '../../Utils/Const';
const { ccclass, property } = _decorator;

@ccclass('TilledLand')
export class TilledLand extends Component {
    private seedNode: Node = null;
    private cabbageNode: Node = null;
    private carrotNode: Node = null;
    private cucumberNode: Node = null;
    private pumpkinNode: Node = null;
    private nodePosition: Vec3 = new Vec3();
    private isSown = false;
    @property(Prefab)
    private ricePrefab: Prefab = null;
    @property(Prefab)
    private cabbagePrefab: Prefab = null;
    @property(Prefab)
    private carrotPrefab: Prefab = null;
    @property(Prefab)
    private cucumberPrefab: Prefab = null;
    @property(Prefab)
    private pumkinPrefab: Prefab = null;

    protected start(): void {
        let collider = this.node.getComponent(Collider2D);
        if(collider){
            collider.enabled = true;
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }
    onLoad() {
        this.listenSow();
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null ){
        if(GlobalData.me().getTillStatus()){
            if(GlobalData.me().getSowStatus()){
                return;
            }
            this.handleTillLand();
            GlobalData.me().setTilledStatus(true);
        }

        if(GlobalData.me().getSowStatus()){
            if(GlobalData.me().getTilledStatus()){
                return;
            }
            if(!this.node.getComponent(Sprite).enabled || this.isSown) return;
            let seedBag = otherCollider.node.name;
            this.handleSow(seedBag);
            //console.log("Sow...", otherCollider.node.name);
        }
    }

    private handleSow(seed: string):void {
        this.isSown = true;
        switch(seed){
            case SEED_BAG.RICE:
                this.seedNode = instantiate(this.ricePrefab);
                break;
            case SEED_BAG.CABBAGE:
                this.seedNode = instantiate(this.cabbagePrefab);
            break;
            case SEED_BAG.CARROT:
                this.seedNode = instantiate(this.carrotPrefab);
            break;
            case SEED_BAG.CUCUMBER:
                this.seedNode = instantiate(this.cucumberPrefab);
            break;
            case SEED_BAG.PUMPKIN:
                this.seedNode = instantiate(this.pumkinPrefab);
            break;
        }
        let plantingLand = this.node.getParent().getParent();
        this.seedNode.setPosition(this.node.position.x + plantingLand.position.x, this.node.position.y + plantingLand.position.y - 5, 0);
        this.getMidLayer()?.addChild(this.seedNode);
    }

    private handleTillLand(): void {
        this.node.getComponent(Sprite).enabled = true;
        this.node.getComponent(BlockInputEvents).enabled = true;
        // Node begin listening sowing
        this.listenSow();
    }

    private listenSow(): void {
        var fillStatus = this.node.getComponent(Sprite).enabled
        if(fillStatus){
            this.node.on(Node.EventType.TOUCH_END, this.handleTouchTilledLand, this);
        }
    }

    private handleTouchTilledLand(): void {
        this.showMenuSeedNode();
    }

    private showMenuSeedNode(): void {
        if(GlobalData.me().getSowStatus()){
            return;
        }
        GlobalData.me().setSowStatus(true);
        var TilledLandPanel = this.node.getParent();
        var plantingLandPanel = TilledLandPanel.getParent();
        var menuSeedNode = this.getMenuSeedNode();
        menuSeedNode.setPosition(plantingLandPanel.getPosition().x, plantingLandPanel.getPosition().y + 145, 0);
        menuSeedNode.active = true;

        CoatingComponent.me().setCoating(COATING.SEED, plantingLandPanel.parent, menuSeedNode);
        CoatingComponent.me().showCoating(COATING.SEED);
        CoatingComponent.me().autoOff(COATING.SEED);
    }

    private getMenuSeedNode(): Node {
        return find('Canvas/PopupGameLayer/MenuSeedPanel');
    }

    private getMidLayer(): Node {
        return find('Canvas/ObjectLayers/MidLayer');
    }
    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_END, this.handleTouchTilledLand, this);
    }
}


