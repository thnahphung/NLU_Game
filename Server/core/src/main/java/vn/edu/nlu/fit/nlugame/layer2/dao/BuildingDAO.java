package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.CommonBuildingCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.CommonBuildingContext;

import java.util.ArrayList;
import java.util.List;

public class BuildingDAO extends BaseDAO {
    private static final String TABLE_COMMON_NAME = "common_buildings";
    private static final String TABLE_PROPERTY_NAME = "property_buildings";
    public static void insertBuildingInArea(int areaId, ABuilding building){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("insert into " + TABLE_PROPERTY_NAME + " (area_id, common_building_id, position_x, position_y, current_level) values (:areaId, :buildingId, :positionX, :positionY, :currentLevel)")
                .bind("areaId", areaId)
                .bind("buildingId", building.getId())
                .bind("positionX", building.getPositionX())
                .bind("positionY", building.getPositionY())
                .bind("currentLevel", 1)
                .execute());
    }

    public static ABuilding insertBuildingInArea(ABuilding building){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        int idInsert = jdbi.withHandle(handle -> handle.createUpdate("insert into " + TABLE_PROPERTY_NAME + " (area_id, common_building_id, position_x, position_y, current_level) values (:areaId, :buildingId, :positionX, :positionY, :currentLevel)")
                .bind("areaId", building.getAreaId())
                .bind("buildingId", building.getId())
                .bind("positionX", building.getPositionX())
                .bind("positionY", building.getPositionY())
                .bind("currentLevel", 1)
                .executeAndReturnGeneratedKeys("id")
                .mapTo(Integer.class)
                .findFirst().orElse(0));
        building.setId(idInsert);
        return building;
    }

    public static void insertBaseBuildingInArea(int area, Proto.FarmBuilding farmBuilding){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("insert into " + TABLE_PROPERTY_NAME + " (area_id, common_building_id, position_x, position_y, current_level) values (:areaId, :buildingId, :positionX, :positionY, :currentLevel)")
                .bind("areaId", farmBuilding.getPropertyBuilding().getAreaId())
                .bind("buildingId", farmBuilding.getPropertyBuilding().getCommonBuildingId())
                .bind("positionX", farmBuilding.getPropertyBuilding().getPositionX())
                .bind("positionY", farmBuilding.getPropertyBuilding().getPositionY())
                .bind("currentLevel", 1)
                .execute());
    }

    public static Proto.PlantingLandBuilding.Builder insertPlantingLandInArea(ABuilding building){
        Proto.BuildingBase base = null;
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        Proto.PlantingLandBuilding.Builder plantingLandBuilder = Proto.PlantingLandBuilding.newBuilder();
        int idInsert = jdbi.withHandle(handle -> handle.createUpdate("insert into " + TABLE_PROPERTY_NAME + " (area_id, common_building_id, position_x, position_y, current_level) values (:areaId, :buildingId, :positionX, :positionY, :currentLevel)")
                .bind("areaId", building.getAreaId())
                .bind("buildingId", building.getCommonBuildingId())
                .bind("positionX", building.getPositionX())
                .bind("positionY", building.getPositionY())
                .bind("currentLevel", 1)
                .executeAndReturnGeneratedKeys("id")
                .mapTo(Integer.class)
                .findFirst().orElse(0));
        base = CommonBuildingCache.me().get(String.valueOf(building.getCommonBuildingId()));
        if(base == null) base = BuildingDAO.getBaseBuildingById(building.getCommonBuildingId());
        plantingLandBuilder.setBase(Proto.BuildingBase.newBuilder().setId(base.getId()).setName(base.getName()).setType(base.getType()).setDescription(base.getDescription()).setMaxLevel(1).build());
        plantingLandBuilder.setPropertyBuilding(Proto.PropertyBuilding.newBuilder().setId(idInsert).setAreaId(building.getAreaId()).setCommonBuildingId(building.getCommonBuildingId()).setCurrentLevel(1).setPositionX(building.getPositionX()).setPositionY(building.getPositionY()).build());
        return plantingLandBuilder;
    }

    public static List<Proto.BuildingBase> getAllCommonBuilding(){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, name, type, max_level, description from " + TABLE_COMMON_NAME)
                .map((rs, ctx) -> Proto.BuildingBase.newBuilder()
                        .setId(rs.getInt("id"))
                        .setName(rs.getString("name"))
                        .setType(rs.getString("type"))
                        .setMaxLevel(rs.getInt("max_level"))
                        .setDescription(rs.getString("description"))
                        .build())
                .list());
    }
    public static CommonBuildingBean getCommonBuildingById(int id){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, name, type, max_level, description from from " + TABLE_COMMON_NAME + " where id = :id")
                .bind("id", id)
                .map((rs, ctx) -> new CommonBuildingBean(rs.getInt("id"), rs.getString("name"), rs.getString("description"), ConstUtils.TYPE_ITEM.valueOf(rs.getString("type")), rs.getInt("max_level")))
                .findFirst().orElse(null));
    }

    public static Proto.BuildingBase getBaseBuildingById(int id) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, name, type, max_level, description from " + TABLE_COMMON_NAME + " where id = :id")
                .bind("id", id)
                .map((rs, ctx) -> Proto.BuildingBase.newBuilder()
                        .setId(rs.getInt("id"))
                        .setName(rs.getString("name"))
                        .setType(rs.getString("type"))
                        .setMaxLevel(rs.getInt("max_level"))
                        .setDescription(rs.getString("description"))
                        .build())
                .findFirst().orElse(null));
    }

    public static List<Proto.PropertyBuilding> getAllPropertyBuildingByAreaId(int areaId){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, position_x, position_y, current_level, area_id, common_building_id from " + TABLE_PROPERTY_NAME + " where area_id = :areaId")
                .bind("areaId", areaId)
                .map((rs, ctx) -> Proto.PropertyBuilding.newBuilder()
                        .setId(rs.getInt("id"))
                        .setPositionX(rs.getInt("position_x"))
                        .setPositionY(rs.getInt("position_y"))
                        .setCurrentLevel(rs.getInt("current_level"))
                        .setAreaId(rs.getInt("area_id"))
                        .setCommonBuildingId(rs.getInt("common_building_id"))
                        .build()).list());
    }

    public static List<ABuilding> getAllPlantingLandByAreaId(int areaId){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        int plantingLandId = getIdBuildingByType(ConstUtils.TYPE_ITEM.PLANTING_LAND);
        if(plantingLandId == 0) {
            return new ArrayList<>();
        }
        List<PlantingLandBuildingBean> plantingLandBuildings = jdbi.withHandle(handle -> handle.createQuery("select id, position_x, position_y, current_level, area_id, common_building_id from " + TABLE_PROPERTY_NAME + " where area_id = :areaId and common_building_id = :commonBuildingId")
                .bind("areaId", areaId)
                .bind("commonBuildingId", plantingLandId)
                .map((rs, ctx) -> {
                    CommonBuildingBean buildingBase = getCommonBuildingById(rs.getInt("common_building_id"));
                    return new PlantingLandBuildingBean(rs.getInt("id"), buildingBase.getName(), buildingBase.getDescription(), buildingBase.getType(), buildingBase.getMaxLevel(), rs.getInt("upgrade_id"), rs.getInt("current_level"), rs.getInt("area_id"), rs.getInt("position_x"), rs.getInt("position_y"), rs.getInt("common_building_id"));
                })
                .list());
        return new ArrayList<>(plantingLandBuildings);
    }

    public static int getIdBuildingByName(String name){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        if(name == null || name.isEmpty()) return 0;
        return jdbi.withHandle(handle -> handle.createQuery("select id from " + TABLE_COMMON_NAME + " where name = :name")
                .bind("name", name)
                .mapTo(Integer.class)
                .findFirst().orElse(0));
    }
    public static int getIdBuildingByType(ConstUtils.TYPE_ITEM type){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id from " + TABLE_COMMON_NAME + " where type = :type")
                .bind("type", type.getValue())
                .mapTo(Integer.class)
                .findFirst().orElse(0));
    }
}
