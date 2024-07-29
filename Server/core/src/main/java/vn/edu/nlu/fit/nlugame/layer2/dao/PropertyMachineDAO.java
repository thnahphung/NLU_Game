package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyMachineBean;

import java.util.List;

public class PropertyMachineDAO extends BaseDAO{
    private static final String TABLE_NAME = "property_machines";

    public static List<PropertyMachineBean> getAllPropertyMachinesByUser(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle ->
                handle.createQuery("SELECT id, speed, durable, power, number_star, level, value, rate, no_growth_item_id, user_id " +
                                "FROM " + TABLE_NAME + " WHERE user_id = :userId")
                        .bind("userId", userId)
                        .mapToBean(PropertyMachineBean.class)
                        .list());
    }

    public static void insertPropertyMachine(PropertyMachineBean propertyMachineBean) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.useHandle(handle -> {
            handle.createUpdate("INSERT INTO " + TABLE_NAME + " (speed, durable, power, number_star, level, value, no_growth_item_id, user_id, rate) " +
                    "VALUES (:speed, :durable, :power, :numberStar, :level, :value, :noGrowthItemId, :userId: rate)")
                    .bind("speed", propertyMachineBean.getSpeed())
                    .bind("durable", propertyMachineBean.getDurable())
                    .bind("power", propertyMachineBean.getPower())
                    .bind("numberStar", propertyMachineBean.getNumberStar())
                    .bind("level", propertyMachineBean.getLevel())
                    .bind("value", propertyMachineBean.getValue())
                    .bind("noGrowthItemId", propertyMachineBean.getNoGrowthItemId())
                    .bind("userId", propertyMachineBean.getUserId())
                    .bind("rate", propertyMachineBean.getRate())
                    .execute();
        });
    }

    public static void insertPropertyMachines(List<PropertyMachineBean> propertyMachineBeans) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.useHandle(handle -> {
            PreparedBatch batch = handle.prepareBatch("INSERT INTO " + TABLE_NAME + " (speed, durable, power, number_star, level, value, no_growth_item_id, user_id, rate) " +
                    "VALUES (:speed, :durable, :power, :numberStar, :level, :value, :noGrowthItemId, :userId, :rate)");
            for (PropertyMachineBean propertyMachineBean : propertyMachineBeans) {
                batch.bind("speed", propertyMachineBean.getSpeed())
                        .bind("durable", propertyMachineBean.getDurable())
                        .bind("power", propertyMachineBean.getPower())
                        .bind("numberStar", propertyMachineBean.getNumberStar())
                        .bind("level", propertyMachineBean.getLevel())
                        .bind("value", propertyMachineBean.getValue())
                        .bind("noGrowthItemId", propertyMachineBean.getNoGrowthItemId())
                        .bind("userId", propertyMachineBean.getUserId())
                        .bind("rate", propertyMachineBean.getRate())
                        .add();
            }
            batch.execute();
        });
    }

    public static PropertyMachineBean getPropertyMachine(int userId, int noGrowthItemId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle ->
                handle.createQuery("SELECT id, speed, durable, power, number_star, level, value, rate, no_growth_item_id, user_id " +
                                "FROM " + TABLE_NAME + " WHERE user_id = :userId AND no_growth_item_id = :noGrowthItemId")
                        .bind("userId", userId)
                        .bind("noGrowthItemId", noGrowthItemId)
                        .mapToBean(PropertyMachineBean.class)
                        .findFirst()
                        .orElse(null));
    }

    public static boolean updatePropertyMachine(PropertyMachineBean propertyMachineBean){
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return false;
        }
        int count = jdbi.withHandle(handle -> handle.createUpdate("UPDATE " + TABLE_NAME + " SET speed = :speed, durable = :durable, power = :power, number_star = :numberStar, level = :level, value = :value, rate = :rate " +
                "WHERE user_id = :userId AND id = :id")
                .bind("speed", propertyMachineBean.getSpeed())
                .bind("durable", propertyMachineBean.getDurable())
                .bind("power", propertyMachineBean.getPower())
                .bind("numberStar", propertyMachineBean.getNumberStar())
                .bind("level", propertyMachineBean.getLevel())
                .bind("value", propertyMachineBean.getValue())
                .bind("rate", propertyMachineBean.getRate())
                .bind("userId", propertyMachineBean.getUserId())
                .bind("id", propertyMachineBean.getId())
                .execute());
        if (count == 0) {
            return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(getPropertyMachine(9, 14));
    }
}
