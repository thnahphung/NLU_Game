package vn.edu.nlu.fit.nlugame.layer2.redis.channel;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

public class AreaNotify extends RedisClusterHelper {
    public static final AreaNotify instance = new AreaNotify();
    public final Cache<Integer, PubSubListener> areaListenerMap = Caffeine.newBuilder().maximumSize(1000).build();

    private AreaNotify() {
    }

    public static AreaNotify me() {
        return instance;
    }

    public void subscribe(int areaId) {
        if (areaListenerMap.asMap().containsKey(areaId)) {
            return;
        }
        PubSubListener listener = new PubSubListener();
        getRedissonClient().getTopic(getId(areaId)).addListener(PubSubListener.Message.class, listener);
        areaListenerMap.put(areaId, listener);
    }

    public void unsubscribe(int areaId) {
        if (!areaListenerMap.asMap().containsKey(areaId)) {
            return;
        }
        PubSubListener pubSubListener = areaListenerMap.asMap().remove(areaId);
        getRedissonClient().getTopic(getId(areaId)).removeListener(pubSubListener);
    }

    public void publish(String sessionId, Proto.PacketWrapper packetWrapper, int areaId) {
        if (!areaListenerMap.asMap().containsKey(areaId)) {
            return;
        }
        PubSubListener.Message msg = PubSubListener.Message.builder()
                .sessionID(sessionId)
                .content(CompressUtils.compress(packetWrapper))
                .build();
        getRedissonClient().getTopic(getId(areaId)).publish(msg);
    }

    private String getId(int areaId) {
        return "AREA_CHANEL:" + areaId;
    }
}
