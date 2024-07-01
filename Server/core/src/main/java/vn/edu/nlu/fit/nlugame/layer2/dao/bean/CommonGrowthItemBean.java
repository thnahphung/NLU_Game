package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class CommonGrowthItemBean {
    @ColumnName("id")
    private int id;
    @ColumnName("name")
    private String name;
    @ColumnName("price")
    private long price;
    @ColumnName("sale_price")
    private long salePrice;
    @ColumnName("experience_receive")
    private int experienceReceive;
    @ColumnName("description")
    private String description;
    @ColumnName("weather_require")
    private String weatherRequire;
    @ColumnName("season_require")
    private String seasonRequire;
    @ColumnName("time_pregant")
    private int timePregant;
    @ColumnName("time_growth")
    private int timeGrowth;
    @ColumnName("type")
    private String type;
}
