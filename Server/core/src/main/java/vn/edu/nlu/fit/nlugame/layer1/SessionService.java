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
        System.out.println("Session count: " + SessionManage.me().count());
        //Save session in cache
        SessionCache.me().addSession(SessionID.of(session));
    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {

    }

    @Override
    public void onClose(Session session) {
        //Logout user in cache
        int userID = SessionCache.me().getUserID(SessionID.of(session));
        UserCache.me().logoutUser(userID);
        //Remove session in cache
        SessionCache.me().removeSession(SessionID.of(session));
        //Remove session in tomcat
        SessionManage.me().onClose(session);
        System.out.println("Session count: " + SessionManage.me().count());
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
