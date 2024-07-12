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
            PropertyGrowthItemBean propertyGrowthItemBean = PropertyGrowthItemDAO.getPropertyGrowthItemById(propertyAnimalBean.getPropertyGrowthItemId());
            Proto.PropertyGrowthItem propertyGrowthItemProto = Proto.PropertyGrowthItem.newBuilder()
                    .setId(propertyGrowthItemBean.getId())
                    .setCurrentDiseaseId(propertyGrowthItemBean.getCurrentDiseaseId())
                    .setIsDisease(propertyGrowthItemBean.isDisease())
                    .setStartTimeDisease(propertyGrowthItemBean.getStartTimeDisease())
                    .setHealth(propertyGrowthItemBean.getHealth())
                    .setStage(propertyGrowthItemBean.getStage())
                    .setStartDate(propertyGrowthItemBean.getStartDate())
                    .setDevelopedDays(propertyGrowthItemBean.getDevelopedDays())
                    .setGrowthItemId(propertyGrowthItemBean.getGrowthItemId())
                    .setGrowthItemId(propertyGrowthItemBean.getGrowthItemId())
                    .build();
            Proto.CommonGrowthItem commonGrowthItemProto = CommonGrowthItemCache.me().get(String.valueOf(propertyGrowthItemBean.getGrowthItemId()));
            if (commonGrowthItemProto == null) {
                CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemById(propertyGrowthItemBean.getGrowthItemId());
                commonGrowthItemProto = Proto.CommonGrowthItem.newBuilder()
                        .setId(commonGrowthItemBean.getId())
                        .setName(commonGrowthItemBean.getName())
                        .setDescription(commonGrowthItemBean.getDescription())
                        .setType(commonGrowthItemBean.getType())
                        .setPrice(commonGrowthItemBean.getPrice())
                        .setSalePrice(commonGrowthItemBean.getSalePrice())
                        .setExperienceReceive(commonGrowthItemBean.getExperienceReceive())
                        .setWeatherRequire(commonGrowthItemBean.getWeatherRequire())
                        .setSeasonRequire(commonGrowthItemBean.getSeasonRequire())
                        .setTimePregant(commonGrowthItemBean.getTimePregant())
                        .setTimeGrowth(commonGrowthItemBean.getTimeGrowth())
                        .build();
                CommonGrowthItemCache.me().add(commonGrowthItemProto);
                CommonGrowthItemCache.me().addCommonGrowthItemToRedis(String.valueOf(commonGrowthItemProto.getId()), commonGrowthItemProto);
            }

            List<Proto.CommonRisingTime> commonRisingTimesProto = CommonRisingTimeCache.me().getCommonRisingTimesByItemId(commonGrowthItemProto.getId());
            if (commonRisingTimesProto == null || commonRisingTimesProto.isEmpty()) {
                List<CommonRisingTimeBean> commonRisingTimeBeans = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItemProto.getId());
                for (CommonRisingTimeBean commonRisingTimeBean : commonRisingTimeBeans) {
                    Proto.CommonRisingTime commonRisingTimeProto = Proto.CommonRisingTime.newBuilder()
                            .setId(commonRisingTimeBean.getId())
                            .setTime(commonRisingTimeBean.getTime())
                            .setStage(commonRisingTimeBean.getStage())
                            .setPrice(commonRisingTimeBean.getPrice())
                            .setGrowthItemId(commonRisingTimeBean.getGrowthItemId())
                            .build();
                    CommonRisingTimeCache.me().add(String.valueOf(commonRisingTimeProto.getId()), commonRisingTimeProto);
                    CommonRisingTimeCache.me().addCommonRisingTimeToRedis(commonRisingTimeProto);
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
                    .setPropertyGrowthItem(propertyGrowthItemProto)
                    .setCommonGrowthItem(commonGrowthItemProto)
                    .addAllCommonRisingTimes(commonRisingTimesProto)
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
