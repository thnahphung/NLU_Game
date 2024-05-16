package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.AreaDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.AreaBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.AreaCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.PlayerCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.SessionContext;

import java.util.ArrayList;

public class AreaService {
    private static final AreaService instance = new AreaService();

    private AreaService() {
    }

    public static AreaService me() {
        return instance;
    }

    public void joinArea(Session session, Proto.ReqPlayerJoinArea reqJoinArea) {
        leaveRoom(session);
        int userId = SessionCache.me().getUserID(SessionID.of(session));

        int userIdTarget = reqJoinArea.getUserTargetId();
        Proto.Area areaTarget = AreaCache.me().getArea(userIdTarget);
        if (areaTarget == null) return;

        Proto.Position spawnPosition = areaTarget.getPosition();


        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(areaTarget.getAreaId());
        ArrayList<Proto.User> listUserInArea = UserCache.me().getListUser(listUserIdInArea);
        ArrayList<Proto.Player> listPlayerInArea = PlayerCache.me().getListPlayerByListUserId(listUserIdInArea);

        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);

        //gui cho player moi vao
        Proto.ResPlayerJoinArea resPlayerJoinArea = Proto.ResPlayerJoinArea.newBuilder()
                .setArea(areaTarget)
                .addAllPlayers(listPlayerInArea)
                .addAllUsers(listUserInArea)
                .setPosition(spawnPosition)
                .build();
        sendResponse(session, Proto.Packet.newBuilder().setResPlayerJoinArea(resPlayerJoinArea).build());

        Proto.Player player = PlayerCache.me().getPlayer(userId);
        AreaCache.me().addPlayerToArea(areaTarget.getAreaId(), userId, player.getPlayerId());
        //gui cho player cu
        Proto.ResOtherPlayerJoinArea resOtherPlayerJoinArea = Proto.ResOtherPlayerJoinArea.newBuilder()
                .setPlayer(player)
                .setUser(UserCache.me().getUserOnline(userId))
                .setPosition(spawnPosition)
                .build();
        sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResOtherPlayerJoinArea(resOtherPlayerJoinArea).build());
    }

    public void joinAreaLogin(int userId, Session session) {
        AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
        if (areaBean == null) return;

        Proto.Position spawnPosition = Proto.Position.newBuilder()
                .setX(areaBean.getSpawnPosX())
                .setY(areaBean.getSpawnPosY())
                .build();

        //Them player vao area
        Proto.Player player = PlayerCache.me().get(String.valueOf(userId));
        AreaCache.me().addPlayerToArea(areaBean.getId(), userId, player.getPlayerId());

        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(areaBean.getId());
        ArrayList<Proto.User> listUserInArea = UserCache.me().getListUser(listUserIdInArea);
        ArrayList<Proto.Player> listPlayerInArea = PlayerCache.me().getListPlayerByListUserId(listUserIdInArea);

        Proto.Area areaProto = Proto.Area.newBuilder()
                .setAreaId(areaBean.getId())
                .setTypeArea(areaBean.getTypeArea())
                .setStatus(areaBean.getStatus())
                .setPlayerId(areaBean.getPlayerId())
                .setPosition(spawnPosition)
                .build();

        AreaCache.me().add(userId, areaProto);
        AreaCache.me().addArea(userId, areaProto);
        Proto.ResPlayerJoinArea resPlayerJoinArea = Proto.ResPlayerJoinArea.newBuilder()
                .setArea(areaProto)
                .addAllPlayers(listPlayerInArea)
                .addAllUsers(listUserInArea)
                .build();
        sendResponse(session, Proto.Packet.newBuilder().setResPlayerJoinArea(resPlayerJoinArea).build());
    }

    public void moving(Session session, Proto.ReqMoving reqMoving) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }

        Proto.Player player = PlayerCache.me().get(String.valueOf(userId));
        Proto.Position position = reqMoving.getPosition();

        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(reqMoving.getAreaId());
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        listSessionInArea.removeIf(s -> s.equals(SessionID.of(session).getSessionId()));
        Proto.ResMoving resMoving = Proto.ResMoving.newBuilder()
                .setUserId(userId)
                .setPlayerId(player.getPlayerId())
                .setPosition(position)
                .build();
        sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResMoving(resMoving).build());
    }

    public void leaveRoom(Session session) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        ArrayList<Proto.Area> areas = AreaCache.me().getAllArea();
        for (Proto.Area area : areas) {
            if (AreaCache.me().removePlayerFromArea(area.getAreaId(), userId) > 0) {
                ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(area.getAreaId());
                ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
                listSessionInArea.removeIf(s -> s.equals(SessionID.of(session).getSessionId()));
                Proto.ResOtherPlayerLeaveArea resPlayerLeaveArea = Proto.ResOtherPlayerLeaveArea.newBuilder()
                        .setUserId(userId)
                        .build();
                sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResOtherPlayerLeaveArea(resPlayerLeaveArea).build());
                break;
            }
        }
    }

    private void sendResponse(Session session, Proto.Packet packet) {
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen())
            session.getAsyncRemote().sendObject(packets);
    }

    private void sendResponseManySession(ArrayList<String> listSession, Proto.Packet packet) {
        for (String sessionId : listSession) {
            Session sessionInArea = SessionManage.me().get(sessionId);
            sendResponse(sessionInArea, packet);
        }
    }

}
