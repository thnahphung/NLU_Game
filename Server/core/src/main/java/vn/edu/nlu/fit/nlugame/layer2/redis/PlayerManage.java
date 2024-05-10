package vn.edu.nlu.fit.nlugame.layer2.redis;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.concurrent.TimeUnit;

public class PlayerManage {
    private static final PlayerManage install = new PlayerManage();
    public final Cache<String, Proto.Player> playerMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private PlayerManage() {
        System.out.println("PlayerManage created");
    }
}
