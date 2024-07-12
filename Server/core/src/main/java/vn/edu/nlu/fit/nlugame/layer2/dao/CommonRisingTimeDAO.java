package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CommonRisingTimeBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;

public class CommonRisingTimeDAO extends BaseDAO{
    private static final String TABLE_NAME = "common_rising_times";
    public static List<CommonRisingTimeBean> getCommonRisingTimesByItemId(int commonGrowthItemId) {
        return getJdbi().withHandle(handle -> handle.createQuery("SELECT id, time, stage, price, growth_item_id FROM " + TABLE_NAME + " WHERE growth_item_id = :growthItemId")
                .bind("growthItemId", commonGrowthItemId)
                .mapToBean(CommonRisingTimeBean.class).list());
    }

    public static List<CommonRisingTimeBean> getAllCommonRisingTimes() {
        return getJdbi().withHandle(handle -> handle.createQuery("SELECT id, time, stage, price, growth_item_id FROM " + TABLE_NAME)
                .mapToBean(CommonRisingTimeBean.class).list());
    }
}
