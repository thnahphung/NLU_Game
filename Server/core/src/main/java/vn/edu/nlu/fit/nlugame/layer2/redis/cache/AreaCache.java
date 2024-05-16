package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.AreaContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class AreaCache extends RedisClusterHelper implements ICache<Proto.Area, Integer> {
    private static final AreaCache instance = new AreaCache();
    private static final Cache<Integer, Proto.Area> areaMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final Cache<Integer, Proto.Area> areaPlayersMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final String PLAYERS_AREA_KEY = "area:";
    private static final String AREA_KEY = "areas";

    private AreaCache() {
    }

    public static AreaCache me() {
        return instance;
    }

    @Override
    public boolean add(Integer key, Proto.Area value) {
        areaMap.put(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.Area value) {
        return false;
    }

    @Override
    public Proto.Area get(Integer key) {
        return null;
    }

    @Override
    public List<Proto.Area> getAll() {
        return new ArrayList<>();
    }

    @Override
    public Set<Integer> getKeys() {
        return null;
    }

    @Override
    public Proto.Area remove(Integer key) {
        return null;
    }

    @Override
    public boolean containsKey(Integer key) {
        return false;
    }

    @Override
    public void clear() {

    }

    @Override
    public Integer getKey(Proto.Area value) {
        return null;
    }


    public void addArea(int key, Proto.Area area) {
        getConnection().hset(AREA_KEY.getBytes(), String.valueOf(key).getBytes(), CompressUtils.compress(area));
    }

    public Proto.Area getArea(int key) {
        byte[] area = getConnection().hget(AREA_KEY.getBytes(), String.valueOf(key).getBytes());
        return CompressUtils.decompress(area, Proto.Area.class);
    }

    public ArrayList<Proto.Area> getAllArea() {
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

    public void addPlayerToArea(int areaId, int userId, int playerId) {
        getConnection().hset((PLAYERS_AREA_KEY + areaId).getBytes(), String.valueOf(userId).getBytes(), String.valueOf(playerId).getBytes());
    }

    public long removePlayerFromArea(int areaId, int userId) {
        return getConnection().hdel((PLAYERS_AREA_KEY + areaId).getBytes(), String.valueOf(userId).getBytes());
    }

    public ArrayList<String> getListUserIdInArea(int areaId) {
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

    public ArrayList<String> getListPlayerIdInArea(int areaId) {
        List<byte[]> area = getConnection().hvals((PLAYERS_AREA_KEY + areaId).getBytes());
        ArrayList<String> result = new ArrayList<>();
        if (area == null) {
            return result;
        }
        for (byte[] playerId : area) {
            result.add(new String(playerId));
        }
        return result;
    }
}
