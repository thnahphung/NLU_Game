package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.AuthService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class AuthHandler implements Subscriber {

    private final AuthService authService = AuthService.me();


    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper message) {

    }

    @Override
    public void onClose(Session session) {

    }

    @Override
    public void onError(Session session, Throwable throwable) {

    }

    @Override
    public boolean requireLogin() {
        return false;
    }
}
