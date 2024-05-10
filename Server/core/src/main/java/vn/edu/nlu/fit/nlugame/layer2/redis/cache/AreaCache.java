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

public class AreaCache extends RedisClusterHelper{
    private static final AreaCache instance = new AreaCache();
    private static final Cache<Integer, AreaContext> areaContextMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final String AREAS_KEY = "areas";
    private static final String AREA_KEY = "area:";

    private AreaCache() {
    }

    public static AreaCache me() {
        return instance;
    }

    public void addArea(Integer key, AreaContext areaContext) {
        getConnection().hset(AREA_KEY.getBytes(), String.valueOf(key).getBytes(), CompressUtils.compress(areaContext));
    }

    public void addPlayerToArea(Integer areaId, Proto.Player player) {
        getConnection().hset((AREA_KEY + areaId).getBytes(), String.valueOf(player.getPlayerId()).getBytes(), String.valueOf(player).getBytes());
    }
}
