package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;
import java.util.*;

public class UserCache extends RedisClusterHelper implements ICache<UserContext>{
    private static final UserCache instance = new UserCache();
    private static final String USER_KEY = "users";
    private UserCache() {
    }
    public static UserCache me() {
        return instance;
    }


    @Override
    public void add(Object key, UserContext value) {

    }

    @Override
    public UserContext get(Object userID) {
        if (userID == null) return null;

        return null;
    }

    public void addUserOnline(Proto.User user, String sessionID){
        UserContext userContext = UserContext.builder().user(user).sessionID(sessionID).build();
        getConnection().hset(USER_KEY.getBytes(), String.valueOf(user.getUserId()).getBytes(), CompressUtils.compress(userContext));
    }
    public UserContext getUserContextOnline(int userID){
        byte[] userByte = getConnection().hget(USER_KEY.getBytes(), String.valueOf(userID).getBytes());
        if (userByte == null) return null;
        return (UserContext) CompressUtils.decompress(userByte, UserContext.class);
    }
    public Proto.User getUserOnline(int userID){
        try{
            byte[] userByte = getConnection().hget(USER_KEY.getBytes(), String.valueOf(userID).getBytes());
            if (userByte == null) return null;
            return ((UserContext) CompressUtils.decompress(userByte, UserContext.class)).getUser();
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public void logoutUser(Proto.User user){
        getConnection().hdel(USER_KEY.getBytes(), String.valueOf(user.getUserId()).getBytes());
    }

    public void logoutUser(int userID){
        getConnection().hdel(USER_KEY.getBytes(), String.valueOf(userID).getBytes());
    }

    public Map<String, UserContext> getAllUserOnline(){
        Map<byte[], byte[]> userMap = getConnection().hgetAll(USER_KEY.getBytes());
        Map<String, UserContext> result = new HashMap<>();
        userMap.forEach((k, v) -> {
            UserContext userContext = (UserContext) CompressUtils.decompress(v, UserContext.class);
            System.out.println(userContext.getUser().getUserId());
        });
        return result;
    }
    @Override
    public List<UserContext> getAll() {
        return null;
    }

    @Override
    public void remove(Object key) {

    }

    public static void main(String[] args) {
        System.out.println("run: UserCache");
        //UserCache.me().addUserOnline(Proto.User.newBuilder().setUserId(1).build(), SessionID.of("1").getSessionId());
        System.out.println(UserCache.me().getUserOnline(1));
    }
}
