package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UpgradeBean;

import java.util.List;

public class UpgradeDAO extends BaseDAO {
    private static final String TABLE_NAME = "upgrades";


    public static UpgradeBean getById(int id) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id,name, level, capacity, price, building_id from " + TABLE_NAME + " where id = :id")
                .bind("id", id)
                .mapToBean(UpgradeBean.class).stream().findFirst().orElse(null));
    }

    public static UpgradeBean getByBuildingIdAndLevel(int buildingId, int level) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id,name, level, capacity, price, building_id from " + TABLE_NAME + " where building_id = :buildingId and level = :level")
                .bind("buildingId", buildingId)
                .bind("level", level)
                .mapToBean(UpgradeBean.class).findFirst().orElse(null));
    }

}
