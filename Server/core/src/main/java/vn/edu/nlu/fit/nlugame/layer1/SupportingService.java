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
        UserContext userContextMechanical = mechanicalEngineers.peek();
        UserContext userContextAgricultural = agriculturalEngineers.peek();
        if(userContextMechanical == null || userContextAgricultural == null) {
            return false;
        }

        Session sessionMechanical = SessionManage.me().get(userContextMechanical.getSessionID());
        Session sessionAgricultural = SessionManage.me().get(userContextAgricultural.getSessionID());
        if(sessionMechanical == null || !sessionMechanical.isOpen() || sessionAgricultural == null || !sessionAgricultural.isOpen()) {
            return false;
        }

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
        UserContext userContextLivestockEngineer = livestockEngineers.peek();
        if(userContextVeterinarian == null || userContextLivestockEngineer == null) {
            return false;
        }

        Session sessionVeterinarian = SessionManage.me().get(userContextVeterinarian.getSessionID());
        Session sessionLivestockEngineer = SessionManage.me().get(userContextLivestockEngineer.getSessionID());
        if(sessionVeterinarian == null || !sessionVeterinarian.isOpen() || sessionLivestockEngineer == null || !sessionLivestockEngineer.isOpen()) {
            return false;
        }

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
            System.out.println("Mechanical engineer is busy");
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
            System.out.println("Session is closed");
            status = Proto.User.STATUS.OFFLINE_VALUE;
            resInviteSupportForSessionUser.setStatus(status);
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResInviteSupport(resInviteSupportForSessionUser).build());
            return;
        }
        status = Proto.User.STATUS.WAITING_VALUE;
        resInviteSupportForSessionUser.setStatus(status);
        resInviteSupportForSessionUser.setUser(userContextReceive.getUser());
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResInviteSupport(resInviteSupportForSessionUser).build());

        Proto.User user = userContext.getUser();
        resInviteSupportForSupportUser.setUser(user);
        resInviteSupportForSupportUser.setStatus(status);
        DataSenderUtils.sendResponse(sessionUserReceive, Proto.Packet.newBuilder().setResInviteSupport(resInviteSupportForSupportUser).build());
        System.out.println("Invite support successfully" + status);
    }

    public void handleReqAcceptInviteSupport(Session session, Proto.ReqAcceptInviteSupport reqAcceptInviteSupport) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        if(userContext == null) {
            return;
        }
        UserContext userContextReceive = UserCache.me().getUserContextOnline(reqAcceptInviteSupport.getInviteUserId());
        System.out.println(userContextReceive);
        if(userContextReceive == null) {
            return;
        }
        Session sessionUserReceive = SessionManage.me().get(userContextReceive.getSessionID());
        if(sessionUserReceive == null || !sessionUserReceive.isOpen()) {
            return;
        }

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
        System.out.println("Accept invite support successfully");
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
}
