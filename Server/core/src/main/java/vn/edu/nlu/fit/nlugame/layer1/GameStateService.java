package vn.edu.nlu.fit.nlugame.layer1;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.websocket.Session;
import org.apache.http.client.fluent.Request;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.AreaCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

public class GameStateService {
    private static final GameStateService instance = new GameStateService();
    //    private static final int TIME_INCREMENT = 1; // Increment time by 1 game hour
//    private static final int MINUTES_PER_DAY = 30;
//    private static final int TOTAL_DAYS_PER_SEASON = 120;
    private static final int TOTAL_SEASON = 3;
    private static final float DISEASE_RATE = 0.1f;

    private static final List<Integer> WEATHERS_SUNNY = Arrays.asList(1000, 1003, 1006, 1009, 1030, 1066, 1069, 1072, 1087, 1114, 1117, 1135, 1147, 1150, 1153, 1168, 1171, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282);
    private static final List<Integer> WEATHERS_RAIN = Arrays.asList(1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276);

    //https://api.weatherapi.com/v1/current.json?key=ca5c5dd26e0845b0b2070027242307&q=10.8700,106.7901
    private static final String WEATHER_URL = ConstUtils.WEATHER_API_URL + "?key=" + ConstUtils.WEATHER_API_KEY + "&q=" + ConstUtils.WEATHER_API_QUERY;

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
        GameStateBean newGameStateBean = createNewDate(lastGameState);
        GameStateDAO.insertGameState(newGameStateBean);
        // Update developed days of growth items
        PropertyGrowthItemDAO.updateIncreateCropDevelopedDays();
        PropertyGrowthItemDAO.updateIncreateAnimalDevelopedDays();
        PropertyAnimalDAO.updateAllAnimalIsHungry();
        randomAnimalDisease(newGameStateBean);
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

    private void sendNewDateToAllUser(Proto.GameState newGameStateProto) {
        Map<String, UserContext> userContexts = UserCache.me().getAllUserOnline();
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(new ArrayList<>(userContexts.keySet()));
        Proto.ResGameState resGameState = Proto.ResGameState.newBuilder().setGameState(newGameStateProto).build();
        DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResGameState(resGameState).build());
    }

    private GameStateBean createNewDate(GameStateBean lastGameState) {
        int currentDate = lastGameState.getCurrentDate() + 1;
//        int weather = this.createWeather();
        int weather = 0;
        return GameStateBean.builder()
                .currentDate(currentDate)
                .currentWeather(weather)
                .currentSeason(0)
                .timesOfDay(LocalDateTime.now().getHour())
                .timesOfSeason(0)
                .build();
    }

    public int createWeather() {
        String response = null;
        try {
            response = Request.Get(WEATHER_URL).execute().returnContent().asString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (response == null) {
            return ConstUtils.WEATHER.SUNNY.getValue();
        }
        JsonObject jObj = new Gson().fromJson(response, JsonObject.class);
        JsonObject currentObject = jObj.get("current").getAsJsonObject();
        int weatherCode = Integer.parseInt(currentObject.get("condition").getAsJsonObject().get("code").getAsString());
        return WEATHERS_RAIN.contains(weatherCode) ? ConstUtils.WEATHER.RAIN.getValue() : ConstUtils.WEATHER.SUNNY.getValue();
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
            PropertyGrowthItemDAO.updateDisease(propertyAnimalBean.getPropertyGrowthItemId(), diseaseBean.getId(), newGameStateBean.getCurrentDate(), true);
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
