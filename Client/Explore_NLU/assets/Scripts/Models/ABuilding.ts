import { TYPE_ITEM } from "../Utils/Const";
import { Upgrade } from "./Upgrade";

export abstract class ABuilding {
    protected id?: number;
    protected name?: string;
    protected price?: number;
    protected description?: string;
    protected type?: TYPE_ITEM;
    protected maxLevel?: number;
    protected upgradeId?: number;
    protected currentLevel?: number;
    protected areaId?: number;
    protected positionX?: number;
    protected positionY?: number;
    protected upgrades?: Upgrade[] = [];

    constructor(id?:number, name?: string , description?: string, price?: number, type?: TYPE_ITEM, maxLevel?: number, upgradeId?: number, currentLevel?: number, areaId?: number, positionX?: number, positionY?: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.type = type;
        this.maxLevel = maxLevel;
        this.currentLevel = currentLevel;
        this.areaId = areaId;
        this.positionX = positionX;
        this.positionY = positionY;
        this.upgradeId = upgradeId;
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

    public getMaxLevel(): number {
        return this.maxLevel;
    }

    public setMaxLevel(maxLevel: number): void {
        this.maxLevel = maxLevel;
    }

    public getType(): TYPE_ITEM {
        return this.type;
    }

    public setType(type: TYPE_ITEM): void {
        this.type = type;
    }

    public getLevel(): number {
        return this.currentLevel;
    }

    public setLevel(currentLevel: number): void {
        this.currentLevel = currentLevel;
    }

    public getAreaId(): number {
        return this.areaId;
    }

    public setAreaId(areaId: number): void {
        this.areaId = areaId;
    }

    public getPositionX(): number {
        return this.positionX;
    }

    public setPositionX(positionX: number): void {
        this.positionX = positionX;
    }

    public getPositionY(): number {
        return this.positionY;
    }

    public setPositionY(positionY: number): void {
        this.positionY = positionY;
    }

    public getUpgrades(): Upgrade[] {
        return this.upgrades;
    }

    public setUpgrades(upgrades: Upgrade[]): void {
        this.upgrades = upgrades;
    }

    public getUpgradeId(): number {
        return this.upgradeId;
    }

    public setUpgradeId(upgradeId: number): void {
        this.upgradeId = upgradeId;
    }
}