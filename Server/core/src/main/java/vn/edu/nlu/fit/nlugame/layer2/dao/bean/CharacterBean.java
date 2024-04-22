package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class CharacterBean {
    @ColumnName("id")
    private int id;
    @ColumnName("name")
    private String name;
    @ColumnName("description")
    private String description;
}
