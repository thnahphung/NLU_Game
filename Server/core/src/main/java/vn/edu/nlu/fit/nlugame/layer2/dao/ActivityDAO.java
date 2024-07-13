package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ActivityBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ProgressActivityBean;

import java.util.List;

public class ActivityDAO extends BaseDAO{
    private static final String TABLE_NAME = "activities";
    public static ActivityBean getTaskById(int id) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT a.id, a.turn, a.code, a.type, a.min_level, a.start_date, a.end_date, a.character_id, r.no_growth_item_id, r.quantity FROM " + TABLE_NAME + " a left join reward_items r on a.id = r.activity_id WHERE a.id = :id and a.type = 0")
                .bind("id", id)
                .mapToBean(ActivityBean.class)
                .findOne().orElse(null));
    }

    public static List<ActivityBean> getTaskByCharacterId(int characterId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT a.id, a.turn, a.code, a.type, a.min_level, a.start_date, a.end_date, a.character_id, r.no_growth_item_id, r.quantity FROM " + TABLE_NAME + " a left join reward_items r on a.id = r.activity_id WHERE a.type = 0 and a.character_id = :characterId and a.start_date <= now() and a.end_date >= now()")
                .bind("characterId", characterId)
                .mapToBean(ActivityBean.class)
                .list());
    }

    public static void updateRepeatTimeActivity() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.useHandle(handle -> handle.createUpdate("UPDATE "+ TABLE_NAME +" SET start_date = NOW(), end_date = NOW() + INTERVAL repeat_time DAY WHERE repeat_time > 0;")
                .execute());
    }

    public static void main(String[] args) {
    }
}
