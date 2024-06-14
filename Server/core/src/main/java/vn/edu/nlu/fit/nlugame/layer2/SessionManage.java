package vn.edu.nlu.fit.nlugame.layer2;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class SessionManage {
    private static final SessionManage instance = new SessionManage();
    private static final Cache<String, Session> sessionMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();

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
}
