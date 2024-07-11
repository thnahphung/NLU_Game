package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import org.jdbi.v3.core.mapper.reflect.ColumnName;
import lombok.*;
@NoArgsConstructor
@Setter
@Getter
@ToString
public class CommonRisingTimeBean {
    @ColumnName("id")
    private int id;
    @ColumnName("time")
    private int time;
    @ColumnName("stage")
    private int stage;
    @ColumnName("price")
    private int price;
    @ColumnName("growth_item_id")
    private int growthItemId;
}
