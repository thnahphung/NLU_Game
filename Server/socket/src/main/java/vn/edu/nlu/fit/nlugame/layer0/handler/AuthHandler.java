package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.AuthService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class AuthHandler implements Subscriber {

    private final AuthService authService = AuthService.me();


    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            //to check user đang login trong hệ thống
            switch (packet.getDataCase()) {
                case REQLOGIN:
                    authService.checkLogin(session, packet.getReqLogin());
                    break;
                case REQREGISTER:
                    authService.register(session, packet.getReqRegister());
                    break;
                case REQLOGOUT:
                    authService.logout(session, packet.getReqLogout());
                    break;
                case REQRELOGIN:
                    authService.checkReLogin(session, packet.getReqRelogin());
                    break;
            }
        });
    }

    @Override
    public void onClose(Session session, CloseReason closeReason) {

    }

    @Override
    public void onError(Session session, Throwable throwable) {

    }

    @Override
    public boolean requireLogin() {
        return false;
    }
}
