import { TYPE_ITEM } from "../Utils/Const";
import { AItem } from "./AItem";

export class NoGrowthItem extends AItem{
    private status: number;
    constructor(id?: number, name?: string , description?: string, price?: number, salePrice?: number, type?: TYPE_ITEM, status?: number){
        super(id, name, description, price, salePrice, type);
        this.status = status;
    }
}