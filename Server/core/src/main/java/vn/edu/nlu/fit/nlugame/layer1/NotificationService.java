package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

public class NotificationService {
    private static NotificationService instance = new NotificationService();

    public static NotificationService me() {
        return instance;
    }

    public void levelUp(Session session, Proto.ReqLevelUp reqLevelUp) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        UserBean userBean = UserDAO.selectUser(userId);
        if (userBean == null) return;
        int level = userBean.getLevel();
        int exp = userBean.getExperiencePoints();
        if(exp >= 100) {
            int newLevel = level + 1;
            int newExp = exp - 100;
            userBean.setLevel(newLevel);
            userBean.setExperiencePoints(newExp);
            int status = UserDAO.updateExpAndLevel(userBean.getId(), userBean.getExperiencePoints(), userBean.getLevel());
            UserContext userContext = UserCache.me().get(String.valueOf(userId));
            Proto.User user = userContext.getUser();
            Proto.User newUserContext = user.toBuilder().setLevel(newLevel).setExperiencePoints(newExp).build();
            userContext.setUser(newUserContext);
            UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLevelUp(Proto.ResLevelUp.newBuilder().setStatus(status).setLevel(userBean.getLevel()).setExp(userBean.getExperiencePoints())).build());
        }
    }

    public void sendNotification(Session session, Proto.Packet packet) {
//        SessionContext ssctx = SessionCache.me().get(SessionManage.me().getSessionID(session));
    }
}
