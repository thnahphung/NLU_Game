import { _decorator, Button, Component, Event, find, Node } from 'cc';
import { CustomEvent } from '../../Utils/CustomEvent';
import { CUSTOM_EVENT } from '../../Utils/Const';
const { ccclass, property } = _decorator;

@ccclass('PopupOption')
export class PopupOption extends Component {
    @property(Button)
    public buttonCancel: Button = null;
    @property(Button)
    public buttonComplete: Button = null;
    public nodeMove: Node = null;

    protected onLoad(): void {
        this.buttonCancel.node.on(Node.EventType.TOUCH_END, this.onClickCancel, this);
        this.buttonComplete.node.on(Node.EventType.TOUCH_END, this.onClickComplete, this);
    }

    private onClickCancel(): void {
        if(!this.nodeMove) return;
        let event = new CustomEvent(CUSTOM_EVENT.LISTEN_CANCEL, true);
        this.nodeMove.dispatchEvent(event);
        //this.node.destroy();
    }

    private onClickComplete(): void {
        if(!this.nodeMove) return;
        let event = new CustomEvent(CUSTOM_EVENT.LISTEN_COMPLETE, true);
        this.nodeMove.dispatchEvent(event);
        //this.node.destroy();
    }

    setComponent(component: Node) {
        this.nodeMove = component;
    }
}


