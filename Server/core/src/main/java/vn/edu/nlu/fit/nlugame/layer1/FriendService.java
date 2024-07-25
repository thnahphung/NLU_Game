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

import java.util.ArrayList;
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
        if(status == 4) {
            List<UserBean> friends = FriendshipDAO.loadSuggestFriendList(userId);
            List<Proto.Friend> friendProtos = new ArrayList<>();
            for(UserBean friend : friends) {
                Proto.Friend.Builder friendBuilder = Proto.Friend.newBuilder();
                friendBuilder.setId(friend.getId());
                friendBuilder.setName(friend.getPlayerName());
                friendBuilder.setLevel(friend.getLevel());
                CharacterBean characterBean = CharacterDAO.loadCharacterById(friend.getCharacterId());
                if(characterBean != null) {
                    friendBuilder.setCharacter(Proto.Character.newBuilder().setName(characterBean.getName()).setCode(characterBean.getCode()).setId(characterBean.getId()).build());
                } else {
                    friendBuilder.setCharacter(Proto.Character.newBuilder().setName("The user has not selected a character").build());
                }
                friendProtos.add(friendBuilder.build());
            }

            Proto.ResLoadFriendList resLoadFriendList = Proto.ResLoadFriendList.newBuilder().addAllFriends(friendProtos).setStatus(status).build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadFriendList(resLoadFriendList).build());
            return;
        }
        List<UserBean> friends = FriendshipDAO.loadFriendList(userId, status);
        List<Proto.Friend> friendProtos = new ArrayList<>();
        for(UserBean friend : friends) {
            Proto.Friend.Builder friendBuilder = Proto.Friend.newBuilder();
            friendBuilder.setId(friend.getId());
            friendBuilder.setName(friend.getPlayerName());
            friendBuilder.setLevel(friend.getLevel());
            CharacterBean characterBean = CharacterDAO.loadCharacterById(friend.getCharacterId());
            if(characterBean != null) {
                friendBuilder.setCharacter(Proto.Character.newBuilder().setName(characterBean.getName()).setCode(characterBean.getCode()).setId(characterBean.getId()).build());
            } else {
                friendBuilder.setCharacter(Proto.Character.newBuilder().setName("The user has not selected a character").build());
            }
            friendProtos.add(friendBuilder.build());
        }
        Proto.ResLoadFriendList resLoadFriendList = Proto.ResLoadFriendList.newBuilder().addAllFriends(friendProtos).setStatus(status).build();
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
        Proto.Character.Builder characterProto = Proto.Character.newBuilder();
        characterProto.setId(characterBean.getId());
        characterProto.setName(characterBean.getName());
        characterProto.setCode(characterBean.getCode());
        characterProto.setDescription(characterBean.getDescription());

        if(characterProto != null) {
            friendBuilder.setCharacter(characterProto);
        } else {
            friendBuilder.setCharacter(Proto.Character.newBuilder().setName("The user has not selected a character").build());
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
                Proto.Character.Builder characterProto = Proto.Character.newBuilder();
                characterProto.setId(characterBean.getId());
                characterProto.setName(characterBean.getName());
                characterProto.setCode(characterBean.getCode());
                characterProto.setDescription(characterBean.getDescription());

                if(characterProto != null) {
                    senderBuilder.setCharacter(characterProto);
                } else {
                    senderBuilder.setCharacter(Proto.Character.newBuilder().setName("The user has not selected a character").build());
                }
                senderBuilder.setLevel(userBean.getLevel());
            }

            resAddFriend.setSender(senderBuilder);
            packet.setResAddFriend(resAddFriend);
            DataSenderUtils.sendResponse(sessionUserReceive, packet.build());
        }
    }

    public void acceptFriend(Session session, Proto.ReqAcceptFriend reqAcceptFriend) {
        int senderId = reqAcceptFriend.getSenderId();
        int receiverId = SessionCache.me().getUserID(SessionID.of(session));
        FriendshipDAO.acceptFriendRequest(senderId, receiverId);
        UserBean receiverBean = UserDAO.selectUser(receiverId);

        CharacterBean characterBean = CharacterDAO.loadCharacterById(receiverBean.getCharacterId());
        Proto.Character.Builder character = Proto.Character.newBuilder();
        character.setId(characterBean.getId());
        character.setName(characterBean.getName());
        character.setCode(characterBean.getCode());
        character.setDescription(characterBean.getDescription());

        Proto.Friend receiver = Proto.Friend.newBuilder()
                .setId(receiverId)
                .setName(receiverBean.getPlayerName())
                .setLevel(receiverBean.getLevel())
                .setCharacter(character)
                .build();

        UserContext userContextSender = UserCache.me().getUserContextOnline(senderId);
        if(userContextSender == null) {
            return;
        }
        Session sessionSender = SessionManage.me().get(userContextSender.getSessionID());
        if(sessionSender == null) {
            return;
            //TODO: get from other server
        }
        DataSenderUtils.sendResponse(sessionSender, Proto.Packet.newBuilder().setResAcceptFriend(Proto.ResAcceptFriend.newBuilder().setReceiver(receiver)).build());
    }

    public void rejectFriend(Session session, Proto.ReqRejectFriend reqRejectFriend) {
        int senderId = reqRejectFriend.getSenderId();
        int receiverId = SessionCache.me().getUserID(SessionID.of(session));
        FriendshipDAO.rejectFriendRequest(senderId, receiverId);
    }
}
