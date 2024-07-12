package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.WarehouseItemBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;

public class WarehouseDAO extends BaseDAO {
    private static final String TABLE_NAME = "warehouse_items";

    public static WarehouseItemBean getWarehouseItemUser(int userId, int itemId) {
        return getJdbi().withHandle(handle -> handle.createQuery("select user_id, no_growth_item_id, quantity from " + TABLE_NAME + " where user_id = :userId and no_growth_item_id = :itemId")
                .bind("userId", userId)
                .bind("itemId", itemId)
                .mapToBean(WarehouseItemBean.class)
                .stream().findFirst().orElse(null));
    }

    public static List<WarehouseItemBean> getAllWarehouseItemUser(int userId) {
        return getJdbi().withHandle(handle -> handle.createQuery("select user_id, no_growth_item_id, quantity from " + TABLE_NAME + " where user_id = :userId")
                .bind("userId", userId)
                .mapToBean(WarehouseItemBean.class)
                .list());
    }

    public static int insertWarehouseItem(int userId, int itemId, int quantity) {
        int count = getJdbi().withHandle(handle -> handle.createUpdate("insert into " + TABLE_NAME + "(user_id, no_growth_item_id, quantity) values (:userId, :itemId, :quantity)")
                .bind("userId", userId)
                .bind("itemId", itemId)
                .bind("quantity", quantity)
                .execute());
        if (count == 1) {
            return 200;
        }
        return 500;
    }

    public static Proto.WarehouseItem getWarehouseItem(int userId, int itemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return getJdbi().withHandle(h -> h.createQuery("select w.user_id, w.no_growth_item_id, w.quantity, i.`name`, i.price, i.sale_price, i.experience_receive, i.`status`, i.type, i.description from warehouse_items w join no_growth_items i on w.no_growth_item_id = i.id where w.user_id = :userId and w.no_growth_item_id = :itemId")
                .bind("userId", userId)
                .bind("itemId", itemId)
                .map((rs, ctx) -> {
                    Proto.NoGrowthItem.Builder noGrowthItem = Proto.NoGrowthItem.newBuilder();
                    noGrowthItem.setId(rs.getInt("no_growth_item_id"));
                    noGrowthItem.setName(rs.getString("name"));
                    noGrowthItem.setPrice(rs.getInt("price"));
                    noGrowthItem.setSalePrice(rs.getInt("sale_price"));
                    noGrowthItem.setExperienceReceive(rs.getInt("experience_receive"));
                    noGrowthItem.setStatus(rs.getInt("status"));
                    noGrowthItem.setType(rs.getString("type"));
                    noGrowthItem.setDescription(rs.getString("description"));

                    Proto.WarehouseItem.Builder builder = Proto.WarehouseItem.newBuilder();
                    builder.setUserId(rs.getInt("user_id"));
                    builder.setNoGrowthItem(noGrowthItem);
                    builder.setQuantity(rs.getInt("quantity"));
                    return builder.build();
                }).stream().findFirst().orElse(null));
    }

    public static WarehouseItemBean getWarehouseItemBean(int userId, int itemId) {
        return getJdbi().withHandle(handle -> handle.createQuery("select user_id, no_growth_item_id, quantity from " + TABLE_NAME + " where user_id = :userId and no_growth_item_id = :itemId")
                .bind("userId", userId)
                .bind("itemId", itemId)
                .mapToBean(WarehouseItemBean.class)
                .stream().findFirst().orElse(null));
    }

    public static List<Proto.WarehouseItem> getAllUserItemInWarehouse(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return getJdbi().withHandle(h -> h.createQuery("select w.user_id, w.no_growth_item_id, w.quantity, i.`name`, i.price, i.sale_price, i.experience_receive, i.`status`, i.type, i.description from warehouse_items w join no_growth_items i on w.no_growth_item_id = i.id where w.user_id = :userId")
                .bind("userId", userId)
                .map((rs, ctx) -> {
                    Proto.NoGrowthItem.Builder noGrowthItem = Proto.NoGrowthItem.newBuilder();
                    noGrowthItem.setId(rs.getInt("no_growth_item_id"));
                    noGrowthItem.setName(rs.getString("name"));
                    noGrowthItem.setPrice(rs.getInt("price"));
                    noGrowthItem.setSalePrice(rs.getInt("sale_price"));
                    noGrowthItem.setExperienceReceive(rs.getInt("experience_receive"));
                    noGrowthItem.setStatus(rs.getInt("status"));
                    noGrowthItem.setType(rs.getString("type"));
                    noGrowthItem.setDescription(rs.getString("description"));

                    Proto.WarehouseItem.Builder builder = Proto.WarehouseItem.newBuilder();
                    builder.setUserId(rs.getInt("user_id"));
                    builder.setNoGrowthItem(noGrowthItem);
                    builder.setQuantity(rs.getInt("quantity"));
                    return builder.build();
                }).list());
    }

    public static void updateReduceQuantityItem(int userId, int noGrowItemId, int quantityReduce) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        //check if quantity in database < quantityReduce then update quantity in database  = 0;
        jdbi.useHandle(handle -> {
            handle.createUpdate("update warehouse_items set quantity = case when quantity - :quantityReduce < 0 then 0 else quantity - :quantityReduce end where user_id = :userId and no_growth_item_id = :noGrowItemId")
                    .bind("quantityReduce", quantityReduce)
                    .bind("userId", userId)
                    .bind("noGrowItemId", noGrowItemId)
                    .execute();
        });
    }

    public static int updateIncreaseQuantityItem(int userId, int noGrowItemId, int quantityIncrease) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 402;
        }
        try {
            jdbi.useHandle(handle -> {
                handle.createUpdate("update warehouse_items set quantity = quantity + :quantityIncrease where user_id = :userId and no_growth_item_id = :noGrowItemId")
                        .bind("quantityIncrease", quantityIncrease)
                        .bind("userId", userId)
                        .bind("noGrowItemId", noGrowItemId)
                        .execute();
            });
        } catch (Exception e) {
            System.out.println("Error updateIncreaseQuantityItem: " + e.getMessage());
            return 500;
        }
        return 200;
    }

    public static int getNoGrowthItemId(String typeItem, String nameItem) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return getJdbi().withHandle(h -> h.createQuery("select id from no_growth_items where type = :typeItem and `name` = :nameItem")
                .bind("typeItem", typeItem)
                .bind("nameItem", nameItem)
                .mapTo(Integer.class)
                .stream().findFirst().orElse(null));
    }
}
