package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CommonBuildingBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.CommonBuildingContext;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class CommonBuildingCache extends RedisClusterHelper implements ICache<CommonBuildingContext, String>{
    private static final CommonBuildingCache instance = new CommonBuildingCache();
    private static final String COMMON_BUILDING_KEY = "common_building";
    private static final Cache<String, CommonBuildingContext> commonBuildingMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.HOURS).build();

    private CommonBuildingCache() {
    }

    public static CommonBuildingCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, CommonBuildingContext value) {
        if(value == null) {
            return false;
        }
        commonBuildingMap.put(key, value);
        return true;
    }

    @Override
    public boolean add(CommonBuildingContext value) {
        if(value == null) {
            return false;
        }
        commonBuildingMap.put(String.valueOf(value.getBuildingBaseBean().getId()), value);
        return false;
    }

    @Override
    public CommonBuildingContext get(String key) {
        CommonBuildingContext commonBuildingContext = commonBuildingMap.getIfPresent(key);
        if(commonBuildingContext == null) {
            commonBuildingContext = getCommonBuilding(Integer.parseInt(key));
            if(commonBuildingContext != null) {
                commonBuildingMap.put(key, commonBuildingContext);
            }
        }
        return commonBuildingContext;
    }

    @Override
    public List<CommonBuildingContext> getAll() {
        return new ArrayList<>(commonBuildingMap.asMap().values());
    }

    @Override
    public Set<String> getKeys() {
        return commonBuildingMap.asMap().keySet();
    }

    @Override
    public CommonBuildingContext remove(String key) {
        CommonBuildingContext commonBuildingContext = commonBuildingMap.getIfPresent(key);
        if(commonBuildingContext != null) {
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
    public String getKey(CommonBuildingContext value) {
        return String.valueOf(value.getBuildingBaseBean().getId());
    }

    public void addCommonBuilding(CommonBuildingContext commonBuildingContext) {
        getConnection().hset(COMMON_BUILDING_KEY.getBytes(), String.valueOf(commonBuildingContext.getBuildingBaseBean().getId()).getBytes(), CompressUtils.compress(commonBuildingContext));
    }

    public CommonBuildingContext getCommonBuilding(int id) {
        CommonBuildingContext commonBuildingContext = commonBuildingMap.getIfPresent(String.valueOf(id));
        if(commonBuildingContext == null) {
            byte[] bytes = getConnection().hget(COMMON_BUILDING_KEY.getBytes(), String.valueOf(id).getBytes());
            if(bytes != null) {
                commonBuildingContext = CompressUtils.decompress(bytes, CommonBuildingContext.class);
                if(commonBuildingContext != null) {
                    commonBuildingMap.put(String.valueOf(id), commonBuildingContext);
                }
            }
        }
        return commonBuildingContext;
    }

    public Map<String, CommonBuildingContext> getAllCommonBuilding() {
        Map<byte[], byte[]> commonBuildingMap = getConnection().hgetAll(COMMON_BUILDING_KEY.getBytes());
        Map<String, CommonBuildingContext> result = new HashMap<>();
        commonBuildingMap.forEach((k, v) -> {
            CommonBuildingContext commonBuildingContext = CompressUtils.decompress(v, CommonBuildingContext.class);
            result.put(new String(k), commonBuildingContext);
        });
        return result;
    }

    public List<Proto.BuildingBase> getAllCommonBuildingBean() {
        Map<byte[], byte[]> commonBuildingMap = getConnection().hgetAll(COMMON_BUILDING_KEY.getBytes());
        List<Proto.BuildingBase> result = new ArrayList<>();
        commonBuildingMap.forEach((k, v) -> {
            CommonBuildingContext commonBuildingContext = CompressUtils.decompress(v, CommonBuildingContext.class);
            result.add(commonBuildingContext.getBuildingBaseBean());
        });
        return result;
    }
}
