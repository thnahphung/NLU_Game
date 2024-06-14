package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public abstract class ABuilding {
    @ColumnName("id")
    protected int id;
    @ColumnName("name")
    protected String name;
    @ColumnName("description")
    protected String description;
    @ColumnName("type")
    protected ConstUtils.TYPE_ITEM type;
    @ColumnName("max_level")
    protected int maxLevel;
    @ColumnName("upgrade_id")
    protected int upgradeId;
    @ColumnName("current_level")
    protected int currentLevel;
    @ColumnName("area_id")
    protected int areaId;
    @ColumnName("position_x")
    protected long positionX;
    @ColumnName("position_y")
    protected long positionY;
    @ColumnName("common_building_id")
    protected int commonBuildingId;
}
