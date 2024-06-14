export class Upgrade {
    private id?: number;
    private name?: string;
    private price?: number;
    private capacity?: number;
    private buildingId?: number;
    private level?: number;

    constructor(id?: number, name?: string, price?: number, capacity?: number, buildingId?: number, level?: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.capacity = capacity;
        this.buildingId = buildingId;
        this.level = level;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
}