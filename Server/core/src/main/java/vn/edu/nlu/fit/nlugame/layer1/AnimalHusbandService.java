package vn.edu.nlu.fit.nlugame.layer1;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.*;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import javax.xml.crypto.Data;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class AnimalHusbandService {
    private static final AnimalHusbandService instance = new AnimalHusbandService();

    private AnimalHusbandService() {
    }

    public static AnimalHusbandService me() {
        return instance;
    }

    public static final String COW_YELLOW = "cow-yellow";
    public static final String CHICKEN_BLUE = "chicken-blue";
    public static final String CHICKEN_BLUE_LV1 = "chicken-blue-lv1";
    public static final String COW_YELLOW_LV1 = "cow-yellow-lv1";
    public static final String CAGE_CHICKEN = "cage-chicken";
    public static final String CAGE_COW = "cage-cow";
    public static final int HAY_ID = 10;
    public static final int PADDY_GRAIN_ID = 11;
    public static final int QUANTITY_REDUCE = 1;

    public void buyCage(Session session, Proto.ReqBuyCage reqBuyCage) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return;
        UserContext userContext = UserCache.me().get(String.valueOf(userId));

        Proto.Position positionProto = this.getPositionByIndex(reqBuyCage.getIndex());
        if (positionProto == null) return;

        Proto.Area areaProto = this.getAreaByUserId(userId);
        if (areaProto == null) return;

        if (BuildingDAO.checkBuildingExist((int) positionProto.getX(), (int) positionProto.getY(), areaProto.getAreaId()))
            return;


        Proto.ShopItem shopItemProto = this.getShopItem(reqBuyCage.getShopItemId());
        Proto.NoGrowthItem noGrowthItemProto = this.getNoGrowthItem(shopItemProto.getNoGrowthItemId());
        if (!isEnoughGold(userContext, noGrowthItemProto, 1)) {
            Proto.ResBuyCage resBuyCage = Proto.ResBuyCage.newBuilder()
                    .setStatus(400)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBuyCage(resBuyCage).build());
            return;
        }

        long newGold = this.updateUserGoldBuyItem(userContext, noGrowthItemProto, 1);

        Proto.BuildingBase commonBuildingBaseProto = this.getCommonBuildingByName(noGrowthItemProto.getName());
        UpgradeBean upgradeBean = UpgradeDAO.getByBuildingIdAndLevel(commonBuildingBaseProto.getId(), 1);

        PropertyBuildingBean propertyBuildingBean = PropertyBuildingBean.builder()
                .positionX((int) positionProto.getX())
                .positionY((int) positionProto.getY())
                .areaId(areaProto.getAreaId())
                .commonBuildingId(commonBuildingBaseProto.getId())
                .currentLevel(1)
                .upgradeId(upgradeBean.getId())
                .build();

        int id = BuildingDAO.insertPropertyBuilding(propertyBuildingBean);
        if (id == -1) return;

        Proto.PropertyBuilding propertyBuildingProto = Proto.PropertyBuilding.newBuilder()
                .setId(id)
                .setPositionX(propertyBuildingBean.getPositionX())
                .setPositionY(propertyBuildingBean.getPositionY())
                .setUpgradeId(propertyBuildingBean.getUpgradeId())
                .setAreaId(propertyBuildingBean.getAreaId())
                .setCommonBuildingId(propertyBuildingBean.getCommonBuildingId())
                .setCurrentLevel(propertyBuildingBean.getCurrentLevel())
                .build();

        Proto.Upgrade upgradeProto = Proto.Upgrade.newBuilder()
                .setId(upgradeBean.getId())
                .setName(upgradeBean.getName())
                .setLevel(upgradeBean.getLevel())
                .setCapacity(upgradeBean.getCapacity())
                .setPrice(upgradeBean.getPrice())
                .setBuildingId(upgradeBean.getBuildingId())
                .build();

        Proto.Cage cage = Proto.Cage.newBuilder()
                .setBuildingBase(commonBuildingBaseProto)
                .setUpgrade(upgradeProto)
                .setPropertyBuilding(propertyBuildingProto)
                .build();

        Proto.ResBuyCage resBuyCage = Proto.ResBuyCage.newBuilder()
                .setStatus(200)
                .setGold((int) newGold)
                .setCage(cage)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBuyCage(resBuyCage).build());
    }

    public boolean isEnoughGold(UserContext userContext, Proto.NoGrowthItem noGrowthItem, int quantity) {
        long newGold = userContext.getUser().getGold() - (long) noGrowthItem.getPrice() * quantity;
        return newGold >= 0;
    }

    public long updateUserGoldBuyItem(UserContext userContext, Proto.NoGrowthItem noGrowthItem, int quantity) {
        long newGold = userContext.getUser().getGold() - (long) noGrowthItem.getPrice() * quantity;
        UserDAO.updateGold(userContext.getUser().getUserId(), newGold);
        Proto.User newUserContext = userContext.getUser().toBuilder().setGold(newGold).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);
        return newGold;
    }

    public Proto.BuildingBase getCommonBuildingByName(String name) {
        Proto.BuildingBase commonBuildingBaseProto = CommonBuildingCache.me().getCommonBuildingByName(name);
        if (commonBuildingBaseProto == null) {
            CommonBuildingBean commonBuildingBean = BuildingDAO.getCommonBuildingByName(name);
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

    public Proto.Position getPositionByIndex(int indexToFind) {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("cage_position_base.csv");
        if (inputStream == null) {
            System.out.println("File không tồn tại!");
            return null;
        }
        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            br.readLine();
            while ((line = br.readLine()) != null) {
                // Sử dụng dấu phẩy để tách các giá trị
                String[] values = line.split(",");

                int index = Integer.parseInt(values[0]);
                if (index == indexToFind) {
                    int positionX = Integer.parseInt(values[1]);
                    int positionY = Integer.parseInt(values[2]);
                    return Proto.Position.newBuilder()
                            .setX(positionX)
                            .setY(positionY)
                            .build();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
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

    public Proto.ShopItem getShopItem(int shopItemId) {
        Proto.ShopItem shopItemProto = ShopItemCache.me().get(String.valueOf(shopItemId));
        if (shopItemProto == null) {
            //load shop item in db
            ShopItemBean shopItemBean = ShopItemDAO.getShopItemById(shopItemId);
            if (shopItemBean == null) return null;

            shopItemProto = Proto.ShopItem.newBuilder()
                    .setId(shopItemBean.getId())
                    .setType(shopItemBean.getType())
                    .setStatus(shopItemBean.getStatus())
                    .setNoGrowthItemId(shopItemBean.getNoGrowthItemId())
                    .build();
            ShopItemCache.me().add(shopItemProto);
        }

        return shopItemProto;
    }

    public Proto.NoGrowthItem getNoGrowthItem(int noGrowthItemId) {
        //get no growth item cache
        Proto.NoGrowthItem noGrowthItemProto = NoGrowthItemCache.me().get(String.valueOf(noGrowthItemId));
        if (noGrowthItemProto == null) {
            //get no growth item db
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(noGrowthItemId);
            if (noGrowthItemBean == null) return null;

            noGrowthItemProto = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setType(noGrowthItemBean.getType())
                    .setStatus(noGrowthItemBean.getStatus())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();
            NoGrowthItemCache.me().add(noGrowthItemProto);
        }
        return noGrowthItemProto;
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
            Proto.CommonGrowthItem commonGrowthItemProto = this.getCommonGrowthItemById(propertyGrowthItemBean.getGrowthItemId());
            List<Proto.CommonRisingTime> commonRisingTimesProto = getCommonRisingTimeByItemId(commonGrowthItemProto.getId());

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

    public Proto.CommonGrowthItem getCommonGrowthItemById(int commonGrowthItemId) {
        Proto.CommonGrowthItem commonGrowthItemProto = CommonGrowthItemCache.me().get(String.valueOf(commonGrowthItemId));
        if (commonGrowthItemProto == null) {
            CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemById(commonGrowthItemId);
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
        return commonGrowthItemProto;
    }

    public List<Proto.CommonRisingTime> getCommonRisingTimeByItemId(int commonGrowthItemId) {
        List<Proto.CommonRisingTime> commonRisingTimesProto = CommonRisingTimeCache.me().getCommonRisingTimesByItemId(commonGrowthItemId);
        if (commonRisingTimesProto == null || commonRisingTimesProto.isEmpty()) {
            List<CommonRisingTimeBean> commonRisingTimeBeans = CommonRisingTimeDAO.getCommonRisingTimesByItemId(commonGrowthItemId);
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
        return commonRisingTimesProto;
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


    public void animalEat(Session session, Proto.ReqAnimalEat reqAnimalEat) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return;

        PropertyAnimalBean propertyAnimalBean = PropertyAnimalDAO.getById(reqAnimalEat.getPropertyAnimalId());
        if (propertyAnimalBean.getIsHungry() == 0) return;

        PropertyGrowthItemBean propertyGrowthItemBean = PropertyGrowthItemDAO.getPropertyGrowthItemById(propertyAnimalBean.getPropertyGrowthItemId());
        Proto.CommonGrowthItem commonGrowthItemProto = CommonGrowthItemCache.me().get(String.valueOf(propertyGrowthItemBean.getGrowthItemId()));
        int newQuantity;
        WarehouseItemBean warehouseItemBean;
        if (commonGrowthItemProto == null) {
            CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemById(propertyGrowthItemBean.getGrowthItemId());
            warehouseItemBean = getNewQuantityAnimalFood(commonGrowthItemBean.getName(), userId);

        } else {
            warehouseItemBean = getNewQuantityAnimalFood(commonGrowthItemProto.getName(), userId);
        }

        if (warehouseItemBean == null) {
            Proto.ResAnimalEat resAnimalEat = Proto.ResAnimalEat.newBuilder()
                    .setStatus(400)
                    .setPropertyAnimalId(reqAnimalEat.getPropertyAnimalId())
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResAnimalEat(resAnimalEat).build());
            return;
        }

        int code = PropertyAnimalDAO.updateIsHungry(reqAnimalEat.getPropertyAnimalId(), 0);
        if (code != 200) return;

        Proto.NoGrowthItem noGrowthItemProto = getNoGrowthItemById(warehouseItemBean.getNoGrowthItemId());
        Proto.WarehouseItem warehouseItemProto = Proto.WarehouseItem.newBuilder().
                setUserId(warehouseItemBean.getUserId())
                .setNoGrowthItem(noGrowthItemProto)
                .setQuantity(warehouseItemBean.getQuantity())
                .setNoGrowthItemId(warehouseItemBean.getNoGrowthItemId())
                .build();

        Proto.ResAnimalEat resAnimalEat = Proto.ResAnimalEat.newBuilder()
                .setStatus(200)
                .setPropertyAnimalId(reqAnimalEat.getPropertyAnimalId())
                .setWarehouseItem(warehouseItemProto)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResAnimalEat(resAnimalEat).build());
    }

    public Proto.NoGrowthItem getNoGrowthItemById(int noGrowthItemId) {
        Proto.NoGrowthItem noGrowthItemProto = NoGrowthItemCache.me().get(String.valueOf(noGrowthItemId));
        if (noGrowthItemProto == null) {
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(noGrowthItemId);
            noGrowthItemProto = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                    .setStatus(noGrowthItemBean.getStatus())
                    .setType(noGrowthItemBean.getType())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();
            NoGrowthItemCache.me().add(noGrowthItemProto);
        }
        return noGrowthItemProto;
    }

    public WarehouseItemBean getNewQuantityAnimalFood(String animalName, int userId) {
        int newQuantity = -1;
        WarehouseItemBean warehouseItemBean = null;
        switch (animalName) {
            case COW_YELLOW:
                newQuantity = WarehouseDAO.updateReducedQuantityItem(userId, HAY_ID, QUANTITY_REDUCE);
                if (newQuantity == -1) return null;
                warehouseItemBean = WarehouseDAO.getWarehouseItemUser(userId, HAY_ID);
                break;
            case CHICKEN_BLUE:
                newQuantity = WarehouseDAO.updateReducedQuantityItem(userId, PADDY_GRAIN_ID, QUANTITY_REDUCE);
                if (newQuantity == -1) return null;
                warehouseItemBean = WarehouseDAO.getWarehouseItemUser(userId, PADDY_GRAIN_ID);
                break;
            default:
                break;
        }
        return warehouseItemBean;
    }

    public void addAnimalToCage(Session session, Proto.ReqAddAnimalToCage reqAddAnimalToCage) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return;

        PropertyBuildingBean propertyBuildingBean = BuildingDAO.getPropertyBuildingById(reqAddAnimalToCage.getCageId());
        if (propertyBuildingBean == null) return;
        UpgradeBean upgradeBean = UpgradeDAO.getById(propertyBuildingBean.getUpgradeId());
        int quantityAnimalInCage = PropertyAnimalDAO.countAnimalInCage(reqAddAnimalToCage.getCageId());
        if (quantityAnimalInCage >= upgradeBean.getCapacity()) {
            Proto.ResAddAnimalToCage resAddAnimalToCage = Proto.ResAddAnimalToCage.newBuilder()
                    .setStatus(401)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResAddAnimalToCage(resAddAnimalToCage).build());
            return;
        }

        Proto.BuildingBase commonBuildingBaseProto = getCommonBuildingById(propertyBuildingBean.getCommonBuildingId());
        WarehouseItemBean warehouseItemBean = null;
        switch (commonBuildingBaseProto.getName()) {
            case CAGE_COW:
                warehouseItemBean = WarehouseDAO.getWarehouseItemUserByNoGrowthItemName(userId, COW_YELLOW_LV1);
                break;
            case CAGE_CHICKEN:
                warehouseItemBean = WarehouseDAO.getWarehouseItemUserByNoGrowthItemName(userId, CHICKEN_BLUE_LV1);
                break;
        }
        if (warehouseItemBean == null || warehouseItemBean.getQuantity() == 0) {
            Proto.ResAddAnimalToCage resAddAnimalToCage = Proto.ResAddAnimalToCage.newBuilder()
                    .setStatus(400)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResAddAnimalToCage(resAddAnimalToCage).build());
            return;
        }

        int newQuantity = WarehouseDAO.updateReducedQuantityItem(userId, warehouseItemBean.getNoGrowthItemId(), QUANTITY_REDUCE);
        if (newQuantity == -1 || warehouseItemBean == null || warehouseItemBean.getQuantity() == 0) {
            Proto.ResAddAnimalToCage resAddAnimalToCage = Proto.ResAddAnimalToCage.newBuilder()
                    .setStatus(400)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResAddAnimalToCage(resAddAnimalToCage).build());
            return;
        }
        warehouseItemBean.setQuantity(newQuantity);
        Proto.WarehouseItem warehouseItemProto = Proto.WarehouseItem.newBuilder()
                .setUserId(warehouseItemBean.getUserId())
                .setNoGrowthItem(getNoGrowthItemById(warehouseItemBean.getNoGrowthItemId()))
                .setQuantity(warehouseItemBean.getQuantity())
                .setNoGrowthItemId(warehouseItemBean.getNoGrowthItemId())
                .build();

        Proto.Animal animal = createAnimal(commonBuildingBaseProto.getName(), reqAddAnimalToCage.getCageId());

        Proto.ResAddAnimalToCage resAddAnimalToCage = Proto.ResAddAnimalToCage.newBuilder()
                .setStatus(200)
                .setAnimal(animal)
                .setWarehouseItem(warehouseItemProto)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResAddAnimalToCage(resAddAnimalToCage).build());
    }

    public Proto.NoGrowthItem getNoGrowthItemByName(String name) {
        Proto.NoGrowthItem noGrowthItemProto = NoGrowthItemCache.me().getNoGrowthItemByName(name);
        if (noGrowthItemProto == null) {
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemByName(name);
            if (noGrowthItemBean == null) return null;
            noGrowthItemProto = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setType(noGrowthItemBean.getType())
                    .setStatus(noGrowthItemBean.getStatus())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();
            NoGrowthItemCache.me().add(noGrowthItemProto);
        }
        return noGrowthItemProto;
    }

    public Proto.CommonGrowthItem getCommonGrowthItemByName(String name) {
        Proto.CommonGrowthItem commonGrowthItemProto = CommonGrowthItemCache.me().getCommonGrowthItemByName(name);
        if (commonGrowthItemProto == null) {
            CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemByName(name);
            if (commonGrowthItemBean == null) return null;
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
        }
        return commonGrowthItemProto;
    }

    public Proto.Animal createAnimal(String commonBuildingBaseName, int cageId) {
        GameStateBean gameStateBean = GameStateDAO.getLastGameState();
        Proto.CommonGrowthItem commonGrowthItemProto = null;
        int idPropertyGrowthItem = -1;
        int idAnimal = -1;
        switch (commonBuildingBaseName) {
            case CAGE_COW:
                commonGrowthItemProto = this.getCommonGrowthItemByName(COW_YELLOW);
                idPropertyGrowthItem = PropertyGrowthItemDAO.insertPropertyGrowthItem(gameStateBean.getCurrentDate(), commonGrowthItemProto.getId());
                if (idPropertyGrowthItem == -1) return null;
                idAnimal = PropertyAnimalDAO.insertPropertyAnimal(cageId, idPropertyGrowthItem);
                break;
            case CAGE_CHICKEN:
                commonGrowthItemProto = this.getCommonGrowthItemByName(CHICKEN_BLUE);
                idPropertyGrowthItem = PropertyGrowthItemDAO.insertPropertyGrowthItem(gameStateBean.getCurrentDate(), commonGrowthItemProto.getId());
                if (idPropertyGrowthItem == -1) return null;
                idAnimal = PropertyAnimalDAO.insertPropertyAnimal(cageId, idPropertyGrowthItem);
                break;
        }

        PropertyAnimalBean propertyAnimalBean = PropertyAnimalDAO.getById(idAnimal);
        PropertyGrowthItemBean propertyGrowthItemBean = PropertyGrowthItemDAO.getPropertyGrowthItemById(idPropertyGrowthItem);
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

        List<Proto.CommonRisingTime> commonRisingTimesProto = getCommonRisingTimeByItemId(commonGrowthItemProto.getId());

        return Proto.Animal.newBuilder()
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
    }
}
