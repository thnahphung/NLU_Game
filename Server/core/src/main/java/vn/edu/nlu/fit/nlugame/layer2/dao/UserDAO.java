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
        return jdbi.withHandle(h -> h.createQuery("select id,username,password,player_name,gender,sponsor,email,phone,active,tree,relogin_token,agency_level,isBot from " + TABLE_NAME + " where username = :username")
                .bind("username", username)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));

    }

    public static int checkUserRegister(String username) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 0;
        }
        List<UserBean> users = jdbi.withHandle(handle -> handle.createQuery("select id,username,password,player_name,gender,sponsor,email,phone,active,tree,relogin_token,agency_level from " + TABLE_NAME + " where username = :username")
                .bind("username", username).mapToBean(UserBean.class).stream().collect(Collectors.toList())
        );
        return users.size() > 0 ? 400 : 200;
    }

    public static int insertRegisterUser(String username, String hashPass, int sponsor, String phone, String OTP) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return 402;
        }
        try {
            Integer count = jdbi.withHandle(h -> h.createUpdate(

                            "insert into " + TABLE_NAME + " (username, password, sponsor, gender,player_name,active,phone,phone_otp,phone_otp_time,is_phone_verified) " +
                                    "values (:username, :password, :sponsor, 2,:playerName,1,:phone,:phoneOTP,:phoneOTPTime,0)")
                    .bind("username", username)
                    .bind("password", hashPass)
                    .bind("sponsor", sponsor)
                    .bind("playerName", username)
                    .bind("phone", phone)
                    .bind("phoneOTP", OTP)
                    .bind("phoneOTPTime", (OTP != null && !"".equals(OTP)) ? System.currentTimeMillis() : "0")
                    .execute());
            return count == 1 ? 200 : 400;
        } catch (Exception e) {
            return 500;
        }
    }

    public static UserBean selectUser(int userId) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(h -> h.createQuery("select id, username,player_name,gender,sponsor,email,phone,tree,active,relogin_token,agency_level  from " + TABLE_NAME + " where id = :id")
                .bind("id", userId)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }

    //    select user by username
    public static UserBean selectUser(String username) {
        Jdbi jdbi = getJdbi();
        return jdbi.withHandle(h -> h.createQuery("select id, username,player_name,gender,sponsor,email,phone,tree,active,relogin_token,agency_level  from " + TABLE_NAME + " where username = :username")
                .bind("username", username)
                .mapToBean(UserBean.class).stream().findFirst().orElse(null));
    }


}
