package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
@AllArgsConstructor
public class PropertyGrowthItemBean {
    @ColumnName("id")
    private int id;
    @ColumnName("current_disease_id")
    private int currentDiseaseId;
    @ColumnName("disease_rate")
    private int diseaseRate;
    @ColumnName("is_disease")
    private boolean isDisease;
    @ColumnName("start_time_disease")
    private int startTimeDisease;
    @ColumnName("health")
    private int health;
    @ColumnName("stage")
    private int stage;
    @ColumnName("start_date")
    private int startDate;
    @ColumnName("growth_item_id")
    private int growthItemId;
    @ColumnName("developed_days")
    private int developedDays;
}
