package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.GameStateBean;

public class GameStateDAO extends BaseDAO {
    private static final String TABLE_NAME = "game_state";

    public static int insertGameState(GameStateBean gameStateBean) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 402;
        }
        try {
            Integer count = jdbi.withHandle(h -> h.createUpdate(
                            "insert into " + TABLE_NAME + " (`current_date`,current_weather, current_season, times_of_day, times_of_season) " +
                                    "values (:current_date,:current_weather, :current_season, :times_of_day, :times_of_season)")
                    .bind("current_date", gameStateBean.getCurrentDate())
                    .bind("current_weather", gameStateBean.getCurrentWeather())
                    .bind("current_season", gameStateBean.getCurrentSeason())
                    .bind("times_of_day", gameStateBean.getTimesOfDay())
                    .bind("times_of_season", gameStateBean.getTimesOfSeason())
                    .execute());
            return count == 1 ? 200 : 400;
        } catch (Exception e) {
            System.out.println("Error insert game state: " + e.getMessage());
            return 500;
        }
    }

    public static int updateTimeOfDay(int id, int timeOfDay) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 402;
        }
        try {
            Integer count = jdbi.withHandle(h -> h.createUpdate(
                            "update " + TABLE_NAME + " set times_of_day = :times_of_day where id = :id")
                    .bind("times_of_day", timeOfDay)
                    .bind("id", id)
                    .execute());
            return count == 1 ? 200 : 400;
        } catch (Exception e) {
            System.out.println("Error update time of day: " + e.getMessage());
            return 500;
        }
    }

    public static int getDate() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return -1;
        }

        String selectQuery = "SELECT `current_date` FROM game_state WHERE id = 1";

        return jdbi.withHandle(handle -> handle.createQuery(selectQuery)
                .mapTo(Integer.class)
                .stream()
                .findFirst()
                .orElse(-1));
    }

    public static GameStateBean getLastGameState() {
        return getJdbi().withHandle(handle -> handle.createQuery(
                        "SELECT id, `current_date`,current_weather, current_season, times_of_day, times_of_season " +
                                "FROM " + TABLE_NAME + " ORDER BY `current_date` DESC LIMIT 1")
                .mapToBean(GameStateBean.class)
                .stream()
                .findFirst()
                .orElse(null));
    }
}
