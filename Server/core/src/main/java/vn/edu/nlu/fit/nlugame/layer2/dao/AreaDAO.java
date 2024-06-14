package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ABuilding;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.AreaBean;

public class AreaDAO extends BaseDAO {
    private static final String TABLE_NAME = "areas";

    public static AreaBean loadAreaById(int id) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, user_id, type_area, status from " + TABLE_NAME + " where id = :id")
                .bind("id", id)
                .mapToBean(AreaBean.class).stream().findFirst().orElse(null));
    }

    public static AreaBean loadAreaByUserId(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, user_id, type_area, status from " + TABLE_NAME + " where user_id = :userId")
                .bind("userId", userId)
                .mapToBean(AreaBean.class).stream().findFirst().orElse(null));
    }

    public static AreaBean loadAreaCommon(String typeArea) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, user_id, type_area, status from " + TABLE_NAME + " where user_id = -1 and type_area = :typeArea")
                .bind("typeArea", typeArea)
                .mapToBean(AreaBean.class).stream().findFirst().orElse(null));
    }

}
