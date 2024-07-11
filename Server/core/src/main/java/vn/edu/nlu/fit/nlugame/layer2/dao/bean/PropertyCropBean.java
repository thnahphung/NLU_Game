package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@NoArgsConstructor
@Setter
@Getter
@ToString
public class PropertyCropBean {
    @ColumnName("id")
    private int id;
    @ColumnName("harvest_yield")
    private int harvestYield;
    @ColumnName("status_watered")
    private boolean statusWatered;
    @ColumnName("status_fertilized")
    private boolean statusFertilized;
    @ColumnName("till_land_id")
    private int tillLandId;
    @ColumnName("time_fertilized")
    private int timeFertilized;
    @ColumnName("fertilizer_id")
    private int fertilizerId;
    @ColumnName("property_growth_item_id")
    private int propertyGrowthItemId;
}
