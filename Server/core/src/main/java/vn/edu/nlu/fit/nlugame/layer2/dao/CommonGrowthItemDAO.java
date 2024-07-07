package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.CommonRisingTimeCache;

import java.util.List;

public class CommonGrowthItemDAO extends BaseDAO {
    private static final String TABLE_COMMON_GROWTH_ITEM = "common_growth_items";
    private static final String TABLE_PROPERTY_GROWTH_ITEM = "property_growth_items";
    private static final String TABLE_PROPERTY_CROP = "property_crops";
    public static List<Proto.CommonGrowthItem> getListCommonGrowthItemByType(String type) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, name, description, type, price, sale_price, experience_receive, weather_require, season_require, time_pregant, time_growth FROM " + TABLE_COMMON_GROWTH_ITEM + " WHERE type = :type")
                .bind("type", type)
                .map((rs, ctx) -> Proto.CommonGrowthItem.newBuilder()
                        .setId(rs.getInt("id"))
                        .setName(rs.getString("name"))
                        .setDescription(rs.getString("description"))
                        .setType(rs.getString("type"))
                        .setPrice(rs.getInt("price"))
                        .setSalePrice(rs.getInt("sale_price"))
                        .setExperienceReceive(rs.getInt("experience_receive"))
                        .setWeatherRequire(rs.getString("weather_require"))
                        .setSeasonRequire(rs.getString("season_require"))
                        .setTimePregant(rs.getInt("time_pregant"))
                        .setTimeGrowth(rs.getInt("time_growth"))
                        .build()).list());
    }

    public static Proto.Crop sowSeed(Proto.TillLand tillLand, Proto.CommonGrowthItem commonGrowthItem, int startDate) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        Proto.Crop.Builder cropProto = Proto.Crop.newBuilder();
        Proto.PropertyGrowthItems.Builder propertyGrowthItems = Proto.PropertyGrowthItems.newBuilder();
        Proto.PropertyCrop.Builder propertyCrop = Proto.PropertyCrop.newBuilder();
        Proto.CommonRisingTimes.Builder commonRisingTimes = Proto.CommonRisingTimes.newBuilder();
        // insert table property_growth_items
           //TODO: set startDate
        int commonGrowthItemId = commonGrowthItem.getId();
        int propertyGrowItemId = jdbi.withHandle(handle -> handle.createUpdate("INSERT INTO " +TABLE_PROPERTY_GROWTH_ITEM +" (current_disease_id, disease_rate, is_disease, start_time_disease, health, stage, start_date, developed_days, growth_item_id) VALUES (:currentDiseaseId, :diseaseRate, :isDisease, :startTimeDisease, :health, :stage, :startDate, 0,:growthItemId)")
                .bind("currentDiseaseId", 0)
                .bind("diseaseRate", 0)
                .bind("isDisease", false)
                .bind("startTimeDisease", 0)
                .bind("health", 100)
                .bind("stage", 0)
                .bind("startDate", startDate)
                .bind("growthItemId", commonGrowthItemId)
                .executeAndReturnGeneratedKeys("id").mapTo(Integer.class).one());
        //insert table PropertyCrop
        int propertyCropId = jdbi.withHandle(handle -> handle.createUpdate("INSERT INTO " +TABLE_PROPERTY_CROP + " (harvest_yield, status_watered, status_fertilized, till_land_id, time_fertilized, fertilizer_id, property_growth_item_id) VALUES (:harvestYield, :statusWatered, :statusFertilized, :tillLandId, :timeFertilized, :fertilizerId, :propertyGrowthItemId)")
                .bind("harvestYield", 100)
                .bind("statusWatered", false)
                .bind("statusFertilized", false)
                .bind("tillLandId", tillLand.getId())
                .bind("timeFertilized", 0)
                .bind("fertilizerId", 0)
                .bind("propertyGrowthItemId", propertyGrowItemId)
                .executeAndReturnGeneratedKeys("id").mapTo(Integer.class).one());
        //set propertyGrowthItems
        propertyGrowthItems.setId(propertyGrowItemId);
        propertyGrowthItems.setCurrentDiseaseId(0);
        propertyGrowthItems.setDiseaseRate(0);
        propertyGrowthItems.setIsDisease(false);
        propertyGrowthItems.setStartTimeDisease(0);
        propertyGrowthItems.setHealth(100);
        propertyGrowthItems.setStage(0);
        propertyGrowthItems.setDevelopedDays(0);
        //TODO: set startDate vs fertilized
        propertyGrowthItems.setStartDate(startDate);

        //set propertyCrop
        propertyCrop.setId(propertyCropId);
        propertyCrop.setHarvestYield(100);
        propertyCrop.setStatusWatered(false);
        propertyCrop.setStatusFertilized(false);
        propertyCrop.setTillLandId(tillLand.getId());
        //TODO: set fertilized
        propertyCrop.setTimeFertilized(0);
        propertyCrop.setFertilizerId(0);
        propertyCrop.setPropertyGrowthItemId(propertyGrowItemId);
        //set list rising time
        List<Proto.CommonRisingTime> commonRisingTimesList = null;
            //get from local
        commonRisingTimesList = CommonRisingTimeCache.me().getCommonRisingTimesByItemId(commonGrowthItemId);
            //get from redis
        if(commonRisingTimesList == null || commonRisingTimesList.size() == 0){
            commonRisingTimesList = CommonRisingTimeCache.me().getCommonRisingTimesFromRedisByItemId(commonGrowthItemId);
        }
            //get from database
        if(commonRisingTimesList == null|| commonRisingTimesList.size() == 0) {
            commonRisingTimesList = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItemId);
            List<Proto.CommonRisingTime> finalCommonRisingTimesList = commonRisingTimesList;
            ThreadManage.me().execute(() -> finalCommonRisingTimesList.forEach(commonRisingTime -> CommonRisingTimeCache.me().add(commonRisingTime)));
        }
        commonRisingTimes.addAllCommonRisingTime(commonRisingTimesList);
        //set crop
        cropProto.setCommonGrowthItem(commonGrowthItem);
        cropProto.setPropertyGrowthItems(propertyGrowthItems);
        cropProto.setPropertyCrop(propertyCrop);
        cropProto.setTillLand(tillLand);
        cropProto.setCommonRisingTimes(commonRisingTimes);

        return cropProto.build();
    }

    public static Proto.PropertyCrop getPropertyCropsByTilledLandId(int tilledLandId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, harvest_yield, status_watered, status_fertilized, till_land_id, time_fertilized, fertilizer_id, property_growth_item_id FROM " + TABLE_PROPERTY_CROP + " WHERE till_land_id = :tillLandId")
                .bind("tillLandId", tilledLandId)
                .map((rs, ctx) -> Proto.PropertyCrop.newBuilder()
                        .setId(rs.getInt("id"))
                        .setHarvestYield(rs.getInt("harvest_yield"))
                        .setStatusWatered(rs.getBoolean("status_watered"))
                        .setStatusFertilized(rs.getBoolean("status_fertilized"))
                        .setTillLandId(rs.getInt("till_land_id"))
                        .setTimeFertilized(rs.getInt("time_fertilized"))
                        .setFertilizerId(rs.getInt("fertilizer_id"))
                        .setPropertyGrowthItemId(rs.getInt("property_growth_item_id"))
                        .build()).findOne().orElse(null));
    }
    public static Proto.CommonGrowthItem getCommonGrowthItemById(int commonGrowthItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, name, description, price, sale_price, experience_receive, weather_require, season_require, time_pregant, time_growth  FROM " + TABLE_COMMON_GROWTH_ITEM + " WHERE id = :id")
                .bind("id", commonGrowthItemId)
                .map((rs, ctx) -> Proto.CommonGrowthItem.newBuilder()
                        .setId(rs.getInt("id"))
                        .setName(rs.getString("name"))
                        .setDescription(rs.getString("description"))
                        .setType(rs.getString("type"))
                        .setPrice(rs.getInt("price"))
                        .setSalePrice(rs.getInt("sale_price"))
                        .setExperienceReceive(rs.getInt("experience_receive"))
                        .setWeatherRequire(rs.getString("weather_require"))
                        .setSeasonRequire(rs.getString("season_require"))
                        .setTimePregant(rs.getInt("time_pregant"))
                        .setTimeGrowth(rs.getInt("time_growth"))
                        .build()).findOne().orElse(null));
    }
    public static Proto.PropertyGrowthItems getPropertyGrowthItemById(int propertyGrowthItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, current_disease_id, disease_rate, is_disease, start_time_disease, health, stage, start_date, growth_item_id, developed_days FROM " + TABLE_PROPERTY_GROWTH_ITEM + " WHERE id = :id")
                .bind("id", propertyGrowthItemId)
                .map((rs, ctx) -> Proto.PropertyGrowthItems.newBuilder()
                        .setId(rs.getInt("id"))
                        .setCurrentDiseaseId(rs.getInt("current_disease_id"))
                        .setDiseaseRate(rs.getInt("disease_rate"))
                        .setIsDisease(rs.getBoolean("is_disease"))
                        .setStartTimeDisease(rs.getInt("start_time_disease"))
                        .setHealth(rs.getInt("health"))
                        .setStage(rs.getInt("stage"))
                        .setStartDate(rs.getInt("start_date"))
                        .setGrowthItemId(rs.getInt("growth_item_id"))
                        .setDevelopedDays(rs.getInt("developed_days"))
                        .build()).findOne().orElse(null));
    }

    public static void deleteHarvestedCrop(int propertyCropId, int propertyItemID) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("DELETE FROM " + TABLE_PROPERTY_CROP + " WHERE id = :id")
                .bind("id", propertyCropId)
                .execute());

        jdbi.useHandle(handle -> handle.createUpdate("DELETE FROM " + TABLE_PROPERTY_GROWTH_ITEM + " WHERE id = :id")
                .bind("id", propertyItemID)
                .execute());
    }

    public static void updateIncreateDevelopedDays() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("UPDATE property_growth_items set developed_days = developed_days + 1 WHERE is_disease = false")
                .execute());
    }
}
