package vn.edu.nlu.fit.nlugame.layer1;

import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

public class AuthService {

    public static final AuthService instance = new AuthService();
    private static final int defaultSponsorId = 123456;
    private static final UserBean defaultSponsor = UserDAO.selectUser(defaultSponsorId);

    private AuthService() {
    }

    public static AuthService me() {
        return instance;
    }

    public void register(Session session, Proto.ReqRegister reqRegister) {
        //Check require field username, password
        if(reqRegister.getUsername().trim().equals("") || reqRegister.getPassword().trim().equals("")){
            sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(401)).build());
            return;
        }
        //Check username da ton tai chua
        if(UserDAO.getUser(reqRegister.getUsername()) != null){
            System.out.println(UserDAO.getUser(reqRegister.getUsername()));
            sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(400)).build());
            return;
        }
        //Insert user
        int statusInsertUser =  UserDAO.insertRegisterUser(reqRegister.getUsername(), reqRegister.getPassword());
        sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(statusInsertUser)).build());
    }

    public void checkLogin(Session session, Proto.ReqLogin reqLogin) {
        Proto.Packet.Builder packetBuilder = Proto.Packet.newBuilder();
        Proto.ResLogin.Builder resLoginBuilder = Proto.ResLogin.newBuilder();
        UserBean userLoginBean = UserDAO.getUserLogin(reqLogin.getUsername());
        // Check userLogin exists
        if(userLoginBean == null){
            resLoginBuilder.setStatus(400);
            packetBuilder.setResLogin(resLoginBuilder.build());
            System.out.println(packetBuilder.toString());
            sendResponse(session, packetBuilder.build());
            return;
        }
        // Check username and password
        if (!reqLogin.getUsername().equals(userLoginBean.getUsername()) || !reqLogin.getPassword().equals(userLoginBean.getPassword())) {
            sendResponse(session, Proto.Packet.newBuilder().setResLogin(Proto.ResLogin.newBuilder().setStatus(400)).build());
            return;
        }
        sendResponse(session, Proto.Packet.newBuilder().setResLogin(Proto.ResLogin.newBuilder().setStatus(200)).build());
    }

    public void logout(Session session, Proto.ReqLogout reqLogout){
        //TODO: Remove user in cache

        //TODO: Remove user in redis
    }
    public void checkReLogin(Session session, Proto.ReqRelogin packet) {
        System.out.println("ReLogin");
    }

    private void sendMsgRegister(Session session, int i) {
        Proto.ResRegister resRegister = Proto.ResRegister.newBuilder().setStatus(i).build();
        Proto.Packet.Builder builder = Proto.Packet.newBuilder().setResRegister(resRegister);

        sendResponse(session, builder.build());
    }

    private void sendResponse(Session session, Proto.Packet packet) {
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen())
            session.getAsyncRemote().sendObject(packets);
    }

}
