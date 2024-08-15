package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.ArrayList;
import java.util.List;

public class RankService {
    private static final RankService install = new RankService();

    private RankService() {
    }

    public static RankService me() {
        return install;
    }

    public void loadRank(Session session, Proto.ReqLoadRank reqLoadRank) {
        // Load rank from database
        String characterCode = reqLoadRank.getCharacterCode();
        List<UserBean> users = UserDAO.getRankUsers(characterCode);
        List<Proto.UserRank> rankUserProtos = new ArrayList<>();
        if (users != null && !users.isEmpty())
            for(int i = 0; i < users.size(); i++) {
                UserBean user = users.get(i);
                Proto.UserRank.Builder userRankBuilder = Proto.UserRank.newBuilder();
                Proto.User.Builder userBuilder = Proto.User.newBuilder();
                Proto.Character.Builder characterBuilder = Proto.Character.newBuilder();
                userBuilder.setUserId(user.getId());
                userBuilder.setPlayerName(user.getPlayerName());
                userBuilder.setLevel(user.getLevel());
                userBuilder.setGold(user.getGold());
                characterBuilder.setId(user.getCharacterId());
                characterBuilder.setCode(characterCode);
                userBuilder.setCharacter(characterBuilder.build());
                userRankBuilder.setRank(i + 1);
                userRankBuilder.setUser(userBuilder.build());
                rankUserProtos.add(userRankBuilder.build());
            }
        Proto.ResLoadRank resLoadRank = Proto.ResLoadRank.newBuilder().addAllUserRanks(rankUserProtos).build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadRank(resLoadRank).build());
    }
}
