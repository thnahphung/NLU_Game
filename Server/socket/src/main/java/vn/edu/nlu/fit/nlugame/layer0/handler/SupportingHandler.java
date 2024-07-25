package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.SupportingService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class SupportingHandler implements Subscriber{
    SupportingService supportingService = SupportingService.me();
    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQSUPPORTFIND:
                    supportingService.handleReqSupportFind(session, packet.getReqSupportFind());
                    break;
                case REQSTOPSUPPORTFIND:
                    supportingService.handleReqStopSupportFind(session, packet.getReqStopSupportFind());
                    break;
                case REQLOADSUPPORTFRIENDS:
                    supportingService.handleReqLoadSupportFriends(session);
                    break;
                case REQINVITESUPPORT:
                    supportingService.handleReqInviteSupport(session, packet.getReqInviteSupport());
                    break;
                case REQACCEPTINVITESUPPORT:
                    supportingService.handleReqAcceptInviteSupport(session, packet.getReqAcceptInviteSupport());
                    break;
                case REQREJECTINVITESUPPORT:
                    supportingService.handleReqRejectInviteSupport(session, packet.getReqRejectInviteSupport());
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
