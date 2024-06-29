import { _decorator, Component, Node, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PopupConnectionNotify')
export class PopupConnectionNotify extends Component {
    @property(Node)
    loadingIcon: Node = null;
   
    protected onLoad(): void {
        if (this.loadingIcon) {
            tween(this.loadingIcon).by(1, { angle: -360 }).repeatForever().start();
        }
    }
}


