package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyAnimalBean;

import java.util.List;

public class PropertyAnimalDAO extends BaseDAO {
    private static final String TABLE_NAME = "property_animals";

    public static PropertyAnimalBean getById(int id) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id, is_pregnant, start_time_pregant, end_time_pregant,is_hungry, status, cage_id, property_growth_item_id from " + TABLE_NAME + " where id = :id")
                .bind("id", id)
                .mapToBean(PropertyAnimalBean.class).stream().findFirst().orElse(null));
    }

    public static List<PropertyAnimalBean> getByCageId(int cageId) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id, is_pregnant, start_time_pregant, end_time_pregant,is_hungry, status, cage_id, property_growth_item_id from " + TABLE_NAME + " where cage_id = :cageId")
                .bind("cageId", cageId)
                .mapToBean(PropertyAnimalBean.class).list());
    }

}
