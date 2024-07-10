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
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.NoGrowthItemCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.ShopItemCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.ArrayList;
import java.util.List;

public class ShopService {
    private static final ShopService instance = new ShopService();

    private ShopService() {
    }

    public static ShopService me() {
        return instance;
    }

    public void loadShop(Session session, Proto.ReqLoadShop reqLoadShop) {
        List<Proto.ShopItem> shopItemsProto = this.getShopByType(reqLoadShop.getType());
        if (shopItemsProto == null || shopItemsProto.isEmpty()) return;
        for (int i = 0; i < shopItemsProto.size(); i++) {
            Proto.ShopItem shopItemProto = shopItemsProto.get(i);
            Proto.NoGrowthItem noGrowthItemProto = this.getNoGrowthItem(shopItemProto.getNoGrowthItemId());
            shopItemProto = shopItemProto.toBuilder().setNoGrowthItem(noGrowthItemProto).build();
            shopItemsProto.set(i, shopItemProto);
        }
        Proto.ResLoadShop resLoadShop = Proto.ResLoadShop.newBuilder().addAllShopItems(shopItemsProto).build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadShop(resLoadShop).build());
    }

    public void buyItemShop(Session session, Proto.ReqBuyItemShop reqBuyItemShop) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return;

        Proto.ShopItem shopItemProto = this.getShopItem(reqBuyItemShop.getShopItemId());
        WarehouseItemBean warehouseItem = WarehouseDAO.getWarehouseItemUser(userId, shopItemProto.getNoGrowthItemId());

        int code;
        if (warehouseItem == null) {
            code = WarehouseDAO.insertWarehouseItem(userId, shopItemProto.getNoGrowthItemId(), reqBuyItemShop.getQuantity());
            return;
        } else {
            code = WarehouseDAO.updateIncreaseQuantityItem(userId, shopItemProto.getNoGrowthItemId(), reqBuyItemShop.getQuantity());
        }
        Proto.ResBuyItemShop resBuyItemShop;
        if (code == 200) {
            resBuyItemShop = buyItemSuccess(userId, shopItemProto, reqBuyItemShop.getQuantity());
        } else {
            resBuyItemShop = Proto.ResBuyItemShop.newBuilder().setStatus(code).build();
        }
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBuyItemShop(resBuyItemShop).build());
    }

    public Proto.ResBuyItemShop buyItemSuccess(int userId, Proto.ShopItem shopItemProto, int quantity) {
        Proto.NoGrowthItem noGrowthItem = this.getNoGrowthItem(shopItemProto.getNoGrowthItemId());
        //update user gold
        long newGold = this.updateUserGoldBuyItem(userId, noGrowthItem, quantity);

        WarehouseItemBean warehouseItemBean = WarehouseDAO.getWarehouseItemUser(userId, shopItemProto.getNoGrowthItemId());
        Proto.WarehouseItem warehouseItemProto = Proto.WarehouseItem.newBuilder()
                .setUserId(warehouseItemBean.getUserId())
                .setQuantity(warehouseItemBean.getQuantity())
                .setNoGrowthItemId(warehouseItemBean.getNoGrowthItemId())
                .setNoGrowthItem(noGrowthItem).build();
        return Proto.ResBuyItemShop.newBuilder().setStatus(200).setWarehouseItem(warehouseItemProto).setGold((int) newGold).build();
    }

    public long updateUserGoldBuyItem(int userId, Proto.NoGrowthItem noGrowthItem, int quantity) {
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        long newGold = userContext.getUser().getGold() - (long) noGrowthItem.getPrice() * quantity;
        UserDAO.updateGold(userId, newGold);
        Proto.User newUserContext = userContext.getUser().toBuilder().setGold(newGold).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userId), userContext);
        return newGold;
    }

    public Proto.NoGrowthItem getNoGrowthItem(int noGrowthItemId) {
        //get no growth item cache
        Proto.NoGrowthItem noGrowthItemProto = NoGrowthItemCache.me().get(String.valueOf(noGrowthItemId));
        if (noGrowthItemProto == null) {
            //get no growth item db
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(noGrowthItemId);
            if (noGrowthItemBean == null) return null;

            noGrowthItemProto = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setType(noGrowthItemBean.getType())
                    .setStatus(noGrowthItemBean.getStatus())
                    .build();
            NoGrowthItemCache.me().add(noGrowthItemProto);
        }
        return noGrowthItemProto;
    }

    public Proto.ShopItem getShopItem(int shopItemId) {
        Proto.ShopItem shopItemProto = ShopItemCache.me().get(String.valueOf(shopItemId));
        if (shopItemProto == null) {
            //load shop item in db
            ShopItemBean shopItemBean = ShopItemDAO.getShopItemById(shopItemId);
            if (shopItemBean == null) return null;

            shopItemProto = Proto.ShopItem.newBuilder()
                    .setId(shopItemBean.getId())
                    .setType(shopItemBean.getType())
                    .setStatus(shopItemBean.getStatus())
                    .setNoGrowthItemId(shopItemBean.getNoGrowthItemId())
                    .build();
            ShopItemCache.me().add(shopItemProto);
        }

        return shopItemProto;
    }

    public List<Proto.ShopItem> getShopByType(int type) {
        List<Proto.ShopItem> shopItemsProto = ShopItemCache.me().getByType(type);
        if (shopItemsProto == null || shopItemsProto.isEmpty()) {
            shopItemsProto = new ArrayList<>();
            List<ShopItemBean> shopItemsBean = ShopItemDAO.getByType(type);
            for (ShopItemBean shopItemBean : shopItemsBean) {
                Proto.ShopItem shopItemProto = Proto.ShopItem.newBuilder()
                        .setId(shopItemBean.getId())
                        .setType(shopItemBean.getType())
                        .setStatus(shopItemBean.getStatus())
                        .setNoGrowthItemId(shopItemBean.getNoGrowthItemId())
                        .build();
                ShopItemCache.me().add(shopItemProto);
                shopItemsProto.add(shopItemProto);
            }
        }
        return shopItemsProto;
    }

}
