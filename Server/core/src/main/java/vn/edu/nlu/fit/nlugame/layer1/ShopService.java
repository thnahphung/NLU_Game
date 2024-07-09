package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.NoGrowthItemDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.ShopItemDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.WarehouseDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.NoGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ShopItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.WarehouseItemBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

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
                    .setType(shopItem.getType())
                    .setStatus(shopItem.getStatus())
                    .setNoGrowthItemId(shopItem.getNoGrowthItemId())
                    .setNoGrowthItem(noGrowthItemProto);
            resLoadShop.addShopItems(shopItemBuilder);
        });
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadShop(resLoadShop).build());
    }

    public void buyItemShop(Session session, Proto.ReqBuyItemShop reqBuyItemShop) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        ShopItemBean shopItemBean = ShopItemDAO.getShopItemById(reqBuyItemShop.getShopItemId());
        WarehouseItemBean warehouseItem = WarehouseDAO.getWarehouseItemUser(userId, shopItemBean.getNoGrowthItemId());

        int code;
        if (warehouseItem == null) {
            code = WarehouseDAO.insertWarehouseItem(userId, shopItemBean.getNoGrowthItemId(), reqBuyItemShop.getQuantity());
            return;
        } else {
            code = WarehouseDAO.updateIncreaseQuantityItem(userId, shopItemBean.getNoGrowthItemId(), reqBuyItemShop.getQuantity());
        }
        Proto.ResBuyItemShop resBuyItemShop;
        if (code == 200) {
            resBuyItemShop = buyItemSuccess(userId, shopItemBean, reqBuyItemShop.getQuantity());
        } else {
            resBuyItemShop = Proto.ResBuyItemShop.newBuilder().setStatus(code).build();
        }
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBuyItemShop(resBuyItemShop).build());
    }

    public Proto.ResBuyItemShop buyItemSuccess(int userId, ShopItemBean shopItemBean, int quantity) {
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        NoGrowthItemBean noGrowthItem = NoGrowthItemDAO.getNoGrowthItemById(shopItemBean.getNoGrowthItemId());
        //update user gold
        long newCoin = userContext.getUser().getGold() - noGrowthItem.getPrice() * quantity;
        UserDAO.updateGold(userId, newCoin);
        Proto.User newUserContext = userContext.getUser().toBuilder().setGold(newCoin).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userId), userContext);

        WarehouseItemBean warehouseItemBean = WarehouseDAO.getWarehouseItemUser(userId, shopItemBean.getNoGrowthItemId());
        //todo: sua thanh cache
        Proto.WarehouseItem warehouseItemProto = Proto.WarehouseItem.newBuilder()
                .setUserId(warehouseItemBean.getUserId())
                .setQuantity(warehouseItemBean.getQuantity())
                .setNoGrowthItemId(warehouseItemBean.getNoGrowthItemId())
                .setNoGrowthItem(Proto.NoGrowthItem.newBuilder()
                        //todo: sua lai lay tu trong cache va day du thong tin khong chi co moi ten va id
                        .setId(warehouseItemBean.getNoGrowthItemId())
                        .setName(NoGrowthItemDAO.getNoGrowthItemById(warehouseItemBean.getNoGrowthItemId()).getName())
                        .build()).build();
        return Proto.ResBuyItemShop.newBuilder().setStatus(200).setWarehouseItem(warehouseItemProto).setGold((int) newCoin).build();
    }

}
