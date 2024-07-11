package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.FarmService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class FarmHandler implements Subscriber{
    FarmService farmService = FarmService.me();
    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQBUYBUILDING:
                    farmService.handleBuyBuilding(session, packet.getReqBuyBuilding());
                    break;
                case REQTILLEDLAND:
                    farmService.handleTilledLand(session, packet.getReqTilledLand());
                    break;
                case REQLOADCOMMONCROPS:
                    farmService.handleLoadCommonCrops(session);
                    break;
                case REQSOW:
                    farmService.handleSow(session, packet.getReqSow());
                    break;
                case REQLOADITEMSOFFARM:
                    farmService.loadItemsOfFarm(session, packet.getReqLoadItemsOfFarm());
                    break;
                case REQHARVEST:
                    farmService.handleHarvest(session, packet.getReqHarvest());
                    break;
                case REQLOADITEMSOFWAREHOUSE:
                    farmService.loadItemsOfWarehouse(session);
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
