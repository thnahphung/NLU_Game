package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.AreaService;
import vn.edu.nlu.fit.nlugame.layer1.CharacterService;
import vn.edu.nlu.fit.nlugame.layer1.TaskService;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class CharacterHandler implements Subscriber{
    CharacterService characterService = CharacterService.me();
    private final AreaService areaService = AreaService.me();
    private final TaskService taskService = TaskService.me();
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
                    pickCharacter(session, packet);
                    break;
            }
        });
    }

    public void pickCharacter(Session session, Proto.Packet packet) {
        UserBean userLoginBean = characterService.pickCharacter(session, packet.getReqPickCharacter());
        if (userLoginBean == null || userLoginBean.getHasCharacter() == 0) return;
        areaService.joinAreaLogin(userLoginBean.getId(), session);
        taskService.loadTask(session);
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
