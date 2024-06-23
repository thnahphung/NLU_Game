import { Component } from "cc";
import { WS } from "../Socket/WS";
import { CHARACTER_STATE } from "./Const";

export default class DataSender {
  public static sendReqSignIn(username: string, pass: string) {
    let reqLogin = new proto.ReqLogin();
    reqLogin.username = username;
    reqLogin.password = pass;
    let packet = new proto.Packet();
    packet.reqLogin = reqLogin;
    WS.send(packet);
  }

  public static sendReqSignUp(username: string, pass: string, email: string) {
    let reqRegister = new proto.ReqRegister();
    reqRegister.username = username;
    reqRegister.password = pass;
    reqRegister.email = email;
    let packet = new proto.Packet();
    packet.reqRegister = reqRegister;
    WS.send(packet);
  }

  public static sendReqLoadCharacters() {
    let reqLoadCharacters = new proto.ReqLoadCharacters();
    let packet = new proto.Packet();
    packet.reqLoadCharacters = reqLoadCharacters;
    WS.send(packet);
  }

  public static sendReqLogout() {
    let reqLogout = new proto.ReqLogout();
    let packet = new proto.Packet();
    packet.reqLogout = reqLogout;
    WS.send(packet);
  }

  public static sendReqRelogin(username: string, token: string) {
    let reqRelogin = new proto.ReqRelogin();
    reqRelogin.username = username;
    reqRelogin.token = token;
    let packet = new proto.Packet();
    packet.reqRelogin = reqRelogin;
    WS.send(packet);
  }

  public static sendReqPickCharacter(
    characterPicked: number,
    playerName: string
  ) {
    let reqPickCharacter = new proto.ReqPickCharacter();
    reqPickCharacter.characterId = characterPicked;
    reqPickCharacter.playerName = playerName;
    let packet = new proto.Packet();
    packet.reqPickCharacter = reqPickCharacter;
    WS.send(packet);
  }

  public static sendReqMoving(
    areaId: number,
    x: number,
    y: number,
    currentState: CHARACTER_STATE | string
  ) {
    let reqMoving = new proto.ReqMoving();
    let position = new proto.Position();
    position.x = x;
    position.y = y;
    reqMoving.areaId = areaId;
    reqMoving.position = position;
    reqMoving.currentState = currentState;
    let packet = new proto.Packet();
    packet.reqMoving = reqMoving;
    WS.send(packet);
  }

  public static sendReqPlayerJoinArea(userIdTarget: number) {
    let reqPlayerJoinArea = new proto.ReqPlayerJoinArea();
    reqPlayerJoinArea.userTargetId = userIdTarget;
    let packet = new proto.Packet();
    packet.reqPlayerJoinArea = reqPlayerJoinArea;
    WS.send(packet);
  }

  public static sendReqLoadItemsOfFarm() {
    let reqLoadBaseItems = new proto.ReqLoadItemsOfFarm();
    let packet = new proto.Packet();
    packet.reqLoadItemsOfFarm = reqLoadBaseItems;
    WS.send(packet);
  }

  public static sendReqBuyBuilding(
    uuid: string,
    type: string,
    positionX: number,
    positionY: number,
    currentLevel: number,
    areaId: number
  ) {
    let reqBuyBuilding = new proto.ReqBuyBuilding();
    reqBuyBuilding.uuid = uuid;
    reqBuyBuilding.typeBuilding = type;
    reqBuyBuilding.areaId = areaId;
    reqBuyBuilding.currentLevel = currentLevel;
    reqBuyBuilding.positionX = positionX;
    reqBuyBuilding.positionY = positionY;
    let packet = new proto.Packet();
    packet.reqBuyBuilding = reqBuyBuilding;
    WS.send(packet);
  }

  public static sendReqEmailForgetPassword(email: string) {
    let reqEmailForgetPassword = new proto.ReqEmailForgetPassword();
    reqEmailForgetPassword.email = email;
    let packet = new proto.Packet();
    packet.reqEmailForgetPassword = reqEmailForgetPassword;
    WS.send(packet);
  }

  public static sendReqRecoverPassword(email: string, newPassword: string, token: string) {
    let reqRecoverPassword = new proto.ReqRecoverPassword();
    reqRecoverPassword.password = newPassword;
    reqRecoverPassword.token = token;
    reqRecoverPassword.email = email;
    let packet = new proto.Packet();
    packet.reqRecoverPassword = reqRecoverPassword;
    WS.send(packet);
  }
}
