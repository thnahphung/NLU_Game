package vn.edu.nlu.fit.nlugame.layer2;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.CommonBuildingCache;

import java.util.ArrayList;
import java.util.List;

public class MappingUtils {
    public static Proto.Building mapModelToProto(ABuilding building) {
        if(building == null) {
            return null;
        }

        Proto.Building.Builder buildingProto = Proto.Building.newBuilder();
        Proto.BuildingBase.Builder buildingBaseProto = Proto.BuildingBase.newBuilder();
        Proto.PropertyBuilding.Builder propertyBuildingProto = Proto.PropertyBuilding.newBuilder();
        buildingBaseProto.setId(building.getId());
        buildingBaseProto.setName(building.getName());
        buildingBaseProto.setDescription(building.getDescription());
        buildingBaseProto.setType(building.getType().getValue());
        buildingBaseProto.setMaxLevel(building.getMaxLevel());
        propertyBuildingProto.setId(building.getId());
        propertyBuildingProto.setAreaId(building.getAreaId());
        propertyBuildingProto.setUpgradeId(building.getUpgradeId());
        propertyBuildingProto.setPositionX(building.getPositionX());
        propertyBuildingProto.setPositionY(building.getPositionY());
        propertyBuildingProto.setCurrentLevel(building.getCurrentLevel());
        propertyBuildingProto.setCommonBuildingId(building.getCommonBuildingId());
        if(building.getType().equals(ConstUtils.TYPE_ITEM.PLANTING_LAND)) {
            Proto.PlantingLandBuilding.Builder plantingLandProto = Proto.PlantingLandBuilding.newBuilder();
            plantingLandProto.setBase(buildingBaseProto);
            plantingLandProto.setPropertyBuilding(propertyBuildingProto);
            buildingProto.setPlantingLandBuilding(plantingLandProto);
        }else {
            Proto.FarmBuilding.Builder farmBuildingProto = Proto.FarmBuilding.newBuilder();
            farmBuildingProto.setBase(buildingBaseProto);
            farmBuildingProto.setPropertyBuilding(propertyBuildingProto);
            buildingProto.setFarmBuilding(farmBuildingProto);
        }
        return buildingProto.build();
    }

    public static ABuilding mapBuilding(Proto.BuildingBase c, Proto.PropertyBuilding p) {
        if(c == null || p == null) return null;

        ABuilding building = null;
        if(c.getType().equals(ConstUtils.TYPE_ITEM.PLANTING_LAND)) {
            building =  new PlantingLandBuildingBean();
        }else {
            building = new FarmBuildingBean();
        }
        building.setId(p.getId());
        building.setName(c.getName());
        building.setDescription(c.getDescription());
        building.setType(ConstUtils.TYPE_ITEM.valueOf(c.getType()));
        building.setMaxLevel(c.getMaxLevel());
        building.setCurrentLevel(p.getCurrentLevel());
        building.setAreaId(p.getAreaId());
        building.setPositionX(p.getPositionX());
        building.setPositionY(p.getPositionY());
        return building;
    }
}
