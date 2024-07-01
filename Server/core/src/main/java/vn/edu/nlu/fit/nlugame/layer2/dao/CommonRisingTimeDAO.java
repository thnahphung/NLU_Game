package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;

public class CommonRisingTimeDAO extends BaseDAO{
    private static final String TABLE_NAME = "common_rising_times";
    public static List<Proto.CommonRisingTime> getCommonRisingTimesByItemId(int commonGrowthItemId) {
        System.out.println("getCommonRisingTimesByItemId from database:" + commonGrowthItemId);
        return getJdbi().withHandle(handle -> handle.createQuery("SELECT id, time, stage, price, growth_item_id FROM " + TABLE_NAME + " WHERE growth_item_id = :commonGrowthItemId")
                .bind("commonGrowthItemId", commonGrowthItemId)
                .map((rs, ctx) -> Proto.CommonRisingTime.newBuilder()
                        .setId(rs.getInt("id"))
                        .setTime(rs.getInt("time"))
                        .setStage(rs.getInt("stage"))
                        .setPrice(rs.getInt("price"))
                        .setGrowthItemId(rs.getInt("growth_item_id"))
                        .build())
                .list());
    }

    public static List<Proto.CommonRisingTime> getAllCommonRisingTimes() {
        return getJdbi().withHandle(handle -> handle.createQuery("SELECT id, time, stage, price, growth_item_id FROM " + TABLE_NAME)
                .map((rs, ctx) -> Proto.CommonRisingTime.newBuilder()
                        .setId(rs.getInt("id"))
                        .setTime(rs.getInt("time"))
                        .setStage(rs.getInt("stage"))
                        .setPrice(rs.getInt("price"))
                        .setGrowthItemId(rs.getInt("growth_item_id"))
                        .build())
                .list());
    }
}
