import { Component } from "cc";
import { WS } from "../Socket/WS";

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
    public static sendReqPickCharacter(characterPicked: number, playerName: string) {
        let reqPickCharacter = new proto.ReqPickCharacter();
        reqPickCharacter.characterId = characterPicked;
        reqPickCharacter.playerName = playerName;
        let packet = new proto.Packet();
        packet.reqPickCharacter = reqPickCharacter;
        WS.send(packet);
    }
    public static send(data: any) {
    
    }
}


