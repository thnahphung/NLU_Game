package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.GameStateBean;

public class GameStateDAO extends BaseDAO {
    private static final GameStateDAO install = new GameStateDAO();
    private static final int TIME_INCREMENT = 1; // Increment time by 1 game hour
    private static final int MINUTES_PER_DAY  = 48;
    private static final int TIME_UNIT_MINUTES = 12; // Real-time minutes per game hour
    private GameStateDAO() {
    }

    public static GameStateDAO me() {
        return install;
    }

    public void updateTimeGame() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }

        String selectQuery = "SELECT `current_date`, times_of_day, current_weather, current_season FROM game_state WHERE id = 1";

        jdbi.useHandle(handle -> {
            handle.createQuery(selectQuery)
                    .mapToBean(GameStateBean.class)
                    .stream()
                    .findFirst()
                    .ifPresent(gameState -> {
                        int timesOfDay = gameState.getTimesOfDay();
                        int currentDate = gameState.getCurrentDate();
                        String currentWeather = gameState.getCurrentWeather();
                        String currentSeason = gameState.getCurrentSeason();

                        timesOfDay += TIME_INCREMENT;
                        if (timesOfDay > MINUTES_PER_DAY ) {
                            timesOfDay = 1;
                            currentDate += 1;
                        }
                        System.out.println("date: "+currentDate +", time: " + timesOfDay);
                        String updateQuery = "UPDATE game_state SET times_of_day = :newTimesOfDay, `current_date` = :newDay WHERE id = 1";
                        handle.createUpdate(updateQuery)
                                .bind("newTimesOfDay", timesOfDay)
                                .bind("newDay", currentDate)
                                .execute();
                    });
        });
    }

    public int getDate() {
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

    public static void main(String[] args) {
        GameStateDAO.me().updateTimeGame();
    }
}
