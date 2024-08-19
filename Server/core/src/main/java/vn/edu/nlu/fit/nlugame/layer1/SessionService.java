package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;


public class SessionService implements IService {

    private static final SessionService instance = new SessionService();

    private SessionService() {
    }

    public static SessionService me() {
        return instance;
    }

    @Override
    public void onOpen(Session session, String... params) {
        //Save session in tomcat
        SessionManage.me().onOpen(session);
        //Save session in cache
        SessionCache.me().addSession(SessionID.of(session));

        SessionManage.me().addSessionAlive(session);
    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {

    }

    @Override
    public void onClose(Session session) {
        //Logout user in cache
        int userID = SessionCache.me().getUserID(SessionID.of(session));
        SupportingService.me().removeUserFromQueue(UserCache.me().get(String.valueOf(userID)));
        UserCache.me().logoutUser(userID);
        //Remove session in cache
        SessionCache.me().removeSession(SessionID.of(session));
        //Remove session in tomcat
        SessionManage.me().onClose(session);
        SessionManage.me().onCloseSessionAlive(session);
    }

    public boolean checkLogin(Session session) {
//        SessionContext sessionContexat = SessionCache.me().get(sessionManage.getSessionID(session));
//        if (sessionContext == null) {
//            return false;
//        }
//        return sessionContext.getUser() != null;
        return false;
    }

}
