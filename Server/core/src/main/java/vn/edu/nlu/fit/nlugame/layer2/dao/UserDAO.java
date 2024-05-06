package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;

import java.util.List;
import java.util.stream.Collectors;

public class UserDAO extends BaseDAO {
    private static final String TABLE_NAME = "users";

    public static UserBean getUserLogin(String username) {
        if (username == null || username.isEmpty()) {
            return null;
        }
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,active,relogin_token from " + TABLE_NAME + " where username = :username")
                .bind("username", username)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));

    }

    public static int checkUserRegister(String username, String email) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 0;
        }
        List<UserBean> users = jdbi.withHandle(handle -> handle.createQuery("select id,username,password,email,active from " + TABLE_NAME + " where username = :username or email = :email")
                .bind("username", username)
                .bind("email", email)
                .mapToBean(UserBean.class).stream().collect(Collectors.toList())
        );

        if (users!=null) for(UserBean user : users){
            if(user.getUsername().equals(username)){
                return 400;
            }
            if(user.getEmail().equals(email)){
                return 403;
            }
        }
        return 200;
    }

    public static int insertRegisterUser(String username, String pass, String email) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 500;
        }
        try {
            Integer count = jdbi.withHandle(h -> h.createUpdate(
                            "insert into " + TABLE_NAME + " (username, password, email) " +
                                    "values (:username, :password, :email)")
                    .bind("username", username)
                    .bind("password", pass)
                    .bind("email", email)
                  .execute());
            return count == 1 ? 200 : 500;
        } catch (Exception e) {
            return 500;
        }
    }
    public static UserBean selectUser(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select id,username,player_name,gender,email,active,relogin_token  from " + TABLE_NAME + " where id = :id")
                .bind("id", userId)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }

    //    select user by username
    public static UserBean selectUser(String username) {
        Jdbi jdbi = getJdbi();
        return jdbi.withHandle(h -> h.createQuery("select id, username,player_name,gender,email,active,relogin_token  from " + TABLE_NAME + " where username = :username")
                .bind("username", username)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }
    public static UserBean getUser(String username) {
        if (username.equals("") || username.isEmpty()) {
            return null;
        }
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,player_name,gender,email,active,relogin_token,has_character from " + TABLE_NAME + " where username = :username")
                .bind("username", username)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }
    public static void updateReloginToken(int userId, String token) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set relogin_token = :token where id = :id")
                .bind("id", userId)
                .bind("token", token)
                .execute());
    }
    public static void updateHasCharacter(int userId, int hasCharacter) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set has_character = :hasCharacter where id = :id")
                .bind("id", userId)
                .bind("hasCharacter", hasCharacter)
                .execute());
    }
}
