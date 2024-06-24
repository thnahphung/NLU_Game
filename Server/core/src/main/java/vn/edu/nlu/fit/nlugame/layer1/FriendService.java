package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.CharacterDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CharacterBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

public class FriendService {
    public static final FriendService instance = new FriendService();

    private FriendService() {
    }

    public static FriendService me() {
        return instance;
    }

    public void loadFriendList() {
        // Load friend list from database
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
}
