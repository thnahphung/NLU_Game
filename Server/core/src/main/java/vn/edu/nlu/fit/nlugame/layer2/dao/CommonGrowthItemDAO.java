package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CommonGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyCropBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.CommonRisingTimeCache;

import java.util.List;

public class CommonGrowthItemDAO extends BaseDAO {
    private static final String TABLE_COMMON_GROWTH_ITEM = "common_growth_items";
    public static List<CommonGrowthItemBean> getListCommonGrowthItemByType(String type) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, name, description, type, price, sale_price, experience_receive, weather_require, season_require, time_pregant, time_growth FROM " + TABLE_COMMON_GROWTH_ITEM + " WHERE type = :type")
                .bind("type", type)
                .mapToBean(CommonGrowthItemBean.class).list());
    }
    public static CommonGrowthItemBean getCommonGrowthItemById(int commonGrowthItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, name, description, type, price, sale_price, experience_receive, weather_require, season_require, time_pregant, time_growth  FROM " + TABLE_COMMON_GROWTH_ITEM + " WHERE id = :id")
                .bind("id", commonGrowthItemId)
                .mapToBean(CommonGrowthItemBean.class).findOne().orElse(null));
    }
    public static CommonGrowthItemBean getCommonGrowthItemByName(String name) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, name, description, type, price, sale_price, experience_receive, weather_require, season_require, time_pregant, time_growth FROM " + TABLE_COMMON_GROWTH_ITEM + " WHERE name = :name")
                .bind("name", name)
                .mapToBean(CommonGrowthItemBean.class)
                .findOne().orElse(null));
    }
}
