package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class PlayerBean {
    @ColumnName("id")
    private int id;
    @ColumnName("player_name")
    private String playerName;
    @ColumnName("user_id")
    private int userId;
    @ColumnName("character_id")
    private int characterId;
    @ColumnName("level")
    private int level;
    @ColumnName("area_id")
    private int areaId;

    AreaBean area;
}
