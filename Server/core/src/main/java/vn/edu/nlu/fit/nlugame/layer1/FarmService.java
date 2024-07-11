package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ABuilding;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.AreaBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CommonGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PlantingLandBuildingBean;
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
            List<Proto.TillLand> tillLands = TillLandDAO.getListTillLandByPlantingLandId(plantingLandBuilding.getPropertyBuilding().getId());
            Proto.TillLands.Builder tillLandsBuilder = Proto.TillLands.newBuilder();
            tillLands.forEach(tillLand -> tillLandsBuilder.addTillLand(tillLand));
            plantingLandBuilding.setTillLands(tillLandsBuilder);
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
            commonGrowthItems = CommonGrowthItemDAO.getListCommonGrowthItemByType(ConstUtils.TYPE_ITEM.CROP.getValue());
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
        Proto.Crops.Builder crops = Proto.Crops.newBuilder();
        Proto.NoGrowthItem noGrowthItem = reqSow.getSowingInformationList().get(0).getNoGrowthItem();
        String nameCommonGrowthItem = "";
        switch (noGrowthItem.getName()) {
            case "rice-seed-bag":
                nameCommonGrowthItem = "Rice";
                break;
            case "cabbage-seed-bag":
                nameCommonGrowthItem = "Cabbage";
                break;
            case "carrot-seed-bag":
                nameCommonGrowthItem = "Carrot";
                break;
            case "cucumber-seed-bag":
                nameCommonGrowthItem = "Cucumber";
                break;
            case "pumpkin-seed-bag":
                nameCommonGrowthItem = "Pumpkin";
                break;
            default:
        }
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
        if(quantityCrops > 0) {
            Proto.CommonGrowthItem finalCommonGrowthItem = commonGrowthItem;
            reqSow.getSowingInformationList().forEach(sowingInformation -> {
                Proto.TillLand tillLand = sowingInformation.getTillLand();
                Proto.Crop cropProto = CommonGrowthItemDAO.sowSeed(tillLand, finalCommonGrowthItem, currentDate);
                crops.addCrops(cropProto);
            });
        }

        ThreadManage.me().execute(() -> {
            // Handle after sow
                // Update quantity item in warehouse
            int userId = SessionCache.me().getUserID(SessionID.of(session));
            WarehouseDAO.updateReduceQuantityItem(userId, noGrowthItem.getId(), quantityCrops);
        });

        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResSow(Proto.ResSow.newBuilder().setCrops(crops)).build());
    }

    public void loadItemsOfFarm(Session session) {
        // Load building items
        Proto.BuildingItems farmItems = loadBuildings(session);
        // Load crops
        Proto.Crops crops = loadCrops(farmItems);
        // Send response
        Proto.ResLoadItemsOfFarm.Builder resLoadItemsOfFarm = Proto.ResLoadItemsOfFarm.newBuilder();
        resLoadItemsOfFarm.setBuildingItems(farmItems);
        resLoadItemsOfFarm.setCrops(crops);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadItemsOfFarm(resLoadItemsOfFarm).build());
    }

    public void loadItemsOfWarehouse(Session session) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        List<Proto.WarehouseItem> warehouseItemList= WarehouseDAO.getAllUserItemInWarehouse(userId);
        if (warehouseItemList == null || warehouseItemList.isEmpty()) {
            return;
        }
        Proto.WarehouseItems warehouseItems = Proto.WarehouseItems.newBuilder().addAllWarehouseItem(warehouseItemList).build();
        Proto.Packet packet = Proto.Packet.newBuilder().setResLoadItemsOfWarehouse(Proto.ResLoadItemsOfWarehouse.newBuilder().setWarehouseItems(warehouseItems)) .build();
        DataSenderUtils.sendResponse(session, packet);
    }

    private Proto.Crops loadCrops(Proto.BuildingItems farmItems) {
        Proto.Crops.Builder crops = Proto.Crops.newBuilder();
        //get all planting land
        farmItems.getBuildingList().forEach(building -> {
            if(building.hasPlantingLandBuilding()){
                Proto.PlantingLandBuilding plantingLandBuilding = building.getPlantingLandBuilding();
                Proto.BuildingBase buildingBase = plantingLandBuilding.getBase();
                Proto.PropertyBuilding propertyBuilding = plantingLandBuilding.getPropertyBuilding();
                Proto.TillLands tillLands = plantingLandBuilding.getTillLands();
                tillLands.getTillLandList().forEach(tillLand -> {
                    // Get crops of till land
                    Proto.Crop.Builder crop = Proto.Crop.newBuilder();
                    // Get property crop
                    Proto.PropertyCrop propertyCrop = CommonGrowthItemDAO.getPropertyCropsByTilledLandId(tillLand.getId());
                    if(propertyCrop == null) return;
                    // Get property growth item
                    Proto.PropertyGrowthItems propertyGrowthItems = CommonGrowthItemDAO.getPropertyGrowthItemById(propertyCrop.getPropertyGrowthItemId());
                    if(propertyGrowthItems == null) return;
                    // Get common growth item
                    Proto.CommonGrowthItem commonGrowthItem = CommonGrowthItemCache.me().get(String.valueOf(propertyGrowthItems.getGrowthItemId()));
                    if(commonGrowthItem == null) {
                        commonGrowthItem = CommonGrowthItemDAO.getCommonGrowthItemById(propertyGrowthItems.getGrowthItemId());
                        Proto.CommonGrowthItem finalCommonGrowthItem = commonGrowthItem;
                        ThreadManage.me().execute(() -> {
                            CommonGrowthItemCache.me().add(finalCommonGrowthItem);
                            CommonGrowthItemCache.me().addCommonGrowthItemToRedis(String.valueOf(finalCommonGrowthItem.getId()), finalCommonGrowthItem);
                        });
                    }
                    // Get development times of crop
                    Proto.CommonRisingTimes.Builder commonRisingTimes = Proto.CommonRisingTimes.newBuilder();
                    if(commonGrowthItem == null) return;
                    List<Proto.CommonRisingTime> commonRisingTimeList = CommonRisingTimeCache.me().getCommonRisingTimesByItemId(commonGrowthItem.getId());
                    if(commonRisingTimeList.isEmpty() || commonRisingTimeList == null || commonRisingTimeList.size() == 0) {
                        commonRisingTimeList = CommonRisingTimeCache.me().getCommonRisingTimesFromRedisByItemId(commonGrowthItem.getId());
                        List<Proto.CommonRisingTime> finalCommonRisingTimeList = commonRisingTimeList;
                        if(!commonRisingTimeList.isEmpty()) ThreadManage.me().execute(() -> finalCommonRisingTimeList.forEach(commonRisingTime -> CommonRisingTimeCache.me().add(commonRisingTime)));
                    }
                    if(commonRisingTimeList == null || commonRisingTimeList.isEmpty()) {
                        commonRisingTimeList = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItem.getId());
                        List<Proto.CommonRisingTime> finalCommonRisingTimeList = commonRisingTimeList;
                        ThreadManage.me().execute(() -> finalCommonRisingTimeList.forEach(commonRisingTime -> {
                            CommonRisingTimeCache.me().add(commonRisingTime);
                            CommonRisingTimeCache.me().addCommonRisingTimeToRedis(commonRisingTime);
                        }));
                    }
                    commonRisingTimes.addAllCommonRisingTime(commonRisingTimeList);
                    crop.setPropertyCrop(propertyCrop);
                    crop.setCommonGrowthItem(commonGrowthItem);
                    crop.setCommonRisingTimes(commonRisingTimes);
                    crop.setPropertyGrowthItems(propertyGrowthItems);
                    crop.setTillLand(tillLand);
                    crops.addCrops(crop);
                });
            }
        });
        return crops.build();
    }

    public Proto.BuildingItems loadBuildings(Session session) {
        // Check user vua tao account
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        //TODO: cache area
        AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
        int areaId = areaBean.getId();
        Proto.BuildingItems farmItems = null;
        if (isUserNewAccount(userId)) {
            farmItems = getFarmBaseItems();
            Runnable runnable = () -> {
                saveBaseItemsOfFarm(areaId, getFarmBaseItems());
                UserDAO.updateIsNewAccount(userId, false);
            };
            ThreadManage.me().execute(runnable);
        } else {
            farmItems = getUserItemsOfFarm(areaId);
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
        //Get propertyItems from local
        propertyItems = PropertyBuildingCache.me().getAll(areaId);
        //Get propertyItems from redis
        if (propertyItems == null || propertyItems.isEmpty())
            propertyItems = PropertyBuildingCache.me().getAllPropertyBuildingBeanByAreaId(areaId);
        if (propertyItems == null || propertyItems.isEmpty()) {
            //Get propertyItems from database
            propertyItems = BuildingDAO.getAllPropertyBuildingByAreaId(areaId);
            // Save propertyItems to redis and local
            List<Proto.PropertyBuilding> propertyItemsCache = propertyItems;
            Runnable runnable = () -> addListPropertyBuildingToCache(propertyItemsCache);
            ThreadManage.me().execute(runnable);
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
                Proto.TillLands.Builder tillLandProtos = Proto.TillLands.newBuilder();
                List<Proto.TillLand> tillLands = TillLandDAO.getListTillLandByPlantingLandId(plantingLandProto.getPropertyBuilding().getId());
                tillLands.forEach(tillLand -> tillLandProtos.addTillLand(tillLand));
                plantingLandProto.setTillLands(tillLandProtos);
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
        List<Proto.Crop> cropList = reqHarvest.getHarvestingInformations().getCropList();
        Map<String, Integer> mapQuantityOfTypeCrops = new HashMap<>();
        if(cropList == null || cropList.isEmpty()) return;
        cropList.forEach(crop -> {
            // Handling of harvested crops
                // Delete crop from database -> database optimization
            int propertyCropId = crop.getPropertyCrop().getId();
            int propertyItemID = crop.getPropertyGrowthItems().getId();
            CommonGrowthItemDAO.deleteHarvestedCrop(propertyCropId, propertyItemID);
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
        // Update quantity item in warehouse => for type crop in mapQuantityOfTypeCrops
        mapQuantityOfTypeCrops.forEach((key, value) -> {
            // Create reward
            Proto.Reward.Builder rewardSeedBag = Proto.Reward.newBuilder();
            rewardSeedBag.setName(ConstUtils.REWARDS.fromValue(key).getValue());
            rewardSeedBag.setQuantity(rewardExpQuantity.get());
            rewards.addReward(rewardSeedBag);
        });

        UserDAO.updateExperiencePoints(userId, rewardExpQuantity.get());

        Proto.Reward.Builder rewardExp = Proto.Reward.newBuilder();
        rewardExp.setName(ConstUtils.REWARDS.EXPERIENCE.getValue());
        rewardExp.setQuantity(rewardExpQuantity.get());
        rewards.addReward(rewardExp);

        resHarvest.setRewards(rewards);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResHarvest(resHarvest).build());
    }
}
