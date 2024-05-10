package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PlayerBean;

public class PlayerDAO extends BaseDAO{
    private static final String TABLE_NAME = "players";

    public static int insertPlayer(String playerName, int userId, int characterId, int level) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 500;
        }
        try {
            Integer result = jdbi.withHandle(h -> h.createUpdate(
                            "insert into " + TABLE_NAME + " (player_name, user_id, character_id, level) " +
                                    "values (:player_name, :user_id, :character_id, :level)")
                    .bind("player_name", playerName)
                    .bind("user_id", userId)
                    .bind("character_id", characterId)
                    .bind("level", level)
                    .execute());
            return result == 1 ? 200 : 500;
        } catch (Exception e) {
            System.out.println("Error: Insert player failed: " + e);
            return 500;
        }
    }

    public static PlayerBean getPlayerByUserId(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        try {
            return jdbi.withHandle(h -> h.createQuery("select id, player_name, character_id, user_id, `level`, area_id from " + TABLE_NAME + " where user_id = :user_id")
                    .bind("user_id", userId)
                    .mapToBean(PlayerBean.class)
                    .findFirst()
                    .orElse(null));
        } catch (Exception e) {
            System.out.println("Error: Get player by user id failed: " + e);
            return null;
        }

    }
}
