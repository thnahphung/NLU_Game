import { Event } from 'cc';

export class CustomEvent extends Event {
    public name: any = null;
    public detail: any = null;  // Custom property
    constructor(name: string, bubbles?: boolean, detail?: any){
        super(name, bubbles);
        this.name = name;
        this.detail = detail;
    }

}