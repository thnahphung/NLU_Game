package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class PropertyGrowthItemDAO extends BaseDAO{
    private static final String TABLE_PROPERTY_GROWTH_ITEM = "property_growth_items";

    public static int insertPropertyGrowthItem(int startDate, int commonGrowthItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
       return jdbi.withHandle(handle -> handle.createUpdate("INSERT INTO " +TABLE_PROPERTY_GROWTH_ITEM + " (current_disease_id, disease_rate, is_disease, start_time_disease, health, stage, start_date, developed_days, growth_item_id) VALUES (:currentDiseaseId, :diseaseRate, :isDisease, :startTimeDisease, :health, :stage, :startDate, 0,:growthItemId)")
                    .bind("currentDiseaseId", 0)
                    .bind("diseaseRate", 0)
                    .bind("isDisease", false)
                    .bind("startTimeDisease", 0)
                    .bind("health", 100)
                    .bind("stage", 1)
                    .bind("startDate", startDate)
                    .bind("growthItemId", commonGrowthItemId)
                    .executeAndReturnGeneratedKeys("id").mapTo(Integer.class).one());
    }

    public static void deletePropertyGrowthItem(int propertyGrowthItemId){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("DELETE FROM " + TABLE_PROPERTY_GROWTH_ITEM + " WHERE id = :id")
                .bind("id", propertyGrowthItemId)
                .execute());
    }

    public static void updateIncreateDevelopedDays() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("UPDATE " + TABLE_PROPERTY_GROWTH_ITEM + " set developed_days = developed_days + 1 WHERE is_disease = false")
                .execute());
    }

    public static PropertyGrowthItemBean getPropertyGrowthItemById(int propertyGrowthItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, current_disease_id, disease_rate, is_disease, start_time_disease, health, stage, start_date, growth_item_id, developed_days FROM " + TABLE_PROPERTY_GROWTH_ITEM + " WHERE id = :id")
                .bind("id", propertyGrowthItemId)
                .mapToBean(PropertyGrowthItemBean.class).findOne().orElse(null));
    }
}
