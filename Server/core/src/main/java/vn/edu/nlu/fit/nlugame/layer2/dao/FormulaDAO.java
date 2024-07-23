package vn.edu.nlu.fit.nlugame.layer2.dao;

import vn.edu.nlu.fit.nlugame.layer2.dao.bean.FormulaBean;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class FormulaDAO extends BaseDAO {
    private static final String TABLE_NAME = "formulas";

    public static List<FormulaBean> getFormulasByNoGrowthItemResultId(int noGrowthItemResultId) {
        if (getJdbi() == null) {
            return null;
        }

        return getJdbi().withHandle(handle -> {
            return handle.createQuery("SELECT no_growth_item_id, no_growth_item_result_id, quantity FROM " + TABLE_NAME + " WHERE no_growth_item_result_id = :noGrowthItemResultId")
                    .bind("noGrowthItemResultId", noGrowthItemResultId)
                    .mapToBean(FormulaBean.class)
                    .list();
        });
    }

    public static Map<Integer, FormulaBean> getMapFormulasByNoGrowthItemResultId(int noGrowthItemResultId) {
        if (getJdbi() == null) {
            return null;
        }

        return getJdbi().withHandle(handle -> {
            return handle.createQuery("SELECT no_growth_item_id, no_growth_item_result_id, quantity FROM " + TABLE_NAME + " WHERE no_growth_item_result_id = :noGrowthItemResultId")
                    .bind("noGrowthItemResultId", noGrowthItemResultId)
                    .mapToBean(FormulaBean.class)
                    .list()
                    .stream()
                    .collect(Collectors.toMap(FormulaBean::getNoGrowthItemId, Function.identity()));
        });
    }

    public static void main(String[] args) {
        System.out.println(FormulaDAO.getFormulasByNoGrowthItemResultId(14));;
    }

}
