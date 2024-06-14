package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class UserBean {
    @ColumnName("id")
    private int id;
    @ColumnName("username")
    private String username;
    @ColumnName("password")
    private String password;
    @ColumnName("player_name")
    private String playerName ;
    @ColumnName("gender")
    private int gender;
    @ColumnName("sponsor")
    private int sponsor;
    @ColumnName("email")
    private String email;
    @ColumnName("phone")
    private String phone;
    @ColumnName("active")
    private int active;
    @ColumnName("re_login_token")
    private String reLoginToken ;
    @ColumnName("email_code")
    private String emailCode ;
    @ColumnName("email_code_time")
    private long emailCodeTime;
    @ColumnName("is_email_verified")
    private int isEmailVerified;
    @ColumnName("has_character")
    private int hasCharacter;
    @ColumnName("character_id")
    private int characterId;
    @ColumnName("level")
    private int level;
    @ColumnName("gold")
    private long gold;
    @ColumnName("is_new_account")
    private int isNewAccount;
}
