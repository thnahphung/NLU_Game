package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FormulaBean {
    @ColumnName("no_growth_item_id")
    int noGrowthItemId;
    @ColumnName("no_growth_item_result_id")
    int noGrowthItemResultId;
    @ColumnName("quantity")
    int quantity;
}
