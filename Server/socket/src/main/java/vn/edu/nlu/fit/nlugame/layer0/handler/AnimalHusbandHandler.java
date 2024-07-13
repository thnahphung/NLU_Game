package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.AnimalHusbandService;
import vn.edu.nlu.fit.nlugame.layer1.AreaService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class AnimalHusbandHandler implements Subscriber {
    AnimalHusbandService animalHusbandService = AnimalHusbandService.me();

    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQBUYCAGE:
                    animalHusbandService.buyCage(session, packet.getReqBuyCage());
                    break;
                case REQLOADCAGES:
                    animalHusbandService.loadCages(session, packet.getReqLoadCages());
                    break;
                case REQANIMALEAT:
                    animalHusbandService.animalEat(session, packet.getReqAnimalEat());
                    break;
                case REQADDANIMALTOCAGE:
                    animalHusbandService.addAnimalToCage(session, packet.getReqAddAnimalToCage());
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
