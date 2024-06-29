package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class FriendshipBean {
    @ColumnName("user_id")
    private int userId;
    @ColumnName("friend_id")
    private int friendId;
    @ColumnName("status")
    private int status;
    @ColumnName("created_at")
    private String createdAt;
}
