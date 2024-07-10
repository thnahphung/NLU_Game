package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.CommonGrowthItemDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.GameStateDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.GameStateBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.ArrayList;
import java.util.Map;
import java.util.Random;

public class GameStateService {
    private static final GameStateService instance = new GameStateService();
    private static final int TIME_INCREMENT = 1; // Increment time by 1 game hour
    private static final int MINUTES_PER_DAY = 24;
    private static final int TOTAL_DAYS_PER_SEASON = 120;
    private static final int TOTAL_SEASON = 3;

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
            CommonGrowthItemDAO.updateIncreateDevelopedDays();
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

}
