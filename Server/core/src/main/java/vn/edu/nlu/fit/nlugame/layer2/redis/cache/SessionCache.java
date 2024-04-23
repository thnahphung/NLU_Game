package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.SessionContext;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class SessionCache extends RedisClusterHelper implements ICache<SessionContext> {
    private static final String SESSION_KEY = "sessions";
    private static final SessionCache instance = new SessionCache();

    private SessionCache() {
    }

    public static SessionCache me() {
        return instance;
    }

    @Override
    public void add(Object key, SessionContext value) {

    }

    @Override
    public SessionContext get(Object key) {

        return null;
    }
    @Override
    public List<SessionContext> getAll() {
        return null;
    }

    @Override
    public void remove(Object sessionID) {

    }
    public void addSession(SessionID sessionID){
        if (sessionID == null) return;
        getConnection().hset(SESSION_KEY.getBytes(), sessionID.getSessionId().getBytes(), CompressUtils.compress(SessionContext.builder().build()));
    }
    public void addUserSession(SessionID sessionID, Proto.User user){
        if(user == null || sessionID == null) return;
        SessionContext sessionContext = SessionContext.builder().userID(user.getUserId()).build();
        getConnection().hset(SESSION_KEY.getBytes(), sessionID.getSessionId().getBytes(), CompressUtils.compress(sessionContext));
    }
    public void removeSession(SessionID sessionID){
        getConnection().hdel(SESSION_KEY.getBytes(), sessionID.getSessionId().getBytes());
    }
    public int getUserID(SessionID sessionID){
        byte[] session = getConnection().hget(SESSION_KEY.getBytes(), sessionID.getSessionId().getBytes());
        if (session == null) return -1;
        SessionContext sessionContext = (SessionContext) CompressUtils.decompress(session, SessionContext.class);
        if (sessionContext == null || sessionContext.getUserID() == null) return -1;
        return sessionContext.getUserID();
    }

    public static void main(String[] args) {
        SessionContext sessionContext = SessionContext.builder().build();
        System.out.println(SessionCache.me().getUserID(SessionID.of("1")));
    }
}
