package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PropertyAnimalBean {
    @ColumnName("id")
    int id;
    @ColumnName("is_pregnant")
    int isPregnant;
    @ColumnName("start_time_pregnant")
    int startTimePregnant;
    @ColumnName("end_time_pregnant")
    int endTimePregnant;
    @ColumnName("is_hungry")
    int isHungry;
    @ColumnName("status")
    int status;
    @ColumnName("animal_id")
    int cageId;
    @ColumnName("property_growth_item_id")
    int propertyGrowthItemId;
}
