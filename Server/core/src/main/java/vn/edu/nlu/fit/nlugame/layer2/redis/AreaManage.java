package vn.edu.nlu.fit.nlugame.layer2.redis;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.concurrent.TimeUnit;

public class AreaManage {
    private static final AreaManage instance = new AreaManage();
    public final Cache<String, Proto.Player> sessionMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private AreaManage() {
        System.out.println("AreaManage created");
    }
    public static AreaManage me() {
        return instance;
    }


}
