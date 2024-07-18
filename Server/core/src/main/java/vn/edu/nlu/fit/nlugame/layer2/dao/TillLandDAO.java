package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.jdbi.v3.core.statement.Update;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.TillLandBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;

public class TillLandDAO extends BaseDAO{
    private static final String TABLE_NAME = "till_lands";
    public static void insertTillLand(int plantingLandId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }

        StringBuilder queryBuilder = new StringBuilder("INSERT INTO " + TABLE_NAME + " (`index`, status_tilled, planting_land_id) VALUES ");
        for (int i = 0; i < 20; i++) {
            queryBuilder.append("(:index").append(i).append(", :statusTilled, :plantingLandId)");
            if (i < 19) {
                queryBuilder.append(", ");
            }
        }

        String query = queryBuilder.toString();

        jdbi.useHandle(handle -> {
            Update update = handle.createUpdate(query);
            for (int i = 0; i < 20; i++) {
                update.bind("index" + i, i);
            }
            update.bind("statusTilled", 0);
            update.bind("plantingLandId", plantingLandId);
            update.execute();
        });
    }

    public static List<TillLandBean> getListTillLandByPlantingLandId(int plantingLandID) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, `index`, status_tilled, planting_land_id FROM " + TABLE_NAME + " WHERE planting_land_id = :plantingLandId")
                .bind("plantingLandId", plantingLandID)
                .mapToBean(TillLandBean.class).list());
    }

    public static void updateTillLand(int id, boolean statusTilled) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> {
            handle.createUpdate("update " + TABLE_NAME + " set status_tilled = :statusTilled where id = :id")
                    .bind("statusTilled", statusTilled ? 1 : 0)
                    .bind("id", id)
                    .execute();
        });
    }

    public static void updateTillLands(List<TillLandBean> landBeans) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> {
            PreparedBatch batch = handle.prepareBatch(
                    "UPDATE " + TABLE_NAME + " SET status_tilled = :statusTilled WHERE id = :id");
            for (TillLandBean bean : landBeans) {
                batch.bind("statusTilled", bean.isStatusTilled() ? 1 : 0)
                        .bind("id", bean.getId())
                        .add();
            }
            batch.execute();
        });
    }
    public static void main(String[] args) {
        TillLandDAO.insertTillLand(42);
//        for(Proto.TillLand tillLand : TillLandDAO.getListTillLandByPlantingLandId(1)) {
//            System.out.println(tillLand.getId());
//            System.out.println(tillLand.getIndex());
//            System.out.println(tillLand.getStatusTilled());
//            System.out.println(tillLand.getPlantingLandId());
//            System.out.println();
//        }
    }
}
