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

    public static sendReqSignUp(username: string, pass: string) {
        let reqRegister = new proto.ReqRegister();
        reqRegister.username = username;
        reqRegister.password = pass;
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
    public static send(data: any) {
    
    }
}


