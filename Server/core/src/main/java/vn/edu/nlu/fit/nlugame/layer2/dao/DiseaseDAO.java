package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.DiseaseBean;

import java.util.List;

public class DiseaseDAO extends BaseDAO {
    private static final String TABLE_NAME = "diseases";

    public static List<DiseaseBean> getAll() {
        return getJdbi().withHandle(handle -> handle.createQuery("select id, name, description, no_growth_item_id from " + TABLE_NAME)
                .mapToBean(DiseaseBean.class).list());
    }

    public static DiseaseBean getById(int id) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id, name, description, no_growth_item_id from " + TABLE_NAME + " where id = :id")
                .bind("id", id)
                .mapToBean(DiseaseBean.class)
                .findFirst()
                .orElse(null));
    }
}
