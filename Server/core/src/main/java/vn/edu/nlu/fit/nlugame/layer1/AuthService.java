package vn.edu.nlu.fit.nlugame.layer1;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.websocket.Session;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.RandomUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.CharacterDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CharacterBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.google.dto.GoogleDTO;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;

public class AuthService {

    public static final AuthService instance = new AuthService();
    private static final int defaultSponsorId = 123456;
    private static final UserBean defaultSponsor = UserDAO.selectUser(defaultSponsorId);

    private AuthService() {
    }

    public static AuthService me() {
        return instance;
    }


    public void register(Session session, Proto.ReqRegister reqRegister) {
        //Check require field username, password
        if (reqRegister.getUsername().trim().equals("") || reqRegister.getPassword().trim().equals("")) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(401)).build());
            return;
        }
        //Check username va email da ton tai chua
        int checkResult = UserDAO.checkUserRegister(reqRegister.getUsername(), reqRegister.getEmail());
        if (checkResult != 200) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(checkResult)).build());
            return;
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(reqRegister.getPassword());
        //Insert user
        int statusInsertUser = UserDAO.insertRegisterUser(reqRegister.getUsername(), hashedPassword, reqRegister.getEmail());
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResRegister(Proto.ResRegister.newBuilder().setStatus(statusInsertUser)).build());
    }

    public UserBean checkLogin(Session session, Proto.ReqLogin reqLogin) {
        if (reqLogin.getUsername().trim().equals("") || reqLogin.getPassword().trim().equals("")) {
            return null;
        }
        Proto.Packet.Builder packetBuilder = Proto.Packet.newBuilder();
        Proto.ResLogin.Builder resLoginBuilder = Proto.ResLogin.newBuilder();
        UserBean userLoginBean = UserDAO.getUserLogin(reqLogin.getUsername());
        // Check userLogin exists
        if (userLoginBean == null) {
            resLoginBuilder.setStatus(400);
            packetBuilder.setResLogin(resLoginBuilder.build());
            DataSenderUtils.sendResponse(session, packetBuilder.build());
            return null;
        }
        // Check username and password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(reqLogin.getPassword());
        boolean isPasswordMatch = passwordEncoder.matches(reqLogin.getPassword(), encodedPassword);
        if (!reqLogin.getUsername().equals(userLoginBean.getUsername()) || !isPasswordMatch) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLogin(Proto.ResLogin.newBuilder().setStatus(400)).build());
            return null;
        }
        //Check userLogin is logging in on another device
        Proto.User userProto = Proto.User.newBuilder()
                .setUserId(userLoginBean.getId())
                .setUsername(userLoginBean.getUsername())
                .setPlayerName(userLoginBean.getPlayerName() == null ? "" : userLoginBean.getPlayerName())
                .setEmail(userLoginBean.getEmail() == null ? "" : userLoginBean.getEmail())
                .setGold(userLoginBean.getGold())
                .setLevel(userLoginBean.getLevel())
                .setExperiencePoints(userLoginBean.getExperiencePoints())
                .setHasCharacter(userLoginBean.getHasCharacter())
                .setCharacterId(userLoginBean.getCharacterId())
                .setIsNewAccount(userLoginBean.getIsNewAccount())
                .setStatus(Proto.User.STATUS.ONLINE_VALUE)
                .build();
        if (checkLoginOtherDevice(userProto, session)) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLogin(Proto.ResLogin.newBuilder().setStatus(403)).build());
            return null;
        }
        //When login success
        loginSuccess(session, userProto, 200);
        return userLoginBean;
    }

    private void loginSuccess(Session session, Proto.User user, int status) {
        if (user.getHasCharacter() > 0) {
            CharacterBean character = CharacterDAO.loadCharacterById(user.getCharacterId());
            Proto.Character characterProto = Proto.Character.newBuilder()
                    .setId(character.getId())
                    .setName(character.getName())
                    .setCode(character.getCode())
                    .setDescription(character.getDescription())
                    .build();
            user = user.toBuilder().setCharacter(characterProto).build();
        }
        //Save user login in cache redis
        SessionCache.me().addUserSession(SessionID.of(session), user);
        UserCache.me().addUserOnline(user, SessionID.of(session).getSessionId());

        //Token
        String reloginToken = UUID.randomUUID().toString();
        UserDAO.updateReloginToken(user.getUserId(), reloginToken);
        //Send response
        Proto.ResLogin resLogin = Proto.ResLogin.newBuilder()
                .setUser(user)
                .setToken(reloginToken)
                .setStatus(status)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLogin(resLogin).build());
    }

    public UserBean checkReLogin(Session session, Proto.ReqRelogin reqRelogin) {
        boolean result = true;
        UserBean userLoginBean = null;
        // neu relogin bang google
        if (reqRelogin.getUsername().isBlank()) {
            userLoginBean = UserDAO.getUserByReLoginToken(reqRelogin.getToken());
            if (userLoginBean == null) {
                result = false;
            }
        }
        // neu relogin bang username password
        else {
            userLoginBean = UserDAO.getUserLogin(reqRelogin.getUsername());
            //Check null param
            if (userLoginBean == null || reqRelogin.getToken() == null || userLoginBean.getReLoginToken() == null) {
                result = false;
            }
            if (!reqRelogin.getToken().equals(userLoginBean.getReLoginToken())) {
                result = false;
            }
        }
        //Check login other device
        Proto.User userProto = Proto.User.newBuilder()
                .setUserId(userLoginBean.getId())
                .setUsername(userLoginBean.getUsername())
                .setHasCharacter(userLoginBean.getHasCharacter())
                .setCharacterId(userLoginBean.getCharacterId())
                .setLevel(userLoginBean.getLevel())
                .setExperiencePoints(userLoginBean.getExperiencePoints())
                .setIsNewAccount(userLoginBean.getIsNewAccount())
                .setEmail(userLoginBean.getEmail() == null ? "" : userLoginBean.getEmail())
                .setPlayerName(userLoginBean.getPlayerName() == null ? "" : userLoginBean.getPlayerName())
                .setGold(userLoginBean.getGold())
                .build();
        if (checkLoginOtherDevice(userProto, session)) {
            result = false;
        }
        if (!result) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLogin(Proto.ResLogin.newBuilder().setStatus(401).build()).build());
            return null;
        }
        loginSuccess(session, userProto, 201);
        return userLoginBean;
    }

    public void sendEmailForgetPassword(Session session, Proto.ReqEmailForgetPassword reqEmailForgetPassword) {
        if (!UserDAO.checkEmailExist(reqEmailForgetPassword.getEmail())) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResEmailForgetPassword(Proto.ResEmailForgetPassword.newBuilder().setStatus(400)).build());
            return;
        } else {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResEmailForgetPassword(Proto.ResEmailForgetPassword.newBuilder().setStatus(200)).build());
        }

        String token = RandomUtils.generateToken();
        String to = reqEmailForgetPassword.getEmail();
        String subject = "Recover your password";
        String text = "Your token is: <b>" + token + "</b>" + "<br><br>The token will be expired in 5 minutes. Please use this token to reset your password!.";
        UserDAO.saveResetTokenToDatabase(reqEmailForgetPassword.getEmail(), token);
        DataSenderUtils.sendMail(to, subject, text);
    }

    public void checkRecoverPassword(Session session, Proto.ReqRecoverPassword reqForgotPassword) {
        int status = UserDAO.checkForgetPasswordToken(reqForgotPassword.getEmail(), reqForgotPassword.getToken());
        if (status != 200) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResRecoverPassword(Proto.ResRecoverPassword.newBuilder().setStatus(status)).build());
            return;
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(reqForgotPassword.getPassword());
        UserDAO.updatePassword(reqForgotPassword.getEmail(), hashedPassword);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResRecoverPassword(Proto.ResRecoverPassword.newBuilder().setStatus(200)).build());
    }

    private boolean checkLoginOtherDevice(Proto.User user, Session session) {
        SessionID sessionID = SessionID.of(session);
        UserContext userContext = UserCache.me().getUserContextOnline(user.getUserId());
        // Kiem tra user hien tai co phai la user da dang nhap khong
        if (userContext != null && userContext.getSessionID().equals(sessionID.getSessionId())) {
            return false;
        }
        return UserCache.me().getUserOnline(user.getUserId()) != null;
    }

    public void logout(Session session, Proto.ReqLogout reqLogout) {
        int userID = SessionCache.me().getUserID(SessionID.of(session));
        if (userID == -1) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLogout(Proto.ResLogout.newBuilder().setStatus(400)).build());
            return;
        }
        UserCache.me().logoutUser(userID);
        UserDAO.updateReloginToken(userID, null);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLogout(Proto.ResLogout.newBuilder().setStatus(200)).build());
    }

    private void sendMsgRegister(Session session, int i) {
        Proto.ResRegister resRegister = Proto.ResRegister.newBuilder().setStatus(i).build();
        Proto.Packet.Builder builder = Proto.Packet.newBuilder().setResRegister(resRegister);

        DataSenderUtils.sendResponse(session, builder.build());
    }

    public void loginGoogle(Session session, Proto.ReqLoginGoogle reqLoginGoogle) {
        String sessionId = SessionID.of(session).getSessionId();
        String responseURI = "http://localhost:8080/socket/oauth2callback";
        String responseType = "code";
        String responseScope = "profile email";
        String url = "https://accounts.google.com/o/oauth2/auth?" +
                "client_id=" + ConstUtils.GOOGLE_CLIENT_ID +
                "&redirect_uri=" + ConstUtils.GOOGLE_REDIRECT_URI +
                "&response_type=" + responseType +
                "&scope=" + responseScope +
                "&state=" + sessionId;

        Proto.ResLoginGoogle resLoginGoogle = Proto.ResLoginGoogle.newBuilder().setUrl(url).build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoginGoogle(resLoginGoogle).build());
    }

    public UserBean loginGoogleSuccess(Session session, GoogleDTO googleDTO) {
        UserBean userLoginBean = UserDAO.getUserByEmail(googleDTO.getEmail());
        if (userLoginBean == null) {
            int statusInsertUser = UserDAO.insertRegisterGoogle(googleDTO.getEmail());
            if (statusInsertUser != 200) {
                return null;
            }
            userLoginBean = UserDAO.getUserByEmail(googleDTO.getEmail());
        }

        Proto.User userProto = Proto.User.newBuilder()
                .setUserId(userLoginBean.getId())
                .setUsername(userLoginBean.getUsername() == null ? "" : userLoginBean.getUsername())
                .setPlayerName(userLoginBean.getPlayerName() == null ? "" : userLoginBean.getPlayerName())
                .setEmail(userLoginBean.getEmail() == null ? "" : userLoginBean.getEmail())
                .setGold(userLoginBean.getGold())
                .setLevel(userLoginBean.getLevel())
                .setExperiencePoints(userLoginBean.getExperiencePoints())
                .setHasCharacter(userLoginBean.getHasCharacter())
                .setCharacterId(userLoginBean.getCharacterId())
                .setIsNewAccount(userLoginBean.getIsNewAccount())
                .build();
        this.loginSuccess(session, userProto, 200);
        return userLoginBean;
    }
}
