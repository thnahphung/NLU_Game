package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyAnimalBean;

import java.util.List;

public class PropertyAnimalDAO extends BaseDAO {
    private static final String TABLE_NAME = "property_animals";

    public static List<PropertyAnimalBean> getAll() {
        return getJdbi().withHandle(handle -> handle.createQuery("select id, is_pregnant, start_time_pregant, end_time_pregant,is_hungry, status, cage_id, property_growth_item_id from " + TABLE_NAME)
                .mapToBean(PropertyAnimalBean.class).list());
    }

    public static List<PropertyAnimalBean> getAllAnimalNotDisease() {
        return getJdbi().withHandle(handle -> handle.createQuery("select pa.id,pa.is_pregnant, pa.start_time_pregant, pa.end_time_pregant,pa.is_hungry, pa.`status`, pa.cage_id, pa.property_growth_item_id \n" +
                        "from " + TABLE_NAME + " pa JOIN property_growth_items pg ON pa.property_growth_item_id = pg.id where pg.is_disease = 0")
                .mapToBean(PropertyAnimalBean.class).list());
    }

    public static PropertyAnimalBean getById(int id) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id, is_pregnant, start_time_pregant, end_time_pregant,is_hungry, status, cage_id, property_growth_item_id from " + TABLE_NAME + " where id = :id")
                .bind("id", id)
                .mapToBean(PropertyAnimalBean.class).stream().findFirst().orElse(null));
    }

    public static List<PropertyAnimalBean> getByCageId(int cageId) {
        return getJdbi().withHandle(handle -> handle.createQuery("select id, is_pregnant, start_time_pregant, end_time_pregant,is_hungry, status, cage_id, property_growth_item_id from " + TABLE_NAME + " where cage_id = :cageId")
                .bind("cageId", cageId)
                .mapToBean(PropertyAnimalBean.class).list());
    }

    public static int updateIsHungry(int id, int isHungry) {
        if (getJdbi() == null) {
            return -1;
        }
        return getJdbi().withHandle(handle -> handle.createUpdate("update " + TABLE_NAME + " set is_hungry = :isHungry where id = :id")
                .bind("id", id)
                .bind("isHungry", isHungry)
                .execute()) == 1 ? 200 : 400;
    }

    public static int countAnimalInCage(int cageId) {
        if (getJdbi() == null) {
            return -1;
        }
        return getJdbi().withHandle(handle -> handle.createQuery("select count(id) from " + TABLE_NAME + " where cage_id = :cageId")
                .bind("cageId", cageId)
                .mapTo(Integer.class).one());
    }

    public static int insertPropertyAnimal(int cageId, int propertyGrowthItemId) {
        if (getJdbi() == null) {
            return -1;
        }
        return getJdbi().withHandle(handle -> handle.createUpdate("insert into " + TABLE_NAME + "(is_pregnant, start_time_pregant, end_time_pregant,is_hungry, status, cage_id, property_growth_item_id ) values ( :isPregnant, :startTimePregant, :endTimePregant, :isHungry, :status, :cageId, :propertyGrowthItemId)")
                .bind("isPregnant", 0)
                .bind("startTimePregant", 0)
                .bind("endTimePregant", 0)
                .bind("isHungry", 0)
                .bind("status", 1)
                .bind("cageId", cageId)
                .bind("propertyGrowthItemId", propertyGrowthItemId)
                .executeAndReturnGeneratedKeys("id")
                .mapTo(Integer.class)
                .findFirst().orElse(-1));
    }

    public static void updateAllAnimalIsHungry() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            throw new RuntimeException("Cannot connect to database");
        }
        jdbi.useHandle(handle -> handle.createUpdate("UPDATE  " + TABLE_NAME + " SET  is_hungry =1")
                .execute());
    }

    public static int getUserIdOfAnimal(int animalId) {
        if (getJdbi() == null) {
            return -1;
        }
        return getJdbi().withHandle(handle -> handle.createQuery("SELECT a.user_id FROM " + TABLE_NAME + " pa JOIN property_buildings pb ON pa.cage_id = pb.id JOIN areas a ON pb.area_id = a.id WHERE pa.id = :animalId")
                .bind("animalId", animalId)
                .mapTo(Integer.class).one());
    }

    public static int deleteAnimal(int animalId) {
        if (getJdbi() == null) {
            return -1;
        }
        return getJdbi().withHandle(handle -> handle.createUpdate("DELETE FROM " + TABLE_NAME + " WHERE id = :animalId")
                .bind("animalId", animalId)
                .execute());
    }
}