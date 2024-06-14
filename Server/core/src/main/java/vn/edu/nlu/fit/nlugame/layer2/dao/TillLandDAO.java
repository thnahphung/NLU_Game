package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.Update;
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
        for (int i = 0; i < 30; i++) {
            queryBuilder.append("(:index").append(i).append(", :statusTilled, :plantingLandId)");
            if (i < 29) {
                queryBuilder.append(", ");
            }
        }

        String query = queryBuilder.toString();

        jdbi.useHandle(handle -> {
            Update update = handle.createUpdate(query);
            for (int i = 0; i < 30; i++) {
                update.bind("index" + i, i);
            }
            update.bind("statusTilled", 0);
            update.bind("plantingLandId", plantingLandId);
            update.execute();
        });
    }

    public static List<Proto.TillLand> getListTillLandByPlantingLandId(int plantingLandID) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, `index`, status_tilled, planting_land_id from " + TABLE_NAME + " where planting_land_id = :plantingLandId")
                .bind("plantingLandId", plantingLandID)
                .map((rs, ctx) -> Proto.TillLand.newBuilder()
                        .setId(rs.getInt("id"))
                        .setIndex(rs.getInt("index"))
                        .setStatusTilled(rs.getInt("status_tilled") == 0 ? false : true)
                        .setPlantingLandId(rs.getInt("planting_land_id"))
                        .build())
                .list());
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
