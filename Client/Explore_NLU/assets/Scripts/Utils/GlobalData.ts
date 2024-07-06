import { _decorator, Component, Node, Vec3 } from "cc";
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
  private isHarvest: boolean = false;
  private isHarvested: boolean = false;
  private tilledLandListProto: proto.ITillLands = null;
  private sowingInformations: proto.SowingInformations = null;
  private harvestingInformations: proto.HarvestingInformations = null;
  /* END AGRI */

  private positionCharacter: Vec3 = null;

  public setMobileDevice(isMobile: boolean) {
    this.isMobile = isMobile;
  }
  public isMobileDevice() {
    return this.isMobile;
  }

  public getIsUserOffline() {
    return this.isUserOffline;
  }

  public setIsUserOffline(isOffline: boolean) {
    this.isUserOffline = isOffline;
  }

  /*===== GAME STATE =====*/
  private gameState: proto.IGameState = null;

  public setGameState(gameState: proto.IGameState) {
    this.gameState = gameState;
  }

  public getGameState() {
    return this.gameState;
  }
  /*===== END GAME STATE =====*/

  /*===== MAIN USER =====*/
  private mainUser: proto.IUser = null;
  private mainUserNode: Node = null;
  private mainUserPosition: proto.IPosition = null;
  private mainUserFriends: proto.IFriend[] = [];

  public setMainUser(user: proto.IUser) {
    this.mainUser = user;
  }

  public getMainUser() {
    return this.mainUser;
  }

  public setMainUserPosition(position: proto.IPosition) {
    this.mainUserPosition = position;
  }
  public getMainUserPosition() {
    return this.mainUserPosition;
  }

  public setMainUserNode(userNode: Node) {
    this.mainUserNode = userNode;
  }

  public getMainUserNode() {
    return this.mainUserNode;
  }

  public setMainUserFriends(friends: proto.IFriend[]) {
    this.mainUserFriends = friends;
  }

  public getMainUserFriends() {
    return this.mainUserFriends;
  }
  /*===== END MAIN USER =====*/

  /*===== OTHER USER =====*/
  private otherUsers: proto.IUser[] = [];
  private otherUsersNode: Node[] = [];

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
    this.otherUsers = this.otherUsers.filter(
      (otherUser) => otherUser.userId != userId
    );
  }

  public addOtherUsersNode(userNode: Node) {
    this.otherUsersNode.push(userNode);
  }

  public getOtherUsersNode(userId: number): Node {
    return this.otherUsersNode.find(
      (userNode) =>
        userNode.getComponent(Character).getUserProto().userId == userId
    );
  }

  public removeOtherUsersNode(userId: number) {
    const index = this.otherUsersNode.findIndex(
      (userNode) =>
        userNode.getComponent(Character).getUserProto().userId == userId
    );
    const userNodeRemoved = this.otherUsersNode.splice(index, 1);
    userNodeRemoved[0].getComponent(Character).getLabelName().node.destroy();
    userNodeRemoved[0].destroy();
  }

  public getListOtherUserNode() {
    return this.otherUsersNode;
  }

  public emptyOtherUsersNode() {
    this.otherUsersNode = [];
  }

  /*===== END OTHER USER =====*/

  /*===== AREA =====*/
  private area: proto.IArea = null;
  private mainArea: proto.IArea = null;

  public setArea(area: proto.IArea) {
    this.area = area;
  }

  public getArea() {
    return this.area;
  }

  public setMainArea(area: proto.IArea) {
    this.mainArea = area;
  }

  public getMainArea() {
    return this.mainArea;
  }
  /*===== END AREA =====*/

  /* MAIN PLAYER */

  /* END MAIN PLAYER */

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

  public setHarvestStatus(isHarvest: boolean) {
    this.isHarvest = isHarvest;
  }

  public getHarvestStatus() {
    return this.isHarvest;
  }

  public setHarvestedStatus(isHarvested: boolean) {
    this.isHarvested = isHarvested;
  }

  public getHarvestedStatus() {
    return this.isHarvested;
  }

  public setTilledLandListProto(tilledLandListProto: proto.ITillLands) {
    this.tilledLandListProto = tilledLandListProto;
  }

  public getTilledLandListProto() {
    return this.tilledLandListProto;
  }

  public setSowingInformations(sowingInformations: proto.SowingInformations) {
    this.sowingInformations = sowingInformations;
  }

  public getSowingInformations() {
    return this.sowingInformations;
  }

  public setHarvestingInformations(harvestingInformations: proto.HarvestingInformations) {
    this.harvestingInformations = harvestingInformations;
  }

  public getHarvestingInformations() {
    return this.harvestingInformations;
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

  public setPositionCharacter(position: Vec3) {
    this.positionCharacter = position;
  }

  public getPositionCharacter() {
    return this.positionCharacter;
  }

  public logout() {
    this.mainUser = null;
    this.mainUserNode = null;
    this.mainUserPosition = null;
    this.otherUsers = [];
    this.otherUsersNode = [];
    this.area = null;
    this.isMoveBuilding = false;
    this.isTill = false;
    this.isTilled = false;
    this.isSow = false;
    this.isSown = false;
    this.isHarvest = false;
    this.isHarvested = false;
    this.positionCharacter = null;
    this.mainArea = null;
  }
}
