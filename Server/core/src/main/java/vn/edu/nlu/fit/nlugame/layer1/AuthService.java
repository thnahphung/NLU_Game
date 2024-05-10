package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.dao.PlayerDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PlayerBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.PlayerCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;

import java.util.UUID;

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
        if (reqRegister.getUsername().trim().equals("") || reqRegister.getPassword().trim().equals("")) {
            sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(401)).build());
            return;
        }
        //Check username va email da ton tai chua
        int checkResult = UserDAO.checkUserRegister(reqRegister.getUsername(), reqRegister.getEmail());
        if (checkResult != 200) {
            sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(checkResult)).build());
            return;
        }
        //Insert user
        int statusInsertUser = UserDAO.insertRegisterUser(reqRegister.getUsername(), reqRegister.getPassword(), reqRegister.getEmail());
        sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(statusInsertUser)).build());
    }

    public void checkLogin(Session session, Proto.ReqLogin reqLogin) {
        Proto.Packet.Builder packetBuilder = Proto.Packet.newBuilder();
        Proto.ResLogin.Builder resLoginBuilder = Proto.ResLogin.newBuilder();
        UserBean userLoginBean = UserDAO.getUserLogin(reqLogin.getUsername());
        // Check userLogin exists
        if (userLoginBean == null) {
            resLoginBuilder.setStatus(400);
            packetBuilder.setResLogin(resLoginBuilder.build());
            sendResponse(session, packetBuilder.build());
            return;
        }
        // Check username and password
        if (!reqLogin.getUsername().equals(userLoginBean.getUsername()) || !reqLogin.getPassword().equals(userLoginBean.getPassword())) {
            sendResponse(session, Proto.Packet.newBuilder().setResLogin(Proto.ResLogin.newBuilder().setStatus(400)).build());
            return;
        }
        //Check userLogin is logging in on another device
        Proto.User userProto = Proto.User.newBuilder()
                .setUserId(userLoginBean.getId())
                .setUsername(userLoginBean.getUsername())
                .setHasCharacter(userLoginBean.getHasCharacter())
                .build();
        if (checkLoginOtherDevice(userProto)) {
            sendResponse(session, Proto.Packet.newBuilder().setResLogin(Proto.ResLogin.newBuilder().setStatus(403)).build());
            return;
        }
        //When login success
        loginSuccess(session, userProto);
    }

    private void loginSuccess(Session session, Proto.User user) {
        PlayerBean playerBean = PlayerDAO.getPlayerByUserId(user.getUserId());
        Proto.Player playerProto = Proto.Player.newBuilder()
                .setPlayerId(playerBean.getId())
                .setPlayerName(playerBean.getPlayerName())
                .setUserId(playerBean.getUserId())
                .setCharacterId(playerBean.getCharacterId())
                .setLevel(playerBean.getLevel())
                .setAreaId(playerBean.getAreaId())
                .build();
        //Save user in cache redis
        SessionCache.me().addUserSession(SessionID.of(session), user);
        UserCache.me().addUserOnline(user, SessionID.of(session).getSessionId());
        PlayerCache.me().add(playerProto.getPlayerId(), playerProto);
        PlayerCache.me().addPlayer(playerProto);
        //Token
        String reloginToken = UUID.randomUUID().toString();
        UserDAO.updateReloginToken(user.getUserId(), reloginToken);
        //Send response
        Proto.ResLogin resLogin = Proto.ResLogin.newBuilder()
                .setUser(user)
                .setToken(reloginToken)
                .setStatus(200)
                .setPlayer(playerProto)
                .build();
        sendResponse(session, Proto.Packet.newBuilder().setResLogin(resLogin).build());
    }

    public void checkReLogin(Session session, Proto.ReqRelogin reqRelogin) {
        boolean result = true;
        UserBean userBean = UserDAO.getUser(reqRelogin.getUsername());
        //Check null param
        if (userBean == null || reqRelogin.getToken() == null) {
            result = false;
        }
        if (!reqRelogin.getToken().equals(userBean.getReLoginToken())) {
            result = false;
        }
        //Check login other device
        Proto.User userProto = Proto.User.newBuilder()
                .setUserId(userBean.getId())
                .setUsername(userBean.getUsername())
                .setHasCharacter(userBean.getHasCharacter())
                .build();
        if (checkLoginOtherDevice(userProto)) {
            result = false;
        }
        if (!result) {
            sendResponse(session, Proto.Packet.newBuilder().setResLogin(Proto.ResLogin.newBuilder().setStatus(401).build()).build());
            return;
        }
        System.out.println("Relogin success: " + result);
        loginSuccess(session, userProto);
    }

    private boolean checkLoginOtherDevice(Proto.User user) {
        return UserCache.me().getUserOnline(user.getUserId()) != null;
    }

    public void logout(Session session, Proto.ReqLogout reqLogout) {
        int userID = SessionCache.me().getUserID(SessionID.of(session));
        if (userID == -1) {
            sendResponse(session, Proto.Packet.newBuilder().setResLogout(Proto.ResLogout.newBuilder().setStatus(400)).build());
            return;
        }
        UserCache.me().logoutUser(userID);
        UserDAO.updateReloginToken(userID, null);
        sendResponse(session, Proto.Packet.newBuilder().setResLogout(Proto.ResLogout.newBuilder().setStatus(200)).build());
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
