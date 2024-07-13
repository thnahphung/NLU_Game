package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.AreaService;
import vn.edu.nlu.fit.nlugame.layer1.TaskService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class AreaHandler implements Subscriber {
    AreaService areaService = AreaService.me();
    TaskService taskService = TaskService.me();

    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQPLAYERJOINAREA:
                    areaService.joinOtherArea(session, packet.getReqPlayerJoinArea());
                    break;
                case REQPLAYERJOINAREACOMMON:
                    joinAreaCommon(session, packet.getReqPlayerJoinAreaCommon());
                    break;
                case REQMOVING:
                    areaService.moving(session, packet.getReqMoving());
                    break;
            }
        });
    }

    @Override
    public void onClose(Session session, CloseReason closeReason) {
        areaService.leaveArea(session);
    }

    @Override
    public void onError(Session session, Throwable throwable) {

    }

    @Override
    public boolean requireLogin() {
        return false;
    }

    public void joinAreaCommon(Session session, Proto.ReqPlayerJoinAreaCommon reqPlayerJoinAreaCommon) {
        Proto.Area area = areaService.joinAreaCommon(session, reqPlayerJoinAreaCommon);
        if (area != null) taskService.checkTaskVisitArea(session, area);
    }
}
