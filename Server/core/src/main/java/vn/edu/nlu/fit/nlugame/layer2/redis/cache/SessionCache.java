package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import org.redisson.api.RMapCache;
import org.redisson.client.codec.StringCodec;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.SessionContext;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class SessionCache extends RedisClusterHelper implements ICache<SessionContext> {
    private static final String USER_KEY = SessionContext.class + ":user";
    private static final String USER_WAIT_RELOGIN_KEY = SessionContext.class + ":waitingRelogin:";
    private static final SessionCache instance = new SessionCache();
    private static final ConcurrentHashMap<String, SessionContext> sessionContextMap = new ConcurrentHashMap<>();
    private static final HashMap<String, AtomicLong> goldMap = new HashMap<>();
    private static final HashMap<String, AtomicLong> diamondMap = new HashMap<>();
    private final RMapCache<String, String> userOnline = getRedissonClient().getMapCache(USER_KEY, StringCodec.INSTANCE);

    private SessionCache() {
    }

    public static SessionCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, SessionContext value) {
        sessionContextMap.put(key, value);
        return true;
    }

    @Override
    public boolean add(SessionContext value) {
        return this.add(value.getSessionID(), value);
    }

    @Override
    public SessionContext get(String key) {
        long begin = System.currentTimeMillis();
        SessionContext sessionContext = sessionContextMap.get(key);
        if (sessionContext == null) {
            return null;
        }
        if (sessionContext.getUser() == null) return sessionContext;
        long gold = goldMap.containsKey(key) ? goldMap.get(key).get() : 0;
        long diamond = diamondMap.containsKey(key) ? diamondMap.get(key).get() : 0;
        sessionContext.setUser(sessionContext.getUser().toBuilder().setGold(gold).setDiamond(diamond).build());
        return sessionContext;
    }

    public String getSessionIdOfUserOnLocalServer(int userId) {
        for (SessionContext sessionContext : sessionContextMap.values()) {
            if (sessionContext.getUser() != null && sessionContext.getUser().getUserId() == userId) {
                return sessionContext.getSessionID();
            }
        }
        return null;
    }

    @Override
    public List<SessionContext> getAll() {
        return new ArrayList<>(getAllUserOnline().values());
    }

    @Override
    public Set<String> getKeys() {
        return new HashSet<>(sessionContextMap.keySet());
    }

    @Override
    public SessionContext remove(String key) {
        SessionContext sessionContext = deleteObj(key);
//        if (sessionContext != null && sessionContext.getUser() != null)
//            logout(sessionContext);
        return sessionContext;
    }

    private SessionContext deleteObj(String key) {
        if (key == null || !sessionContextMap.containsKey(key)) return null;
        SessionContext sessionContext = get(key);
        sessionContextMap.remove(key);
        goldMap.remove(key);
        diamondMap.remove(key);
        return sessionContext;
    }

    @Override
    public boolean containsKey(String key) {
        return sessionContextMap.containsKey(key);
    }


    @Override
    public void clear() {
        Set<String> keys = getKeys();
        for (String key : keys) {
            remove(key);
        }
    }

    @Override
    public String getKey(SessionContext value) {
        return value.getSessionID();
    }


    private void clearGold(String sessionId) {
        if (sessionId == null) return;
        goldMap.remove(sessionId);
    }

    private void clearDiamond(String sessionId) {
        if (sessionId == null) return;
        diamondMap.remove(sessionId);
    }


    public void addGold(SessionContext sessionContext, int rewardGold) {
        if (sessionContext == null) {
            return;
        }
        if (rewardGold <= 0) throw new RuntimeException("Gold must be greater than 0");
        Proto.User user = sessionContext.getUser();
//        if (rewardGold <= 0) return;
        long gold = goldMap.get(sessionContext.getSessionID()).addAndGet(rewardGold);
        user = user.toBuilder().setGold(gold).build();
        sessionContext.setUser(user);
    }

    public boolean minusGold(SessionContext sessionContext, int minusGold) {
        if (sessionContext == null) {
            return false;
        }
        if (minusGold <= 0) throw new RuntimeException("Gold must be greater than 0");
        Proto.User user = sessionContext.getUser();
        long gold = goldMap.get(sessionContext.getSessionID()).addAndGet(-minusGold);

        if (gold < 0) {
            goldMap.get(sessionContext.getSessionID()).addAndGet(minusGold);
            return false;
        }
        user = user.toBuilder().setGold(gold).build();
        sessionContext.setUser(user);
        return true;
    }

    public boolean update(SessionContext sessionContext) {
        if (!containsKey(getKey(sessionContext)))
            return false;
        SessionContext sc = get(getKey(sessionContext));
        if (sc == null) {
            return false;
        }
        boolean isUpdate = false;
        if (sc.getUser() != null && sessionContext.getUser() == null) {
            logout(sessionContext);
        }
        if (sc.getUser() == null || !sc.getUser().equals(sessionContext.getUser())) {
            sc.setUser(sessionContext.getUser());
            isUpdate = true;
        }
        if (sc.getRoomId() != sessionContext.getRoomId()) {
            sc.setRoomId(sessionContext.getRoomId());
            isUpdate = true;
        }
        if (isUpdate) sessionContextMap.put(getKey(sessionContext), sessionContext);
        return true;
    }

    public void login(Proto.User user, String sessionID) {
        if (user == null) return;
        addUserOnline(user, sessionID);
        goldMap.put(sessionID, new AtomicLong(user.getGold()));
        diamondMap.put(sessionID, new AtomicLong(user.getDiamond()));
    }

    public void logout(SessionContext sessionContext) {
        if (sessionContext == null || sessionContext.getUser() == null) return;
        clearGold(sessionContext.getSessionID());
        clearDiamond(sessionContext.getSessionID());
        removeUserOnline(sessionContext.getUser().getUserId());
    }

    public String getSessionId(int userId) {
        SessionContext userOnline = getUserOnline(userId);
        return userOnline == null ? null : userOnline.getSessionID();

    }

    public void addUserOnline(Proto.User user, String sessionId) {
        addUserOnline(user.getUserId(), sessionId);
    }

    public void addUserOnline(int userId, String sessionId) {
        getConnection().hset(USER_KEY.getBytes(), String.valueOf(userId).getBytes(), CompressUtils.compress(sessionContextMap.get(sessionId)));
    }

    public void removeUserOnline(int userId) {
        this.removeUserOnline(String.valueOf(userId));
    }

    public void removeUserOnline(String userId) {
        getConnection().hdel(USER_KEY.getBytes(), userId.getBytes());
    }


    public Map<String, SessionContext> getAllUserOnline() {
        Map<byte[], byte[]> map = getConnection().hgetAll(USER_KEY.getBytes());
        Map<String, SessionContext> result = new HashMap<>();
        map.forEach((k, v) -> {
            SessionContext sessionContext = CompressUtils.decompress(v, SessionContext.class);
            result.put(new String(k), sessionContext);
        });
        return result;
    }

    public void clearMultiUser(Collection<String> userIds) {
        userIds.forEach(this::removeUserOnline);
    }

    public SessionContext getUserOnline(int userId) {
        long begin = System.currentTimeMillis();
        byte[] data = getConnection().hget(USER_KEY.getBytes(), String.valueOf(userId).getBytes());
        if (data == null) return null;
        return CompressUtils.decompress(data, SessionContext.class);
    }

    public void updateSessionToCache() {
        if (sessionContextMap == null || sessionContextMap.isEmpty()) return;
        sessionContextMap.forEach((k, v) -> {
            if (v == null || v.getUser() == null) return;
            v.setUser(v.getUser().toBuilder().setGold(goldMap.get(k).get()).setDiamond(diamondMap.get(k).get()).build());
            getConnection().hset(USER_KEY.getBytes(), String.valueOf(v.getUser().getUserId()).getBytes(), CompressUtils.compress(v));
        });
    }

    public void addWaitingReLoginList(SessionContext sessionContext) {
        if (sessionContext == null || sessionContext.getUser() == null) return;
        getConnection().set((USER_WAIT_RELOGIN_KEY + sessionContext.getUser().getUserId()).getBytes(), CompressUtils.compress(sessionContext));
        getConnection().expire((USER_WAIT_RELOGIN_KEY + sessionContext.getUser().getUserId()).getBytes(), 60 * 5);
        removeUserOnline(sessionContext.getUser().getUserId());
    }

    public SessionContext getAndRemoveUserInWaitingReLoginList(int userId) {
        SessionContext decompress = getUserInWaitingReloginList(userId);
        if (decompress == null) return null;
        getConnection().del((USER_WAIT_RELOGIN_KEY + userId).getBytes());
        return decompress;
    }

    public SessionContext getUserInWaitingReloginList(int userId) {
        byte[] data = getConnection().get((USER_WAIT_RELOGIN_KEY + userId).getBytes());
        if (data == null) return null;
        return CompressUtils.decompress(data, SessionContext.class);
    }
}
