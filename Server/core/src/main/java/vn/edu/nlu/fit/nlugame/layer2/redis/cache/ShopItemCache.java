package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class ShopItemCache extends RedisClusterHelper implements ICache<Proto.ShopItem> {

    private static final ShopItemCache instance = new ShopItemCache();

    private static final Cache<String, Proto.ShopItem> shopItemMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();

    private static final String SHOP_ITEM_KEY = "shop_items";

    private ShopItemCache() {
    }

    public static ShopItemCache me() {
        return instance;
    }


    @Override
    public boolean add(String key, Proto.ShopItem value) {
        addRedis(key, value);
        addLocal(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.ShopItem value) {
        addRedis(getKey(value), value);
        addLocal(getKey(value), value);
        return true;
    }

    @Override
    public Proto.ShopItem get(String key) {
        Proto.ShopItem shopItem = shopItemMap.getIfPresent(key);
        if (shopItem == null) {
            byte[] bytes = getConnection().hget(SHOP_ITEM_KEY.getBytes(), key.getBytes());
            if (bytes != null) {
                shopItem = CompressUtils.decompress(bytes, Proto.ShopItem.class);
                shopItemMap.put(key, shopItem);
            }
        }
        return shopItem;
    }

    @Override
    public List<Proto.ShopItem> getAll() {
        return getAllListRedis();
    }

    @Override
    public Set<String> getKeys() {
        return null;
    }

    @Override
    public Proto.ShopItem remove(String key) {
        return null;
    }

    @Override
    public boolean containsKey(String key) {
        return false;
    }

    @Override
    public void clear() {
        clearRedis();
        clearLocal();
    }

    @Override
    public String getKey(Proto.ShopItem value) {
        return String.valueOf(value.getId());
    }

    public void addLocal(String key, Proto.ShopItem value) {
        shopItemMap.put(key, value);
    }

    public void addRedis(String key, Proto.ShopItem value) {
        getConnection().hset(SHOP_ITEM_KEY.getBytes(), key.getBytes(), CompressUtils.compress(value));
    }

    public Map<String, Proto.ShopItem> getAllRedis() {
        Map<byte[], byte[]> shopItemMap = getConnection().hgetAll(SHOP_ITEM_KEY.getBytes());
        if (shopItemMap == null || shopItemMap.isEmpty()) return null;

        Map<String, Proto.ShopItem> result = new HashMap<>();
        shopItemMap.forEach((k, v) -> {
            result.put(new String(k), CompressUtils.decompress(v, Proto.ShopItem.class));
        });
        return result;
    }

    public List<Proto.ShopItem> getAllListRedis() {
        Map<String, Proto.ShopItem> shopItemMap = getAllRedis();
        if (shopItemMap != null && !shopItemMap.isEmpty()) {
            return new ArrayList<>(shopItemMap.values());
        }
        return null;
    }

    public List<Proto.ShopItem> getByType(int type) {
        List<Proto.ShopItem> shopItems = getAll();
        if (shopItems == null || shopItems.isEmpty()) return null;

        List<Proto.ShopItem> result = new ArrayList<>();
        for (Proto.ShopItem shopItem : shopItems) {
            if (shopItem.getType() == type) {
                result.add(shopItem);
            }
        }
        return result;
    }

    public void clearLocal() {
        shopItemMap.invalidateAll();
    }

    public void clearRedis() {
        getConnection().del(SHOP_ITEM_KEY.getBytes());
    }

}
