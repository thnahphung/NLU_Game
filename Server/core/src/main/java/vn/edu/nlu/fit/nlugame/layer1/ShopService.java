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

    public int buyItemShop(Session session, Proto.ReqBuyItemShop reqBuyItemShop) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return 0;
        UserContext userContext = UserCache.me().get(String.valueOf(userId));

        Proto.ShopItem shopItemProto = this.getShopItem(reqBuyItemShop.getShopItemId());
        Proto.NoGrowthItem noGrowthItem = this.getNoGrowthItem(shopItemProto.getNoGrowthItemId());
        WarehouseItemBean warehouseItem = WarehouseDAO.getWarehouseItemUser(userId, shopItemProto.getNoGrowthItemId());

        if (!isEnoughGold(userContext, noGrowthItem, reqBuyItemShop.getQuantity())) {
            Proto.ResBuyItemShop resBuyItemShop = Proto.ResBuyItemShop.newBuilder().setStatus(400).build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBuyItemShop(resBuyItemShop).build());
            return 0;
        }

        int code;
        if (warehouseItem == null) {
            code = WarehouseDAO.insertWarehouseItem(userId, shopItemProto.getNoGrowthItemId(), reqBuyItemShop.getQuantity());
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

        return reqBuyItemShop.getQuantity();
    }

    public boolean isEnoughGold(UserContext userContext, Proto.NoGrowthItem noGrowthItem, int quantity) {
        long newGold = userContext.getUser().getGold() - (long) noGrowthItem.getPrice() * quantity;
        return newGold >= 0;
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
                    .setDescription(noGrowthItemBean.getDescription())
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
    public void sellItemWarehouse(Session session, Proto.ReqSellItemWarehouse reqSellItemWarehouse) {
        int quantityItem = reqSellItemWarehouse.getQuantity();
        int noGrowthItemId = reqSellItemWarehouse.getWarehouseItem().getNoGrowthItemId();
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return;
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        WarehouseItemBean warehouseItemBean = WarehouseDAO.getWarehouseItemUser(userId, noGrowthItemId);
        if (warehouseItemBean == null || warehouseItemBean.getQuantity() < quantityItem) {
            Proto.ResSellItemWarehouse resSellItemWarehouse = Proto.ResSellItemWarehouse.newBuilder().setStatus(400).build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResSellItemWarehouse(resSellItemWarehouse).build());
            return;
        }
        Proto.NoGrowthItem noGrowthItem = this.getNoGrowthItem(noGrowthItemId);
        long newGold = userContext.getUser().getGold() + (long) noGrowthItem.getSalePrice() * quantityItem;
        UserDAO.updateGold(userId, newGold);
        Proto.User newUserContext = userContext.getUser().toBuilder().setGold(newGold).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);
        int updateQuantity = WarehouseDAO.updateReducedQuantityItem(userId, noGrowthItemId, quantityItem);
        if(updateQuantity == -1) {
            Proto.ResSellItemWarehouse resSellItemWarehouse = Proto.ResSellItemWarehouse.newBuilder().setStatus(400).build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResSellItemWarehouse(resSellItemWarehouse).build());
            return;
        }
        warehouseItemBean.setQuantity(warehouseItemBean.getQuantity() - quantityItem);
        Proto.WarehouseItem warehouseItemProto = Proto.WarehouseItem.newBuilder()
                .setUserId(warehouseItemBean.getUserId())
                .setQuantity(warehouseItemBean.getQuantity())
                .setNoGrowthItemId(warehouseItemBean.getNoGrowthItemId())
                .setNoGrowthItem(noGrowthItem).build();
        Proto.ResSellItemWarehouse resSellItemWarehouse = Proto.ResSellItemWarehouse.newBuilder().setStatus(200).setWarehouseItem(warehouseItemProto).setGold((int) newGold).build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResSellItemWarehouse(resSellItemWarehouse).build());
    }
}
