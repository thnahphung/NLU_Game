import { TYPE_ITEM } from "../Utils/Const";
import { ABuilding } from "./ABuilding";

export class FarmBuilding extends ABuilding {
    constructor(id?: number, name?: string, description?: string, price?: number, type?: TYPE_ITEM, maxLevel?: number, propertyId?: number, upgradeId?: number, currentLevel?: number, areaId?: number, positionX?: number, positionY?: number) {
        super(id, name, description, price, type, maxLevel, propertyId, upgradeId, currentLevel, areaId, positionX, positionY);
    }
}