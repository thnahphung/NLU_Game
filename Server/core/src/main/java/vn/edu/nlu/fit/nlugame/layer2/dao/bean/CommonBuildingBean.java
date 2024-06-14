package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
@NoArgsConstructor
@Setter
@Getter
@ToString
public class CommonBuildingBean {
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

    public CommonBuildingBean(int id, String name, String description, ConstUtils.TYPE_ITEM type, int maxLevel) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.maxLevel = maxLevel;
    }
}
