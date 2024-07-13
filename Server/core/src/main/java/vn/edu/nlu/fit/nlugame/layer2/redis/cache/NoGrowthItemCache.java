package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class NoGrowthItemCache extends RedisClusterHelper implements ICache<Proto.NoGrowthItem> {

    private static final NoGrowthItemCache instance = new NoGrowthItemCache();
    private static final Cache<String, Proto.NoGrowthItem> noGrowthItemMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final String NO_GROWTH_ITEM_KEY = "no_growth_items";

    private NoGrowthItemCache() {
    }

    public static NoGrowthItemCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, Proto.NoGrowthItem value) {
        addRedis(key, value);
        addLocal(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.NoGrowthItem value) {
        return add(getKey(value), value);
    }

    @Override
    public Proto.NoGrowthItem get(String key) {
        Proto.NoGrowthItem noGrowthItem = noGrowthItemMap.getIfPresent(key);
        if (noGrowthItem == null) {
            byte[] bytes = getConnection().hget(NO_GROWTH_ITEM_KEY.getBytes(), key.getBytes());
            if (bytes != null) {
                noGrowthItem = CompressUtils.decompress(bytes, Proto.NoGrowthItem.class);
                noGrowthItemMap.put(key, noGrowthItem);
            }
        }
        return noGrowthItem;
    }

    @Override
    public List<Proto.NoGrowthItem> getAll() {
        return null;
    }

    @Override
    public Set<String> getKeys() {
        return null;
    }

    @Override
    public Proto.NoGrowthItem remove(String key) {
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
    public String getKey(Proto.NoGrowthItem value) {
        return String.valueOf(value.getId());
    }

    public void addLocal(String key, Proto.NoGrowthItem value) {
        noGrowthItemMap.put(key, value);
    }

    public void addRedis(String key, Proto.NoGrowthItem value) {
        getConnection().hset(NO_GROWTH_ITEM_KEY.getBytes(), key.getBytes(), CompressUtils.compress(value));
    }
}
