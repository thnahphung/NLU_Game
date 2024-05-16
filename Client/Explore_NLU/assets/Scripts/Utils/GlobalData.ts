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

  /*MAIN USER */
  private mainUser: proto.IUser = null;
  private mainPlayer: proto.IPlayer = null;
  private mainPlayerNode: Node = null;
  private mainPlayerPosition: proto.IPosition = null;
  /*END MAIN USER */

  private area: proto.IArea = null;

  /*OTHER USER */
  private users: proto.IUser[] = [];
  private players: proto.IPlayer[] = [];
  private playersNode: Node[] = [];
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

  public getUsers() {
    return this.users;
  }

  public setUsers(users: proto.IUser[]) {
    this.users = users;
  }

  public addUser(user: proto.IUser) {
    this.users.push(user);
  }

  public removeUser(userId: number) {
    this.users = this.users.filter((item) => item.userId != userId);
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
  public addPlayer(player: proto.IPlayer) {
    this.players.push(player);
  }

  public getPlayer(userId: number) {
    return this.players.find((player) => player.userId == userId);
  }

  public removePlayer(userId: number) {
    this.players = this.players.filter((player) => player.userId != userId);
  }

  public getPlayers() {
    return this.players;
  }

  public setPlayers(players: proto.IPlayer[]) {
    this.players = players;
  }

  public addPlayerNode(player: Node) {
    this.playersNode.push(player);
  }

  public getPlayerNode(userId: number): Node {
    return this.playersNode.find(
      (playerNode) => playerNode.getComponent(Character).getUserId() == userId
    );
  }

  public removePlayerNode(userId: number) {
    // this.playersNode.forEach((playerNode) => {
    //   if (playerNode.getComponent(Character).getUserId() == userId) {
    //     playerNode.destroy();
    //   }
    // });
    const index = this.playersNode.findIndex(
      (playerNode) => playerNode.getComponent(Character).getUserId() == userId
    );
    const playerNodeRemoved = this.playersNode.splice(index, 1);
    playerNodeRemoved[0].destroy();
  }

  public getListPlayerNode() {
    return this.playersNode;
  }

  public clearPlayersNode() {
    this.playersNode = [];
  }
  /* END PLAYERS */
}
