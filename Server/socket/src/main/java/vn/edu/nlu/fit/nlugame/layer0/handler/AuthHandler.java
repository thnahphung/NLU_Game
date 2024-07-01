package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.AreaService;
import vn.edu.nlu.fit.nlugame.layer1.AuthService;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class AuthHandler implements Subscriber {

    private final AuthService authService = AuthService.me();
    private final AreaService areaService = AreaService.me();

    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            //to check user đang login trong hệ thống
            switch (packet.getDataCase()) {
                case REQLOGIN:
                    this.login(session, packet);
                    break;
                case REQREGISTER:
                    authService.register(session, packet.getReqRegister());
                    break;
                case REQLOGOUT:
                    this.logout(session, packet);
                    break;
                case REQRELOGIN:
                    this.reLogin(session, packet);
                    break;
                case REQEMAILFORGETPASSWORD:
                    authService.sendEmailForgetPassword(session, packet.getReqEmailForgetPassword());
                    break;
                case REQRECOVERPASSWORD:
                    authService.checkRecoverPassword(session, packet.getReqRecoverPassword());
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

    public void login(Session session, Proto.Packet packet) {
        UserBean userLoginBean = authService.checkLogin(session, packet.getReqLogin());
        if (userLoginBean == null || userLoginBean.getHasCharacter() == 0) return;
        areaService.joinAreaLogin(userLoginBean.getId(), session);
    }

    public void reLogin(Session session, Proto.Packet packet) {
        UserBean userRelogin = authService.checkReLogin(session, packet.getReqRelogin());
        if (userRelogin == null || userRelogin.getHasCharacter() == 0) return;
        areaService.joinAreaLogin(userRelogin.getId(), session);
    }

    public void logout(Session session, Proto.Packet packet) {
        areaService.leaveArea(session);
        authService.logout(session, packet.getReqLogout());
    }
}
