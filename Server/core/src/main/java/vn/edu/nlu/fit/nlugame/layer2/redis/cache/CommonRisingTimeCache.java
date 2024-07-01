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
import java.util.stream.Collectors;

public class CommonRisingTimeCache extends RedisClusterHelper implements ICache<Proto.CommonRisingTime> {
    private final static CommonRisingTimeCache instance = new CommonRisingTimeCache();

    private static final String COMMON_RISING_TIME_KEY = "common_rising_times";

    private static final Cache<String, Proto.CommonRisingTime> commonRisingTimeMap = Caffeine.newBuilder().maximumSize(10000).expireAfterAccess(2, TimeUnit.HOURS).build();

    private CommonRisingTimeCache() {
    }

    public static CommonRisingTimeCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, Proto.CommonRisingTime value) {
        commonRisingTimeMap.put(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.CommonRisingTime value) {
        add(String.valueOf(value.getId()), value);
        return false;
    }

    @Override
    public Proto.CommonRisingTime get(String key) {
        return commonRisingTimeMap.getIfPresent(key);
    }

    @Override
    public List<Proto.CommonRisingTime> getAll() {
        return new ArrayList<>(commonRisingTimeMap.asMap().values());
    }

    @Override
    public Set<String> getKeys() {
        return commonRisingTimeMap.asMap().keySet();
    }

    @Override
    public Proto.CommonRisingTime remove(String key) {
        Proto.CommonRisingTime commonRisingTime = commonRisingTimeMap.getIfPresent(key);
        if(commonRisingTime != null) {
            commonRisingTimeMap.invalidate(key);
        }
        return commonRisingTime;
    }

    @Override
    public boolean containsKey(String key) {
        return commonRisingTimeMap.getIfPresent(key) != null;
    }

    @Override
    public void clear() {
        commonRisingTimeMap.invalidateAll();
    }

    @Override
    public String getKey(Proto.CommonRisingTime value) {
        return String.valueOf(value.getId());
    }

    public List<Proto.CommonRisingTime> getCommonRisingTimesByItemId(int commonGrowthItemId) {
        List<Proto.CommonRisingTime> result = new ArrayList<>();
        if(commonRisingTimeMap.asMap().size() == 0) {
            return result;
        }
        for (Proto.CommonRisingTime commonRisingTime : commonRisingTimeMap.asMap().values()) {
            if (commonRisingTime.getGrowthItemId() == commonGrowthItemId) {
                result.add(commonRisingTime);
            }
        }
        return result;
    }

    public void addCommonRisingTimeToRedis(Proto.CommonRisingTime commonRisingTime) {
        getConnection().hset(COMMON_RISING_TIME_KEY.getBytes(), String.valueOf(commonRisingTime.getId()).getBytes(), CompressUtils.compress(commonRisingTime));
    }

    public Proto.CommonRisingTime getCommonRisingTimeFromRedis(String key) {
        byte[] bytes = getConnection().hget(COMMON_RISING_TIME_KEY.getBytes(), key.getBytes());
        if(bytes == null) {
            return null;
        }
        return CompressUtils.decompress(bytes, Proto.CommonRisingTime.class);
    }

    public List<Proto.CommonRisingTime> getAllCommonRisingTimeFromRedis() {
        List<byte[]> bytes = getConnection().hvals(COMMON_RISING_TIME_KEY.getBytes());
        ArrayList<Proto.CommonRisingTime> result = new ArrayList<>();
        if (bytes == null) {
            return result;
        }
        for (byte[] commonRisingTime : bytes) {
            result.add(CompressUtils.decompress(commonRisingTime, Proto.CommonRisingTime.class));
        }
        if(commonRisingTimeMap.asMap().size() == 0 || commonRisingTimeMap.asMap().size() != result.size()) {
            clear();
            result.forEach(commonRisingTime -> commonRisingTimeMap.put(String.valueOf(commonRisingTime.getId()), commonRisingTime));
        }
        return result;
    }

    public List<Proto.CommonRisingTime> getCommonRisingTimesFromRedisByItemId(int commonGrowthItemId) {
        List<Proto.CommonRisingTime> commonRisingTimeList = commonRisingTimeMap.asMap().values().stream().collect(Collectors.toList());
        if(commonRisingTimeList.size() == 0) {
            commonRisingTimeList = getAllCommonRisingTimeFromRedis();
        }
        List<Proto.CommonRisingTime> result = new ArrayList<>();
        if(commonRisingTimeList == null) {
            return null;
        }
        commonRisingTimeList.forEach(commonRisingTime -> {
            if(commonRisingTime.getGrowthItemId() == commonGrowthItemId) {
                result.add(commonRisingTime);
            }
        });
        return result;
    }

    public void removeCommonRisingTimeFromRedis(String key) {
        getConnection().hdel(COMMON_RISING_TIME_KEY.getBytes(), key.getBytes());
    }
}
