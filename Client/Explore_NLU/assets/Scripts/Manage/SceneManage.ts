import { _decorator, Component, find, Node } from 'cc';
import AbsScene from '../Scenes/AbsScene';
const { ccclass, property } = _decorator;

export class SceneManage {

    private static _instance: SceneManage = new SceneManage();

    public currScene: AbsScene;

    public static me(): SceneManage {
        return this._instance;
    }

    constructor() {
    }
    
    onOpen(packets: proto.IPacketWrapper) {
        this.getSceneComponents()
            .forEach((c: any) => c.onOpen ? c.onOpen(packets) : null);
    }

    onMessage(packets: proto.IPacketWrapper) {
        this.getSceneComponents()
            .forEach((component: any) => component.onMessage ? component.onMessage(packets) : null);  
    }

    onClose(event: any) {
        this.getSceneComponents()
            .forEach((c: any) => c.onClose ? c.onClose(event) : null);
    }

    onError(event: any) {
        this.getSceneComponents().forEach((c: any) => c.onError ? c.onError(event) : null);
    }

    private getSceneComponents() {
        let node = find("Canvas");
        //Lấy ra toàn bộ component của các node con của Canvas
        return node ? node.getComponentsInChildren(AbsScene) : [];
    }
}