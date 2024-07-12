package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.PropertyCropDAO;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.*;

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

    public void handleBuyBuilding(Session session, Proto.ReqBuyBuilding reqBuyBuilding){
        String typeBuilding = reqBuyBuilding.getTypeBuilding();
        Proto.Building.Builder buildingResponse = Proto.Building.newBuilder();
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        //TODO: cache area
        AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
        if(areaBean == null) return;
        if(typeBuilding.equals("PLANTING_LAND")){
            //insert planting land
            ABuilding plantingBuilidng = new PlantingLandBuildingBean();
            int idPlantingBuilding = CommonBuildingCache.me().getIdBuildingByType(ConstUtils.TYPE_ITEM.PLANTING_LAND);
            if(idPlantingBuilding == 0) idPlantingBuilding = BuildingDAO.getIdBuildingByType(ConstUtils.TYPE_ITEM.PLANTING_LAND);
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
        }
        Proto.ResBuyBuilding.Builder resBuyBuilding = Proto.ResBuyBuilding.newBuilder();
        resBuyBuilding.setUuid(reqBuyBuilding.getUuid());
        resBuyBuilding.setBuilding(buildingResponse);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBuyBuilding(resBuyBuilding).build());
    }

    public void handleTilledLand(Session session, Proto.ReqTilledLand reqTilledLand) {
        if(reqTilledLand.getTillLandList() == null || reqTilledLand.getTillLandList() == null || reqTilledLand.getTillLandList().size() == 0) return;
        //TODO: update status tilled land redis
        reqTilledLand.getTillLandList().forEach(tillLand -> TillLandDAO.updateTillLand(tillLand.getId(), tillLand.getStatusTilled()));
    }

    public void handleLoadCommonCrops(Session session) {
        Proto.ResLoadCommonCrops.Builder resLoadCommonCrops = Proto.ResLoadCommonCrops.newBuilder();
        List<Proto.CommonGrowthItem> commonGrowthItems = null;
        commonGrowthItems = CommonGrowthItemCache.me().getCommonGrowthItemsByType(ConstUtils.TYPE_ITEM.CROP.getValue());
        if(commonGrowthItems == null || commonGrowthItems.isEmpty()) {
            List<CommonGrowthItemBean> commonGrowthItemBeams = CommonGrowthItemDAO.getListCommonGrowthItemByType(ConstUtils.TYPE_ITEM.CROP.getValue());
            for(CommonGrowthItemBean commonGrowthItemBean : commonGrowthItemBeams) {
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

    public void handleSow(Session session, Proto.ReqSow reqSow) {
        // Get game state
        Proto.GameState gameState = reqSow.getGameState();
        int timesOfDay = gameState.getTimesOfDay();
        int currentDate = gameState.getCurrentDate();
        int currentSeason = gameState.getCurrentSeason();
        // Save crop database
        int quantityCrops = reqSow.getSowingInformationList().size();
        if(quantityCrops == 0) return;
        Proto.Crops.Builder crops = Proto.Crops.newBuilder();
        Proto.NoGrowthItem noGrowthItem = reqSow.getSowingInformationList().get(0).getNoGrowthItem();
        // Get common growth item
        String nameCommonGrowthItem = getNameCrop(noGrowthItem.getName());
        Proto.CommonGrowthItem commonGrowthItem = CommonGrowthItemCache.me().getCommonGrowthItemByName(nameCommonGrowthItem);
        if(commonGrowthItem == null) commonGrowthItem = CommonGrowthItemCache.me().getCommonGrowthItemByNameFromRedis(nameCommonGrowthItem);
        if (commonGrowthItem == null) {
            CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemByName(nameCommonGrowthItem);
            if(commonGrowthItemBean == null) return;
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
    }

    private Proto.Crop handleSow(Proto.TillLand tillLand, Proto.CommonGrowthItem commonGrowthItem, int startDate){
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
        if(commonRisingTimesList == null || commonRisingTimesList.size() == 0){
            commonRisingTimesList = CommonRisingTimeCache.me().getCommonRisingTimesFromRedisByItemId(commonGrowthItemId);
        }
        //get from database
        if(commonRisingTimesList == null|| commonRisingTimesList.size() == 0) {
            List<CommonRisingTimeBean> commonRisingTimeBeans = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItemId);
            for(CommonRisingTimeBean commonRisingTimeBean : commonRisingTimeBeans) {
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

    private String getNameCrop(String nameSeedBag){
        String nameCrop = "";
        switch (nameSeedBag){
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
            if(building.hasPlantingLandBuilding()){
                Proto.PlantingLandBuilding plantingLandBuilding = building.getPlantingLandBuilding();
                plantingLandBuilding.getTillLandsList().forEach(tillLand -> {
                    // Get crops of till land
                    Proto.Crop.Builder crop = Proto.Crop.newBuilder();
                    // Get property crop
                    PropertyCropBean propertyCropBean = PropertyCropDAO.getPropertyCropsByTilledLandId(tillLand.getId());
                    if(propertyCropBean == null) return;
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
                    if(propertyGrowthItemBean == null) return;
                    Proto.PropertyGrowthItem propertyGrowthItem = Proto.PropertyGrowthItem.newBuilder()
                            .setId(propertyGrowthItemBean.getId())
                            .setCurrentDiseaseId(propertyGrowthItemBean.getCurrentDiseaseId())
                            .setDiseaseRate(propertyGrowthItemBean.getDiseaseRate())
                            .setIsDisease(propertyGrowthItemBean.isDisease())
                            .setStartTimeDisease(propertyGrowthItemBean.getStartTimeDisease())
                            .setHealth(propertyGrowthItemBean.getHealth())
                            .setStage(propertyGrowthItemBean.getStage())
                            .setStartDate(propertyGrowthItemBean.getStartDate())
                            .setDevelopedDays(propertyGrowthItemBean.getDevelopedDays())
                            .setGrowthItemId(propertyGrowthItemBean.getGrowthItemId())
                            .build();
                    // Get common growth item
                    Proto.CommonGrowthItem commonGrowthItem = CommonGrowthItemCache.me().get(String.valueOf(propertyGrowthItem.getGrowthItemId()));
                    if(commonGrowthItem == null) {
                        CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemById(propertyGrowthItem.getGrowthItemId());
                        if(commonGrowthItemBean == null) return;
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
                    if(commonGrowthItem == null) return;
                    List<Proto.CommonRisingTime> commonRisingTimeList = CommonRisingTimeCache.me().getCommonRisingTimesByItemId(commonGrowthItem.getId());
                    if(commonRisingTimeList.isEmpty() || commonRisingTimeList == null || commonRisingTimeList.size() == 0) {
                        commonRisingTimeList = CommonRisingTimeCache.me().getCommonRisingTimesFromRedisByItemId(commonGrowthItem.getId());
                        List<Proto.CommonRisingTime> finalCommonRisingTimeList = commonRisingTimeList;
                        if(!commonRisingTimeList.isEmpty()) ThreadManage.me().execute(() -> finalCommonRisingTimeList.forEach(commonRisingTime -> CommonRisingTimeCache.me().add(commonRisingTime)));
                    }
                    if(commonRisingTimeList == null || commonRisingTimeList.isEmpty()) {
                        List<CommonRisingTimeBean> commonRisingTimeBeans = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItem.getId());
                        for(CommonRisingTimeBean commonRisingTimeBean : commonRisingTimeBeans) {
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

    public void handleHarvest(Session session, Proto.ReqHarvest reqHarvest) {
        AtomicInteger rewardExpQuantity = new AtomicInteger();
        List<Proto.Crop> cropList = reqHarvest.getHarvestingInformation().getCropList();
        Map<String, Integer> mapQuantityOfTypeCrops = new HashMap<>();
        if(cropList == null || cropList.isEmpty()) return;
        cropList.forEach(crop -> {
            // Handling of harvested crops
                // Delete crop from database -> database optimization
            int propertyCropId = crop.getPropertyCrop().getId();
            int propertyItemID = crop.getPropertyGrowthItem().getId();
            deleteCrop(propertyCropId, propertyItemID);
            // Reward for user
            rewardExpQuantity.addAndGet(crop.getCommonGrowthItem().getExperienceReceive());
            String cropName = crop.getCommonGrowthItem().getName();
            if(mapQuantityOfTypeCrops.containsKey(cropName)){
                mapQuantityOfTypeCrops.put(cropName, mapQuantityOfTypeCrops.get(cropName) + 1);
            } else {
                mapQuantityOfTypeCrops.put(cropName, 1);
            }
        });
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        Proto.ResHarvest.Builder resHarvest = Proto.ResHarvest.newBuilder();
        Proto.Rewards.Builder rewards = Proto.Rewards.newBuilder();
        List<Proto.WarehouseItem> warehouseItemList = new ArrayList<>();
        // Update quantity item in warehouse => for type crop in mapQuantityOfTypeCrops
        mapQuantityOfTypeCrops.forEach((key, value) -> {
            // Create reward
            Proto.Reward.Builder rewardSeedBag = Proto.Reward.newBuilder();
            rewardSeedBag.setName(ConstUtils.REWARDS.fromValue(key).getValue());
            rewardSeedBag.setQuantity(rewardExpQuantity.get());
            rewards.addReward(rewardSeedBag);
            // Harvested products
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemByName(key.toLowerCase());
            WarehouseItemBean warehouseItem = WarehouseDAO.getWarehouseItemUser(userId, noGrowthItemBean.getId());
            if (warehouseItem == null) {
                WarehouseDAO.insertWarehouseItem(userId, noGrowthItemBean.getId(), value);
            } else {
                WarehouseDAO.updateIncreaseQuantityItem(userId, noGrowthItemBean.getId(), value);
            }
            WarehouseItemBean warehouseItemBean = WarehouseDAO.getWarehouseItemBean(userId, noGrowthItemBean.getId());
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

        UserDAO.updateExperiencePoints(userId, rewardExpQuantity.get());

        Proto.Reward.Builder rewardExp = Proto.Reward.newBuilder();
        rewardExp.setName(ConstUtils.REWARDS.EXPERIENCE.getValue());
        rewardExp.setQuantity(rewardExpQuantity.get());
        rewards.addReward(rewardExp);

        resHarvest.setRewards(rewards);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResHarvest(resHarvest).build());

        Proto.ResAddProduct resAddProduct = Proto.ResAddProduct.newBuilder().addAllWarehouseItem(warehouseItemList).build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResAddProduct(resAddProduct).build());
    }

    private void deleteCrop(int propertyCropId, int propertyItemID) {
        PropertyCropDAO.deletePropertyCrop(propertyCropId);
        PropertyGrowthItemDAO.deletePropertyGrowthItem(propertyItemID);
    }
}
