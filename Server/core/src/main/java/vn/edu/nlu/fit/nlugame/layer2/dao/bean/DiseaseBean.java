package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiseaseBean {
    @ColumnName("id")
    int id;
    @ColumnName("name")
    String name;
    @ColumnName("description")
    String description;
    @ColumnName("no_growth_item_id")
    int noGrowthItemId;
}
