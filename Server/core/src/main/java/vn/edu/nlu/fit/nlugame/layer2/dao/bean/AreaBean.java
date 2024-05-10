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
    private String uerId;
    @ColumnName("type_area")
    private String typeArea;

}
