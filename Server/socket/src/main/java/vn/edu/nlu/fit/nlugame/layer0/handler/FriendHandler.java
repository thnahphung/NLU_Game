package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.FriendService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class FriendHandler implements Subscriber{
    private final FriendService friendService = FriendService.me();
    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQFINDFRIEND:
                    friendService.findFriend(session, packet.getReqFindFriend());
                    break;
                case REQADDFRIEND:
                    friendService.addFriend(session, packet.getReqAddFriend());
                    break;
                case REQLOADFRIEND:
                    friendService.loadFriendList(session, packet.getReqLoadFriend());
                    break;
                case REQACCEPTFRIEND:
                    friendService.acceptFriend(session, packet.getReqAcceptFriend());
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
