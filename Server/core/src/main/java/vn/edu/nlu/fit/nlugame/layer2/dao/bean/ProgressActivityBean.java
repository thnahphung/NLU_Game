package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class ProgressActivityBean {
    @ColumnName("user_id")
    private int userId;
    @ColumnName("activity_id")
    private int activityId;
    @ColumnName("progress")
    private int progress;
    @ColumnName("status")
    private int status;
}
