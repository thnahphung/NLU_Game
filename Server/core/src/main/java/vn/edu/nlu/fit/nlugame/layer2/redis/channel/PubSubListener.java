package vn.edu.nlu.fit.nlugame.layer2.redis.channel;

import jakarta.websocket.Session;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.redisson.api.listener.MessageListener;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.Serializable;

public class PubSubListener implements MessageListener<PubSubListener.Message> {


    @Override
    public void onMessage(CharSequence channel, Message msg) {
        Session session = SessionManage.me().get(msg.getSessionID());
        if (session != null && session.isOpen()) {
            Proto.PacketWrapper packetWrapper = CompressUtils.decompress(msg.content, Proto.PacketWrapper.class);
            session.getAsyncRemote().sendObject(packetWrapper);
        }
    }

    @Data
    @Builder
    @ToString
    public static class Message implements Serializable {
        private String sessionID;
        private byte[] content;
    }
}
