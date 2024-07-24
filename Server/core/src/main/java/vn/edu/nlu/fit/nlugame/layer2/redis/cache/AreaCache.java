package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class AreaCache extends RedisClusterHelper implements ICache<Proto.Area> {
    private static final AreaCache instance = new AreaCache();
    private static final Cache<String, Proto.Area> areaMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final Cache<String, Proto.Area> areaPlayersMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final String PLAYERS_AREA_KEY = "area:";
    private static final String AREA_KEY = "areas";
//    private static final String AREA_USER_RANDOM_KEY = "area_user_random:";

    private AreaCache() {
    }

    public static AreaCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, Proto.Area value) {
        addRedis(key, value);
        addLocal(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.Area value) {
        return this.add(String.valueOf(value.getAreaId()), value);
    }

    @Override
    public Proto.Area get(String key) {
        Proto.Area area = areaMap.getIfPresent(key);
        if (area == null) {
            area = getArea(key);
            if (area != null) {
                areaMap.put(key, area);
            }
        }
        return area;
    }

    @Override
    public List<Proto.Area> getAll() {
        return (List<Proto.Area>) areaMap.asMap().values();
    }

    @Override
    public Set<String> getKeys() {
        return areaMap.asMap().keySet();
    }

    @Override
    public Proto.Area remove(String key) {
        if (key == null) return null;
        Proto.Area areaRemoved = removeArea(key);
        if (areaRemoved == null) return null;
        if (areaMap.getIfPresent(key) != null) {
            areaMap.invalidate(key);
        }
        return areaRemoved;
    }

    @Override
    public boolean containsKey(String key) {
        return key != null && getArea(key) != null;
    }

    @Override
    public void clear() {
        getConnection().del(AREA_KEY.getBytes());
        areaMap.invalidateAll();
    }

    @Override
    public String getKey(Proto.Area value) {
        return String.valueOf(value.getAreaId());
    }


    public void addRedis(String key, Proto.Area area) {
        getConnection().hset(AREA_KEY.getBytes(), String.valueOf(key).getBytes(), CompressUtils.compress(area));
    }

    public void addLocal(String key, Proto.Area area) {
        areaMap.put(key, area);
    }

    public Proto.Area getArea(String key) {
        byte[] area = getConnection().hget(AREA_KEY.getBytes(), String.valueOf(key).getBytes());
        if (area == null) return null;
        return CompressUtils.decompress(area, Proto.Area.class);
    }

    public ArrayList<Proto.Area> getAllAreaRedis() {
        List<byte[]> areas = getConnection().hvals(AREA_KEY.getBytes());
        ArrayList<Proto.Area> result = new ArrayList<>();
        if (areas == null) {
            return result;
        }
        for (byte[] area : areas) {
            result.add(CompressUtils.decompress(area, Proto.Area.class));
        }
        return result;
    }

    public void addUserToArea(String areaId, String userId, boolean isFirstUser) {
        getConnection().hset((PLAYERS_AREA_KEY + areaId).getBytes(), String.valueOf(userId).getBytes(), String.valueOf(isFirstUser).getBytes());
    }

    public boolean isContainFirstUserInArea(String areaId) {
        Set<byte[]> usersIdBytes = getConnection().hkeys((PLAYERS_AREA_KEY + areaId).getBytes());
        for (byte[] userIdByte : usersIdBytes) {
            byte[] isFirstUser = getConnection().hget((PLAYERS_AREA_KEY + areaId).getBytes(), userIdByte);
            if (isFirstUser != null && Boolean.parseBoolean(new String(isFirstUser))) {
                return true;
            }
        }
        return false;
    }

    public int randomFirstUserInArea(String areaId) {
        Set<byte[]> usersIdBytes = getConnection().hkeys((PLAYERS_AREA_KEY + areaId).getBytes());
        if (usersIdBytes.size() == 0) return -1;
        String firstUser = new String(usersIdBytes.iterator().next());
        System.out.println("firstUser: " + firstUser);
        getConnection().hset((PLAYERS_AREA_KEY + areaId).getBytes(), firstUser.getBytes(), String.valueOf(true).getBytes());
        return Integer.parseInt(firstUser);
    }

    public long removeUserFromAreaRedis(String areaId, String userId) {
        return getConnection().hdel((PLAYERS_AREA_KEY + areaId).getBytes(), String.valueOf(userId).getBytes());
    }

    public long removeUserFromAreaLocal(String areaId, String userId) {
        return getConnection().hdel((PLAYERS_AREA_KEY + areaId).getBytes(), String.valueOf(userId).getBytes());
    }

    public long removeUserFromArea(String areaId, String userId) {
        long result = removeUserFromAreaRedis(areaId, userId);
        if (result > 0) {
            if (areaPlayersMap.getIfPresent(areaId) != null)
                areaPlayersMap.invalidate(areaId);
        }
        return result;
    }

    public boolean getIsFirstUserInArea(String areaId, String userId) {
        byte[] isFirstUser = getConnection().hget((PLAYERS_AREA_KEY + areaId).getBytes(), String.valueOf(userId).getBytes());
        return isFirstUser != null && Boolean.parseBoolean(new String(isFirstUser));
    }

    public boolean isContainUserInArea(String areaId, String userId) {
        byte[] user = getConnection().hget((PLAYERS_AREA_KEY + areaId).getBytes(), String.valueOf(userId).getBytes());
        return user != null;
    }

    public ArrayList<String> getListUserIdInArea(String areaId) {
        Set<byte[]> usersIdBytes = getConnection().hkeys((PLAYERS_AREA_KEY + areaId).getBytes());
        ArrayList<String> result = new ArrayList<>();
        if (usersIdBytes == null || usersIdBytes.isEmpty()) {
            return result;
        }

        for (byte[] userIdByte : usersIdBytes) {
            String userId = new String(userIdByte);
            result.add(userId);
        }
        return result;
    }

    public Proto.Area removeArea(String key) {
        byte[] area = getConnection().hget(AREA_KEY.getBytes(), String.valueOf(key).getBytes());
        if (area == null) return null;
        getConnection().hdel(AREA_KEY.getBytes(), String.valueOf(key).getBytes());
        return CompressUtils.decompress(area, Proto.Area.class);
    }

    public Proto.Area getAreaByUserId(int userId) {
        for (Proto.Area area : areaMap.asMap().values()) {
            if (area.getUserId() == userId) {
                return area;
            }
        }
        Set<byte[]> areas = getConnection().hkeys(AREA_KEY.getBytes());
        if (areas == null || areas.isEmpty()) {
            return null;
        }
        for (byte[] area : areas) {
            Proto.Area areaDecompress = CompressUtils.decompress(area, Proto.Area.class);
            if (areaDecompress != null && areaDecompress.getUserId() == userId) {
                return areaDecompress;
            }
        }
        return null;
    }

    public long countUserInArea(String areaId) {
        return getConnection().hlen((PLAYERS_AREA_KEY + areaId).getBytes());
    }


}
