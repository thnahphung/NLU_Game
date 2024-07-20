package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.VeterinarianService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class VeterinarianHandler implements Subscriber {

    VeterinarianService veterinarianService = VeterinarianService.me();

    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQLOADALLFORMULA:
                    veterinarianService.loadAllFormula(session, packet.getReqLoadAllFormula());
                    break;
                case REQLOADALLMEDICINE:
                    veterinarianService.loadAllMedicine(session, packet.getReqLoadAllMedicine());
                    break;
                case REQCRAFTINGMEDICINE:
                    veterinarianService.craftingMedicine(session, packet.getReqCraftingMedicine());
                    break;
                case REQLOADQUESTION:
                    veterinarianService.loadQuestion(session, packet.getReqLoadQuestion());
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
