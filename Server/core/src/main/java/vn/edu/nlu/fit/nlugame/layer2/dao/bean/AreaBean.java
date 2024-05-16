package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class AreaBean {
    @ColumnName("id")
    private int id;
    @ColumnName("user_id")
    private int userId;
    @ColumnName("player_id")
    private int playerId;
    @ColumnName("type_area")
    private String typeArea;
    @ColumnName("spawn_pos_x")
    private int spawnPosX;
    @ColumnName("spawn_pos_y")
    private int spawnPosY;
    @ColumnName("status")
    private int status;

}
