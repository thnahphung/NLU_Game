package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.MechanicalService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class MechanicalHandler implements Subscriber{
    MechanicalService mechanicalService = MechanicalService.me();
    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQMANUFACTUREMACHINE:
                    mechanicalService.manufactureMachine(session, packet.getReqManufactureMachine());
                    break;
                case REQLOADMACHINES:
                    mechanicalService.loadMachines(session, packet.getReqLoadMachines());
                    break;
                case REQLOADFORMULASOFMACHINE:
                    mechanicalService.loadFormulasOfMachine(session, packet.getReqLoadFormulasOfMachine());
                    break;
                case REQLOADALLMACHINEFORMULA:
                    mechanicalService.loadAllMachineFormula(session, packet.getReqLoadAllMachineFormula());
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
