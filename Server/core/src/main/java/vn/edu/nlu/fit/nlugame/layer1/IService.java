package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public interface IService {
    void onOpen(Session session, String... params);

    void onMessage(Session session, Proto.PacketWrapper packetWrapper);

    void onClose(Session session);
}
