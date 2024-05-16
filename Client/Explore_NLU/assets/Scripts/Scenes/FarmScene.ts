import { _decorator, Node, Layout, Prefab, instantiate, Sprite, Event, EventTouch, UITransform } from 'cc';
import AbsScene from '../../Scripts/Scenes/AbsScene';
import { Util } from '../../Scripts/Utils/Util';
const { ccclass, property } = _decorator;

@ccclass('FarmScene')
export class FarmScene extends AbsScene {
    @property(Prefab)
    private plantingLandPrefab: Prefab = null;
    @property(Node)
    private plantingLandPanel: Node = null;
    private plantings: Node[] = []; //Todo: đưa vào global data
    start() {

    }

    protected onLoad(): void {
        let plantingLand2 = instantiate(this.plantingLandPrefab);
        //this.plantings.push(plantingLand2);
        this.initPlantingLand()
    }

    initPlantingLand(){
        //Tải danh sách đất trồng
        this.loadPlantingsToUI(this.plantings);
    }

    loadPlantingsToUI(plantings: Node[]): void {
        console.log('Load planting to UI', plantings)
        plantings.forEach((planting) => {
            this.plantingLandPanel.addChild(planting);
        })
    }

    update(deltaTime: number) {
        
    }
}


