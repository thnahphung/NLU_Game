package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.RewardItemBean;

import java.util.List;

public class RewardDAO extends BaseDAO{
    private static final String TABLE_NAME = "reward_items";

    public static List<RewardItemBean> getRewardsByActivityId(int activityId) {
        if (getJdbi() == null) {
            return null;
        }
        return getJdbi().withHandle(handle -> handle.createQuery("SELECT activity_id, no_growth_item_id, quantity FROM " + TABLE_NAME + " WHERE activity_id = :activityId")
                .bind("activityId", activityId)
                .mapToBean(RewardItemBean.class)
                .list());
    }

    public static List<RewardItemBean> getRewardsByActivityIds(List<Integer> activityIds) {
        if (getJdbi() == null) {
            return null;
        }
        String query = "SELECT activity_id, no_growth_item_id, quantity FROM " + TABLE_NAME + " WHERE activity_id IN (<activityIds>)";
        return getJdbi().withHandle(handle ->
                handle.createQuery(query)
                        .bindList("activityIds", activityIds)
                        .mapToBean(RewardItemBean.class)
                        .list()
        );
    }


    public static void main(String[] args) {
        List<Integer> activityIds = List.of(1, 2, 3);
        System.out.println(RewardDAO.getRewardsByActivityIds(activityIds));;
    }
}
