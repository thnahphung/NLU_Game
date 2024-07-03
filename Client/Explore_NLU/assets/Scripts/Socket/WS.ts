import { director } from "cc";
import { UI } from "../../../extensions/i18n/@types/editor/ui-kit";
import { wsConfig } from "../Config/Config";
import { HandlerManager } from "../Manager/HandlerManager";
import { SceneManager } from "../Manager/SceneManager";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { SCENES } from "../Utils/Const";
export class WS {
  private static _instance: WS = null;
  private _ws: WebSocket;
  private _url: string = wsConfig.host + ":" + wsConfig.port + wsConfig.path;
  private static listPacket: proto.Packet[] = [];
  private connectFailLastTime: number = 0;
  public static me(): WS {
    if (this._instance == null) {
      this._instance = new WS();
    }
    return this._instance;
  }

  public static send(msg: proto.Packet): void {
    this.listPacket.push(msg);
  }

  public sendWithBuffer() {
    // cứ 0,1s đóng gói và gửi đi
    if (
      WS._instance._ws.readyState != WebSocket.OPEN ||
      WS.listPacket.length <= 0
    ) {
      return;
    }
    let packets = new proto.PacketWrapper();
    packets.packet = WS.listPacket;
    let buffer = proto.PacketWrapper.encode(packets).finish();
    this._ws.send(buffer);
    WS.listPacket = [];
  }

  constructor() {
    this.checkAndReconnect();
  }

  onOpen = (event: any) => {
    SceneManager.me()?.onOpen(event.data);
  };

  onMessage = (event: any) => {
    let data = new Uint8Array(event.data);
    let msg = proto.PacketWrapper.decode(data);
    SceneManager.me()?.onMessage(msg);
    HandlerManager.me()?.onMessage(msg);
  };

  onClose = (event: any) => {
    SceneManager.me()?.onClose(event.data);
  };

  onError = (event: any) => {
    SceneManager.me()?.onError(event.data);
  };

  connect() {
    this._ws = new WebSocket(this._url);
    this._ws.binaryType = "arraybuffer";
    this._ws.onopen = this.onOpen;
    this._ws.onmessage = this.onMessage;
    this._ws.onclose = this.onClose;
    this._ws.onerror = this.onError;

    if (this._ws.readyState == WebSocket.CONNECTING) {
      if (UICanvas.me()._popupConnectionNotify == null) {
        UICanvas.me().showPopupConnectionNotify();
      }
    }
  }

  public checkAndReconnect() {
    let now = new Date().getTime();
    if (
      this._ws &&
      (this._ws.readyState == WebSocket.OPEN ||
        now - this.connectFailLastTime < 10000)
    ) {
      if (this._ws.readyState == WebSocket.OPEN) {
        if (UICanvas.me()._popupConnectionNotify) {
          UICanvas.me().closePopupConnectionNotify();
          const sceneName = director.getScene().name;
          if (sceneName == SCENES.AUTHEN) return;
          UICanvas.me().transitScene(SCENES.AUTHEN);
        }
      }
      return;
    }
    this.connectFailLastTime = now;
    this.connect();
  }
}
