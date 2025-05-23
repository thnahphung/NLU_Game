package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;

import java.sql.Timestamp;
import java.util.Calendar;
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
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,player_name,gender,gold,level,experience_points,email,active,relogin_token,character_id,has_character,is_new_account from " + TABLE_NAME + " where username = :username")
                .bind("username", username)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }

    public static UserBean getUserByReLoginToken(String reloginToken) {
        if (reloginToken == null || reloginToken.isEmpty()) {
            return null;
        }
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,player_name,gender,gold,level,experience_points,email,active,relogin_token,character_id,has_character,is_new_account from " + TABLE_NAME + " where relogin_token = :reloginToken")
                .bind("reloginToken", reloginToken)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }

    public static UserBean getUserById(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,player_name,gender,gold,level,experience_points,email,active,relogin_token,character_id,has_character,is_new_account from " + TABLE_NAME + " where id = :userId")
                .bind("userId", userId)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }

    public static UserBean getUserByEmail(String email) {
        if (email == null || email.isEmpty()) {
            return null;
        }
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,player_name,gender,gold,level,experience_points,email,active,relogin_token,character_id,has_character,is_new_account from " + TABLE_NAME + " where email = :email")
                .bind("email", email)
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

        if (users != null) for (UserBean user : users) {
            if (user.getUsername().equals(username)) {
                return 400;
            }
            if (user.getEmail().equals(email)) {
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
                            "insert into " + TABLE_NAME + " (username, password, email, level,experience_points, active, is_new_account) " +
                                    "values (:username, :password, :email, :level, :experience_points, :active, 1)")
                    .bind("username", username)
                    .bind("password", pass)
                    .bind("email", email)
                    .bind("level", 1)
                    .bind("experience_points", 0)
                    .bind("active", 1)
                    .execute());
            return count == 1 ? 200 : 500;
        } catch (Exception e) {
            return 500;
        }
    }

    public static int insertRegisterGoogle(String email) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 500;
        }
        try {
            Integer count = jdbi.withHandle(h -> h.createUpdate(
                            "insert into " + TABLE_NAME + " (username, password , email, level, experience_points, active, is_new_account) " +
                                    "values (:username, :password ,:email, :level, :experience_points, :active, 1)")
                    .bind("username", "")
                    .bind("password", "")
                    .bind("email", email)
                    .bind("level", 1)
                    .bind("experience_points", 0)
                    .bind("active", 1)
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
        return jdbi.withHandle(h -> h.createQuery("select id,username,player_name,gender,email,active,relogin_token,character_id,level,has_character,experience_points  from " + TABLE_NAME + " where id = :id")
                .bind("id", userId)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }

    //    select user by username
    public static UserBean selectUser(String username) {
        Jdbi jdbi = getJdbi();
        return jdbi.withHandle(h -> h.createQuery("select id, username,player_name,gender,email,active,relogin_token,character_id,level,experience_points  from " + TABLE_NAME + " where username = :username")
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
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,player_name,gender,email,active,relogin_token,has_character, character_id from " + TABLE_NAME + " where username = :username")
                .bind("username", username)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }

    public static UserBean getUserByName(String name) {
        if (name.equals("") || name.isEmpty()) {
            return null;
        }
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,player_name,gender,email,active,relogin_token,has_character,character_id,level,experience_points from " + TABLE_NAME + " where player_name = :name")
                .bind("name", name)
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

    public static void updateIsNewAccount(int userId, boolean isNewAccount) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set is_new_account = :isNewAccount where id = :id")
                .bind("isNewAccount", isNewAccount)
                .bind("id", userId)
                .execute());
    }

    public static void saveResetTokenToDatabase(String email, String resetToken) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        // time up is 5 minute
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 5);
        Timestamp expirationTime = new Timestamp(calendar.getTimeInMillis());

        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set password_recovery_token = :resetToken, password_recovery_time = :time where email = :email")
                .bind("resetToken", resetToken)
                .bind("time", expirationTime)
                .bind("email", email)
                .execute());
    }

    public static boolean checkEmailExist(String email) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return false;
        }
        return jdbi.withHandle(h -> h.createQuery("select count(*) from " + TABLE_NAME + " where email = :email")
                .bind("email", email)
                .mapTo(Integer.class).one() > 0);
    }

    public static int checkForgetPasswordToken(String email, String token) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 500;
        }
        return jdbi.withHandle(h -> h.createQuery("select password_recovery_token, password_recovery_time from " + TABLE_NAME + " where email = :email")
                .bind("email", email)
                .mapToBean(UserBean.class).stream().findFirst().map(user -> {
                    if (user.getPasswordRecoveryToken().equals(token)) {
                        Calendar calendar = Calendar.getInstance();
                        Timestamp currentTime = new Timestamp(calendar.getTimeInMillis());
                        if (currentTime.before(user.getPasswordRecoveryTime())) return 200;
                        return 403;
                    }
                    return 402;
                }).orElse(500));
    }

    public static void updatePassword(String email, String password) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set password = :password where email = :email")
                .bind("password", password)
                .bind("email", email)
                .execute());
    }

    public static void updatePlayerName(int userId, String playerName) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set player_name = :playerName where id = :id")
                .bind("playerName", playerName)
                .bind("id", userId)
                .execute());
    }

    public static void updateCharacterId(int userId, int characterId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set character_id = :characterId where id = :id")
                .bind("characterId", characterId)
                .bind("id", userId)
                .execute());
    }

    public static boolean checkPlayerNameExist(String playerName) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return false;
        }
        return jdbi.withHandle(h -> h.createQuery("select count(*) from " + TABLE_NAME + " where player_name = :playerName")
                .bind("playerName", playerName)
                .mapTo(Integer.class).one() > 0);
    }

    public static void updateGold(int userId, long gold) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set gold = :gold where id = :id")
                .bind("gold", gold)
                .bind("id", userId)
                .execute());
    }

    public static void updateIncreaseGold(int userId, long goldIncrease) {
        if (getJdbi() == null) return;

        getJdbi().useHandle(handle -> {
            handle.createUpdate("update " + TABLE_NAME + " set gold = gold + :goldIncrease where id = :id")
                    .bind("goldIncrease", goldIncrease)
                    .bind("id", userId)
                    .execute();
        });
    }

    public static void updateDecreaseGold(int userId, long goldDecrease) {
        if (getJdbi() == null) return;

        getJdbi().useHandle(handle -> {
            handle.createUpdate("update " + TABLE_NAME + " set gold = gold - :goldDecrease where id = :id")
                    .bind("goldDecrease", goldDecrease)
                    .bind("id", userId)
                    .execute();
        });
    }

    public static void updateLevel(int userId, int level) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set level = :level where id = :id")
                .bind("level", level)
                .bind("id", userId)
                .execute());
    }

    public static void updateExperiencePoints(int userId, int experiencePoints) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set experience_points = :experiencePoints where id = :id")
                .bind("experiencePoints", experiencePoints)
                .bind("id", userId)
                .execute());
    }

    public static int updateExpAndLevel(int userId, int experiencePoints, int level) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 500;
        }
        return jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set experience_points = :experiencePoints, level = :level where id = :id")
                .bind("experiencePoints", experiencePoints)
                .bind("level", level)
                .bind("id", userId)
                .execute());
    }

    public static void updateUserExpAndGold(int userId, int experiencePoints, int gold) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.withHandle(h -> h.createUpdate("update " + TABLE_NAME + " set experience_points = :experiencePoints, gold = :gold where id = :id")
                .bind("experiencePoints", experiencePoints)
                .bind("gold", gold)
                .bind("id", userId)
                .execute());
    }

    public static List<UserBean> getRankUsers(String characterCode) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select u.id, u.player_name, u.level, u.gold, u.character_id from " + TABLE_NAME + " u join characters c on u.character_id = c.id WHERE c.`code` = :code ORDER BY u.`level` desc, u.gold desc")
                .bind("code", characterCode)
                .mapToBean(UserBean.class).stream().collect(Collectors.toList()));
    }
}
