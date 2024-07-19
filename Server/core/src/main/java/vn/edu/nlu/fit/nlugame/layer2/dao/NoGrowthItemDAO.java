package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.NoGrowthItemBean;

import java.util.List;

public class NoGrowthItemDAO extends BaseDAO {
    private static final String TABLE_NAME = "no_growth_items";

    public static NoGrowthItemBean getNoGrowthItemById(int id) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle ->
                handle.createQuery("SELECT id, name, price, sale_price, experience_receive, type, description, status, create_date  " +
                                "FROM " + TABLE_NAME + " WHERE id = :id")
                        .bind("id", id)
                        .mapToBean(NoGrowthItemBean.class)
                        .findFirst()
                        .orElse(null));
    }

    public static NoGrowthItemBean getNoGrowthItemByName(String name) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle ->
                handle.createQuery("SELECT id, name, price, sale_price, experience_receive, type, description, status, create_date  " +
                                "FROM " + TABLE_NAME + " WHERE name = :name")
                        .bind("name", name)
                        .mapToBean(NoGrowthItemBean.class)
                        .findFirst()
                        .orElse(null));
    }

    public static List<NoGrowthItemBean> getAllNoGrowthItems() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle ->
                handle.createQuery("SELECT id, name, price, sale_price, experience_receive, type, description, status, create_date " +
                                "FROM " + TABLE_NAME)
                        .mapToBean(NoGrowthItemBean.class)
                        .list());
    }

    public static List<NoGrowthItemBean> getNoGrowthItemByType(String type) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle ->
                handle.createQuery("SELECT id, name, price, sale_price, experience_receive, type, description, status, create_date " +
                                "FROM " + TABLE_NAME + " WHERE type = :type")
                        .bind("type", type)
                        .mapToBean(NoGrowthItemBean.class)
                        .list());
    }

    public static void main(String[] args) {
        System.out.println(getNoGrowthItemByName("bulldozer"));
    }
}
