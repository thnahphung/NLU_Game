package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class RewardItemBean {
    @ColumnName("activity_id")
    private int activityId;
    @ColumnName("no_grow_item_id")
    private int noGrowthItemId;
    @ColumnName("quantity")
    private int quantity;
}
