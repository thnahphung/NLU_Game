import { _decorator, Component, director, find, instantiate, Node, Prefab } from 'cc';
import { WS } from '../Socket/WS';
import { TransitionScenePrefab } from '../Prefabs/TransitionScene/TransitionScenePrefab';
import AbsScene from '../Scenes/AbsScene';
const { ccclass, property } = _decorator;

@ccclass('LostConnectionComponent')
export class LostConnectionComponent extends AbsScene {
    @property(Prefab)
    transitionScreen: Prefab = null;
    start() {

    }
    onClose() {
        let loginScene = director.getScene().name;
        console.log("loginScene",loginScene);
        if(loginScene == "AuthenScene"){
            return;
        }
        console.log("onClose in LostConnectionComponent");
        let transitScreenAuthen = this.transitionScreen != null ? instantiate(this.transitionScreen) : null;
        transitScreenAuthen.getComponent(TransitionScenePrefab).setSceneName("AuthenScene");
        find("Canvas").addChild(transitScreenAuthen);
    }
    update(deltaTime: number) {
        WS.me().sendWithBuffer();
        WS.me().checkAndReconnect();
    }
}

