package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyBuildingBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.PropertyBuildingContext;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class PropertyBuildingCache extends RedisClusterHelper implements ICache<PropertyBuildingContext, String>{
    private static final PropertyBuildingCache instance = new PropertyBuildingCache();
    private static final String PROPERTY_BUILDING_KEY = "property_building:";
    private static final Cache<String, PropertyBuildingContext> propertyBuildingMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(30, TimeUnit.MINUTES).build();

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
    public boolean add(String key, PropertyBuildingContext value) {
        if(value == null) {
            return false;
        }
        String keyArea = key;
        propertyBuildingMap.put(keyArea, value);
        return true;
    }

    @Override
    public boolean add(PropertyBuildingContext value) {
        if(value == null) {
            return false;
        }
        String keyArea = value.getPropertyBuildingBean().getAreaId() +"_"+ value.getPropertyBuildingBean().getId();
        this.add(keyArea, value);
        return false;
    }

    @Override
    public PropertyBuildingContext get(String key) {
        PropertyBuildingContext propertyBuildingContext = propertyBuildingMap.getIfPresent(key);
        return propertyBuildingContext;
    }

    @Override
    public List<PropertyBuildingContext> getAll() {
        return new ArrayList<>(propertyBuildingMap.asMap().values());
    }

    public List<PropertyBuildingContext> getAll(int areaId) {
        System.out.println("getAll from cache local");
        List<PropertyBuildingContext> result = new ArrayList<>();
        propertyBuildingMap.asMap().forEach((k, v) -> {
            if(v.getPropertyBuildingBean().getAreaId() == areaId) {
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
    public PropertyBuildingContext remove(String key) {
        PropertyBuildingContext propertyBuildingContext = propertyBuildingMap.getIfPresent(key);
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
    public String getKey(PropertyBuildingContext value) {
        return value.getPropertyBuildingBean().getAreaId() +"_"+ value.getPropertyBuildingBean().getId();
    }

    public void addPropertyBuilding(PropertyBuildingContext propertyBuildingContext) {
        String key = PROPERTY_BUILDING_KEY + propertyBuildingContext.getPropertyBuildingBean().getAreaId();
        getConnection().hset(key.getBytes(), String.valueOf(propertyBuildingContext.getPropertyBuildingBean().getId()).getBytes(), CompressUtils.compress(propertyBuildingContext));
    }

    public PropertyBuildingContext getPropertyBuilding(int id, int areaId) {
        String key = PROPERTY_BUILDING_KEY + areaId;
        PropertyBuildingContext propertyBuildingContext = propertyBuildingMap.getIfPresent(key);
        if(propertyBuildingContext == null) {
            byte[] bytes = getConnection().hget(key.getBytes(), String.valueOf(id).getBytes());
            if(bytes != null) {
                propertyBuildingContext = CompressUtils.decompress(bytes, PropertyBuildingContext.class);
                if(propertyBuildingContext != null) {
                    propertyBuildingMap.put(key, propertyBuildingContext);
                }
            }
        }
        return propertyBuildingContext;
    }

    public Map<String, PropertyBuildingContext> getAllPropertyBuilding(int areaId) {
        String key = PROPERTY_BUILDING_KEY + areaId;
        Map<byte[], byte[]> propertyBuildingMap = getConnection().hgetAll(key.getBytes());
        Map<String, PropertyBuildingContext> result = new HashMap<>();
        propertyBuildingMap.forEach((k, v) -> {
            PropertyBuildingContext propertyBuildingContext = CompressUtils.decompress(v, PropertyBuildingContext.class);
            result.put(new String(k), propertyBuildingContext);
        });
        return result;
    }

    public List<Proto.PropertyBuilding> getAllPropertyBuildingBeanByAreaId(int areaId) {
        System.out.println("getAllPropertyBuilding from cache redis");
        String key = PROPERTY_BUILDING_KEY + areaId;
        Map<byte[], byte[]> propertyBuildingMap = getConnection().hgetAll(key.getBytes());
        List<Proto.PropertyBuilding> result = new ArrayList<>();
        propertyBuildingMap.forEach((k, v) -> {
            PropertyBuildingContext propertyBuildingContext = CompressUtils.decompress(v, PropertyBuildingContext.class);
            result.add(propertyBuildingContext.getPropertyBuildingBean());
        });
        return result;
    }
}
