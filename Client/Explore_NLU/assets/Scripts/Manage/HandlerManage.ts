import { _decorator, Component, Node } from 'cc';
import { AbsHandler } from '../Handler/AbsHandler';
import { OtherHandler } from '../Handler/OtherHandler';
export class HandlerManage {
    private static _instance: HandlerManage = new HandlerManage();
    private handles : AbsHandler[];
    public static me(): HandlerManage {
        return this._instance;
    }
    constructor() {
        this.handles = [];
        this.handles.push(new OtherHandler());
    }

    onMessage(packets: proto.IPacketWrapper) {
        this.handles?.forEach(handle => {
            handle.onMessageHandler(packets);
        });
    }
    onError() {
        this.handles?.forEach(handle => {
            handle.onError();
        });
    }
    onClosed() {
        this.handles?.forEach(handle => {
            handle.onClosed();
        });
    }
}

