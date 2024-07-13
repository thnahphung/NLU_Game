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

public class ActivityCache extends RedisClusterHelper implements ICache<Proto.Activity> {
    private static final String ACTIVITY_KEY = "activities";

    private static final ActivityCache instance = new ActivityCache();
    private static final Cache<String, Proto.Activity> activityMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    public static ActivityCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, Proto.Activity value) {
        addActivityRedis(key, value);
        addActivityLocal(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.Activity value) {
        return false;
    }

    @Override
    public Proto.Activity get(String key) {
        Proto.Activity activity = activityMap.getIfPresent(key);
        if (activity == null) {
            byte[] bytes = getConnection().hget(ACTIVITY_KEY.getBytes(), key.getBytes());
            if (bytes != null) {
                activity = CompressUtils.decompress(bytes, Proto.Activity.class);
                activityMap.put(key, activity);
            }
        }
        return activity;
    }

    @Override
    public List<Proto.Activity> getAll() {
        List<Proto.Activity> activities = new ArrayList<>();
        activityMap.asMap().forEach((key, value) -> {
            activities.add(value);
        });
        if(activities.isEmpty()) {
            getConnection().hgetAll(ACTIVITY_KEY.getBytes()).forEach((key, value) -> {
                Proto.Activity activity = CompressUtils.decompress(value, Proto.Activity.class);
                activities.add(activity);
                activityMap.put(new String(key), activity);
            });
        }
        return activities;
    }

    @Override
    public Set<String> getKeys() {
        return null;
    }

    @Override
    public Proto.Activity remove(String key) {
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
    public String getKey(Proto.Activity value) {
        return String.valueOf(value.getId());
    }

    public void addActivityLocal(String key, Proto.Activity value) {
        activityMap.put(key, value);
    }
    public void addActivityRedis(String key, Proto.Activity activity) {
        getConnection().hset(ACTIVITY_KEY.getBytes(), key.getBytes(), CompressUtils.compress(activity));
    }
}
