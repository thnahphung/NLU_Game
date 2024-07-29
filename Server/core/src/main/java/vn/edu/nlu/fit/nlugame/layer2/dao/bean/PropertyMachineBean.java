package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class PropertyMachineBean {
    @ColumnName("id")
    private int id;
    @ColumnName("speed")
    private int speed;
    @ColumnName("durable")
    private int durable;
    @ColumnName("power")
    private int power;
    @ColumnName("number_star")
    private int numberStar;
    @ColumnName("level")
    private int level;
    @ColumnName("value")
    private int value;
    @ColumnName("no_growth_item_id")
    private int noGrowthItemId;
    @ColumnName("user_id")
    private int userId;
    @ColumnName("rate")
    private int rate;
}
