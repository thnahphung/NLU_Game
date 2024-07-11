import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SeedInformation')
export class SeedInformation extends Component {
    private noGrowItemSeedBag: proto.INoGrowthItem = null;
    private quantity: number = 0;

    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setNoGrowItemSeedBag(noGrowItemSeedBag: proto.INoGrowthItem): void {
        this.noGrowItemSeedBag = noGrowItemSeedBag;
    }

    getNoGrowItemSeedBag(): proto.INoGrowthItem {
        return this.noGrowItemSeedBag;
    }

}


