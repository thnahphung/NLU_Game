package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.FriendshipDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.*;

public class SupportingService {
    private static SupportingService instance = new SupportingService();
    private Queue<UserContext> mechanicalEngineers = new LinkedList<>();
    private Queue<UserContext> veterinarians = new LinkedList<>();
    private Queue<UserContext> agriculturalEngineers = new LinkedList<>();
    private Queue<UserContext> livestockEngineers = new LinkedList<>();
    public static SupportingService me() {
        return instance;
    }
    private boolean isLocked = false;

    public void startMatchmaking() {
        if(isLocked) {
            System.out.println("Matchmaking is locked");
            return;
        }
        isLocked = true;
        //Matchmaking every 1s
        boolean isMatchedMechanicalAgri = false;
        boolean isMatchedVetLivestock = false;
        while (isLocked) {
            isMatchedMechanicalAgri = matchMechanicalWithAgricultural();
            isMatchedVetLivestock = matchVeterinarianWithLivestockEngineer();
            if(!isMatchedMechanicalAgri || !isMatchedVetLivestock) {
                isLocked = false;
            }
        }
    }

    private boolean matchMechanicalWithAgricultural() {
        //TODO: if status of user is invited or busy, do not match, and pool user
        UserContext userContextMechanical = mechanicalEngineers.peek();
        //Repeat until an engineer is not busy else pool the user
        while(mechanicalEngineers.size() > 0 && userContextMechanical.getUser().getStatus() == Proto.User.STATUS.BUSY_VALUE) {
            if(userContextMechanical.getUser().getStatus() == Proto.User.STATUS.BUSY_VALUE){
                mechanicalEngineers.poll();
                userContextMechanical = mechanicalEngineers.peek();
            }else {
                userContextMechanical = mechanicalEngineers.peek();
                break;
            }
        }

        UserContext userContextAgricultural = agriculturalEngineers.peek();
        while(agriculturalEngineers.size() > 0) {
            if(userContextAgricultural.getUser().getStatus() == Proto.User.STATUS.BUSY_VALUE){
                agriculturalEngineers.poll();
                userContextAgricultural = agriculturalEngineers.peek();
            }else {
                userContextAgricultural = agriculturalEngineers.peek();
                break;
            }
        }

        if(userContextMechanical == null || userContextAgricultural == null) {
            return false;
        }

        Session sessionMechanical = SessionManage.me().get(userContextMechanical.getSessionID());
        Session sessionAgricultural = SessionManage.me().get(userContextAgricultural.getSessionID());
        if(sessionMechanical == null || !sessionMechanical.isOpen() || sessionAgricultural == null || !sessionAgricultural.isOpen()) {
            return false;
        }

        Proto.User newUserContextMechanical = userContextMechanical.getUser().toBuilder().setStatus(Proto.User.STATUS.BUSY_VALUE).build();
        userContextMechanical.setUser(newUserContextMechanical);
        UserCache.me().add(String.valueOf(userContextMechanical.getUser().getUserId()), userContextMechanical);

        Proto.User newUserContextAgricultural = userContextAgricultural.getUser().toBuilder().setStatus(Proto.User.STATUS.BUSY_VALUE).build();
        userContextAgricultural.setUser(newUserContextAgricultural);
        UserCache.me().add(String.valueOf(userContextAgricultural.getUser().getUserId()), userContextAgricultural);


        Proto.ResMatchmaking resMatchmakingForMechanical = Proto.ResMatchmaking.newBuilder()
                .setMatchmakedUser(userContextAgricultural.getUser())
                .build();
        Proto.ResMatchmaking resMatchmakingForAgricultural = Proto.ResMatchmaking.newBuilder()
                .setMatchmakedUser(userContextMechanical.getUser())
                .build();
        DataSenderUtils.sendResponse(sessionMechanical, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForMechanical).build());
        DataSenderUtils.sendResponse(sessionAgricultural, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForAgricultural).build());
        mechanicalEngineers.poll();
        agriculturalEngineers.poll();
        return true;
    }

    private boolean matchVeterinarianWithLivestockEngineer() {
        UserContext userContextVeterinarian = veterinarians.peek();
        while(veterinarians.size() > 0) {
            if(userContextVeterinarian.getUser().getStatus() == Proto.User.STATUS.BUSY_VALUE){
                veterinarians.poll();
                userContextVeterinarian = veterinarians.peek();
            }else{
                userContextVeterinarian = veterinarians.peek();
                break;
            }
        }

        UserContext userContextLivestockEngineer = livestockEngineers.peek();

        while(livestockEngineers.size() > 0) {
            if(userContextLivestockEngineer.getUser().getStatus() == Proto.User.STATUS.BUSY_VALUE){
                livestockEngineers.poll();
                userContextLivestockEngineer = livestockEngineers.peek();
            }else{
                userContextLivestockEngineer = livestockEngineers.peek();
                break;
            }
        }

        if(userContextVeterinarian == null || userContextLivestockEngineer == null) {
            return false;
        }

        Session sessionVeterinarian = SessionManage.me().get(userContextVeterinarian.getSessionID());
        Session sessionLivestockEngineer = SessionManage.me().get(userContextLivestockEngineer.getSessionID());
        if(sessionVeterinarian == null || !sessionVeterinarian.isOpen() || sessionLivestockEngineer == null || !sessionLivestockEngineer.isOpen()) {
            return false;
        }

        Proto.User newUserContextVeterinarian = userContextVeterinarian.getUser().toBuilder().setStatus(Proto.User.STATUS.BUSY_VALUE).build();
        userContextVeterinarian.setUser(newUserContextVeterinarian);
        UserCache.me().add(String.valueOf(userContextVeterinarian.getUser().getUserId()), userContextVeterinarian);

        Proto.User newUserContextLivestockEngineer = userContextLivestockEngineer.getUser().toBuilder().setStatus(Proto.User.STATUS.BUSY_VALUE).build();
        userContextLivestockEngineer.setUser(newUserContextLivestockEngineer);
        UserCache.me().add(String.valueOf(userContextLivestockEngineer.getUser().getUserId()), userContextLivestockEngineer);

        Proto.ResMatchmaking resMatchmakingForVeterinarian = Proto.ResMatchmaking.newBuilder()
                .setMatchmakedUser(userContextLivestockEngineer.getUser())
                .build();
        Proto.ResMatchmaking resMatchmakingForLivestockEngineer = Proto.ResMatchmaking.newBuilder()
                .setMatchmakedUser(userContextVeterinarian.getUser())
                .build();
        DataSenderUtils.sendResponse(sessionVeterinarian, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForVeterinarian).build());
        DataSenderUtils.sendResponse(sessionLivestockEngineer, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForLivestockEngineer).build());
        veterinarians.poll();
        livestockEngineers.poll();
        return true;
    }

    public void addUserToQueue(UserContext userContext) {
        Proto.User newUserContext = userContext.getUser().toBuilder().setStatus(Proto.User.STATUS.WAITING_VALUE).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);
        switch (userContext.getUser().getCharacter().getCode()) {
            case "KSCK":
                mechanicalEngineers.add(userContext);
                break;
            case "BSTY":
                veterinarians.add(userContext);
                break;
            case "KSNN":
                agriculturalEngineers.add(userContext);
                break;
            case "KSCN":
                livestockEngineers.add(userContext);
                break;
        }
    }

    public void removeUserFromQueue(UserContext userContext) {
        switch (userContext.getUser().getCharacter().getCode()) {
            case "KSCK":
                mechanicalEngineers.remove(userContext);
                break;
            case "BSTY":
                veterinarians.remove(userContext);
                break;
            case "KSNN":
                agriculturalEngineers.remove(userContext);
                break;
            case "KSCN":
                livestockEngineers.remove(userContext);
                break;
        }
    }

    public void handleReqSupportFind(Session session, Proto.ReqSupportFind reqSupportFind) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }
        addUserToQueue(userContext);
        Proto.ResSupportFind resSupportFind = Proto.ResSupportFind.newBuilder()
                .setStatus(200)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResSupportFind(resSupportFind).build());
    }

    public void handleReqStopSupportFind(Session session, Proto.ReqStopSupportFind reqStopSupportFind) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }
        removeUserFromQueue(userContext);
    }

    public void handleReqLoadSupportFriends(Session session) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }
        List<UserBean> userBeans = new ArrayList<>();
        switch (userContext.getUser().getCharacter().getCode()) {
            case "KSNN":
                userBeans = FriendshipDAO.loadKSCKFriends(userId);
                // Only get users who are online
                userBeans.removeIf(userBean -> UserCache.me().getUserContextOnline(userBean.getId()) == null);
                break;
            case "KSCN":
                userBeans = FriendshipDAO.loadBSTYFriends(userId);
                // Only get users who are online
                userBeans.removeIf(userBean -> UserCache.me().getUserContextOnline(userBean.getId()) == null);
                break;
        }
        Proto.ResLoadSupportFriends.Builder resLoadSupportFriendsBuilder = Proto.ResLoadSupportFriends.newBuilder();
        List<Proto.User> userProtos = new ArrayList<>();
        for(UserBean userBean : userBeans) {
            Proto.User.Builder userBuilder = Proto.User.newBuilder();
            userBuilder.setUserId(userBean.getId());
            userBuilder.setPlayerName(userBean.getPlayerName());
            userBuilder.setLevel(userBean.getLevel());
            userBuilder.setCharacter(userContext.getUser().getCharacter());
            userProtos.add(userBuilder.build());
        }
        resLoadSupportFriendsBuilder.addAllUsers(userProtos);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadSupportFriends(resLoadSupportFriendsBuilder.build()).build());
    }

    public void handleReqInviteSupport(Session session, Proto.ReqInviteSupport reqInviteSupport) {
        Proto.ResInviteSupport.Builder resInviteSupportForSessionUser = Proto.ResInviteSupport.newBuilder();
        Proto.ResInviteSupport.Builder resInviteSupportForSupportUser = Proto.ResInviteSupport.newBuilder();
        int status = 0;
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }

        UserContext userContextReceive = UserCache.me().getUserContextOnline(reqInviteSupport.getUserId());
        if(userContextReceive == null) {
            return;
        }
        String codeCharacter = userContextReceive.getUser().getCharacter().getCode();
        if(codeCharacter.equals("KSCK") && mechanicalEngineers.contains(userContextReceive)){
            status = Proto.User.STATUS.BUSY_VALUE;
            resInviteSupportForSessionUser.setStatus(status);
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResInviteSupport(resInviteSupportForSessionUser).build());
            return;
        }
        if(codeCharacter.equals("BSTY") && veterinarians.contains(userContextReceive)){
            status = Proto.User.STATUS.BUSY_VALUE;
            resInviteSupportForSessionUser.setStatus(status);
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResInviteSupport(resInviteSupportForSessionUser).build());
            return;
        }
        Session sessionUserReceive = SessionManage.me().get(userContextReceive.getSessionID());
        if(sessionUserReceive == null || !sessionUserReceive.isOpen()) {
            status = Proto.User.STATUS.OFFLINE_VALUE;
            resInviteSupportForSessionUser.setStatus(status);
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResInviteSupport(resInviteSupportForSessionUser).build());
            return;
        }
        status = Proto.User.STATUS.ONLINE_VALUE;
        resInviteSupportForSessionUser.setStatus(status);
        resInviteSupportForSessionUser.setUser(userContextReceive.getUser());
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResInviteSupport(resInviteSupportForSessionUser).build());

        Proto.User user = userContext.getUser();
        resInviteSupportForSupportUser.setUser(user);
        resInviteSupportForSupportUser.setStatus(status);
        DataSenderUtils.sendResponse(sessionUserReceive, Proto.Packet.newBuilder().setResInviteSupport(resInviteSupportForSupportUser).build());
    }

    public void handleReqAcceptInviteSupport(Session session, Proto.ReqAcceptInviteSupport reqAcceptInviteSupport) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }
        UserContext userContextReceive = UserCache.me().getUserContextOnline(reqAcceptInviteSupport.getInviteUserId());
        if(userContextReceive == null) {
            return;
        }
        Session sessionUserReceive = SessionManage.me().get(userContextReceive.getSessionID());
        if(sessionUserReceive == null || !sessionUserReceive.isOpen()) {
            return;
        }

        Proto.User newUserContext = userContext.getUser().toBuilder().setStatus(Proto.User.STATUS.BUSY_VALUE).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);

        Proto.User newUserContextReceive = userContextReceive.getUser().toBuilder().setStatus(Proto.User.STATUS.BUSY_VALUE).build();
        userContextReceive.setUser(newUserContextReceive);
        UserCache.me().add(String.valueOf(userContextReceive.getUser().getUserId()), userContextReceive);


        if(userContext.getUser().getCharacter().getCode().equals("BSTY")){
            Proto.ResMatchmaking resMatchmakingForVeterinarian = Proto.ResMatchmaking.newBuilder()
                    .setMatchmakedUser(userContextReceive.getUser())
                    .build();
            Proto.ResMatchmaking resMatchmakingForLivestockEngineer = Proto.ResMatchmaking.newBuilder()
                    .setMatchmakedUser(userContext.getUser())
                    .build();

            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForVeterinarian).build());
            DataSenderUtils.sendResponse(sessionUserReceive, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForLivestockEngineer).build());
        }else{
            Proto.ResMatchmaking resMatchmakingForMechanical = Proto.ResMatchmaking.newBuilder()
                    .setMatchmakedUser(userContextReceive.getUser())
                    .build();
            Proto.ResMatchmaking resMatchmakingForAgricultural = Proto.ResMatchmaking.newBuilder()
                    .setMatchmakedUser(userContext.getUser())
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForMechanical).build());
            DataSenderUtils.sendResponse(sessionUserReceive, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForAgricultural).build());
        }
    }

    public void handleReqRejectInviteSupport(Session session, Proto.ReqRejectInviteSupport reqRejectInviteSupport) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }
        UserContext userContextReceive = UserCache.me().getUserContextOnline(reqRejectInviteSupport.getInviteUserId());
        if(userContextReceive == null) {
            return;
        }
        Session sessionUserReceive = SessionManage.me().get(userContextReceive.getSessionID());
        if(sessionUserReceive == null || !sessionUserReceive.isOpen()) {
            return;
        }
        Proto.ResRejectInviteSupport resRejectInviteSupport = Proto.ResRejectInviteSupport.newBuilder()
                        .setUser(userContext.getUser()).build();
        DataSenderUtils.sendResponse(sessionUserReceive, Proto.Packet.newBuilder().setResRejectInviteSupport(resRejectInviteSupport).build());
    }

    public void handleReqLoadAidFriends(Session session) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }
        switch (userContext.getUser().getCharacter().getCode()) {
            case "KSCK":
                List<Proto.User> userAgriBeans = new ArrayList<>();
                agriculturalEngineers.forEach(userContext1 -> userAgriBeans.add(userContext1.getUser()));
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadAidFriends(Proto.ResLoadAidFriends.newBuilder().addAllUsers(userAgriBeans).build()).build());
                break;
            case "BSTY":
                List<Proto.User> userLivBeans = new ArrayList<>();
                livestockEngineers.forEach(userContext1 -> userLivBeans.add(userContext1.getUser()));
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadAidFriends(Proto.ResLoadAidFriends.newBuilder().addAllUsers(userLivBeans).build()).build());
                break;
        }
    }

    public void handleReqSupportFriend(Session session, Proto.ReqSupportFriend reqSupportFriend) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }
        UserContext userContextReceive = UserCache.me().getUserContextOnline(reqSupportFriend.getUserId());
        if(userContextReceive == null) {
            return;
        }
        Session sessionUserReceive = SessionManage.me().get(userContextReceive.getSessionID());
        if(sessionUserReceive == null || !sessionUserReceive.isOpen()) {
            return;
        }
        System.out.println("User: " + userContextReceive.getUser());
        System.out.println("User status: " + userContextReceive.getUser().getStatus());
        if(userContextReceive.getUser().getStatus() == Proto.User.STATUS.BUSY_VALUE){
            Proto.ResSupportFriend resSupportFriend = Proto.ResSupportFriend.newBuilder()
                    .setUser(userContextReceive.getUser())
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResSupportFriend(resSupportFriend).build());
            return;
        }

        removeUserFromQueue(userContextReceive);

        Proto.User newUserContext = userContext.getUser().toBuilder().setStatus(Proto.User.STATUS.BUSY_VALUE).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);

        Proto.User newUserContextReceive = userContextReceive.getUser().toBuilder().setStatus(Proto.User.STATUS.BUSY_VALUE).build();
        userContextReceive.setUser(newUserContextReceive);
        UserCache.me().add(String.valueOf(userContextReceive.getUser().getUserId()), userContextReceive);

        if(userContext.getUser().getCharacter().getCode().equals("BSTY")){
            Proto.ResMatchmaking resMatchmakingForVeterinarian = Proto.ResMatchmaking.newBuilder()
                    .setMatchmakedUser(userContextReceive.getUser())
                    .build();
            Proto.ResMatchmaking resMatchmakingForLivestockEngineer = Proto.ResMatchmaking.newBuilder()
                    .setMatchmakedUser(userContext.getUser())
                    .build();

            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForVeterinarian).build());
            DataSenderUtils.sendResponse(sessionUserReceive, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForLivestockEngineer).build());
        }else{
            Proto.ResMatchmaking resMatchmakingForMechanical = Proto.ResMatchmaking.newBuilder()
                    .setMatchmakedUser(userContextReceive.getUser())
                    .build();
            Proto.ResMatchmaking resMatchmakingForAgricultural = Proto.ResMatchmaking.newBuilder()
                    .setMatchmakedUser(userContext.getUser())
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForMechanical).build());
            DataSenderUtils.sendResponse(sessionUserReceive, Proto.Packet.newBuilder().setResMatchmaking(resMatchmakingForAgricultural).build());
        }
    }

    public void handleReqStopSupport(Session session, Proto.ReqStopSupport reqStopSupport) {
        int status = 500;
        int mainUserId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext mainUserContext = UserCache.me().get(String.valueOf(mainUserId));
        // KSCK && BSTY
        Proto.ResStopSupport.Builder resStopSupportForSupport = Proto.ResStopSupport.newBuilder();
        UserContext supportUserContext = UserCache.me().get(String.valueOf(reqStopSupport.getSupportUserId()));
        if(supportUserContext != null) {
            Proto.User newUserContext = supportUserContext.getUser().toBuilder().setStatus(Proto.User.STATUS.ONLINE_VALUE).build();
            supportUserContext.setUser(newUserContext);
            UserCache.me().add(String.valueOf(supportUserContext.getUser().getUserId()), supportUserContext);
            if(mainUserContext.getUser().getUserId() == supportUserContext.getUser().getUserId()) {
                status = 200;
            }else{
                status = 201;
            }
            Session sessionSupport = SessionManage.me().get(supportUserContext.getSessionID());
            resStopSupportForSupport.setStatus(status);
            DataSenderUtils.sendResponse(sessionSupport, Proto.Packet.newBuilder().setResStopSupport(resStopSupportForSupport).build());
        }
        // KSNN && KSCN
        Proto.ResStopSupport.Builder resStopSupportForAid = Proto.ResStopSupport.newBuilder();
        UserContext aidUserContext = UserCache.me().get(String.valueOf(reqStopSupport.getAidUserId()));
        if(aidUserContext != null) {
            Proto.User newUserContextAid = aidUserContext.getUser().toBuilder().setStatus(Proto.User.STATUS.ONLINE_VALUE).build();
            aidUserContext.setUser(newUserContextAid);
            UserCache.me().add(String.valueOf(aidUserContext.getUser().getUserId()), aidUserContext);
            resStopSupportForAid.setStatus(status);
            Session sessionAid = SessionManage.me().get(aidUserContext.getSessionID());
            DataSenderUtils.sendResponse(sessionAid, Proto.Packet.newBuilder().setResStopSupport(resStopSupportForAid).build());
        }
        System.out.println("status: " + status);
    }
}
