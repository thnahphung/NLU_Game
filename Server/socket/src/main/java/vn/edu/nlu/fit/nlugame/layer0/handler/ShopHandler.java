package vn.edu.nlu.fit.nlugame.layer0.handler;

import jakarta.websocket.CloseReason;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer1.ShopService;
import vn.edu.nlu.fit.nlugame.layer1.TaskService;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class ShopHandler implements Subscriber {
    ShopService shopService = ShopService.me();
    TaskService taskService = TaskService.me();

    @Override
    public void onOpen(Session session, String... params) {

    }

    @Override
    public void onMessage(Session session, Proto.PacketWrapper packetWrapper) {
        packetWrapper.getPacketList().forEach(packet -> {
            switch (packet.getDataCase()) {
                case REQLOADSHOP:
                    shopService.loadShop(session, packet.getReqLoadShop());
                    break;
                case REQBUYITEMSHOP:
                    buyItemShop(session, packet.getReqBuyItemShop());
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

    private void buyItemShop(Session session, Proto.ReqBuyItemShop reqBuyItemShop) {
       int quantityItem = shopService.buyItemShop(session, reqBuyItemShop);
       taskService.checkBuyItemTask(session, quantityItem);
    }
}
