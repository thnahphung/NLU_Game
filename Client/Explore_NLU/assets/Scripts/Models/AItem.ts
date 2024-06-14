import { TYPE_ITEM } from "../Utils/Const";

export abstract class AItem {
    protected id?: number;
    protected name?: string;
    protected price?: number;
    protected description?: string;
    protected salePrice?: number;
    protected type?: TYPE_ITEM;

    constructor(id?:number, name?: string , description?: string, price?: number, salePrice?: number, type?: TYPE_ITEM) {
        this.id = id;
        this.name = name ;
        this.description = description;
        this.price = price;
        this.salePrice = salePrice;
        this.type = type;
    }
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }
}