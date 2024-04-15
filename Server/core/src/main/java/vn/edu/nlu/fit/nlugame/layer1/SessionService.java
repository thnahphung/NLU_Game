package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.SessionContext;


public class SessionService implements IService {

    private static final SessionService instance = new SessionService();

    private final SessionManage sessionManage = SessionManage.me();


    private SessionService() {
    }

    public static SessionService me() {
        return instance;
    }

    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {

    }

    @Override
    public void onClose(Session session) {

    }

    public boolean checkLogin(Session session) {
        SessionContext sessionContext = SessionCache.me().get(sessionManage.getSessionID(session));
        if (sessionContext == null) {
            return false;
        }
        return sessionContext.getUser() != null;
    }

}
