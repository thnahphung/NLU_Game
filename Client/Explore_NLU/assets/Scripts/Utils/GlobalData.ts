import { _decorator, Component, Node } from "cc";
import { Character } from "../Prefabs/Character/Character";
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

  private isMobile: boolean = false;

  /* AGRI */
  private isUserOffline: boolean = true;
  private isMoveBuilding: boolean = false;
  private isTill: boolean = false;
  private isTilled: boolean = false;
  private isSow: boolean = false;
  private isSown: boolean = false;
  /* END AGRI */

  /*MAIN USER */
  private mainUser: proto.IUser = null;
  private mainPlayer: proto.IPlayer = null;
  private mainPlayerNode: Node = null;
  private mainPlayerPosition: proto.IPosition = null;
  /*END MAIN USER */

  private area: proto.IArea = null;

  /*OTHER USER */
  private otherUsers: proto.IUser[] = [];
  private otherPlayers: proto.IPlayer[] = [];
  private otherUsersNode: Node[] = [];
  /*END OTHER USER */

  public setMobileDevice(isMobile: boolean) {
    this.isMobile = isMobile;
  }
  public isMobileDevice() {
    return this.isMobile;
  }

  /* USER */
  public setMainUser(user: proto.IUser) {
    this.mainUser = user;
  }

  public getMainUser() {
    return this.mainUser;
  }

  public getListOtherUser() {
    return this.otherUsers;
  }

  public setListOtherUsers(users: proto.IUser[]) {
    this.otherUsers = users;
  }

  public addOtherUser(user: proto.IUser) {
    this.otherUsers.push(user);
  }

  public removeOtherUser(userId: number) {
    this.otherUsers = this.otherUsers.filter((item) => item.userId != userId);
  }

  public getIsUserOffline() {
    return this.isUserOffline;
  }

  public setIsUserOffline(isOffline: boolean) {
    this.isUserOffline = isOffline;
  }
  /* END USER */

  /* AREA */
  public setArea(area: proto.IArea) {
    this.area = area;
  }
  public getArea() {
    return this.area;
  }
  /* END AREA */

  /* MAIN PLAYER */
  public setMainPlayerPosition(position: proto.IPosition) {
    this.mainPlayerPosition = position;
  }
  public getMainPlayerPosition() {
    return this.mainPlayerPosition;
  }

  public setMainPlayer(player: proto.IPlayer) {
    this.mainPlayer = player;
  }

  public getMainPlayer() {
    return this.mainPlayer;
  }

  public setMainPlayerNode(player: Node) {
    this.mainPlayerNode = player;
  }

  public getMainPlayerNode() {
    return this.mainPlayerNode;
  }
  /* END MAIN PLAYER */

  /* PLAYERS */
  public addOtherPlayer(player: proto.IPlayer) {
    this.otherPlayers.push(player);
  }

  public getOtherPlayer(userId: number) {
    return this.otherPlayers.find((player) => player.userId == userId);
  }

  public removeOtherPlayer(userId: number) {
    this.otherPlayers = this.otherPlayers.filter(
      (player) => player.userId != userId
    );
  }

  public getListOtherPlayer() {
    return this.otherPlayers;
  }

  public setListOtherPlayer(players: proto.IPlayer[]) {
    this.otherPlayers = players;
  }

  public addOtherUserNode(player: Node) {
    this.otherUsersNode.push(player);
  }

  public getOtherUserNode(userId: number): Node {
    return this.otherUsersNode.find(
      (playerNode) =>
        playerNode.getComponent(Character).getUserProto().userId == userId
    );
  }

  public removeOtherUserNode(userId: number) {
    const index = this.otherUsersNode.findIndex(
      (playerNode) =>
        playerNode.getComponent(Character).getUserProto().userId == userId
    );
    const playerNodeRemoved = this.otherUsersNode.splice(index, 1);
    playerNodeRemoved[0].destroy();
  }

  public getListOtherUserNode() {
    return this.otherUsersNode;
  }

  public emptyOtherUsersNode() {
    this.otherUsersNode = [];
  }
  /* END PLAYERS */
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

  public setSownStatus(isSown: boolean) {
    this.isSown = isSown;
  }

  public getSownStatus() {
    return this.isSown;
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
