package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.SysptomBean;

import java.util.List;

public class SysptomDAO extends BaseDAO {
    private static final String TABLE_NAME = "sysptoms";

    public static List<SysptomBean> getSysptomsByDiseaseId(int diseaseId) {
        if (getJdbi() == null) {
            return null;
        }
        return getJdbi().withHandle(handle -> handle.createQuery("SELECT id, description, disease_id FROM " + TABLE_NAME + " WHERE disease_id = :diseaseId")
                .bind("diseaseId", diseaseId)
                .mapToBean(SysptomBean.class).list());
    }

}
