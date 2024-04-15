package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class NotificationService {
    private static NotificationService instance = new NotificationService();

    public static NotificationService me() {
        return instance;
    }

    public void sendNotification(Session session, Proto.Packet packet) {
//        SessionContext ssctx = SessionCache.me().get(SessionManage.me().getSessionID(session));
    }
}
