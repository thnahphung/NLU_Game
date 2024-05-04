import { _decorator, Component, Node } from 'cc';
import { AbsHandler } from '../Handler/AbsHandler';
import { OtherHandler } from '../Handler/OtherHandler';
export class HandlerManager {
    private static _instance: HandlerManager = new HandlerManager();
    private handles : AbsHandler[];
    public static me(): HandlerManager {
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

