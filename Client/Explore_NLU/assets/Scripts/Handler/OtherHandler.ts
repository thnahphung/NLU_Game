import { _decorator, Component, Node } from 'cc';
import { AbsHandler } from './AbsHandler';
const { ccclass, property } = _decorator;

@ccclass('OtherHandler')
export class OtherHandler extends AbsHandler {
    onOpen() {
    }
    onMessageHandler(packets: proto.PacketWrapper) {
    }
    onError() {
    }
    onClosed() {
    }
}

