package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class GameStateCache extends RedisClusterHelper implements ICache<Proto.GameState> {
    private static final GameStateCache instance = new GameStateCache();
    private static final Cache<String, Proto.GameState> gameStateMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final Cache<String, Integer> gameStateNow = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final String GAMES_STATES_KEY = "game_states";
    private static final String GAME_STATE_NOW_KEY = "game_state_now";

    private GameStateCache() {
    }

    public static GameStateCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, Proto.GameState value) {
        return false;
    }

    @Override
    public boolean add(Proto.GameState value) {
        return false;
    }

    @Override
    public Proto.GameState get(String key) {
        return null;
    }

    @Override
    public List<Proto.GameState> getAll() {
        return null;
    }

    @Override
    public Set<String> getKeys() {
        return null;
    }

    @Override
    public Proto.GameState remove(String key) {
        return null;
    }

    @Override
    public boolean containsKey(String key) {
        return false;
    }

    @Override
    public void clear() {

    }

    @Override
    public String getKey(Proto.GameState value) {
        return null;
    }

    public void addGameStateNow(Proto.GameState gameState) {
        if (gameState == null) return;
        addGameStateNowRedis(gameState);
        addGameStateNowLocal(gameState);
    }

    public Proto.GameState getGameStateNow() {
        Proto.GameState gameState = getGameStateNowLocal();
        if (gameState == null) {
            gameState = getGameStateNowRedis();
            addGameStateNowLocal(gameState);
        }
        return gameState;
    }

    public void addGameStateNowLocal(Proto.GameState gameState) {
        gameStateNow.put("id", gameState.getId());
        gameStateNow.put("current_date", gameState.getCurrentDate());
        gameStateNow.put("times_of_day", gameState.getTimesOfDay());
        gameStateNow.put("current_weather", gameState.getCurrentWeather());
        gameStateNow.put("current_season", gameState.getCurrentSeason());
        gameStateNow.put("times_of_season", gameState.getTimesOfSeason());
    }

    public void addGameStateNowRedis(Proto.GameState gameState) {
        getConnection().hset(GAME_STATE_NOW_KEY.getBytes(), "id".getBytes(), String.valueOf(gameState.getId()).getBytes());
        getConnection().hset(GAME_STATE_NOW_KEY.getBytes(), "current_date".getBytes(), String.valueOf(gameState.getCurrentDate()).getBytes());
        getConnection().hset(GAME_STATE_NOW_KEY.getBytes(), "times_of_day".getBytes(), String.valueOf(gameState.getTimesOfDay()).getBytes());
        getConnection().hset(GAME_STATE_NOW_KEY.getBytes(), "current_weather".getBytes(), String.valueOf(gameState.getCurrentWeather()).getBytes());
        getConnection().hset(GAME_STATE_NOW_KEY.getBytes(), "current_season".getBytes(), String.valueOf(gameState.getCurrentSeason()).getBytes());
        getConnection().hset(GAME_STATE_NOW_KEY.getBytes(), "times_of_season".getBytes(), String.valueOf(gameState.getTimesOfSeason()).getBytes());
    }

    public Proto.GameState getGameStateNowLocal() {
        Integer id = gameStateNow.getIfPresent("id");
        Integer currentDate = gameStateNow.getIfPresent("current_date");
        Integer timesOfDay = gameStateNow.getIfPresent("times_of_day");
        Integer currentWeather = gameStateNow.getIfPresent("current_weather");
        Integer currentSeason = gameStateNow.getIfPresent("current_season");
        Integer timesOfSeason = gameStateNow.getIfPresent("times_of_season");
        if (id == null || currentDate == null || timesOfDay == null || currentWeather == null || currentSeason == null || timesOfSeason == null) {
            return null;
        }
        return Proto.GameState.newBuilder()
                .setId(id)
                .setCurrentDate(currentDate)
                .setTimesOfDay(timesOfDay)
                .setCurrentWeather(currentWeather)
                .setCurrentSeason(currentSeason)
                .setTimesOfSeason(timesOfSeason)
                .build();
    }

    public Proto.GameState getGameStateNowRedis() {
        byte[] idByte = getConnection().hget(GAME_STATE_NOW_KEY.getBytes(), "id".getBytes());
        byte[] currentDateByte = getConnection().hget(GAME_STATE_NOW_KEY.getBytes(), "current_date".getBytes());
        byte[] timesOfDayByte = getConnection().hget(GAME_STATE_NOW_KEY.getBytes(), "times_of_day".getBytes());
        byte[] currentWeatherByte = getConnection().hget(GAME_STATE_NOW_KEY.getBytes(), "current_weather".getBytes());
        byte[] currentSeasonByte = getConnection().hget(GAME_STATE_NOW_KEY.getBytes(), "current_season".getBytes());
        byte[] timesOfSeasonByte = getConnection().hget(GAME_STATE_NOW_KEY.getBytes(), "times_of_season".getBytes());

        if (idByte == null || currentDateByte == null || timesOfDayByte == null || currentWeatherByte == null || currentSeasonByte == null || timesOfSeasonByte == null) {
            return null;
        }
        return Proto.GameState.newBuilder()
                .setId(Integer.parseInt(new String(idByte)))
                .setCurrentDate(Integer.parseInt(new String(currentDateByte)))
                .setTimesOfDay(Integer.parseInt(new String(timesOfDayByte)))
                .setCurrentWeather(Integer.parseInt(new String(currentWeatherByte)))
                .setCurrentSeason(Integer.parseInt(new String(currentSeasonByte)))
                .setTimesOfSeason(Integer.parseInt(new String(timesOfSeasonByte)))
                .build();
    }

}
