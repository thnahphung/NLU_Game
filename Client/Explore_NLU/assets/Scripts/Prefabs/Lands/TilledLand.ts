import { _decorator, Collider2D, Component, Contact2DType, EventTouch, ICollisionEvent, IPhysics2DContact, Node, PhysicsSystem2D, RigidBody, Sprite } from 'cc';
import GlobalData from '../../Utils/GlobalData';
const { ccclass, property } = _decorator;

@ccclass('TilledLand')
export class TilledLand extends Component {
    protected start(): void {
        let collider = this.node.getComponent(Collider2D);
        if(collider){
            collider.enabled = true;
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }
    
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null ){
        if(GlobalData.me().getTillStatus()){
            this.handleTillLand();
        }
    }

    onLoad() {
    }

    handleTillLand(): void {
        this.node.getComponent(Sprite).enabled = true;
    }

}


