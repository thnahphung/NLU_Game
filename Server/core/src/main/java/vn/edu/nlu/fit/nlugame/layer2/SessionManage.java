package vn.edu.nlu.fit.nlugame.layer2;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.RemovalCause;
import com.github.benmanes.caffeine.cache.RemovalListener;
import jakarta.websocket.Session;
import org.checkerframework.checker.nullness.qual.Nullable;
import vn.edu.nlu.fit.nlugame.layer1.SessionService;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class SessionManage {
    private static final SessionManage instance = new SessionManage();
    private static List<Session> sessionRemoveList = new ArrayList<>();
    private static final Cache<String, Session> sessionMap = Caffeine.newBuilder().expireAfterAccess(60, TimeUnit.MINUTES).maximumSize(1000)
            .build();

    private static final Cache<String, Session> sessionMapAlive = Caffeine.newBuilder()
            .maximumSize(1000)
            .evictionListener(
                    (String key, Session session, RemovalCause cause) -> {
                        sessionRemoveList.add(session);
                        System.out.println("Remove session alive: " + key);
                    }
            )
            .expireAfterAccess(30, TimeUnit.SECONDS)
            .build();

    public static SessionManage me() {
        return instance;
    }

    public void onOpen(Session session) {
        String sessionId = SessionID.of(session.getId()).getSessionId();
        sessionMap.put(sessionId, session);
    }

    public void onClose(Session session) {
        sessionMap.invalidate(SessionID.of(session.getId()).getSessionId());
    }

    public Session get(String sessionId) {
        if (sessionId == null) {
            return null;
        }
        return sessionMap.getIfPresent(sessionId);
    }

    public ArrayList<Session> getListSession(List<String> keys) {
        return new ArrayList<>(sessionMap.getAllPresent(keys).values());
    }
    public List<String> listSessionId() {
        Set<String> strings = sessionMap.asMap().keySet();
        ArrayList<String> reList = new ArrayList<>();
        if (strings == null || strings.size() <= 0) {
            return reList;
        }
        reList.addAll(strings);
        return reList;
    }
    public int count() {
        return sessionMap.asMap().size();
    }

    public List<Session> getSessionRemoveList() {
        return sessionRemoveList;
    }

    public void addSessionAlive(Session session) {
        String sessionId = SessionID.of(session.getId()).getSessionId();
        sessionMapAlive.put(sessionId, session);
    }

    public Session getSessionAlive(String sessionId) {
        return sessionMapAlive.getIfPresent(sessionId);
    }

    public void clearRemoveList() {
        sessionRemoveList.clear();
    }

    public void onCloseSessionAlive(Session session) {
        sessionMapAlive.invalidate(SessionID.of(session.getId()).getSessionId());
    }
}
