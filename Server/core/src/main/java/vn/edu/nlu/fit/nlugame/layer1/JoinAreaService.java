package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class JoinAreaService {
    private static final JoinAreaService instance = new JoinAreaService();

    private JoinAreaService() {
    }

    public static JoinAreaService me() {
        return instance;
    }

    public void joinArea(Session session, Proto.ReqPlayerJoinArea reqJoinArea) {

    }


    private void sendResponse(Session session, Proto.Packet packet) {
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen())
            session.getAsyncRemote().sendObject(packets);
    }


}
