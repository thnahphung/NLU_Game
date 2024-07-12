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

public class CommonGrowthItemCache extends RedisClusterHelper implements ICache<Proto.CommonGrowthItem>{
    private static final CommonGrowthItemCache instance = new CommonGrowthItemCache();

    private static final String COMMON_GROWTH_ITEM_KEY = "common_growth_items";

    private static final Cache<String, Proto.CommonGrowthItem> commonGrowthItemMap = Caffeine.newBuilder().maximumSize(10000).expireAfterAccess(2, TimeUnit.HOURS).build();

    private CommonGrowthItemCache() {
    }

    public static CommonGrowthItemCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, Proto.CommonGrowthItem value) {
        commonGrowthItemMap.put(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.CommonGrowthItem value) {
        add(String.valueOf(value.getId()), value);
        return true;
    }

    @Override
    public Proto.CommonGrowthItem get(String key) {
        Proto.CommonGrowthItem commonGrowthItem = commonGrowthItemMap.getIfPresent(key);
        if(commonGrowthItem == null) {
            commonGrowthItem = getCommonGrowthItemFromRedis(key);
            if(commonGrowthItem != null) {
                commonGrowthItemMap.put(key, commonGrowthItem);
            }
        }
        return commonGrowthItem;
    }

    @Override
    public List<Proto.CommonGrowthItem> getAll() {
        return new ArrayList<>(commonGrowthItemMap.asMap().values());
    }

    @Override
    public Set<String> getKeys() {
        return commonGrowthItemMap.asMap().keySet();
    }

    @Override
    public Proto.CommonGrowthItem remove(String key) {
        Proto.CommonGrowthItem commonGrowthItem = commonGrowthItemMap.getIfPresent(key);
        if(commonGrowthItem != null) {
            commonGrowthItemMap.invalidate(key);
        }
        return commonGrowthItem;
    }

    @Override
    public boolean containsKey(String key) {
        return commonGrowthItemMap.getIfPresent(key) != null;
    }

    @Override
    public void clear() {
        commonGrowthItemMap.invalidateAll();
    }

    @Override
    public String getKey(Proto.CommonGrowthItem value) {
        return String.valueOf(value.getId());
    }

    public List<Proto.CommonGrowthItem> getCommonGrowthItemsByType(String type) {
        List<Proto.CommonGrowthItem> result = new ArrayList<>();
        for (Proto.CommonGrowthItem commonGrowthItem : commonGrowthItemMap.asMap().values()) {
            if (commonGrowthItem.getType().equals(type)) {
                result.add(commonGrowthItem);
            }
        }
        return result;
    }

    public Proto.CommonGrowthItem getCommonGrowthItemByName(String name) {
        for (Proto.CommonGrowthItem commonGrowthItem : commonGrowthItemMap.asMap().values()) {
            if (commonGrowthItem.getName().equals(name)) {
                return commonGrowthItem;
            }
        }
        return null;
    }

    public void addCommonGrowthItemToRedis(String key, Proto.CommonGrowthItem commonGrowthItem) {
        getConnection().hset(COMMON_GROWTH_ITEM_KEY.getBytes(), String.valueOf(key).getBytes(), CompressUtils.compress(commonGrowthItem));
    }

    public Proto.CommonGrowthItem getCommonGrowthItemFromRedis(String key) {
        byte[] bytes = getConnection().hget(COMMON_GROWTH_ITEM_KEY.getBytes(), key.getBytes());
        if(bytes == null) {
            return null;
        }
        return CompressUtils.decompress(bytes, Proto.CommonGrowthItem.class);
    }

    public List<Proto.CommonGrowthItem> getAllCommonGrowthItemFromRedis() {
        List<byte[]> bytes = getConnection().hvals(COMMON_GROWTH_ITEM_KEY.getBytes());
        ArrayList<Proto.CommonGrowthItem> result = new ArrayList<>();
        if (bytes == null) {
            return result;
        }
        for (byte[] commonGrowthItem : bytes) {
            result.add(CompressUtils.decompress(commonGrowthItem, Proto.CommonGrowthItem.class));
        }
        return result;
    }

    public void removeCommonGrowthItemFromRedis(String key) {
        getConnection().hdel(COMMON_GROWTH_ITEM_KEY.getBytes(), key.getBytes());
    }

    public Proto.CommonGrowthItem getCommonGrowthItemByNameFromRedis(String name) {
        for (Proto.CommonGrowthItem commonGrowthItem : getAllCommonGrowthItemFromRedis()) {
            if (commonGrowthItem.getName().equals(name)) {
                return commonGrowthItem;
            }
        }
        return null;
    }

}
