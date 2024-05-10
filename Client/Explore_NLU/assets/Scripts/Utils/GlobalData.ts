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
}
