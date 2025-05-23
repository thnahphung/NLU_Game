package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.AreaDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.BuildingDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.TillLandDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.*;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.CommonBuildingContext;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.PropertyBuildingContext;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AreaService {
    private static final AreaService instance = new AreaService();

    private AreaService() {
    }

    public static AreaService me() {
        return instance;
    }

    public void joinOtherArea(Session session, Proto.ReqPlayerJoinArea reqJoinArea) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return;
        Proto.Area areaLeaved = leaveArea(session);
        Proto.Area areaProto = getAreaByUserId(reqJoinArea.getUserTargetId());
        if (areaProto == null) return;
        String typeArea = areaLeaved == null ? "" : areaLeaved.getTypeArea();
        joinArea(userId, typeArea, areaProto, session);
    }

    public void joinAreaLogin(int userId, Session session) {
        Proto.Area areaProto = getAreaByUserId(userId);
        if (areaProto == null) return;
        joinArea(userId, "", areaProto, session);
    }

    public Proto.Area joinAreaCommon(Session session, Proto.ReqPlayerJoinAreaCommon reqPlayerJoinAreaCommon) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return null;
        Proto.Area areaLeaved = leaveArea(session);
        Proto.Area areaProto = getAreaByAreaId(reqPlayerJoinAreaCommon.getAreaCommonId());
        if (areaProto == null) return null;
        String typeArea = areaLeaved == null ? "" : areaLeaved.getTypeArea();
        joinArea(userId, typeArea, areaProto, session);
        return areaProto;
    }

    public void joinArea(int userId, String oldAreaType, Proto.Area areaProto, Session session) {
        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(areaProto.getAreaId()));
        ArrayList<Proto.User> listUserInArea = UserCache.me().getListUser(listUserIdInArea);
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        Proto.ResPlayerJoinArea resPlayerJoinArea;
        //gui cho player moi vao
        if ("".equals(oldAreaType)) {
            resPlayerJoinArea = Proto.ResPlayerJoinArea.newBuilder()
                    .setArea(areaProto)
                    .addAllUsers(listUserInArea)
                    .build();
        } else {
            resPlayerJoinArea = Proto.ResPlayerJoinArea.newBuilder()
                    .setArea(areaProto)
                    .addAllUsers(listUserInArea)
                    .setOldAreaType(oldAreaType)
                    .build();
        }
        sendResponse(session, Proto.Packet.newBuilder().setResPlayerJoinArea(resPlayerJoinArea).build());
        boolean isFirstUser = AreaCache.me().countUserInArea(String.valueOf(areaProto.getAreaId())) == 0;
        AreaCache.me().addUserToArea(String.valueOf(areaProto.getAreaId()), String.valueOf(userId), isFirstUser);
        if (isFirstUser) {
            Proto.ResFirstJUserInArea resFirstUserJoinArea = Proto.ResFirstJUserInArea.newBuilder().build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFirstJUserInArea(resFirstUserJoinArea).build());
        }
        //gui cho player cu
        if (listSessionInArea.size() > 0) {
            Proto.ResOtherPlayerJoinArea resOtherPlayerJoinArea = Proto.ResOtherPlayerJoinArea.newBuilder()
                    .setUser(UserCache.me().getUserOnline(userId))
                    .build();
            sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResOtherPlayerJoinArea(resOtherPlayerJoinArea).build());
        }
    }

    public Proto.Area getAreaByUserId(int userId) {
        Proto.Area areaProto = AreaCache.me().getAreaByUserId(userId);
        // kiem tra neu chua co area trong cache thi load tu database
        if (areaProto == null) {
            AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
            if (areaBean == null) return null;
            areaProto = Proto.Area.newBuilder()
                    .setAreaId(areaBean.getId())
                    .setTypeArea(areaBean.getTypeArea())
                    .setStatus(areaBean.getStatus())
                    .setUserId(areaBean.getUserId())
                    .build();
            AreaCache.me().add(areaProto);
        }
        return areaProto;
    }

    public Proto.Area getAreaByAreaId(int areaId) {
        Proto.Area areaProto = AreaCache.me().get(String.valueOf(areaId));
        // kiem tra neu chua co area trong cache thi load tu database
        if (areaProto == null) {
            AreaBean areaBean = AreaDAO.loadAreaById(areaId);
            if (areaBean == null) return null;
            areaProto = Proto.Area.newBuilder()
                    .setAreaId(areaBean.getId())
                    .setTypeArea(areaBean.getTypeArea())
                    .setStatus(areaBean.getStatus())
                    .setUserId(areaBean.getUserId())
                    .build();
            AreaCache.me().add(areaProto);
        }
        return areaProto;
    }


    public void moving(Session session, Proto.ReqMoving reqMoving) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        Proto.Position position = reqMoving.getPosition();
        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(reqMoving.getAreaId()));
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        listSessionInArea.removeIf(s -> s.equals(SessionID.of(session).getSessionId()));
        Proto.ResMoving resMoving = Proto.ResMoving.newBuilder()
                .setUserId(userId)
                .setPosition(position)
                .setCurrentState(reqMoving.getCurrentState())
                .build();
        sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResMoving(resMoving).build());
    }

    public Proto.Area leaveArea(Session session) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return null;
        }
        List<Proto.Area> areas = AreaCache.me().getAllAreaRedis();
        for (Proto.Area area : areas) {
            if (AreaCache.me().isContainUserInArea(String.valueOf(area.getAreaId()), String.valueOf(userId))) {
                boolean isFirstUserInArea = AreaCache.me().getIsFirstUserInArea(String.valueOf(area.getAreaId()), String.valueOf(userId));

                AreaCache.me().removeUserFromArea(String.valueOf(area.getAreaId()), String.valueOf(userId));
                if (isFirstUserInArea) {
                    int userFirstId = AreaCache.me().randomFirstUserInArea(String.valueOf(area.getAreaId()));
                    if (userFirstId != -1) {
                        UserContext userContext = UserCache.me().get(String.valueOf(userFirstId));
                        Session sessionFirstUser = SessionManage.me().get(userContext.getSessionID());
                        Proto.ResFirstJUserInArea resFirstUserJoinArea = Proto.ResFirstJUserInArea.newBuilder().build();
                        DataSenderUtils.sendResponse(sessionFirstUser, Proto.Packet.newBuilder().setResFirstJUserInArea(resFirstUserJoinArea).build());
                    }
                }
                ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(area.getAreaId()));
                ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
                listSessionInArea.removeIf(s -> s.equals(SessionID.of(session).getSessionId()));
                Proto.ResOtherPlayerLeaveArea resPlayerLeaveArea = Proto.ResOtherPlayerLeaveArea.newBuilder()
                        .setUserId(userId)
                        .build();
                sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResOtherPlayerLeaveArea(resPlayerLeaveArea).build());
                return area;
            }
        }
        return null;
    }

    private void sendResponse(Session session, Proto.Packet packet) {
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen())
            session.getAsyncRemote().sendObject(packets);
    }

    private void sendResponseManySession(ArrayList<String> listSessionId, Proto.Packet packet) {
        if (listSessionId.size() == 0) return;
        for (String sessionId : listSessionId) {
            Session sessionInArea = SessionManage.me().get(sessionId);
            sendResponse(sessionInArea, packet);
        }
    }

}
