package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.CharacterDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.FriendshipDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CharacterBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.List;

public class FriendService {
    public static final FriendService instance = new FriendService();

    private FriendService() {
    }

    public static FriendService me() {
        return instance;
    }

    public void loadFriendList(Session session, Proto.ReqLoadFriend reqLoadFriend) {
        // Load friend list from database
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        int status = reqLoadFriend.getStatus();
        if (userId < 1 || reqLoadFriend.getStatus() == 0) {
            return;
        }
        List<Proto.Friend> friends = FriendshipDAO.loadFriendList(userId, status);
        Proto.ResLoadFriendList resLoadFriendList = Proto.ResLoadFriendList.newBuilder().addAllFriends(friends).setStatus(status).build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadFriendList(resLoadFriendList).build());
    }

    public void findFriend(Session session, Proto.ReqFindFriend reqFindFriend) {
        UserBean userBean = UserDAO.getUserByName(reqFindFriend.getUsername());
        if (userBean == null) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFindFriend(Proto.ResFindFriend.newBuilder()).build());
            return;
        }
        Proto.ResFindFriend.Builder resFindFriendBuilder = Proto.ResFindFriend.newBuilder();
        Proto.Friend.Builder friendBuilder = Proto.Friend.newBuilder();
        friendBuilder.setId(userBean.getId());
        CharacterBean characterBean = CharacterDAO.loadCharacterById(userBean.getCharacterId());

        if(characterBean != null) {
            friendBuilder.setCharacter(characterBean.getName());
        } else {
            friendBuilder.setCharacter("The user has not selected a character");
        }

        friendBuilder.setName(userBean.getPlayerName());
        friendBuilder.setLevel(userBean.getLevel());
        resFindFriendBuilder.setFriend(friendBuilder);

        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFindFriend(resFindFriendBuilder).build());
    }

    public void addFriend(Session session, Proto.ReqAddFriend reqAddFriend) {
        int senderId = SessionCache.me().getUserID(SessionID.of(session));
        int receiveId = reqAddFriend.getReceiverId();
        if(receiveId < 1 || senderId < 1) return;
        FriendshipDAO.sendFriendRequest(senderId, receiveId);

        UserContext userContextReceive = UserCache.me().getUserContextOnline(receiveId);
        if(userContextReceive == null) {
            return;
            //TODO:
        }
        Session sessionUserReceive = SessionManage.me().get(userContextReceive.getSessionID());
        if(sessionUserReceive == null) {
            return;
            //TODO: get from other server
        }


        if(sessionUserReceive.isOpen()) {
            Proto.Packet.Builder packet = Proto.Packet.newBuilder();
            Proto.ResAddFriend.Builder resAddFriend = Proto.ResAddFriend.newBuilder();

            Proto.Friend.Builder senderBuilder = Proto.Friend.newBuilder();
            senderBuilder.setId(senderId);
            UserBean userBean = UserDAO.selectUser(senderId);
            if(userBean != null) {
                senderBuilder.setName(userBean.getPlayerName());
                CharacterBean characterBean = CharacterDAO.loadCharacterById(userBean.getCharacterId());
                if(characterBean != null) {
                    senderBuilder.setCharacter(characterBean.getName());
                } else {
                    senderBuilder.setCharacter("The user has not selected a character");
                }
                senderBuilder.setLevel(userBean.getLevel());
            }

            resAddFriend.setSender(senderBuilder);
            packet.setResAddFriend(resAddFriend);
            DataSenderUtils.sendResponse(sessionUserReceive, packet.build());
        }
    }
}
