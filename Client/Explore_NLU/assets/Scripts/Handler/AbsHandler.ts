import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AbsHandler')
export class AbsHandler extends Component {
    onMessageHandler(packets: proto.IPacketWrapper) {
        //to do
    }
    onError() {
        //to do 
    }
    onClosed() {
        //to do
    }
}

