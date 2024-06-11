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
public class PropertyBuildingBean {
    @ColumnName("id")
    private int id;
    @ColumnName("position_x")
    private int positionX;
    @ColumnName("position_y")
    private int positionY;
    @ColumnName("upgrade_id")
    private int upgradeId;
    @ColumnName("area_id")
    private int areaId;
    @ColumnName("common_building_id")
    private int commonBuildingId;
    @ColumnName("current_level")
    private int currentLevel;
}
