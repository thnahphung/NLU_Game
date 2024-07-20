package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FormulaBean {
    @ColumnName("no_growth_item_id")
    int noGrowthItemId;
    @ColumnName("no_growth_item_result_id")
    int noGrowthItemResultId;
    @ColumnName("quantity")
    int quantity;
}
