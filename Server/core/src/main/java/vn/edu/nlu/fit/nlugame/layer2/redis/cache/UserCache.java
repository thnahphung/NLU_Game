package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class UserCache extends RedisClusterHelper implements ICache<UserContext> {
    private static final UserCache instance = new UserCache();
    private static final String USER_KEY = "users";
    private static final Cache<String, UserContext> userLoginMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();

    private UserCache() {
    }

    public static UserCache me() {
        return instance;
    }


    @Override
    public boolean add(String key, UserContext value) {
        userLoginMap.put(key, value);
        getConnection().hset(USER_KEY.getBytes(), String.valueOf(value.getUser().getUserId()).getBytes(), CompressUtils.compress(value));
        return false;
    }

    @Override
    public boolean add(UserContext value) {
        return false;
    }

    @Override
    public UserContext get(String key) {
        UserContext userContext = userLoginMap.getIfPresent(key);
        if (userContext == null) {
            userContext = getUserContextOnline(Integer.parseInt(key));
            if (userContext != null) {
                userLoginMap.put(key, userContext);
            }
        }
        return userContext;
    }

    @Override
    public List<UserContext> getAll() {
        return null;
    }

    @Override
    public Set<String> getKeys() {
        return null;
    }

    @Override
    public UserContext remove(String key) {
        return null;
    }

    @Override
    public boolean containsKey(String key) {
        return false;
    }

    @Override
    public void clear() {

    }

    @Override
    public String getKey(UserContext value) {
        return null;
    }

    public void addUserOnline(Proto.User user, String sessionID) {
        //Save cache redis
        UserContext userContext = UserContext.builder().user(user).sessionID(sessionID).build();
        getConnection().hset(USER_KEY.getBytes(), String.valueOf(user.getUserId()).getBytes(), CompressUtils.compress(userContext));
        //Save cache local
        add(String.valueOf(user.getUserId()), userContext);
    }

    public UserContext getUserContextOnline(int userID) {
        byte[] userByte = getConnection().hget(USER_KEY.getBytes(), String.valueOf(userID).getBytes());
        if (userByte == null) return null;
        return (UserContext) CompressUtils.decompress(userByte, UserContext.class);
    }

    public Proto.User getUserOnline(int userID) {
        try {
            byte[] userByte = getConnection().hget(USER_KEY.getBytes(), String.valueOf(userID).getBytes());
            if (userByte == null) return null;
            return (CompressUtils.decompress(userByte, UserContext.class)).getUser();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void logoutUser(Proto.User user) {
        getConnection().hdel(USER_KEY.getBytes(), String.valueOf(user.getUserId()).getBytes());
    }

    public void logoutUser(int userID) {
        getConnection().hdel(USER_KEY.getBytes(), String.valueOf(userID).getBytes());
    }

    public Map<String, UserContext> getAllUserOnline() {
        Map<byte[], byte[]> userMap = getConnection().hgetAll(USER_KEY.getBytes());
        Map<String, UserContext> result = new HashMap<>();
        userMap.forEach((k, v) -> {
            UserContext userContext = CompressUtils.decompress(v, UserContext.class);
            result.put(new String(k), userContext);
        });
        return result;
    }

    public ArrayList<Proto.User> getListUser(ArrayList<String> userIds) {
        ArrayList<Proto.User> users = new ArrayList<>();
        for (String userId : userIds) {
            byte[] data = getConnection().hget(USER_KEY.getBytes(), userId.getBytes());
            if (data == null) continue;
            UserContext userContext = CompressUtils.decompress(data, UserContext.class);
            users.add(userContext.getUser());
        }
        return users;
    }

    public ArrayList<UserContext> getListUserContext(ArrayList<String> userIds) {
        ArrayList<UserContext> userContexts = new ArrayList<>();
        for (String userId : userIds) {
            byte[] data = getConnection().hget(USER_KEY.getBytes(), userId.getBytes());
            if (data == null) continue;
            UserContext userContext = CompressUtils.decompress(data, UserContext.class);
            userContexts.add(userContext);
        }
        return userContexts;
    }

    public ArrayList<String> getListSessionId(ArrayList<String> userIds) {
        ArrayList<String> sessionIds = new ArrayList<>();
        for (String userId : userIds) {
            byte[] data = getConnection().hget(USER_KEY.getBytes(), userId.getBytes());
            if (data == null) continue;
            UserContext userContext = CompressUtils.decompress(data, UserContext.class);
            sessionIds.add(userContext.getSessionID());
        }
        return sessionIds;
    }

}
