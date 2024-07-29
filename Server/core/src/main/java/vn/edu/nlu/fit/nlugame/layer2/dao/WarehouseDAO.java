package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.NoGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.WarehouseItemBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;
import java.util.Map;

public class WarehouseDAO extends BaseDAO {
    private static final String TABLE_NAME = "warehouse_items";

    public static WarehouseItemBean getWarehouseItemUser(int userId, int itemId) {
        return getJdbi().withHandle(handle -> handle.createQuery("select user_id, no_growth_item_id, quantity from " + TABLE_NAME + " where user_id = :userId and no_growth_item_id = :itemId")
                .bind("userId", userId)
                .bind("itemId", itemId)
                .mapToBean(WarehouseItemBean.class)
                .stream().findFirst().orElse(null));
    }

    public static WarehouseItemBean getWarehouseItemUserByNoGrowthItemName(int userId, String name) {
        return getJdbi().withHandle(handle -> handle.createQuery("select w.user_id, w.no_growth_item_id, w.quantity from " + TABLE_NAME + " w join no_growth_items i on w.no_growth_item_id = i.id where w.user_id = :userId and i.`name` = :name")
                .bind("userId", userId)
                .bind("name", name)
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

    public static int updateReducedQuantityItem(int userId, int noGrowItemId, int quantityReduce) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }

        return jdbi.withHandle(handle -> {
            Integer currentQuantity = handle.createQuery("select quantity from warehouse_items where user_id = :userId and no_growth_item_id = :noGrowItemId")
                    .bind("userId", userId)
                    .bind("noGrowItemId", noGrowItemId)
                    .mapTo(Integer.class)
                    .findOne()
                    .orElse(0);

            if (currentQuantity < quantityReduce) {
                return -1;
            }

            int newQuantity = currentQuantity - quantityReduce;

            handle.createUpdate("update warehouse_items set quantity = :newQuantity where user_id = :userId and no_growth_item_id = :noGrowItemId")
                    .bind("newQuantity", newQuantity)
                    .bind("userId", userId)
                    .bind("noGrowItemId", noGrowItemId)
                    .execute();

            return newQuantity;
        });
    }

    public static int updateReducedQuantityItems(int userId, Map<Integer, Integer> reduceQuantityMap) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 500;
        }
        try {
            jdbi.useHandle(handle -> {
                PreparedBatch batch = handle.prepareBatch("update warehouse_items set quantity = case when quantity - :quantityReduce < 0 then 0 else quantity - :quantityReduce end where user_id = :userId and no_growth_item_id = :noGrowItemId");
                for (Map.Entry<Integer, Integer> entry : reduceQuantityMap.entrySet()) {
                    batch.bind("quantityReduce", entry.getValue())
                            .bind("userId", userId)
                            .bind("noGrowItemId", entry.getKey())
                            .add();
                }
                batch.execute();
            });
        }catch (Exception e) {
            System.out.println("Error updateReducedQuantityItems: " + e.getMessage());
            return 500;
        }
        return 200;
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

    public static NoGrowthItemBean getNoGrowthItemByName(String name) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id, `name`, price, sale_price, experience_receive, `status`, type, description from no_growth_items where `name` = :name")
                .bind("name", name)
                .mapToBean(NoGrowthItemBean.class)
                .stream().findFirst().orElse(null));
    }
}
