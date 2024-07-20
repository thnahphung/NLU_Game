package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.FarmService;
import vn.edu.nlu.fit.nlugame.layer1.TaskService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.Map;

public class FarmHandler implements Subscriber{
    FarmService farmService = FarmService.me();
    TaskService taskService = TaskService.me();
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
                    handleSow(session, packet.getReqSow());
                    break;
                case REQLOADITEMSOFFARM:
                    farmService.loadItemsOfFarm(session, packet.getReqLoadItemsOfFarm());
                    break;
                case REQHARVEST:
                    handleHarvest(session, packet.getReqHarvest());
                    break;
                case REQTILLLANDBYMACHINE:
                    farmService.handleTillLandByMachine(session, packet.getReqTillLandByMachine());
                    break;
                case REQHARVESTBYMACHINE:
                    farmService.handleHarvestByMachine(session, packet.getReqHarvestByMachine());
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

    private void handleHarvest(Session session, Proto.ReqHarvest reqHarvest) {
        Map<String, Integer> mapSeed = farmService.handleHarvest(session, reqHarvest);
        taskService.checkTaskHarvestCrop(session, mapSeed);
    }

    private void handleSow(Session session, Proto.ReqSow reqSow) {
        Proto.Crops crops = farmService.handleSow(session, reqSow);
        taskService.checkTaskSow(session, crops);
    }
}
