export class TillLand {
    private id?: number;
    private index?: number;
    private statusTilled?: number;

    constructor(id?: number, index?: number, statusTilled?: number) {
        this.id = id;
        this.index = index;
        this.statusTilled = statusTilled;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getIndex(): number {
        return this.index;
    }

    public setIndex(index: number): void {
        this.index = index;
    }

    public getStatusTilled(): number {
        return this.statusTilled;
    }

    public setStatusTilled(statusTilled: number): void {
        this.statusTilled = statusTilled;
    }
}