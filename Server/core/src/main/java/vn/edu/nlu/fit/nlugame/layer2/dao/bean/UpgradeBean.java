package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpgradeBean {
    @ColumnName("id")
    int id;
    @ColumnName("name")
    String name;
    @ColumnName("level")
    int level;
    @ColumnName("capacity")
    int capacity;
    @ColumnName("price")
    int price;
    @ColumnName("building_id")
    int buildingId;
}
