package vn.edu.nlu.fit.nlugame.layer0.network.websocket;

import jakarta.websocket.*;
import vn.edu.nlu.fit.nlugame.layer0.handler.*;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;
import java.util.HashSet;
import java.util.Set;

@jakarta.websocket.server.ServerEndpoint(value = "/game", configurator = CustomEndpointConfigurator.class, decoders = MessageDecoder.class, encoders = MessageEndcoder.class)
public class ServerEndpoint {
    private static final Set<Subscriber> subscribers = new HashSet<>();

    public static void init() {
        ServerEndpoint.subscribe(new SessionHandler());
        ServerEndpoint.subscribe(new AuthHandler());
        ServerEndpoint.subscribe(new NotificationHandler());
        ServerEndpoint.subscribe(new CharacterHandler());
    }

    public static void subscribe(Subscriber sub) {
        subscribers.add(sub);
    }

    @OnOpen
    public void onOpen(Session session) {
        session.setMaxIdleTimeout(100000);
        subscribers.forEach(s -> ThreadManage.me().execute(() -> s.onOpen(session)));
    }

    @OnMessage
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        subscribers.forEach(s -> ThreadManage.me().execute(() -> s.onMessage(session, packetWrapper)));
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        subscribers.forEach(s -> ThreadManage.me().execute(() -> s.onClose(session, closeReason)));
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        subscribers.forEach(s -> ThreadManage.me().execute(() -> s.onError(session, throwable)));
    }

//    private static void initLoadingData() {
//        String masterEndpoint = ServerStatusCache.me().getMasterEndpoint();
//        if (!SessionManage.me().getEndPointID().equals(masterEndpoint)) return;
//        LoadingSettingService.me().syncDancingShowSetting();
//    }

    public static void destroy() {
        RedisClusterHelper.closeConnection();
        subscribers.clear();
//        SystemNotify.me().destroy();
    }
}
