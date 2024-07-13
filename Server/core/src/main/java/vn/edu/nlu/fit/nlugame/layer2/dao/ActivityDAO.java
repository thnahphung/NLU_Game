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
        return jdbi.withHandle(handle -> handle.createQuery("SELECT id, turn, code, type, min_level, start_date, end_date, character_id FROM " + TABLE_NAME + " WHERE id = :id")
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
    public static ProgressActivityBean getProgressTaskByCode(int userId, String code) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT p.user_id, p.activity_id, p.progress, p.status FROM progress_activities p left join activities a on p.activity_id = a.id WHERE a.code = :code and p.user_id = :userId")
                .bind("code", code)
                .bind("userId", userId)
                .mapToBean(ProgressActivityBean.class)
                .findOne().orElse(null));
    }
}
