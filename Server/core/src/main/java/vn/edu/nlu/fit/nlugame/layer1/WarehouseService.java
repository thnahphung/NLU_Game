package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.NoGrowthItemDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.WarehouseDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.NoGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.WarehouseItemBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;

import java.util.ArrayList;
import java.util.List;

public class WarehouseService {
    private static final WarehouseService instance = new WarehouseService();

    private WarehouseService() {
    }

    public static WarehouseService me() {
        return instance;
    }

    public void loadWarehouse(Session session) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }

        // Load warehouse items
        List<WarehouseItemBean> warehouseItemBeans = WarehouseDAO.getAllWarehouseItemUser(userId);

        List<Proto.WarehouseItem> warehouseItemProtos = new ArrayList<>();
        for (WarehouseItemBean warehouseItemBean : warehouseItemBeans) {
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(warehouseItemBean.getNoGrowthItemId());
            Proto.NoGrowthItem noGrowthItemProto = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                    .setStatus(noGrowthItemBean.getStatus())
                    .setType(noGrowthItemBean.getType())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();

            Proto.WarehouseItem warehouseItem = Proto.WarehouseItem.newBuilder()
                    .setUserId(warehouseItemBean.getUserId())
                    .setNoGrowthItemId(warehouseItemBean.getNoGrowthItemId())
                    .setNoGrowthItem(noGrowthItemProto)
                    .setQuantity(warehouseItemBean.getQuantity()
                    ).build();
            warehouseItemProtos.add(warehouseItem);
        }

        Proto.ResLoadItemsOfWarehouse resLoadItemsOfWarehouse = Proto.ResLoadItemsOfWarehouse.newBuilder()
                .addAllListWarehouseItem(warehouseItemProtos)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadItemsOfWarehouse(resLoadItemsOfWarehouse).build());
    }
}


