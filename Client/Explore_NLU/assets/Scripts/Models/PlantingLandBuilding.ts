import { TYPE_ITEM } from "../Utils/Const";
import { ABuilding } from "./ABuilding";
import { TillLand } from "./TillLand";

export class PlantingLandBuilding extends ABuilding{
    private tillLands : proto.ITillLands;
    constructor(id?: number, name?: string, description?: string, price?: number, type?: TYPE_ITEM, maxLevel?: number, propertyId?: number, upgradeId?: number, currentLevel?: number, areaId?: number, positionX?: number, positionY?: number, tillLands?: proto.ITillLands) {
        super(id, name, description, price, type, maxLevel, propertyId, upgradeId, currentLevel, areaId, positionX, positionY);
        this.tillLands = tillLands;
    }

    public getTillLands(): proto.ITillLands {
        return this.tillLands;
    }

    public setTillLands(tillLands: proto.ITillLands): void {
        this.tillLands = tillLands;
    }
}