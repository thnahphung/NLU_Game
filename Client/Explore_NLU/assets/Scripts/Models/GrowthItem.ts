import { TYPE_ITEM } from "../Utils/Const";
import { AItem } from "./AItem";

export class GrowthItem extends AItem{
    private currentDiseaseld : number;
    private diseaseRate : number;
    private startTimeDisease : number;
    private health : number;
    private stage : number;
    private startDate : number;
    private expectedEndDate : number;
    private weatherRequired : string;
    private seasonRequired : string;
    private timePregant : string;
    private timeGrowth : string;
    constructor(id?: number, name?: string , description?: string, price?: number, salePrice?: number, type?: TYPE_ITEM, currentDiseaseld?: number, diseaseRate?: number, startTimeDisease?: number, health?: number, stage?: number, startDate?: number, expectedEndDate?: number, weatherRequired?: string, seasonRequired?: string, timePregant?: string, timeGrowth?: string){
        super(id, name, description, price, salePrice, type);
        this.currentDiseaseld = currentDiseaseld;
        this.diseaseRate = diseaseRate;
        this.startTimeDisease = startTimeDisease;
        this.health = health;
        this.stage = stage;
        this.startDate = startDate;
        this.expectedEndDate = expectedEndDate;
        this.weatherRequired = weatherRequired;
        this.seasonRequired = seasonRequired;
        this.timePregant = timePregant;
        this.timeGrowth = timeGrowth;
    }

    public getCurrentDiseaseld(): number {
        return this.currentDiseaseld;
    }

    public setCurrentDiseaseld(currentDiseaseld: number): void {
        this.currentDiseaseld = currentDiseaseld;
    }

    public getDiseaseRate(): number {
        return this.diseaseRate;
    }

    public setDiseaseRate(diseaseRate: number): void {
        this.diseaseRate = diseaseRate;
    }

    public getStartTimeDisease(): number {
        return this.startTimeDisease;
    }

    public setStartTimeDisease(startTimeDisease: number): void {
        this.startTimeDisease = startTimeDisease;
    }

    public getHealth(): number {
        return this.health;
    }

    public setHealth(health: number): void {
        this.health = health;
    }

    public getStage(): number {
        return this.stage;
    }

    public setStage(stage: number): void {
        this.stage = stage;
    }

    public getStartDate(): number {
        return this.startDate;
    }

    public setStartDate(startDate: number): void {
        this.startDate = startDate;
    }

    public getExpectedEndDate(): number {
        return this.expectedEndDate;
    }

    public setExpectedEndDate(expectedEndDate: number): void {
        this.expectedEndDate = expectedEndDate;
    }

    public getWeatherRequired(): string {
        return this.weatherRequired;
    }

    public setWeatherRequired(weatherRequired: string): void {
        this.weatherRequired = weatherRequired;
    }

    public getSeasonRequired(): string {
        return this.seasonRequired;
    }

    public setSeasonRequired(seasonRequired: string): void {
        this.seasonRequired = seasonRequired;
    }

    public getTimePregant(): string {
        return this.timePregant;
    }

    public setTimePregant(timePregant: string): void {
        this.timePregant = timePregant;
    }

    public getTimeGrowth(): string {
        return this.timeGrowth;
    }

    public setTimeGrowth(timeGrowth: string): void {
        this.timeGrowth = timeGrowth;
    }
}