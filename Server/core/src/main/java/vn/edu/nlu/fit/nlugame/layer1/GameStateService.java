package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.AreaCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.*;

public class GameStateService {
    private static final GameStateService instance = new GameStateService();
    private static final int TIME_INCREMENT = 1; // Increment time by 1 game hour
    private static final int MINUTES_PER_DAY = 24;
    private static final int TOTAL_DAYS_PER_SEASON = 120;
    private static final int TOTAL_SEASON = 3;
    private static final float DISEASE_RATE = 0.2f;

    private GameStateService() {
    }

    public static GameStateService me() {
        return instance;
    }

    public void sendGameStateLogin(Session session) {
        GameStateBean gameState = GameStateDAO.getLastGameState();
        Proto.GameState gameStateProto = Proto.GameState.newBuilder()
                .setTimesOfDay(gameState.getTimesOfDay())
                .setCurrentDate(gameState.getCurrentDate())
                .setCurrentWeather(gameState.getCurrentWeather())
                .setCurrentSeason(gameState.getCurrentSeason())
                .setTimesOfSeason(gameState.getTimesOfSeason())
                .build();
        Proto.ResGameState resGameState = Proto.ResGameState.newBuilder()
                .setGameState(gameStateProto)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                .setResGameState(resGameState)
                .build());
    }

    public void updateTimeGame() {
        GameStateBean lastGameState = GameStateDAO.getLastGameState();
        int code = 0;
        int timesOfDay = lastGameState.getTimesOfDay() + TIME_INCREMENT;
        if (timesOfDay <= MINUTES_PER_DAY) {
            code = GameStateDAO.updateTimeOfDay(lastGameState.getId(), timesOfDay);
        } else {
            GameStateBean newGameStateBean = createNewDate(lastGameState);
            code = GameStateDAO.insertGameState(newGameStateBean);
            // Update developed days of growth items
//            PropertyGrowthItemDAO.updateIncreateDevelopedDays();
            PropertyGrowthItemDAO.updateIncreateAnimalDevelopedDays();
            PropertyAnimalDAO.updateAllAnimalIsHungry();
            randomAnimalDisease(newGameStateBean);
        }
        if (code == 200) {
            GameStateBean newGameStateBean = GameStateDAO.getLastGameState();
            Proto.GameState gameStateProto = Proto.GameState.newBuilder()
                    .setId(newGameStateBean.getId())
                    .setTimesOfDay(newGameStateBean.getTimesOfDay())
                    .setCurrentDate(newGameStateBean.getCurrentDate())
                    .setCurrentWeather(newGameStateBean.getCurrentWeather())
                    .setCurrentSeason(newGameStateBean.getCurrentSeason())
                    .setTimesOfSeason(newGameStateBean.getTimesOfSeason())
                    .build();
            sendNewDateToAllUser(gameStateProto);
        }
    }

    private void sendNewDateToAllUser(Proto.GameState newGameStateProto) {
        Map<String, UserContext> userContexts = UserCache.me().getAllUserOnline();
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(new ArrayList<>(userContexts.keySet()));
        Proto.ResGameState resGameState = Proto.ResGameState.newBuilder().setGameState(newGameStateProto).build();
        DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResGameState(resGameState).build());
    }

    private GameStateBean createNewDate(GameStateBean lastGameState) {
        int timesOfDay = 1;
        int currentDate = lastGameState.getCurrentDate() + 1;
        int currentSeason = lastGameState.getCurrentSeason();
        int timesOfSeason = lastGameState.getTimesOfSeason() + 1;
        if (timesOfSeason > TOTAL_DAYS_PER_SEASON) {
            timesOfSeason = 1;
            currentSeason += 1;
            if (currentSeason > TOTAL_SEASON) {
                currentSeason = 0;
            }
        }
        return GameStateBean.builder()
                .currentDate(currentDate)
                .currentWeather(createWeather())
                .currentSeason(currentSeason)
                .timesOfDay(timesOfDay)
                .timesOfSeason(timesOfSeason)
                .build();
    }

    public int createWeather() {
        Random random = new Random();
        int weather = random.nextInt(2);
        return weather;
    }

    public void randomAnimalDisease(GameStateBean newGameStateBean) {
        List<PropertyAnimalBean> propertyAnimalBeansNotDisease = PropertyAnimalDAO.getAllAnimalNotDisease();
        List<DiseaseBean> diseaseBeans = DiseaseDAO.getAll();
        Set<Integer> randomNumbers = generateUniqueRandomNumbers((int) (propertyAnimalBeansNotDisease.size() * DISEASE_RATE), 0, propertyAnimalBeansNotDisease.size() - 1);
        Random random = new Random();
        // key is cage id, value is list animal in cage
        Map<Integer, List<PropertyAnimalBean>> animalCageMap = new HashMap<>();
        for (Integer index : randomNumbers) {
            PropertyAnimalBean propertyAnimalBean = propertyAnimalBeansNotDisease.get(index);
            DiseaseBean diseaseBean = diseaseBeans.get(random.nextInt(diseaseBeans.size()));
            PropertyGrowthItemDAO.updateDisease(propertyAnimalBean.getPropertyGrowthItemId(), diseaseBean.getId(), newGameStateBean.getCurrentDate());
            if (animalCageMap.containsKey(propertyAnimalBean.getCageId())) {
                animalCageMap.get(propertyAnimalBean.getCageId()).add(propertyAnimalBean);
            } else {
                List<PropertyAnimalBean> propertyAnimalBeans = new ArrayList<>();
                propertyAnimalBeans.add(propertyAnimalBean);
                animalCageMap.put(propertyAnimalBean.getCageId(), propertyAnimalBeans);
            }
        }

        //key is areId, value is list cage in area
        Map<Integer, List<PropertyBuildingBean>> propertyBuildingAreaMap = new HashMap<>();
        for (Map.Entry<Integer, List<PropertyAnimalBean>> entry : animalCageMap.entrySet()) {
            int cageId = entry.getKey();
            PropertyBuildingBean propertyBuilding = BuildingDAO.getPropertyBuildingById(cageId);
            if (propertyBuildingAreaMap.containsKey(propertyBuilding.getAreaId())) {
                propertyBuildingAreaMap.get(propertyBuilding.getAreaId()).add(propertyBuilding);
            } else {
                List<PropertyBuildingBean> propertyBuildings = new ArrayList<>();
                propertyBuildings.add(propertyBuilding);
                propertyBuildingAreaMap.put(propertyBuilding.getAreaId(), propertyBuildings);
            }
        }

        Map<Integer, PropertyGrowthItemBean> propertyGrowthItemBeanMap = PropertyGrowthItemDAO.getPropertiesGrowthItemDisease(newGameStateBean.getCurrentDate());

        //duyet qua tung area
        for (Map.Entry<Integer, List<PropertyBuildingBean>> entry : propertyBuildingAreaMap.entrySet()) {
            int areaId = entry.getKey();
            List<PropertyBuildingBean> propertyBuildings = entry.getValue();
            List<PropertyAnimalBean> listAnimalBeanInArea = new ArrayList<>();
            //get all animal in area
            for (PropertyBuildingBean propertyBuilding : propertyBuildings) {
                List<PropertyAnimalBean> propertyAnimalBeans = animalCageMap.get(propertyBuilding.getId());
                listAnimalBeanInArea.addAll(propertyAnimalBeans);
            }

            List<Proto.Animal> listAnimalProtoInArea = new ArrayList<>();
            for (PropertyAnimalBean propertyAnimalBean : listAnimalBeanInArea) {
                PropertyGrowthItemBean propertyGrowthItemBean = propertyGrowthItemBeanMap.get(propertyAnimalBean.getPropertyGrowthItemId());
                Proto.PropertyGrowthItem propertyGrowthItemProto = Proto.PropertyGrowthItem.newBuilder()
                        .setId(propertyGrowthItemBean.getId())
                        .setCurrentDiseaseId(propertyGrowthItemBean.getCurrentDiseaseId())
                        .setDiseaseRate(propertyGrowthItemBean.getDiseaseRate())
                        .setIsDisease(propertyGrowthItemBean.getIsDisease() > 0)
                        .setStartTimeDisease(propertyGrowthItemBean.getStartTimeDisease())
                        .setHealth(propertyGrowthItemBean.getHealth())
                        .setStage(propertyGrowthItemBean.getStage())
                        .setStartDate(propertyGrowthItemBean.getStartDate())
                        .setGrowthItemId(propertyGrowthItemBean.getGrowthItemId())
                        .setDevelopedDays(propertyGrowthItemBean.getDevelopedDays())
                        .build();

                Proto.Animal animalProto = Proto.Animal.newBuilder()
                        .setId(propertyAnimalBean.getId())
                        .setIsPregnant(propertyAnimalBean.getIsPregnant())
                        .setStartTimePregnant(propertyAnimalBean.getStartTimePregnant())
                        .setEndTimePregnant(propertyAnimalBean.getEndTimePregnant())
                        .setIsHungry(propertyAnimalBean.getIsHungry())
                        .setStatus(propertyAnimalBean.getStatus())
                        .setCageId(propertyAnimalBean.getCageId())
                        .setPropertyGrowthItemsId(propertyAnimalBean.getPropertyGrowthItemId())
                        .setPropertyGrowthItem(propertyGrowthItemProto)
                        .build();
                listAnimalProtoInArea.add(animalProto);
            }

            ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(areaId));
            ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);

            Proto.ResAnimalDisease resAnimalDisease = Proto.ResAnimalDisease.newBuilder()
                    .addAllAnimals(listAnimalProtoInArea)
                    .build();

            DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResAnimalDisease(resAnimalDisease).build());
        }
    }

    public static Set<Integer> generateUniqueRandomNumbers(int n, int min, int max) {
        if (n > (max - min + 1)) {
            throw new IllegalArgumentException("Số lượng số cần tạo lớn hơn phạm vi cho phép.");
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        Random random = new Random();

        while (uniqueNumbers.size() < n) {
            int randomNumber = random.nextInt((max - min) + 1) + min;
            uniqueNumbers.add(randomNumber);
        }

        return uniqueNumbers;
    }


}
