package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.NotificationService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;


public class NotificationHandler implements Subscriber {

    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper message) {
        for (Proto.Packet packet : message.getPacketList()) {
            onMessage(session, packet);
        }
    }

    private void onMessage(Session session, Proto.Packet packet) {
        NotificationService.me().sendNotification(session, packet);
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
