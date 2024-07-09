package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ShopItemBean;

import java.util.List;

public class ShopItemDAO extends BaseDAO {

    private static final String TABLE_NAME = "shop_items";

    public static List<ShopItemBean> getShopByType(int type) {
        return getJdbi().withHandle(handle ->
                handle.createQuery("SELECT id, no_growth_item_id, type, status  " +
                                "FROM " + TABLE_NAME + " WHERE type = :type")
                        .bind("type", type)
                        .mapToBean(ShopItemBean.class)
                        .list());
    }

    public static ShopItemBean getShopItemById(int id) {
        return getJdbi().withHandle(handle ->
                handle.createQuery("SELECT id, no_growth_item_id, type, status  " +
                                "FROM " + TABLE_NAME + " WHERE id = :id")
                        .bind("id", id)
                        .mapToBean(ShopItemBean.class)
                        .stream().findFirst().orElse(null));
    }
}
