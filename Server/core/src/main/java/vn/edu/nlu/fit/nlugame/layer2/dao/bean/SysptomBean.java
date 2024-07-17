package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SysptomBean {
    @ColumnName("id")
    int id;
    @ColumnName("description")
    String description;
    @ColumnName("disease_id")
    int diseaseId;
}
