package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ProgressActivityBean;

import java.util.ArrayList;
import java.util.List;

public class ProgressActivityDAO extends BaseDAO{
    private static final String TABLE_NAME = "progress_activities";

    public static void insertProgressActivity(int userId, int activityId, int progress, int status) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(handle -> handle.createUpdate("INSERT INTO " + TABLE_NAME + " (user_id, activity_id, progress, status) VALUES (:userId, :activityId, :progress, :status)")
                .bind("userId", userId)
                .bind("activityId", activityId)
                .bind("progress", progress)
                .bind("status", status)
                .execute());
    }

    public static List<ProgressActivityBean> getProgressActivityByUserId(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT user_id, activity_id, progress, status FROM " + TABLE_NAME + " WHERE user_id = :userId")
                .bind("userId", userId)
                .mapToBean(ProgressActivityBean.class)
                .list());
    }

    public static List<ProgressActivityBean> getProgressTaskLikeCode(int userId, String code) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT p.user_id, p.activity_id, p.progress, p.status FROM "+TABLE_NAME+" p left join activities a on p.activity_id = a.id WHERE a.code like :code and p.user_id = :userId")
                .bind("code", "%"+code+"%")
                .bind("userId", userId)
                .mapToBean(ProgressActivityBean.class)
                .list());
    }

    public static ProgressActivityBean getProgressTaskByCode(int userId, String code) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT p.user_id, p.activity_id, p.progress, p.status FROM "+TABLE_NAME+" p left join activities a on p.activity_id = a.id WHERE a.code = :code and p.user_id = :userId")
                .bind("code", code)
                .bind("userId", userId)
                .mapToBean(ProgressActivityBean.class)
                .stream().findFirst().orElse(null));
    }

    public static void updateProgressActivities(List<ProgressActivityBean> progressActivityBeans) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.useHandle(handle -> {
            PreparedBatch batch = handle.prepareBatch(
                    "UPDATE " + TABLE_NAME + " SET progress = :progress, status = :status WHERE user_id = :userId AND activity_id = :activityId"
            );
            for (ProgressActivityBean bean : progressActivityBeans) {
                        batch.bind("userId", bean.getUserId())
                        .bind("activityId", bean.getActivityId())
                        .bind("progress", bean.getProgress())
                        .bind("status", bean.getStatus())
                        .add();
            }
            batch.execute();
        });
    }

    public static int updateProgressActivity(ProgressActivityBean progressActivityBean) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 500;
        }
        int count = jdbi.withHandle(handle -> handle.createUpdate("UPDATE " + TABLE_NAME + " SET progress = :progress, status = :status WHERE user_id = :userId AND activity_id = :activityId")
                .bind("userId", progressActivityBean.getUserId())
                .bind("activityId", progressActivityBean.getActivityId())
                .bind("progress", progressActivityBean.getProgress())
                .bind("status", progressActivityBean.getStatus())
                .execute());
        if (count == 1) {
            return 200;
        }
        return 500;
    }
    public static ProgressActivityBean getProgressActivityById(int userId, int activityId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT user_id, activity_id, progress, status FROM " + TABLE_NAME + " WHERE user_id = :userId AND activity_id = :activityId")
                .bind("userId", userId)
                .bind("activityId", activityId)
                .mapToBean(ProgressActivityBean.class)
                .stream().findFirst().orElse(null));
    }
}
