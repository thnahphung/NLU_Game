package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.AnimalHusbandryService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class AnimalHusbandryHandler implements Subscriber {
    AnimalHusbandryService animalHusbandService = AnimalHusbandryService.me();

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
                case REQLOADDETAILDISEASE:
                    animalHusbandService.loadDetailDisease(session, packet.getReqLoadDetailDisease());
                    break;
                case REQSELLANIMAL:
                    animalHusbandService.sellAnimal(session, packet.getReqSellAnimal());
                    break;
                case REQANIMALMOVING:
                    animalHusbandService.animalMoving(session, packet.getReqAnimalMoving());
                    break;
                case REQUPGRADECAGE:
                    animalHusbandService.upgradeCage(session, packet.getReqUpgradeCage());
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
