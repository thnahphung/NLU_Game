package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public interface Subscriber {
    void onOpen(Session session, String... params);

    void onMessage(Session session, Proto.PacketWrapper packetWrapper);

    void onClose(Session session, CloseReason closeReason);

    void onError(Session session, Throwable throwable);

    boolean requireLogin();
}
