package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.*;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.List;

public class AnimalHusbandService {
    private static final AnimalHusbandService instance = new AnimalHusbandService();

    private AnimalHusbandService() {
    }

    public static AnimalHusbandService me() {
        return instance;
    }

    public void buyCage(Session session, Proto.ReqBuyCage reqBuyCage) {

    }

    public void loadCages(Session session, Proto.ReqLoadCages reqLoadCages) {
        List<PropertyBuildingBean> propertyBuildingBeans = BuildingDAO.getPropertyBuildingByAreaId(reqLoadCages.getAreaId());
        List<Proto.Cage> cages = new ArrayList<>();

        for (PropertyBuildingBean propertyBuildingBean : propertyBuildingBeans) {
            Proto.BuildingBase commonBuildingBaseProto = getCommonBuildingById(propertyBuildingBean.getCommonBuildingId());
            UpgradeBean upgradeBean = UpgradeDAO.getById(propertyBuildingBean.getUpgradeId());
            Proto.Upgrade upgradeProto = Proto.Upgrade.newBuilder()
                    .setId(upgradeBean.getId())
                    .setName(upgradeBean.getName())
                    .setLevel(upgradeBean.getLevel())
                    .setCapacity(upgradeBean.getCapacity())
                    .setPrice(upgradeBean.getPrice())
                    .setBuildingId(upgradeBean.getBuildingId())
                    .build();
            Proto.PropertyBuilding propertyBuildingProto = Proto.PropertyBuilding.newBuilder()
                    .setId(propertyBuildingBean.getId())
                    .setPositionX(propertyBuildingBean.getPositionX())
                    .setPositionY(propertyBuildingBean.getPositionY())
                    .setUpgradeId(propertyBuildingBean.getUpgradeId())
                    .setAreaId(propertyBuildingBean.getAreaId())
                    .setCommonBuildingId(propertyBuildingBean.getCommonBuildingId())
                    .setCurrentLevel(propertyBuildingBean.getCurrentLevel())
                    .build();

            List<Proto.Animal> animalsProto = this.getListAnimalByCageId(propertyBuildingBean.getId());
            Proto.Cage cage = Proto.Cage.newBuilder()
                    .setBuildingBase(commonBuildingBaseProto)
                    .setUpgrade(upgradeProto)
                    .setPropertyBuilding(propertyBuildingProto)
                    .addAllAnimals(animalsProto)
                    .build();
            cages.add(cage);
        }
        Proto.ResLoadCages resLoadCages = Proto.ResLoadCages.newBuilder()
                .addAllCages(cages)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadCages(resLoadCages).build());

    }

    public List<Proto.Animal> getListAnimalByCageId(int cageId) {
        List<PropertyAnimalBean> propertyAnimalBeans = PropertyAnimalDAO.getByCageId(cageId);
        List<Proto.Animal> animalsProto = new ArrayList<>();
        for (PropertyAnimalBean propertyAnimalBean : propertyAnimalBeans) {
            Proto.PropertyGrowthItems propertyGrowthItemsBean = CommonGrowthItemDAO.getPropertyGrowthItemById(propertyAnimalBean.getPropertyGrowthItemId());
            Proto.CommonGrowthItem commonGrowthItemProto = CommonGrowthItemCache.me().get(String.valueOf(propertyGrowthItemsBean.getGrowthItemId()));
            if (commonGrowthItemProto == null) {
                commonGrowthItemProto = CommonGrowthItemDAO.getCommonGrowthItemById(propertyGrowthItemsBean.getGrowthItemId());
                CommonGrowthItemCache.me().add(commonGrowthItemProto);
                CommonGrowthItemCache.me().addCommonGrowthItemToRedis(String.valueOf(commonGrowthItemProto.getId()), commonGrowthItemProto);
            }

            List<Proto.CommonRisingTime> commonRisingTime = CommonRisingTimeCache.me().getCommonRisingTimesByItemId(commonGrowthItemProto.getId());
            if (commonRisingTime == null || commonRisingTime.isEmpty()) {
                commonRisingTime = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItemProto.getId());
                for (Proto.CommonRisingTime risingTime : commonRisingTime) {
                    CommonRisingTimeCache.me().add(String.valueOf(risingTime.getId()), risingTime);
                }
            }

            Proto.Animal animal = Proto.Animal.newBuilder()
                    .setId(propertyAnimalBean.getId())
                    .setIsPregnant(propertyAnimalBean.getIsPregnant())
                    .setStartTimePregnant(propertyAnimalBean.getStartTimePregnant())
                    .setEndTimePregnant(propertyAnimalBean.getEndTimePregnant())
                    .setIsHungry(propertyAnimalBean.getIsHungry())
                    .setStatus(propertyAnimalBean.getStatus())
                    .setCageId(propertyAnimalBean.getCageId())
                    .setPropertyGrowthItemsId(propertyAnimalBean.getPropertyGrowthItemId())
                    .setPropertyGrowthItems(propertyGrowthItemsBean)
                    .setCommonGrowthItem(commonGrowthItemProto)
                    .addAllCommonRisingTimes(commonRisingTime)
                    .build();
            animalsProto.add(animal);
        }
        return animalsProto;
    }

    public Proto.BuildingBase getCommonBuildingById(int commonBuildingId) {
        Proto.BuildingBase commonBuildingBaseProto = CommonBuildingCache.me().getCommonBuilding(commonBuildingId);
        if (commonBuildingBaseProto == null) {
            CommonBuildingBean commonBuildingBean = BuildingDAO.getCommonBuildingById(commonBuildingId);
            if (commonBuildingBean == null) {
                return null;
            }
            commonBuildingBaseProto = Proto.BuildingBase.newBuilder()
                    .setId(commonBuildingBean.getId())
                    .setName(commonBuildingBean.getName())
                    .setType(commonBuildingBean.getType().getValue())
                    .setDescription(commonBuildingBean.getDescription())
                    .setMaxLevel(commonBuildingBean.getMaxLevel())
                    .build();
        }
        return commonBuildingBaseProto;
    }

    public Proto.Area getAreaByUserId(int userId) {
        Proto.Area areaProto = AreaCache.me().getAreaByUserId(userId);
        if (areaProto == null) {
            AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
            if (areaBean == null) {
                return null;
            }
            areaProto = Proto.Area.newBuilder()
                    .setAreaId(areaBean.getId())
                    .setUserId(areaBean.getUserId())
                    .setTypeArea(areaBean.getTypeArea())
                    .setStatus(areaBean.getStatus())
                    .build();
            AreaCache.me().add(areaProto);
        }
        return areaProto;
    }

    public Proto.Area getAreaById(int id) {
        Proto.Area area = AreaCache.me().get(String.valueOf(id));
        if (area == null) {
            AreaBean areaBean = AreaDAO.loadAreaById(id);
            if (areaBean == null) {
                return null;
            }
            area = Proto.Area.newBuilder()
                    .setAreaId(areaBean.getId())
                    .setUserId(areaBean.getUserId())
                    .setTypeArea(areaBean.getTypeArea())
                    .setStatus(areaBean.getStatus())
                    .build();
            AreaCache.me().add(String.valueOf(id), area);
        }
        return area;
    }
}
