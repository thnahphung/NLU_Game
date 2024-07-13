package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class CommonBuildingCache extends RedisClusterHelper implements ICache<Proto.BuildingBase> {
    private static final CommonBuildingCache instance = new CommonBuildingCache();
    private static final String COMMON_BUILDING_KEY = "common_building";
    private static final Cache<String, Proto.BuildingBase> commonBuildingMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.HOURS).build();

    private CommonBuildingCache() {
    }

    public static CommonBuildingCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, Proto.BuildingBase value) {
        if (value == null) {
            return false;
        }
        commonBuildingMap.put(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.BuildingBase value) {
        if (value == null) {
            return false;
        }
        commonBuildingMap.put(String.valueOf(value.getId()), value);
        return false;
    }

    @Override
    public Proto.BuildingBase get(String key) {
        Proto.BuildingBase commonBuildingContext = commonBuildingMap.getIfPresent(key);
        if (commonBuildingContext == null) {
            commonBuildingContext = getCommonBuilding(Integer.parseInt(key));
            if (commonBuildingContext != null) {
                commonBuildingMap.put(key, commonBuildingContext);
            }
        }
        return commonBuildingContext;
    }

    @Override
    public List<Proto.BuildingBase> getAll() {
        return new ArrayList<>(commonBuildingMap.asMap().values());
    }

    @Override
    public Set<String> getKeys() {
        return commonBuildingMap.asMap().keySet();
    }

    @Override
    public Proto.BuildingBase remove(String key) {
        Proto.BuildingBase commonBuildingContext = commonBuildingMap.getIfPresent(key);
        if (commonBuildingContext != null) {
            getConnection().hdel(COMMON_BUILDING_KEY.getBytes(), key.getBytes());
            commonBuildingMap.invalidate(key);
        }
        return commonBuildingContext;
    }

    @Override
    public boolean containsKey(String key) {
        return commonBuildingMap.getIfPresent(key) != null;
    }

    @Override
    public void clear() {
        getConnection().del(COMMON_BUILDING_KEY.getBytes());
        commonBuildingMap.invalidateAll();
    }

    @Override
    public String getKey(Proto.BuildingBase value) {
        return String.valueOf(value);
    }

    public void addCommonBuilding(Proto.BuildingBase commonBuilding) {
        getConnection().hset(COMMON_BUILDING_KEY.getBytes(), String.valueOf(commonBuilding.getId()).getBytes(), CompressUtils.compress(commonBuilding));
    }

    public Proto.BuildingBase getCommonBuilding(int id) {
        Proto.BuildingBase commonBuildingContext = commonBuildingMap.getIfPresent(String.valueOf(id));
        if (commonBuildingContext == null) {
            byte[] bytes = getConnection().hget(COMMON_BUILDING_KEY.getBytes(), String.valueOf(id).getBytes());
            if (bytes != null) {
                commonBuildingContext = CompressUtils.decompress(bytes, Proto.BuildingBase.class);
                if (commonBuildingContext != null) {
                    commonBuildingMap.put(String.valueOf(id), commonBuildingContext);
                }
            }
        }
        return commonBuildingContext;
    }

    public Map<String, Proto.BuildingBase> getAllCommonBuilding() {
        Map<byte[], byte[]> commonBuildingMap = getConnection().hgetAll(COMMON_BUILDING_KEY.getBytes());
        Map<String, Proto.BuildingBase> result = new HashMap<>();
        commonBuildingMap.forEach((k, v) -> {
            Proto.BuildingBase commonBuildingContext = CompressUtils.decompress(v, Proto.BuildingBase.class);
            result.put(new String(k), commonBuildingContext);
        });
        return result;
    }

    public List<Proto.BuildingBase> getAllCommonBuildingBean() {
        Map<byte[], byte[]> commonBuildingMap = getConnection().hgetAll(COMMON_BUILDING_KEY.getBytes());
        List<Proto.BuildingBase> result = new ArrayList<>();
        commonBuildingMap.forEach((k, v) -> {
            Proto.BuildingBase commonBuildingContext = CompressUtils.decompress(v, Proto.BuildingBase.class);
            result.add(commonBuildingContext);
        });
        return result;
    }

    public int getIdBuildingByType(ConstUtils.TYPE_ITEM typeItem) {
        Proto.BuildingBase commonBuilding = commonBuildingMap.asMap().values().stream().filter(context -> context.getType().equals(typeItem.getValue())).findFirst().orElse(null);
        if (commonBuilding == null) return 0;
        return commonBuilding.getId();
    }

    public Proto.BuildingBase getCommonBuildingByName(String name) {
        Proto.BuildingBase commonBuildingContext = commonBuildingMap.asMap().values().stream().filter(context -> context.getName().equals(name)).findFirst().orElse(null);
        if (commonBuildingContext == null) {
            Map<byte[], byte[]> commonBuildingMap = getConnection().hgetAll(COMMON_BUILDING_KEY.getBytes());
            for (Map.Entry<byte[], byte[]> entry : commonBuildingMap.entrySet()) {
                Proto.BuildingBase commonBuilding = CompressUtils.decompress(entry.getValue(), Proto.BuildingBase.class);
                if (commonBuilding.getName().equals(name)) {
                    commonBuildingContext = commonBuilding;
                    break;
                }
            }

        }
        return commonBuildingContext;
    }
}
