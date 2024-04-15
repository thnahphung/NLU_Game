package vn.edu.nlu.fit.nlugame.layer1;

import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class AuthService {

    public static final AuthService instance = new AuthService();
    private static final int defaultSponsorId = 123456;
    private static final UserBean defaultSponsor = UserDAO.selectUser(defaultSponsorId);

    private AuthService() {
    }

    public static AuthService me() {
        return instance;
    }

    public void processRegister(Session session, Proto.ReqRegister packet) {
        if (packet.getPassword() == null || "".equals(packet.getPassword())) {
            sendMsgRegister(session, 401);
        }

        int status = UserDAO.checkUserRegister(packet.getUsername());
        if (status != 200) {
            sendMsgRegister(session, status);
        }

        UserBean sponsorUser = UserDAO.selectUser(packet.getSponsor());
        if (packet.getSponsor() != null && !packet.getSponsor().isEmpty() && sponsorUser == null) {
            sendMsgRegister(session, 402);
            return;
        }

        if (defaultSponsor == null) {
            sendMsgRegister(session, 403);
            return;
        }

        int sponsorId = sponsorUser != null ? sponsorUser.getId() : defaultSponsorId;
        status = UserDAO.insertRegisterUser(packet.getUsername(),
                BCrypt.withDefaults().hashToString(12, packet.getPassword().toCharArray()),
                sponsorId == -2 ? defaultSponsorId : sponsorId, packet.getPhone(), "");

        sendMsgRegister(session, status);
    }

    public void checkLogin(Session session, Proto.ReqLogin packet) {
        System.out.println("Login");
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
