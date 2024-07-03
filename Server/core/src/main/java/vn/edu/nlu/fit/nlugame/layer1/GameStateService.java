package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.GameStateDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.GameStateBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.ArrayList;
import java.util.Map;

public class GameStateService {
    private static final GameStateService install = new GameStateService();

    private GameStateService() {
    }

    public static GameStateService me() {
        return install;
    }

    public void updateGameState() {
        GameStateDAO.me().updateTimeGame();
        Map<String, UserContext> userContexts = UserCache.me().getAllUserOnline();
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(new ArrayList<>(userContexts.keySet()));
        GameStateBean gameState = GameStateDAO.me().getGameState();
        Proto.GameState gameStateProto = Proto.GameState.newBuilder()
                .setTimesOfDay(gameState.getTimesOfDay())
                .setCurrentDate(gameState.getCurrentDate())
                .setCurrentWeather(gameState.getCurrentWeather())
                .setCurrentSeason(gameState.getCurrentSeason())
                .build();
        Proto.ResGameState resGameState = Proto.ResGameState.newBuilder()
                .setGameState(gameStateProto)
                .build();
        DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder()
                .setResGameState(resGameState)
                .build());
    }

    public void sendGameStateLogin(Session session){
        GameStateBean gameState = GameStateDAO.me().getGameState();
        Proto.GameState gameStateProto = Proto.GameState.newBuilder()
                .setTimesOfDay(gameState.getTimesOfDay())
                .setCurrentDate(gameState.getCurrentDate())
                .setCurrentWeather(gameState.getCurrentWeather())
                .setCurrentSeason(gameState.getCurrentSeason())
                .build();
        Proto.ResGameState resGameState = Proto.ResGameState.newBuilder()
                .setGameState(gameStateProto)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                .setResGameState(resGameState)
                .build());
    }

}
