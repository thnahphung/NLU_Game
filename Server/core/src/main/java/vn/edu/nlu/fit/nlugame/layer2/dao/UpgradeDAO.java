package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UpgradeBean;

public class UpgradeDAO extends  BaseDAO{
    private static final String TABLE_NAME = "upgrades";


    public static UpgradeBean getById(int id) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id,name, level, capacity, price, building_id from " + TABLE_NAME + " where id = :id")
                .bind("id", id)
                .mapToBean(UpgradeBean.class).stream().findFirst().orElse(null));
    }

}
