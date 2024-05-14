import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

export default class GlobalData {
  private static instance: GlobalData = null;
  public static me() {
    if (this.instance == null) {
      this.instance = new GlobalData();
    }
    return this.instance;
  }
  private constructor() {}

  private user: proto.IUser = null;
  private isMobile: boolean = false;
  private isMoveBuilding: boolean = false;
  private isTill: boolean = false;
  private isTilled: boolean = false;
  private isSow: boolean = false;

  /* USER */
  public setUser(user: proto.IUser) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }

  public setPlayerName(playerName: string) {
    this.user.playerName = playerName;
  }
  /* END USER */

  public getPlayer(userId: number) {
    let playerInfo = null;

    return playerInfo;
  }
  public removePlayer(userId: number) {}

  public setMobileDevice(isMobile: boolean) {
    this.isMobile = isMobile;
  }
  public isMobileDevice() {
    return this.isMobile;
  }

  /* Agricultural engineer */
  public setTillStatus(isTill: boolean) {
    this.isTill = isTill;
  }

  public getTillStatus() {
    return this.isTill;
  }

  public setTilledStatus(isTilled: boolean) {
    this.isTilled = isTilled;
  }

  public getTilledStatus() {
    return this.isTilled;
  }

  public setSowStatus(isSow: boolean) {
    this.isSow = isSow;
  }

  public getSowStatus() {
    return this.isSow;
  }
  /* END Agricultural engineer */


  /* Building */
  public setMoveBuildingStatus(isMoveBuilding: boolean) {
    this.isMoveBuilding = isMoveBuilding;
  }

  public getMoveBuildingStatus() {
    return this.isMoveBuilding;
  }
  /* END Building */
}
