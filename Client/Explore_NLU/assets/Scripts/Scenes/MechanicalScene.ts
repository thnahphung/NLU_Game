import { _decorator, Component, Node } from 'cc';
import AbsScene from './AbsScene';
const { ccclass, property } = _decorator;

@ccclass('MehanicalScene')
export class MehanicalScene extends AbsScene {
    protected onLoad(): void {
        super.onLoad();
    }
    start() {
        super.start();
    }
}


