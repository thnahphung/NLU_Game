package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.RemovalCause;
import com.github.benmanes.caffeine.cache.RemovalListener;
import org.checkerframework.checker.nullness.qual.Nullable;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class PropertyBuildingCache extends RedisClusterHelper implements ICache<Proto.PropertyBuilding>{
    private static final PropertyBuildingCache instance = new PropertyBuildingCache();
    private static final String PROPERTY_BUILDING_KEY = "property_building:";
    private static final Cache<String, Proto.PropertyBuilding> propertyBuildingMap = Caffeine.newBuilder()
            .maximumSize(1000)
            .expireAfterAccess(5, TimeUnit.MINUTES)
            .removalListener(new RemovalListener<Object, Object>() {
                @Override
                public void onRemoval(@Nullable Object o, @Nullable Object o2, RemovalCause removalCause) {
                    if(removalCause == RemovalCause.EXPIRED) {
                        PropertyBuildingCache.me().clear();
                    }
                }
            }).build();

    private PropertyBuildingCache() {
    }

    public static PropertyBuildingCache me() {
        return instance;
    }
    //Local
    // area1_id1 -> PropertyBuildingContext(id=1, positionX=1.0, positionY=2.0, currentLevel=3, areaId=1, commonBuildingId=1, upgradeId=1)
    // area1_id2 -> PropertyBuildingContext(id=1, positionX=1.0, positionY=2.0, currentLevel=3, areaId=1, commonBuildingId=1, upgradeId=1)
    //Redis
    // property_building_area1 -> 1, PropertyBuildingContext(id=1, positionX=1.0, positionY=2.0, currentLevel=3, areaId=1, commonBuildingId=1, upgradeId=1)
    // property_building_area1 -> 2, PropertyBuildingContext(id=2, positionX=2.0, positionY=3.0, currentLevel=3, areaId=1, commonBuildingId=2, upgradeId=1)
    // property_building_area2 -> 1, PropertyBuildingContext(id=1, positionX=1.0, positionY=3.0, currentLevel=3, areaId=2, commonBuildingId=1, upgradeId=1)
    @Override
    public boolean add(String key, Proto.PropertyBuilding value) {
        if(value == null) {
            return false;
        }
        String keyArea = key;
        propertyBuildingMap.put(keyArea, value);
        return true;
    }

    @Override
    public boolean add(Proto.PropertyBuilding value) {
        if(value == null) {
            return false;
        }
        String keyArea = value.getAreaId() +"_"+ value.getId();
        this.add(keyArea, value);
        return false;
    }

    @Override
    public Proto.PropertyBuilding get(String key) {
        Proto.PropertyBuilding propertyBuildingContext = propertyBuildingMap.getIfPresent(key);
        return propertyBuildingContext;
    }

    @Override
    public List<Proto.PropertyBuilding> getAll() {
        return new ArrayList<>(propertyBuildingMap.asMap().values());
    }

    public List<Proto.PropertyBuilding> getAll(int areaId) {
        List<Proto.PropertyBuilding> result = new ArrayList<>();
        propertyBuildingMap.asMap().forEach((k, v) -> {
            if(v.getAreaId() == areaId) {
                result.add(v);
            }
        });
        return result;
    }

    @Override
    public Set<String> getKeys() {
        return propertyBuildingMap.asMap().keySet();
    }

    @Override
    public Proto.PropertyBuilding remove(String key) {
        Proto.PropertyBuilding propertyBuildingContext = propertyBuildingMap.getIfPresent(key);
        if(propertyBuildingContext != null) {
            getConnection().hdel(PROPERTY_BUILDING_KEY.getBytes(), key.getBytes());
            propertyBuildingMap.invalidate(key);
        }
        return propertyBuildingContext;
    }

    @Override
    public boolean containsKey(String key) {
        return propertyBuildingMap.getIfPresent(key) != null;
    }

    @Override
    public void clear() {
        getConnection().del(PROPERTY_BUILDING_KEY.getBytes());
        propertyBuildingMap.invalidateAll();
    }

    @Override
    public String getKey(Proto.PropertyBuilding value) {
        return value.getAreaId() +"_"+ value.getId();
    }

    public void addPropertyBuilding(Proto.PropertyBuilding propertyBuildingContext) {
        String key = PROPERTY_BUILDING_KEY + propertyBuildingContext.getAreaId();
        getConnection().hset(key.getBytes(), String.valueOf(propertyBuildingContext.getId()).getBytes(), CompressUtils.compress(propertyBuildingContext));
    }

    public Proto.PropertyBuilding getPropertyBuilding(int id, int areaId) {
        String key = PROPERTY_BUILDING_KEY + areaId;
        Proto.PropertyBuilding propertyBuildingContext = propertyBuildingMap.getIfPresent(key);
        if(propertyBuildingContext == null) {
            byte[] bytes = getConnection().hget(key.getBytes(), String.valueOf(id).getBytes());
            if(bytes != null) {
                propertyBuildingContext = CompressUtils.decompress(bytes, Proto.PropertyBuilding.class);
                if(propertyBuildingContext != null) {
                    propertyBuildingMap.put(key, propertyBuildingContext);
                }
            }
        }
        return propertyBuildingContext;
    }

    public Map<String, Proto.PropertyBuilding> getAllPropertyBuilding(int areaId) {
        String key = PROPERTY_BUILDING_KEY + areaId;
        Map<byte[], byte[]> propertyBuildingMap = getConnection().hgetAll(key.getBytes());
        Map<String, Proto.PropertyBuilding> result = new HashMap<>();
        propertyBuildingMap.forEach((k, v) -> {
            Proto.PropertyBuilding propertyBuildingContext = CompressUtils.decompress(v, Proto.PropertyBuilding.class);
            result.put(new String(k), propertyBuildingContext);
        });
        return result;
    }

    public List<Proto.PropertyBuilding> getAllPropertyBuildingBeanByAreaId(int areaId) {
        String key = PROPERTY_BUILDING_KEY + areaId;
        Map<byte[], byte[]> propertyBuildingMap = getConnection().hgetAll(key.getBytes());
        List<Proto.PropertyBuilding> result = new ArrayList<>();
        propertyBuildingMap.forEach((k, v) -> {
            Proto.PropertyBuilding propertyBuildingContext = CompressUtils.decompress(v, Proto.PropertyBuilding.class);
            result.add(propertyBuildingContext);
        });
        return result;
    }
}
