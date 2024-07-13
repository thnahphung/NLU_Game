package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
@ToString
public class ActivityBean {
    @ColumnName("id")
    private int id;
    @ColumnName("turn")
    private int turn;
    @ColumnName("code")
    private String code;
    @ColumnName("type")
    private int type;
    @ColumnName("min_level")
    private int minLevel;
    @ColumnName("start_date")
    private LocalDateTime startDate;
    @ColumnName("end_date")
    private LocalDateTime endDate;
    @ColumnName("character_id")
    private int characterId;
    @ColumnName("no_grow_item_id")
    private int noGrowthItemId;
    @ColumnName("quantity")
    private int quantity;
    @ColumnName("repeat_time")
    private int repeatTime;
}
