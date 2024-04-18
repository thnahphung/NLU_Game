package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.SessionService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class SessionHandler implements Subscriber {
    @Override
    public void onOpen(Session session, String... params) {
        SessionService.me().onOpen(session, params);
    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper message) {

    }

    @Override
    public void onClose(Session session) {
        SessionService.me().onClose(session);
    }

    @Override
    public void onError(Session session, Throwable throwable) {

    }

    @Override
    public boolean requireLogin() {
        return false;
    }
}
