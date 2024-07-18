import {find} from 'cc';
import AbsScene from '../Scenes/AbsScene';

export class SceneManager {

    private static _instance: SceneManager;

    public currScene: AbsScene;

    public static me(): SceneManager {
        if(!this._instance){
            this._instance = new SceneManager();
        }
        return this._instance;
    }

    constructor() {
    }
    get currentScene(): AbsScene {
        return this.currScene;
    }
    set currentScene(scene: AbsScene) {
        this.currScene = scene;
    }
    onOpen(packets: proto.IPacketWrapper) {
        this.getSceneComponents()
            .forEach((c: any) => c.onOpen ? c.onOpen(packets) : null);
    }

    onMessage(packets: proto.IPacketWrapper) {
        this.getSceneComponents()
            .forEach((component: any) => component.onMessageHandler ? component.onMessageHandler(packets) : null);  
    }

    onClose(event: any) {
        this.getSceneComponents()
            .forEach((c: any) => c.onClose ? c.onClose(event) : null);
    }

    onError(event: any) {
        this.getSceneComponents().forEach((c: any) => c.onError ? c.onError(event) : null);
    }

    onPing(event: any) {
        this.getSceneComponents().forEach((c: any) => c.onPing ? c.onPing(event) : null);
    }

    private getSceneComponents() {
        let node = find("Canvas");
        //Lấy ra toàn bộ component của các node con của Canvas
        return node ? node.getComponentsInChildren(AbsScene) : [];
    }
}