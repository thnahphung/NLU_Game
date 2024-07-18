package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.AreaService;
import vn.edu.nlu.fit.nlugame.layer1.PingPongService;
import vn.edu.nlu.fit.nlugame.layer1.SessionService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class SessionHandler implements Subscriber {
    AreaService areaService = AreaService.me();
    @Override
    public void onOpen(Session session, String... params) {
        SessionService.me().onOpen(session, params);
        PingPongService.me().handleReqPong(session);
    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packet) {
        packet.getPacketList().forEach(p -> {
            switch (p.getDataCase()) {
                case REQPONG:
                    PingPongService.me().handleReqPong(session);
                    break;
            }
        });
    }

    @Override
    public void onClose(Session session, CloseReason reason) {
        System.out.println("Close session: " + session.getId() + " Reason: " + reason.getReasonPhrase() + " Code: " + reason.getCloseCode());
        areaService.leaveArea(session);
        SessionService.me().onClose(session);
    }

    @Override
    public void onError(Session session, Throwable throwable) {
        System.out.println("Error session: " + session.getId() + " Error: " + throwable.getMessage());
        areaService.leaveArea(session);
        SessionService.me().onClose(session);
    }

    @Override
    public boolean requireLogin() {
        return false;
    }
}
