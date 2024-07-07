package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class NoGrowthItemBean {
    @ColumnName("id")
    private int id;
    @ColumnName("name")
    private String name;
    @ColumnName("price")
    private int price;
    @ColumnName("sale_price")
    private int salePrice;
    @ColumnName("experience_receive")
    private int experienceReceive;
    @ColumnName("type")
    private String type;
    @ColumnName("description")
    private String description;
    @ColumnName("status")
    private int status;
    @ColumnName("create_date")
    private LocalDateTime createDate;
}
