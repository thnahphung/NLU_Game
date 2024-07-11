import { _decorator, Collider2D, Component, EventMouse, EventTouch, find, IPhysics2DContact, Node } from 'cc';
import GlobalData from '../../Utils/GlobalData';
import DataSender from '../../Utils/DataSender';
import { AbsMenuItem } from '../Menu/AbsMenuItem';
import { UICanvas } from '../MainUI/UICanvas';
const { ccclass } = _decorator;

@ccclass('Pickaxe')
export class Pickaxe extends AbsMenuItem {
    start() {
        super.start()
    }

    handleOnTouchStart(event: EventTouch): void {
        super.handleOnTouchStart(event)
    }

    handleOnTouchMove(event: EventTouch): void {
        super.handleOnTouchMove(event)
    }

    handleOnTouchEnd(event: EventTouch): void {
        super.handleOnTouchEnd(event)
        if(GlobalData.me().getTilledStatus()) {
            this.handleTilledLand()
            UICanvas.me().closePopupMenuToolFarm();
            GlobalData.me().setTilledStatus(false);
        }
    }

    handleOnTouchCancel(event: EventTouch): void {
        super.handleOnTouchCancel(event)
        GlobalData.me().setTilledStatus(false);
    }
    
    handleTilledLand(): void {
        if(GlobalData.me().getTilledLands() == null || GlobalData.me().getTilledLands() == null || GlobalData.me().getTilledLands().length == 0){
            return;
        }
        DataSender.sendReqTilledLand(GlobalData.me().getTilledLands());
        GlobalData.me().setTilledLands(null);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

    }
}


