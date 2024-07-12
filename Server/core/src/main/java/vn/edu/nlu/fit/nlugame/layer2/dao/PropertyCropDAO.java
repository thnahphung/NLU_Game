package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.BaseDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyCropBean;

public class PropertyCropDAO extends BaseDAO {
    private static final String TABLE_PROPERTY_CROP = "property_crops";

    public static int insertPropertyCrop(int tillLandId, int propertyGrowItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createUpdate("INSERT INTO " +TABLE_PROPERTY_CROP + " (harvest_yield, status_watered, status_fertilized, till_land_id, time_fertilized, fertilizer_id, property_growth_item_id) VALUES (:harvestYield, :statusWatered, :statusFertilized, :tillLandId, :timeFertilized, :fertilizerId, :propertyGrowthItemId)")
                .bind("harvestYield", 100)
                .bind("statusWatered", false)
                .bind("statusFertilized", false)
                .bind("tillLandId", tillLandId)
                .bind("timeFertilized", 0)
                .bind("fertilizerId", 0)
                .bind("propertyGrowthItemId", propertyGrowItemId)
                .executeAndReturnGeneratedKeys("id").mapTo(Integer.class).one());
    }

    public static void deletePropertyCrop(int propertyCropId){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("DELETE FROM " + TABLE_PROPERTY_CROP + " WHERE id = :id")
                .bind("id", propertyCropId)
                .execute());
    }

    public static PropertyCropBean getPropertyCropsByTilledLandId(int tilledLandId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, harvest_yield, status_watered, status_fertilized, till_land_id, time_fertilized, fertilizer_id, property_growth_item_id FROM " + TABLE_PROPERTY_CROP + " WHERE till_land_id = :tillLandId")
                .bind("tillLandId", tilledLandId)
                .mapToBean(PropertyCropBean.class).findOne().orElse(null));
    }
}
