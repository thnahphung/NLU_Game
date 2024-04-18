import { _decorator, Component, Node } from 'cc';
import { WS } from '../Socket/WS';
const { ccclass, property } = _decorator;

@ccclass('LostConnectionComponent')
export class LostConnectionComponent extends Component {
    start() {

    }

    update(deltaTime: number) {
        WS.me().sendWithBuffer();
        WS.me().checkAndReconnect();
    }
}

