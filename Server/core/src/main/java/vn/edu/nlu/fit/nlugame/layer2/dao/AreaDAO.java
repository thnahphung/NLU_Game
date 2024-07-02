package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ABuilding;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.AreaBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

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
    public static Proto.Area loadAreaProtoByUserId(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, user_id, type_area, status from " + TABLE_NAME + " where user_id = :userId")
                .bind("userId", userId)
                .map((rs, ctx) -> Proto.Area.newBuilder()
                        .setAreaId(rs.getInt("id"))
                        .setUserId(rs.getInt("user_id"))
                        .setTypeArea(rs.getString("type_area"))
                        .setStatus(rs.getInt("status"))
                        .build())
                .stream().findFirst().orElse(null));
    }

    public static int insertArea(int userId, String typeArea) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 500;
        }
        try {
            Integer result = jdbi.withHandle(h -> h.createUpdate(
                            "insert into " + TABLE_NAME + " (user_id, type_area, status) " +
                                    "values (:user_id, :type_area, 1)")
                    .bind("user_id", userId)
                    .bind("type_area", typeArea)
                    .execute());
            return result == 1 ? 200 : 500;
        } catch (Exception e) {
            System.out.println("Error: Insert area failed: " + e);
            return 500;
        }
    }
}
