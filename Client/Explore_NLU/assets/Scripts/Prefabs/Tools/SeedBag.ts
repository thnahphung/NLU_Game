import { _decorator, Component, EventTouch, Label, Node } from 'cc';
import AbsTool from './AbsTool';
import GlobalData from '../../Utils/GlobalData';
import { CoatingComponent } from '../../Controller/CoatingComponent';
import { COATING } from '../../Utils/Const';
import DataSender from '../../Utils/DataSender';
const { ccclass, property } = _decorator;

@ccclass('SeedBag')
export class SeedBag extends AbsTool {
    @property(Label)
    private quantityLabel: Label = null;
    private noGrowItemSeedBag: proto.INoGrowthItem = null;
    public commonGrowthItemProto: proto.ICommonGrowthItem = null;
    public quantity: number = 0;
    start(): void {
        super.start()
    }

    handleOnTouchStart(event: EventTouch): void {
        GlobalData.me().setSownStatus(false);
        super.handleOnTouchStart(event)
    }

    handleOnTouchMove(event: EventTouch): void {
        super.handleOnTouchMove(event)
    }

    handleOnTouchEnd(event: EventTouch): void {
        super.handleOnTouchEnd(event)
        this.handleStopSow();
        this.handleSendRequestSow();
    }

    handleOnTouchCancel(event: EventTouch): void {
        super.handleOnTouchCancel(event)
        this.handleStopSow();
    }

    handleStopSow(): void{
        GlobalData.me().setSowStatus(false);
        if(GlobalData.me().getSownStatus()){
            CoatingComponent.me().off(COATING.SEED);
        }
        GlobalData.me().setSownStatus(false);
    }

    handleSendRequestSow(): void {
        if(GlobalData.me().getSowingInformations() == null || GlobalData.me().getSowingInformations().sowingInformation == null || GlobalData.me().getSowingInformations().sowingInformation.length == 0) return;
        //send request sow
        DataSender.sendReqSow(GlobalData.me().getSowingInformations(), this.noGrowItemSeedBag.id);

        //clear data
        GlobalData.me().setSowingInformations(null);
    }

    setQuantityLabel(quantity: number): void {
        this.setQuantity(quantity);
        if(this.quantity > 99) {
            this.quantityLabel.string = "  99+";
        } else{
            this.quantityLabel.string = this.quantity.toString();
        }
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    setCommonGrowthItemProto(commonGrowthItemProto: proto.ICommonGrowthItem): void {
        this.commonGrowthItemProto = commonGrowthItemProto;
    }

    getCommonGrowthItemProto(): proto.ICommonGrowthItem {
        return this.commonGrowthItemProto;
    }

    getNoGrowItemSeedBag(): proto.INoGrowthItem {
        return this.noGrowItemSeedBag;
    }

    setNoGrowItemSeedBag(noGrowItemSeedBag: proto.INoGrowthItem): void {
        this.noGrowItemSeedBag = noGrowItemSeedBag;
    }
}


