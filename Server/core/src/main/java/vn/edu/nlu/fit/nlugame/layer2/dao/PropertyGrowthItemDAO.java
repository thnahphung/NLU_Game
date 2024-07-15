package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.BeanMapper;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyGrowthItemBean;

import java.util.Map;
import java.util.stream.Collectors;

public class PropertyGrowthItemDAO extends BaseDAO {
    private static final String TABLE_PROPERTY_GROWTH_ITEM = "property_growth_items";

    public static int insertPropertyGrowthItem(int startDate, int commonGrowthItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createUpdate("INSERT INTO " + TABLE_PROPERTY_GROWTH_ITEM + " (current_disease_id, disease_rate, is_disease, start_time_disease, health, stage, start_date, developed_days, growth_item_id) VALUES (:currentDiseaseId, :diseaseRate, :isDisease, :startTimeDisease, :health, :stage, :startDate, 0,:growthItemId)")
                .bind("currentDiseaseId", 0)
                .bind("diseaseRate", 0)
                .bind("isDisease", 0)
                .bind("startTimeDisease", 0)
                .bind("health", 100)
                .bind("stage", 1)
                .bind("startDate", startDate)
                .bind("growthItemId", commonGrowthItemId)
                .executeAndReturnGeneratedKeys("id").mapTo(Integer.class).one());
    }

    public static void deletePropertyGrowthItem(int propertyGrowthItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("DELETE FROM " + TABLE_PROPERTY_GROWTH_ITEM + " WHERE id = :id")
                .bind("id", propertyGrowthItemId)
                .execute());
    }

    public static void updateIncreateCropDevelopedDays() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("UPDATE property_growth_items pg JOIN common_growth_items cg ON pg.growth_item_id = cg.id \n" +
                        "SET pg.developed_days = pg.developed_days + 1 \n" +
                        "WHERE cg.type = 'CROP' AND pg.is_disease = 0")
                .execute());
    }

    public static void updateIncreateAnimalDevelopedDays() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("UPDATE " + TABLE_PROPERTY_GROWTH_ITEM + " pg\n" +
                        "JOIN property_animals pa ON pg.id = pa.property_growth_item_id\n" +
                        "SET pg.developed_days = pg.developed_days + 1\n" +
                        "WHERE pa.is_hungry = 0  AND pg.is_disease = 0")
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

    public static void updateDisease(int propertyGrowthItemId, int id, int startTimeDisease) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("UPDATE " + TABLE_PROPERTY_GROWTH_ITEM + " SET current_disease_id = :currentDiseaseId, is_disease = :isDisease, start_time_disease = :startTimeDisease WHERE id = :id")
                .bind("currentDiseaseId", id)
                .bind("isDisease", true)
                .bind("startTimeDisease", startTimeDisease)
                .bind("id", propertyGrowthItemId)
                .execute());
    }

    public static Map<Integer, PropertyGrowthItemBean> getPropertiesGrowthItemDisease(int startTimeDisease) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle ->
                handle.createQuery("SELECT id, current_disease_id, disease_rate, is_disease, start_time_disease, health, stage, start_date, growth_item_id, developed_days FROM " + TABLE_PROPERTY_GROWTH_ITEM + " WHERE is_disease = 1 and start_time_disease = :startTimeDisease")
                        .bind("startTimeDisease", startTimeDisease)
                        .registerRowMapper(BeanMapper.factory(PropertyGrowthItemBean.class))
                        .mapTo(PropertyGrowthItemBean.class)
                        .collect(Collectors.toMap(PropertyGrowthItemBean::getId, bean -> bean))
        );
    }
}
