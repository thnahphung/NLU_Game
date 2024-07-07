package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.NoGrowthItemDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.ShopItemDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.NoGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ShopItemBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;

public class ShopService {
    private static final ShopService instance = new ShopService();

    private ShopService() {
    }

    public static ShopService me() {
        return instance;
    }

    public void loadShop(Session session, Proto.ReqLoadShop reqLoadShop) {
        List<ShopItemBean> shopItems = ShopItemDAO.getShopByType(reqLoadShop.getType());
        Proto.ResLoadShop.Builder resLoadShop = Proto.ResLoadShop.newBuilder();
        shopItems.forEach(shopItem -> {
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(shopItem.getNoGrowthItemId());
            Proto.NoGrowthItem noGrowthItemProto = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setType(noGrowthItemBean.getType())
                    .setStatus(noGrowthItemBean.getStatus())
                    .build();
            Proto.ShopItem.Builder shopItemBuilder = Proto.ShopItem.newBuilder()
                    .setId(shopItem.getId())
                    .setNoGrowthItemId(shopItem.getNoGrowthItemId())
                    .setType(shopItem.getType())
                    .setStatus(shopItem.getStatus())
                    .setNoGrowthItem(noGrowthItemProto);
            resLoadShop.addShopItems(shopItemBuilder);
        });
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadShop(resLoadShop).build());
    }
}
