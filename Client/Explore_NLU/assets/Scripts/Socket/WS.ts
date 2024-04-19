import { wsConfig } from "../Config/Config";
import { SceneManage } from "../Manage/SceneManage";
export class WS {
    private static _instance: WS;
    private _ws: WebSocket;
    private _url: string = wsConfig.host + ":" + wsConfig.port + wsConfig.path;
    private static listPacket: proto.Packet[] = [];
    private connectFailLastTime: number = 0;
    public static me(): WS {
        if (WS._instance == null) {
            WS._instance = new WS();
        }
        return WS._instance;
    }

    public static send(msg: proto.Packet): void {
        console.debug("WS.send:::", msg)
        console.log("WS.send:::", msg)
        this.listPacket.push(msg);
    }

    public sendWithBuffer() {
        // cứ 0,1s đóng gói và gửi đi
        if (WS._instance._ws.readyState != WebSocket.OPEN || WS.listPacket.length <= 0) {
            return
        }
        let packets = new proto.PacketWrapper();
        packets.packet = WS.listPacket;
        let buffer = proto.PacketWrapper.encode(packets).finish();
        this._ws.send(buffer);
        WS.listPacket = [];
    }

    constructor() {
        this.checkAndReconnect();
        console.debug("WS created");
    }

    onOpen = (event: any) => {
        console.debug('WS connected',event.data);
        SceneManage.me()?.onOpen(event.data);
    }

    onMessage = (event: any) => {
        console.debug('WS message',event.data);
        let data = new Uint8Array(event.data);
        let msg = proto.PacketWrapper.decode(data);
        SceneManage.me()?.onMessage(msg);
    }

    onClose = (event: any) => {
        console.debug('WS close',event.data);
        SceneManage.me()?.onClose(event.data);
    }

    onError = (event: any) => {
        console.debug('WS error', event.data);
        SceneManage.me()?.onError(event.data);
    }

    connect() {
        this._ws = new WebSocket(this._url);
        this._ws.binaryType = "arraybuffer";
        this._ws.onopen = this.onOpen;
        this._ws.onmessage = this.onMessage;
        this._ws.onclose = this.onClose
        this._ws.onerror = this.onError;
    }

    public checkAndReconnect() {
        let now = new Date().getTime()
        if (WS._instance && (WS._instance._ws.readyState == WebSocket.OPEN || now - this.connectFailLastTime < 30000)) {
            return;
        }
        this.connectFailLastTime = now;
        this.connect();
    }
}


