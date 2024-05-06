package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.CharacterService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class CharacterHandler implements Subscriber{

    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQLOADCHARACTERS:
                    CharacterService.me().loadCharactes(session);
                    break;
                case REQPICKCHARACTER:
                    CharacterService.me().pickCharacter(session, packet.getReqPickCharacter());
                    break;
            }
        });
    }

    @Override
    public void onClose(Session session, CloseReason closeReason) {

    }

    @Override
    public void onError(Session session, Throwable throwable) {

    }

    @Override
    public boolean requireLogin() {
        return false;
    }
}
