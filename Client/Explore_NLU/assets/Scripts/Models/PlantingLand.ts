import { TYPE_ITEM } from "../Utils/Const";
import { ABuilding } from "./ABuilding";
import { TillLand } from "./TillLand";

export class PlantingLand extends ABuilding{
    private tillLands : proto.ITillLand[] = [];

    constructor(id?: number, name?: string, description?: string, price?: number, type?: TYPE_ITEM, maxLevel?: number, upgradeId?: number, currentLevel?: number, areaId?: number, positionX?: number, positionY?: number, tillLands?: proto.ITillLand[]) {
        super(id, name, description, price, type, maxLevel, upgradeId, currentLevel, areaId, positionX, positionY);
        this.tillLands = tillLands;
    }

    public getTillLands(): proto.ITillLand[] {
        return this.tillLands;
    }

    public setTillLands(tillLands: proto.ITillLand[]): void {
        this.tillLands = tillLands;
    }
}