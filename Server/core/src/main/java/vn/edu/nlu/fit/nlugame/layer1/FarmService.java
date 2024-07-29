package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.PropertyCropDAO;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.*;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class FarmService {
    private static final FarmService instance = new FarmService();

    private FarmService() {
    }

    public static FarmService me() {
        return instance;
    }

    public void handleBuyBuilding(Session session, Proto.ReqBuyBuilding reqBuyBuilding) {
        String typeBuilding = reqBuyBuilding.getTypeBuilding();
        Proto.Building.Builder buildingResponse = Proto.Building.newBuilder();
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        //TODO: cache area
        AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        long userGold = userContext.getUser().getGold();
        if (areaBean == null) return;
        Proto.ResBuyBuilding.Builder resBuyBuilding = Proto.ResBuyBuilding.newBuilder();
        long newGold = 0;
        if (typeBuilding.equals("PLANTING_LAND")) {
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemByName("planting-land");
            Proto.NoGrowthItem noGrowthItem = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                    .setType(noGrowthItemBean.getType())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();

            int buildingPrice = noGrowthItemBean.getPrice();
            if(userGold < buildingPrice) {
                resBuyBuilding = Proto.ResBuyBuilding.newBuilder();
                resBuyBuilding.setStatus(400);
                resBuyBuilding.setUuid(reqBuyBuilding.getUuid());
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBuyBuilding(resBuyBuilding).build());
                return;
            }
            //insert planting land
            ABuilding plantingBuilidng = new PlantingLandBuildingBean();
            int idPlantingBuilding = CommonBuildingCache.me().getIdBuildingByType(ConstUtils.TYPE_ITEM.PLANTING_LAND);
            if (idPlantingBuilding == 0)
                idPlantingBuilding = BuildingDAO.getIdBuildingByType(ConstUtils.TYPE_ITEM.PLANTING_LAND);
            plantingBuilidng.setCommonBuildingId(idPlantingBuilding);
            plantingBuilidng.setAreaId(areaBean.getId());
            plantingBuilidng.setPositionX(reqBuyBuilding.getPositionX());
            plantingBuilidng.setPositionY(reqBuyBuilding.getPositionY());
            //set planting land response
            Proto.PlantingLandBuilding.Builder plantingLandBuilding = BuildingDAO.insertPlantingLandInArea(plantingBuilidng);
            //add building cache
            //redis
            PropertyBuildingCache.me().addPropertyBuilding(plantingLandBuilding.getPropertyBuilding());
            //local
            PropertyBuildingCache.me().add(plantingLandBuilding.getPropertyBuilding());
            //set till land
            TillLandDAO.insertTillLand(plantingLandBuilding.getPropertyBuilding().getId());
            List<TillLandBean> tillLandBeans = TillLandDAO.getListTillLandByPlantingLandId(plantingLandBuilding.getPropertyBuilding().getId());
            List<Proto.TillLand> tillLands = new ArrayList<>();
            tillLandBeans.forEach(tillLandBean -> {
                Proto.TillLand tillLand = Proto.TillLand.newBuilder()
                        .setId(tillLandBean.getId())
                        .setIndex(tillLandBean.getIndex())
                        .setStatusTilled(tillLandBean.isStatusTilled())
                        .setPlantingLandId(tillLandBean.getPlantingLandId())
                        .build();
                tillLands.add(tillLand);
            });
            plantingLandBuilding.addAllTillLands(tillLands);
            buildingResponse.setPlantingLandBuilding(plantingLandBuilding);
            newGold = this.updateUserGoldBuyItem(userContext, noGrowthItem, 1);
        }
        resBuyBuilding.setGold((int) newGold);
        resBuyBuilding.setUuid(reqBuyBuilding.getUuid());
        resBuyBuilding.setBuilding(buildingResponse);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBuyBuilding(resBuyBuilding).build());
    }
    public long updateUserGoldBuyItem(UserContext userContext, Proto.NoGrowthItem noGrowthItem, int quantity) {
        long newGold = userContext.getUser().getGold() - (long) noGrowthItem.getPrice() * quantity;
        UserDAO.updateGold(userContext.getUser().getUserId(), newGold);
        Proto.User newUserContext = userContext.getUser().toBuilder().setGold(newGold).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);
        return newGold;
    }
    public void handleTilledLand(Session session, Proto.ReqTilledLand reqTilledLand) {
        Proto.ResTillLand.Builder resTillLand = Proto.ResTillLand.newBuilder();
        List<Proto.TillLand> tillLandList = reqTilledLand.getTillLandsList();
        int areaId = reqTilledLand.getAreaId();
        int userTillId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userTillContext = UserCache.me().get(String.valueOf(userTillId));
        String code = userTillContext.getUser().getCharacter().getCode();
        if (userTillId == -1) return;
        int areaUserTillId = this.getAreaByUserId(userTillId).getAreaId();
        int quantity = tillLandList.size();
        if (areaId != areaUserTillId && code.equals("KSCK")) {
            // Response reward
            Proto.Reward.Builder rewardExp = Proto.Reward.newBuilder();
            rewardExp.setName(ConstUtils.REWARDS.EXPERIENCE.getValue());
            rewardExp.setQuantity(quantity);

            Proto.Reward.Builder rewardGold = Proto.Reward.newBuilder();
            rewardGold.setName(ConstUtils.REWARDS.GOLD.getValue());
            rewardGold.setQuantity(quantity);
            resTillLand.addRewards(rewardExp);
            resTillLand.addRewards(rewardGold);
            // Update experience points and gold
            int exp = userTillContext.getUser().getExperiencePoints();
            int newEpx = exp + quantity;
            long gold = userTillContext.getUser().getGold();
            long newGold = gold + quantity;
            UserDAO.updateUserExpAndGold(userTillId, newEpx, (int) newGold);
            Proto.User newUserContext = userTillContext.getUser().toBuilder().setExperiencePoints(newEpx).setGold(newGold).build();
            userTillContext.setUser(newUserContext);
            UserCache.me().add(String.valueOf(userTillId), userTillContext);
            resTillLand.setGold((int) newGold);
            resTillLand.setExp(newEpx);
            resTillLand.setSupportUserId(userTillId);
            resTillLand.setSupportUserId(userTillId);
        }else{
            int mainUserID = this.getAreaById(areaId).getUserId();
            resTillLand.setMainUserId(mainUserID);
        }
        if (reqTilledLand.getTillLandsList() == null || reqTilledLand.getTillLandsList() == null || reqTilledLand.getTillLandsList().size() == 0)
            return;
        updateStatusTilledLands(tillLandList);

        resTillLand.addAllTillLands(tillLandList);
        resTillLand.setAreaId(reqTilledLand.getAreaId());
        resTillLand.setMainUserId(reqTilledLand.getMainUserId());
        // Response harvest with multi player game
        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(reqTilledLand.getAreaId()));
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResTillLand(resTillLand).build());
    }

    private void updateStatusTilledLands(List<Proto.TillLand> tillLandList) {
        List<TillLandBean> tillLandBeans = new ArrayList<>();
        tillLandList.forEach(tillLand -> {
            TillLandBean tillLandBean = new TillLandBean();
            tillLandBean.setId(tillLand.getId());
            tillLandBean.setStatusTilled(true);
            tillLandBeans.add(tillLandBean);
        });
        TillLandDAO.updateTillLands(tillLandBeans);
    }

    public void handleLoadCommonCrops(Session session) {
        Proto.ResLoadCommonCrops.Builder resLoadCommonCrops = Proto.ResLoadCommonCrops.newBuilder();
        List<Proto.CommonGrowthItem> commonGrowthItems = null;
        commonGrowthItems = CommonGrowthItemCache.me().getCommonGrowthItemsByType(ConstUtils.TYPE_ITEM.CROP.getValue());
        if (commonGrowthItems == null || commonGrowthItems.isEmpty()) {
            List<CommonGrowthItemBean> commonGrowthItemBeams = CommonGrowthItemDAO.getListCommonGrowthItemByType(ConstUtils.TYPE_ITEM.CROP.getValue());
            for (CommonGrowthItemBean commonGrowthItemBean : commonGrowthItemBeams) {
                Proto.CommonGrowthItem commonGrowthItem = Proto.CommonGrowthItem.newBuilder()
                        .setId(commonGrowthItemBean.getId())
                        .setName(commonGrowthItemBean.getName())
                        .setExperienceReceive(commonGrowthItemBean.getExperienceReceive())
                        .setPrice(commonGrowthItemBean.getPrice())
                        .setType(commonGrowthItemBean.getType())
                        .setSalePrice(commonGrowthItemBean.getSalePrice())
                        .setDescription(commonGrowthItemBean.getDescription())
                        .setWeatherRequire(commonGrowthItemBean.getWeatherRequire())
                        .setSeasonRequire(commonGrowthItemBean.getSeasonRequire())
                        .setTimeGrowth(commonGrowthItemBean.getTimeGrowth())
                        .setTimeGrowth(commonGrowthItemBean.getTimeGrowth())
                        .build();
                commonGrowthItems.add(commonGrowthItem);
            }
            List<Proto.CommonGrowthItem> finalCommonGrowthItems = commonGrowthItems;
            ThreadManage.me().execute(() -> {
                finalCommonGrowthItems.forEach(commonGrowthItem -> {
                    CommonGrowthItemCache.me().add(commonGrowthItem);
                    CommonGrowthItemCache.me().addCommonGrowthItemToRedis(String.valueOf(commonGrowthItem.getId()), commonGrowthItem);
                });
            });
        }
        resLoadCommonCrops.addAllCommonGrowthItem(commonGrowthItems);
        Proto.Packet packet = Proto.Packet.newBuilder().setResLoadCommonCrops(resLoadCommonCrops).build();
        DataSenderUtils.sendResponse(session, packet);
    }

    public Proto.Crops handleSow(Session session, Proto.ReqSow reqSow) {
        // Get game state
        Proto.GameState gameState = reqSow.getGameState();
        int timesOfDay = gameState.getTimesOfDay();
        int currentDate = gameState.getCurrentDate();
        int currentSeason = gameState.getCurrentSeason();
        // Save crop database
        int quantityCrops = reqSow.getSowingInformationList().size();
        if (quantityCrops == 0) return null;
        Proto.Crops.Builder crops = Proto.Crops.newBuilder();
        Proto.NoGrowthItem noGrowthItem = reqSow.getSowingInformationList().get(0).getNoGrowthItem();
        // Get common growth item
        String nameCommonGrowthItem = getNameCrop(noGrowthItem.getName());
        Proto.CommonGrowthItem commonGrowthItem = CommonGrowthItemCache.me().getCommonGrowthItemByName(nameCommonGrowthItem);
        if (commonGrowthItem == null)
            commonGrowthItem = CommonGrowthItemCache.me().getCommonGrowthItemByNameFromRedis(nameCommonGrowthItem);
        if (commonGrowthItem == null) {
            CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemByName(nameCommonGrowthItem);
            if (commonGrowthItemBean == null) return null;
            commonGrowthItem = Proto.CommonGrowthItem.newBuilder()
                    .setId(commonGrowthItemBean.getId())
                    .setName(commonGrowthItemBean.getName())
                    .setExperienceReceive(commonGrowthItemBean.getExperienceReceive())
                    .setPrice(commonGrowthItemBean.getPrice())
                    .setType(commonGrowthItemBean.getType())
                    .build();
        }

        Proto.CommonGrowthItem finalCommonGrowthItem = commonGrowthItem;
        reqSow.getSowingInformationList().forEach(sowingInformation -> {
            Proto.TillLand tillLand = sowingInformation.getTillLand();
            Proto.Crop cropProto = handleSow(tillLand, finalCommonGrowthItem, currentDate);
            crops.addCrops(cropProto);
        });

        // Handle after sow
        ThreadManage.me().execute(() -> {
            // Update quantity item in warehouse
            int userId = SessionCache.me().getUserID(SessionID.of(session));
            WarehouseDAO.updateReduceQuantityItem(userId, noGrowthItem.getId(), quantityCrops);
        });

        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResSow(Proto.ResSow.newBuilder().setCrops(crops)).build());
        // Response harvest with multi player game
        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(reqSow.getAreaId()));
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResSow(Proto.ResSow.newBuilder().setCrops(crops).setAreaId(reqSow.getAreaId()).setMainUserId(reqSow.getMainUserId())).build());
        return crops.build();
    }

    private Proto.Crop handleSow(Proto.TillLand tillLand, Proto.CommonGrowthItem commonGrowthItem, int startDate) {
        Proto.Crop.Builder cropProto = Proto.Crop.newBuilder();
        Proto.PropertyGrowthItem.Builder propertyGrowthItems = Proto.PropertyGrowthItem.newBuilder();
        Proto.PropertyCrop.Builder propertyCrop = Proto.PropertyCrop.newBuilder();
        // Insert property growth item
        int commonGrowthItemId = commonGrowthItem.getId();
        int propertyGrowthItemId = PropertyGrowthItemDAO.insertPropertyGrowthItem(startDate, commonGrowthItemId);
        //insert table PropertyCrop
        int propertyCropId = PropertyCropDAO.insertPropertyCrop(tillLand.getId(), propertyGrowthItemId);
        //set propertyGrowthItems
        propertyGrowthItems.setId(propertyGrowthItemId);
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
        propertyCrop.setPropertyGrowthItemId(propertyGrowthItemId);

        //set list rising time
        List<Proto.CommonRisingTime> commonRisingTimesList = null;
        //get from local
        commonRisingTimesList = CommonRisingTimeCache.me().getCommonRisingTimesByItemId(commonGrowthItemId);
        //get from redis
        if (commonRisingTimesList == null || commonRisingTimesList.size() == 0) {
            commonRisingTimesList = CommonRisingTimeCache.me().getCommonRisingTimesFromRedisByItemId(commonGrowthItemId);
        }
        //get from database
        if (commonRisingTimesList == null || commonRisingTimesList.size() == 0) {
            List<CommonRisingTimeBean> commonRisingTimeBeans = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItemId);
            for (CommonRisingTimeBean commonRisingTimeBean : commonRisingTimeBeans) {
                Proto.CommonRisingTime commonRisingTime = Proto.CommonRisingTime.newBuilder()
                        .setId(commonRisingTimeBean.getId())
                        .setTime(commonRisingTimeBean.getTime())
                        .setStage(commonRisingTimeBean.getStage())
                        .setPrice(commonRisingTimeBean.getPrice())
                        .setGrowthItemId(commonRisingTimeBean.getGrowthItemId())
                        .build();
                commonRisingTimesList.add(commonRisingTime);
            }
            List<Proto.CommonRisingTime> finalCommonRisingTimesList = commonRisingTimesList;
            ThreadManage.me().execute(() -> finalCommonRisingTimesList.forEach(commonRisingTime -> CommonRisingTimeCache.me().add(commonRisingTime)));
        }
        //set crop
        cropProto.setCommonGrowthItem(commonGrowthItem);
        cropProto.setPropertyGrowthItem(propertyGrowthItems);
        cropProto.setPropertyCrop(propertyCrop);
        cropProto.setTillLand(tillLand);
        cropProto.addAllCommonRisingTimes(commonRisingTimesList);

        return cropProto.build();
    }

    private String getNameCrop(String nameSeedBag) {
        String nameCrop = "";
        switch (nameSeedBag) {
            case "rice-seed-bag":
                nameCrop = "Rice";
                break;
            case "cabbage-seed-bag":
                nameCrop = "Cabbage";
                break;
            case "carrot-seed-bag":
                nameCrop = "Carrot";
                break;
            case "cucumber-seed-bag":
                nameCrop = "Cucumber";
                break;
            case "pumpkin-seed-bag":
                nameCrop = "Pumpkin";
                break;
        }
        return nameCrop;
    }

    public void loadItemsOfFarm(Session session, Proto.ReqLoadItemsOfFarm reqLoadItemsOfFarm) {
        // Load building items

        Proto.BuildingItems farmItems = loadBuildings(session, reqLoadItemsOfFarm);
        // Load crops
        Proto.Crops crops = loadCrops(farmItems);
        // Send response
        Proto.ResLoadItemsOfFarm.Builder resLoadItemsOfFarm = Proto.ResLoadItemsOfFarm.newBuilder();
        resLoadItemsOfFarm.setBuildingItems(farmItems);
        resLoadItemsOfFarm.setCrops(crops);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadItemsOfFarm(resLoadItemsOfFarm).build());
    }

    private Proto.Crops loadCrops(Proto.BuildingItems farmItems) {
        Proto.Crops.Builder crops = Proto.Crops.newBuilder();
        //get all planting land
        farmItems.getBuildingList().forEach(building -> {
            if (building.hasPlantingLandBuilding()) {
                Proto.PlantingLandBuilding plantingLandBuilding = building.getPlantingLandBuilding();
                plantingLandBuilding.getTillLandsList().forEach(tillLand -> {
                    // Get crops of till land
                    Proto.Crop.Builder crop = Proto.Crop.newBuilder();
                    // Get property crop
                    PropertyCropBean propertyCropBean = PropertyCropDAO.getPropertyCropsByTilledLandId(tillLand.getId());
                    if (propertyCropBean == null) return;
                    Proto.PropertyCrop propertyCrop = Proto.PropertyCrop.newBuilder()
                            .setId(propertyCropBean.getId())
                            .setHarvestYield(propertyCropBean.getHarvestYield())
                            .setStatusWatered(propertyCropBean.isStatusWatered())
                            .setStatusFertilized(propertyCropBean.isStatusFertilized())
                            .setTillLandId(propertyCropBean.getTillLandId())
                            .setTimeFertilized(propertyCropBean.getTimeFertilized())
                            .setFertilizerId(propertyCropBean.getFertilizerId())
                            .setPropertyGrowthItemId(propertyCropBean.getPropertyGrowthItemId())
                            .build();
                    // Get property growth item
                    PropertyGrowthItemBean propertyGrowthItemBean = PropertyGrowthItemDAO.getPropertyGrowthItemById(propertyCrop.getPropertyGrowthItemId());
                    if (propertyGrowthItemBean == null) return;
                    Proto.PropertyGrowthItem propertyGrowthItem = Proto.PropertyGrowthItem.newBuilder()
                            .setId(propertyGrowthItemBean.getId())
                            .setCurrentDiseaseId(propertyGrowthItemBean.getCurrentDiseaseId())
                            .setDiseaseRate(propertyGrowthItemBean.getDiseaseRate())
                            .setIsDisease(propertyGrowthItemBean.getIsDisease() > 0)
                            .setStartTimeDisease(propertyGrowthItemBean.getStartTimeDisease())
                            .setHealth(propertyGrowthItemBean.getHealth())
                            .setStage(propertyGrowthItemBean.getStage())
                            .setStartDate(propertyGrowthItemBean.getStartDate())
                            .setDevelopedDays(propertyGrowthItemBean.getDevelopedDays())
                            .setGrowthItemId(propertyGrowthItemBean.getGrowthItemId())
                            .build();
                    // Get common growth item
                    Proto.CommonGrowthItem commonGrowthItem = CommonGrowthItemCache.me().get(String.valueOf(propertyGrowthItem.getGrowthItemId()));
                    if (commonGrowthItem == null) {
                        CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemById(propertyGrowthItem.getGrowthItemId());
                        if (commonGrowthItemBean == null) return;
                        commonGrowthItem = Proto.CommonGrowthItem.newBuilder()
                                .setId(commonGrowthItemBean.getId())
                                .setName(commonGrowthItemBean.getName())
                                .setExperienceReceive(commonGrowthItemBean.getExperienceReceive())
                                .setPrice(commonGrowthItemBean.getPrice())
                                .setType(commonGrowthItemBean.getType())
                                .build();
                        Proto.CommonGrowthItem finalCommonGrowthItem = commonGrowthItem;
                        ThreadManage.me().execute(() -> {
                            CommonGrowthItemCache.me().add(finalCommonGrowthItem);
                            CommonGrowthItemCache.me().addCommonGrowthItemToRedis(String.valueOf(finalCommonGrowthItem.getId()), finalCommonGrowthItem);
                        });
                    }
                    // Get development times of crop
                    if (commonGrowthItem == null) return;
                    List<Proto.CommonRisingTime> commonRisingTimeList = CommonRisingTimeCache.me().getCommonRisingTimesByItemId(commonGrowthItem.getId());
                    if (commonRisingTimeList.isEmpty() || commonRisingTimeList == null || commonRisingTimeList.size() == 0) {
                        commonRisingTimeList = CommonRisingTimeCache.me().getCommonRisingTimesFromRedisByItemId(commonGrowthItem.getId());
                        List<Proto.CommonRisingTime> finalCommonRisingTimeList = commonRisingTimeList;
                        if (!commonRisingTimeList.isEmpty())
                            ThreadManage.me().execute(() -> finalCommonRisingTimeList.forEach(commonRisingTime -> CommonRisingTimeCache.me().add(commonRisingTime)));
                    }
                    if (commonRisingTimeList == null || commonRisingTimeList.isEmpty()) {
                        List<CommonRisingTimeBean> commonRisingTimeBeans = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItem.getId());
                        for (CommonRisingTimeBean commonRisingTimeBean : commonRisingTimeBeans) {
                            Proto.CommonRisingTime commonRisingTime = Proto.CommonRisingTime.newBuilder()
                                    .setId(commonRisingTimeBean.getId())
                                    .setTime(commonRisingTimeBean.getTime())
                                    .setStage(commonRisingTimeBean.getStage())
                                    .setPrice(commonRisingTimeBean.getPrice())
                                    .setGrowthItemId(commonRisingTimeBean.getGrowthItemId())
                                    .build();
                            commonRisingTimeList.add(commonRisingTime);
                        }
                        List<Proto.CommonRisingTime> finalCommonRisingTimeList = commonRisingTimeList;
                        ThreadManage.me().execute(() -> finalCommonRisingTimeList.forEach(commonRisingTime -> {
                            CommonRisingTimeCache.me().add(commonRisingTime);
                            CommonRisingTimeCache.me().addCommonRisingTimeToRedis(commonRisingTime);
                        }));
                    }
                    crop.setPropertyCrop(propertyCrop);
                    crop.setCommonGrowthItem(commonGrowthItem);
                    crop.addAllCommonRisingTimes(commonRisingTimeList);
                    crop.setPropertyGrowthItem(propertyGrowthItem);
                    crop.setTillLand(tillLand);
                    crops.addCrops(crop);
                });
            }
        });
        return crops.build();
    }

    public Proto.BuildingItems loadBuildings(Session session, Proto.ReqLoadItemsOfFarm reqLoadItemsOfFarm) {
        // Check user vua tao account
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        //TODO: cache area
        AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
        int areaId = areaBean.getId();
        int areaRequest = reqLoadItemsOfFarm.getAreaId();
        Proto.BuildingItems farmItems = null;
        if (isUserNewAccount(userId) && areaRequest == areaId) {
            farmItems = getFarmBaseItems();
            Runnable runnable = () -> {
                saveBaseItemsOfFarm(areaId, getFarmBaseItems());
                UserDAO.updateIsNewAccount(userId, false);
            };
            ThreadManage.me().execute(runnable);
        } else {
            farmItems = getUserItemsOfFarm(areaRequest);
        }
        if (farmItems == null) {
            return null;
        }
        return farmItems;
    }

    public void saveBaseItemsOfFarm(int areaId, Proto.BuildingItems farmBaseItems) {
        farmBaseItems.getBuildingList().forEach(building -> {
            BuildingDAO.insertBaseBuildingInArea(areaId, building.getFarmBuilding());
        });
    }

    private boolean isUserNewAccount(int userId) {
        Proto.User user = UserCache.me().get(String.valueOf(userId)).getUser();
        if (user == null) {
            user = UserCache.me().getUserOnline(userId);
        }
        if (user == null) {
            return false;
        }
        boolean isNewAccount = user.getIsNewAccount() == 1 ? true : false;
        return isNewAccount;
    }

    private Proto.BuildingItems getFarmBaseItems() {
        Proto.BuildingItems.Builder buildingItems = Proto.BuildingItems.newBuilder();
        // Sử dụng ClassLoader để lấy InputStream từ file trong resources
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("farm_base_item.csv");

        if (inputStream == null) {
            System.out.println("File không tồn tại!");
            return buildingItems.build();
        }
        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            br.readLine();
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                String name = values[0];
                long price = Long.parseLong(values[1]);
                String description = values[2];
                String type = values[3];
                int maxLevel = Integer.parseInt(values[4]);
                int currentLevel = Integer.parseInt(values[5]);
                int areaId = Integer.parseInt(values[6]);
                int positionX = Integer.parseInt(values[7]);
                int positionY = Integer.parseInt(values[8]);
                int buildingId = Integer.parseInt(values[9]);
                ConstUtils.TYPE_ITEM typeItem = ConstUtils.TYPE_ITEM.fromValue(type);
                if (typeItem != null) {
                    Proto.BuildingBase.Builder base = Proto.BuildingBase.newBuilder()
                            .setId(buildingId)
                            .setName(name)
                            .setPrice(price)
                            .setDescription(description)
                            .setType(type)
                            .setMaxLevel(maxLevel);
                    Proto.PropertyBuilding.Builder propertyBuilding = Proto.PropertyBuilding.newBuilder()
                            .setAreaId(areaId)
                            .setPositionX(positionX)
                            .setPositionY(positionY)
                            .setCurrentLevel(currentLevel)
                            .setCommonBuildingId(buildingId);
                    Proto.Building.Builder buildingProto = Proto.Building.newBuilder();
                    Proto.FarmBuilding.Builder farmBuilding = Proto.FarmBuilding.newBuilder()
                            .setBase(base)
                            .setPropertyBuilding(propertyBuilding);
                    buildingProto.setFarmBuilding(farmBuilding);
                    buildingItems.addBuilding(buildingProto);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return buildingItems.build();
    }

    private Proto.BuildingItems getUserItemsOfFarm(int areaId) {
        List<ABuilding> userItems = new ArrayList<>();
        Proto.BuildingItems.Builder buildingProtos = Proto.BuildingItems.newBuilder();
        List<Proto.BuildingBase> baseItems = null;
        List<Proto.PropertyBuilding> propertyItems = null;
        //Get baseItems
        //Get baseItems from local
        baseItems = CommonBuildingCache.me().getAll();
        //Get baseItems from redis
        if (baseItems == null || baseItems.isEmpty()) baseItems = CommonBuildingCache.me().getAllCommonBuildingBean();

        //Get baseItems from database
        if (baseItems == null || baseItems.isEmpty()) {
            // get all base item user
            baseItems = BuildingDAO.getAllCommonBuilding();
            // Save baseItems to redis and local
            List<Proto.BuildingBase> baseItemsCache = baseItems;
            Runnable runnable = () -> addListBaseBuildingToCache(baseItemsCache);
            ThreadManage.me().execute(runnable);
        }
        //Get propertyItems
        propertyItems = BuildingDAO.getAllPropertyBuildingByAreaId(areaId);
        if (propertyItems == null || propertyItems.isEmpty()) {
            return null;
        }
        for (Proto.PropertyBuilding p : propertyItems) {
            Proto.BuildingBase c = null;
            c = CommonBuildingCache.me().get(String.valueOf(p.getCommonBuildingId()));
            if (c == null) continue;
            Proto.Building.Builder buildingProto = Proto.Building.newBuilder();
            if (c.getType().equals(ConstUtils.TYPE_ITEM.PLANTING_LAND.getValue())) {
                Proto.PlantingLandBuilding.Builder plantingLandProto = Proto.PlantingLandBuilding.newBuilder();
                plantingLandProto.setBase(c);
                plantingLandProto.setPropertyBuilding(p);
                List<TillLandBean> tillLandBeanss = TillLandDAO.getListTillLandByPlantingLandId(plantingLandProto.getPropertyBuilding().getId());
                List<Proto.TillLand> tillLands = new ArrayList<>();
                tillLandBeanss.forEach(tillLandBean -> {
                    Proto.TillLand tillLand = Proto.TillLand.newBuilder()
                            .setId(tillLandBean.getId())
                            .setIndex(tillLandBean.getIndex())
                            .setStatusTilled(tillLandBean.isStatusTilled())
                            .setPlantingLandId(tillLandBean.getPlantingLandId())
                            .build();
                    tillLands.add(tillLand);
                });
                plantingLandProto.addAllTillLands(tillLands);
                buildingProto.setPlantingLandBuilding(plantingLandProto);
            } else {
                Proto.FarmBuilding.Builder farmBuildingProto = Proto.FarmBuilding.newBuilder();
                farmBuildingProto.setBase(c);
                farmBuildingProto.setPropertyBuilding(p);
                buildingProto.setFarmBuilding(farmBuildingProto);
            }
            buildingProtos.addBuilding(buildingProto);
        }
        return buildingProtos.build();
    }

    private void addListBaseBuildingToCache(List<Proto.BuildingBase> baseItems) {
        baseItems.forEach(item -> {
            CommonBuildingCache.me().addCommonBuilding(item);
            CommonBuildingCache.me().add(item);
        });
    }

    private void addListPropertyBuildingToCache(List<Proto.PropertyBuilding> propertyItems) {
        propertyItems.forEach(item -> {
            PropertyBuildingCache.me().addPropertyBuilding(item);
            PropertyBuildingCache.me().add(item);
        });
    }

    public Map<String, Integer> handleHarvest(Session session, Proto.ReqHarvest reqHarvest) {
        AtomicInteger rewardExpQuantity = new AtomicInteger();
        List<Proto.Crop> cropList = reqHarvest.getHarvestingInformation().getCropList();
        Map<String, Integer> mapQuantityOfTypeCrops = new HashMap<>();
        if (cropList == null || cropList.isEmpty()) return null;
        cropList.forEach(crop -> {
            // Handling of harvested crops
            // Delete crop from database -> database optimization
            int propertyCropId = crop.getPropertyCrop().getId();
            int propertyItemID = crop.getPropertyGrowthItem().getId();
            deleteCrop(propertyCropId, propertyItemID);
            updateStatusTilledLand(crop.getTillLand().getId());
            // Reward for user
            rewardExpQuantity.addAndGet(crop.getCommonGrowthItem().getExperienceReceive());
            String cropName = crop.getCommonGrowthItem().getName();
            if (mapQuantityOfTypeCrops.containsKey(cropName)) {
                mapQuantityOfTypeCrops.put(cropName, mapQuantityOfTypeCrops.get(cropName) + 1);
            } else {
                mapQuantityOfTypeCrops.put(cropName, 1);
            }
        });
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        int harvestAreaId = reqHarvest.getAreaId();
        Proto.Area areaProto = this.getAreaById(harvestAreaId);
        int harvestUserId = areaProto.getUserId();
        Proto.ResHarvest.Builder resHarvest = Proto.ResHarvest.newBuilder();
        List<Proto.WarehouseItem> warehouseItemList = new ArrayList<>();
        // Update quantity item in warehouse => for type crop in mapQuantityOfTypeCrops
        mapQuantityOfTypeCrops.forEach((key, value) -> {
            // Create reward
            Proto.Reward.Builder rewardSeedBag = Proto.Reward.newBuilder();
            rewardSeedBag.setName(ConstUtils.REWARDS.fromValue(key).getValue());
            rewardSeedBag.setQuantity(rewardExpQuantity.get());
            resHarvest.addRewards(rewardSeedBag);
            //supporting
            if(userId != harvestUserId && userContext.getUser().getCharacter().getCode().equals("KSCK")) {
                Proto.Reward.Builder rewardGold = Proto.Reward.newBuilder();
                rewardSeedBag.setName(ConstUtils.REWARDS.GOLD.getValue());
                rewardSeedBag.setQuantity(rewardExpQuantity.get());
                resHarvest.addSupportRewards(rewardSeedBag);

                Proto.Reward.Builder rewardSupportExp = Proto.Reward.newBuilder();
                rewardSeedBag.setName(ConstUtils.REWARDS.EXPERIENCE.getValue());
                rewardSeedBag.setQuantity(rewardExpQuantity.get());
                resHarvest.addSupportRewards(rewardSeedBag);
                int exp = userContext.getUser().getExperiencePoints();
                int newEpx = exp + rewardExpQuantity.get();
                long gold = userContext.getUser().getGold();
                long newGold = gold + rewardExpQuantity.get();
                UserDAO.updateUserExpAndGold(userId, newEpx, (int) newGold);
                Proto.User newUserContext = userContext.getUser().toBuilder().setExperiencePoints(newEpx).setGold(newGold).build();
                userContext.setUser(newUserContext);
                UserCache.me().add(String.valueOf(userId), userContext);
                resHarvest.setSupportGold((int) newGold);
                resHarvest.setSupportExp(newEpx);
                resHarvest.setSupportUserId(userId);
            }
            // Harvested products
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemByName(key.toLowerCase());
            WarehouseItemBean warehouseItem = WarehouseDAO.getWarehouseItemUser(userId, noGrowthItemBean.getId());
            if (warehouseItem == null) {
                WarehouseDAO.insertWarehouseItem(harvestUserId, noGrowthItemBean.getId(), value);
            } else {
                WarehouseDAO.updateIncreaseQuantityItem(harvestUserId, noGrowthItemBean.getId(), value);
            }
            WarehouseItemBean warehouseItemBean = WarehouseDAO.getWarehouseItemBean(harvestUserId, noGrowthItemBean.getId());
            Proto.WarehouseItem.Builder warehouseItemProto = Proto.WarehouseItem.newBuilder()
                    .setUserId(warehouseItemBean.getUserId())
                    .setQuantity(warehouseItemBean.getQuantity())
                    .setNoGrowthItemId(warehouseItemBean.getNoGrowthItemId())
                    .setNoGrowthItem(Proto.NoGrowthItem.newBuilder()
                            .setId(warehouseItemBean.getNoGrowthItemId())
                            .setName(noGrowthItemBean.getName())
                            .setPrice(noGrowthItemBean.getPrice())
                            .setSalePrice(noGrowthItemBean.getSalePrice())
                            .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                            .setStatus(noGrowthItemBean.getStatus())
                            .setType(noGrowthItemBean.getType())
                            .setDescription(noGrowthItemBean.getDescription())
                            .build());
            warehouseItemList.add(warehouseItemProto.build());
        });
        // Update experience points
        UserContext userHarvestContext = UserCache.me().get(String.valueOf(harvestUserId));
        int exp = userHarvestContext.getUser().getExperiencePoints();
        int newEpx = exp + rewardExpQuantity.get();
        UserDAO.updateExperiencePoints(harvestUserId, newEpx);
        Proto.User newUserContext = userHarvestContext.getUser().toBuilder().setExperiencePoints(newEpx).build();
        userHarvestContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(harvestUserId), userHarvestContext);

        // Response reward
        Proto.Reward.Builder rewardExp = Proto.Reward.newBuilder();
        rewardExp.setName(ConstUtils.REWARDS.EXPERIENCE.getValue());
        rewardExp.setQuantity(rewardExpQuantity.get());
        resHarvest.setExp(newEpx);
        resHarvest.addRewards(rewardExp);
        resHarvest.setMainUserId(harvestUserId);
        resHarvest.addAllCrops(cropList);
        // Response harvest with multi player game
        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(harvestAreaId));
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResHarvest(resHarvest).build());
        Proto.ResAddProduct resAddProduct = Proto.ResAddProduct.newBuilder().addAllWarehouseItem(warehouseItemList).build();
        UserContext userContextMain = UserCache.me().get(String.valueOf(harvestUserId));
        DataSenderUtils.sendResponse(SessionManage.me().get(userContextMain.getSessionID()), Proto.Packet.newBuilder().setResAddProduct(resAddProduct).build());
        return mapQuantityOfTypeCrops;
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

    public Proto.Area getAreaById(int areaId) {
        Proto.Area areaProto = AreaCache.me().getArea(String.valueOf(areaId));
        if (areaProto == null) {
            AreaBean areaBean = AreaDAO.loadAreaById(areaId);
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

    private void deleteCrop(int propertyCropId, int propertyItemID) {
        PropertyCropDAO.deletePropertyCrop(propertyCropId);
        PropertyGrowthItemDAO.deletePropertyGrowthItem(propertyItemID);
    }

    private void updateStatusTilledLand(int tillLandId) {
        TillLandDAO.updateTillLand(tillLandId, false);
    }

    public void handleTillLandByMachine(Session session, Proto.ReqTillLandByMachine reqTillLandByMachine){
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        Proto.NoGrowthItem machine = NoGrowthItemCache.me().getNoGrowthItemByName("bulldozer");
        if(machine == null) {
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemByName("bulldozer");
            machine = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                    .setType(noGrowthItemBean.getType())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();
        }

        PropertyMachineBean propertyMachineBean = PropertyMachineDAO.getPropertyMachine(userId, machine.getId());
        Proto.PropertyMachine propertyMachine = Proto.PropertyMachine.newBuilder()
                .setId(propertyMachineBean.getId())
                .setSpeed(propertyMachineBean.getSpeed())
                .setDurable(propertyMachineBean.getDurable())
                .setPower(propertyMachineBean.getPower())
                .setNumberStar(propertyMachineBean.getNumberStar())
                .setLevel(propertyMachineBean.getLevel())
                .setValue(propertyMachineBean.getValue())
                .setNoGrowthItemId(propertyMachineBean.getNoGrowthItemId())
                .setUserId(propertyMachineBean.getUserId())
                .build();

        int areaId = reqTillLandByMachine.getAreaId();
        // Response harvest with multi player game
        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(areaId));
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        Proto.ResTillLandByMachine.Builder resTillLandByMachine = Proto.ResTillLandByMachine.newBuilder();
        resTillLandByMachine.setNoGrowthItem(machine);
        resTillLandByMachine.setPropertyMachine(propertyMachine);
        resTillLandByMachine.setPlantingLandPosition(reqTillLandByMachine.getPlantingLandPosition());
        DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResTillLandByMachine(resTillLandByMachine).build());
    }

    public void handleHarvestByMachine(Session session, Proto.ReqHarvestByMachine reqHarvestByMachine){
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        Proto.NoGrowthItem machine = NoGrowthItemCache.me().getNoGrowthItemByName("harvester");
        if(machine == null) {
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemByName("harvester");
            machine = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                    .setType(noGrowthItemBean.getType())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();
        }

        PropertyMachineBean propertyMachineBean = PropertyMachineDAO.getPropertyMachine(userId, machine.getId());
        Proto.PropertyMachine propertyMachine = Proto.PropertyMachine.newBuilder()
                .setId(propertyMachineBean.getId())
                .setSpeed(propertyMachineBean.getSpeed())
                .setDurable(propertyMachineBean.getDurable())
                .setPower(propertyMachineBean.getPower())
                .setNumberStar(propertyMachineBean.getNumberStar())
                .setLevel(propertyMachineBean.getLevel())
                .setValue(propertyMachineBean.getValue())
                .setNoGrowthItemId(propertyMachineBean.getNoGrowthItemId())
                .setUserId(propertyMachineBean.getUserId())
                .build();

        int areaId = reqHarvestByMachine.getAreaId();
        // Response harvest with multi player game
        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(areaId));
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        Proto.ResHarvestByMachine.Builder resHarvestByMachineBuilder = Proto.ResHarvestByMachine.newBuilder();
        resHarvestByMachineBuilder.setNoGrowthItem(machine);
        resHarvestByMachineBuilder.setPropertyMachine(propertyMachine);
        resHarvestByMachineBuilder.setPlantingLandPosition(reqHarvestByMachine.getPlantingLandPosition());
        DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResHarvestByMachine(resHarvestByMachineBuilder).build());
    }
}
