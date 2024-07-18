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
    private static final Cache<String, Session> sessionMap = Caffeine.newBuilder().maximumSize(1000)
            .expireAfterAccess(30, TimeUnit.SECONDS)
            .removalListener(new RemovalListener<Object, Object>() {
                @Override
                public void onRemoval(@Nullable Object o, @Nullable Object o2, RemovalCause removalCause) {
                    System.out.println("Session removed: " + o + " Reason: " + removalCause.toString());
                    if(removalCause == RemovalCause.EXPLICIT || removalCause == RemovalCause.REPLACED) {
                        return;
                    }
                    sessionRemoveList.add((Session) o2);
                }
            })
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
}
