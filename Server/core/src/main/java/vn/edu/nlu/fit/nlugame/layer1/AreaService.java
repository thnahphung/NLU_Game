package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
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

    public void joinArea(Session session, Proto.ReqPlayerJoinArea reqJoinArea) {
        leaveRoom(session);
        int userId = SessionCache.me().getUserID(SessionID.of(session));

        int userIdTarget = reqJoinArea.getUserTargetId();
        Proto.Area areaTarget = AreaCache.me().getArea(userIdTarget);
        if (areaTarget == null) return;

        Proto.Position spawnPosition = areaTarget.getPosition();

        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(areaTarget.getAreaId());
        ArrayList<Proto.User> listUserInArea = UserCache.me().getListUser(listUserIdInArea);
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);

        //gui cho player moi vao
        Proto.ResPlayerJoinArea resPlayerJoinArea = Proto.ResPlayerJoinArea.newBuilder()
                .setArea(areaTarget)
                .addAllUsers(listUserInArea)
                .setPosition(spawnPosition)
                .build();
        sendResponse(session, Proto.Packet.newBuilder().setResPlayerJoinArea(resPlayerJoinArea).build());

        AreaCache.me().addUserToArea(areaTarget.getAreaId(), userId, Proto.Position.newBuilder().setX(0).setY(0).build());
        //gui cho player cu
        Proto.ResOtherPlayerJoinArea resOtherPlayerJoinArea = Proto.ResOtherPlayerJoinArea.newBuilder()
                .setUser(UserCache.me().getUserOnline(userId))
                .setPosition(spawnPosition)
                .build();
        sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResOtherPlayerJoinArea(resOtherPlayerJoinArea).build());
    }

    public void joinAreaLogin(int userId, Session session) {
        AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
        if (areaBean == null) return;

        //Them player vao area
        AreaCache.me().addUserToArea(areaBean.getId(), userId, Proto.Position.newBuilder().setX(0).setY(0).build());

        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(areaBean.getId());
        ArrayList<Proto.User> listUserInArea = UserCache.me().getListUser(listUserIdInArea);

        Proto.Area areaProto = Proto.Area.newBuilder()
                .setAreaId(areaBean.getId())
                .setTypeArea(areaBean.getTypeArea())
                .setStatus(areaBean.getStatus())
                .build();

        AreaCache.me().add(userId, areaProto);
        AreaCache.me().addArea(userId, areaProto);
        Proto.ResPlayerJoinArea resPlayerJoinArea = Proto.ResPlayerJoinArea.newBuilder()
                .setArea(areaProto)
                .addAllUsers(listUserInArea)
                .build();
        sendResponse(session, Proto.Packet.newBuilder().setResPlayerJoinArea(resPlayerJoinArea).build());
    }

    public void moving(Session session, Proto.ReqMoving reqMoving) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }

        Proto.Position position = reqMoving.getPosition();

        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(reqMoving.getAreaId());
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        listSessionInArea.removeIf(s -> s.equals(SessionID.of(session).getSessionId()));
        Proto.ResMoving resMoving = Proto.ResMoving.newBuilder()
                .setUserId(userId)
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
            if (AreaCache.me().removeUserFromArea(area.getAreaId(), userId) > 0) {
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
    public void loadItemsOfFarm(Session session, Proto.ReqLoadItemsOfFarm reqLoadItemsOfFarm){
        // Check user vua tao account
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
        System.out.println(areaBean);
        int areaId = areaBean.getId();
        Proto.BuildingItems farmItems = null;
        if(isUserNewAccount(userId)){
            farmItems = getFarmBaseItems();
            Runnable runnable = () -> {
                saveBaseItemsOfFarm(areaId, getFarmBaseItems());
                UserDAO.updateIsNewAccount(userId, false);
            };
            ThreadManage.me().execute(runnable);
        }else{
            farmItems = getUserItemsOfFarm(areaId);
        }
        if(farmItems == null){
            return;
        }
        Proto.ResLoadItemsOfFarm.Builder resLoadItemsOfFarm = Proto.ResLoadItemsOfFarm.newBuilder();
        resLoadItemsOfFarm.setBuildingItems(farmItems);
        sendResponse(session, Proto.Packet.newBuilder().setResLoadItemsOfFarm(resLoadItemsOfFarm).build());
    }
    public void saveBaseItemsOfFarm(int areaId, Proto.BuildingItems farmBaseItems){
        farmBaseItems.getBuildingList().forEach(building -> {
            BuildingDAO.insertBaseBuildingInArea(areaId, building.getFarmBuilding());
        });
    }

    private boolean isUserNewAccount(int userId){
        Proto.User user = UserCache.me().get(String.valueOf(userId)).getUser();
        if(user == null){
            user = UserCache.me().getUserOnline(userId);
        }
        if(user == null){
            return false;
        }
        boolean isNewAccount = user.getIsNewAccount() == 1 ? true : false;
        return isNewAccount;
    }
    private Proto.BuildingItems getFarmBaseItems() {
        Proto.BuildingItems.Builder buildingItems = Proto.BuildingItems.newBuilder();
        // Sử dụng ClassLoader để lấy InputStream từ file trong resources
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("farm_base_item.csv");

        if (inputStream == null) {
            System.out.println("File không tồn tại!");
            return buildingItems.build();
        }
        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            br.readLine();
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                String name = values[0];
                long price = Long.parseLong(values[1]);
                String description = values[2];
                String type = values[3];
                int maxLevel = Integer.parseInt(values[4]);
                int currentLevel = Integer.parseInt(values[5]);
                int areaId = Integer.parseInt(values[6]);
                int positionX = Integer.parseInt(values[7]);
                int positionY = Integer.parseInt(values[8]);
                int buildingId = Integer.parseInt(values[9]);
                ConstUtils.TYPE_ITEM typeItem = ConstUtils.TYPE_ITEM.fromValue(type);
                if(typeItem != null){
                    Proto.BuildingBase.Builder base = Proto.BuildingBase.newBuilder()
                            .setId(buildingId)
                            .setName(name)
                            .setPrice(price)
                            .setDescription(description)
                            .setType(type)
                            .setMaxLevel(maxLevel);
                    Proto.PropertyBuilding.Builder propertyBuilding = Proto.PropertyBuilding.newBuilder()
                            .setAreaId(areaId)
                            .setPositionX(positionX)
                            .setPositionY(positionY)
                            .setCurrentLevel(currentLevel)
                            .setCommonBuildingId(buildingId);
                    Proto.Building.Builder buildingProto = Proto.Building.newBuilder();
                    Proto.FarmBuilding.Builder farmBuilding = Proto.FarmBuilding.newBuilder()
                            .setBase(base)
                            .setPropertyBuilding(propertyBuilding);
                    buildingProto.setFarmBuilding(farmBuilding);
                    buildingItems.addBuilding(buildingProto);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return buildingItems.build();
    }

    private Proto.BuildingItems getUserItemsOfFarm(int areaId){
        List<ABuilding> userItems = new ArrayList<>();
        Proto.BuildingItems.Builder buildingProtos = Proto.BuildingItems.newBuilder();
        List<Proto.BuildingBase> baseItems = null;
        List<Proto.PropertyBuilding> propertyItems = null;
        //Get baseItems
            //Get baseItems from local
        baseItems = CommonBuildingCache.me().getAll().stream().map(CommonBuildingContext::getBuildingBaseBean).collect(Collectors.toList());
            //Get baseItems from redis
        if(baseItems == null || baseItems.isEmpty()) baseItems = CommonBuildingCache.me().getAllCommonBuildingBean();

            //Get baseItems from database
        if(baseItems == null || baseItems.isEmpty()) {
            // get all base item user
            baseItems = BuildingDAO.getAllCommonBuilding();
            // Save baseItems to redis and local
            List<Proto.BuildingBase> baseItemsCache = baseItems;
            Runnable runnable = () -> addListBaseBuildingToCache(baseItemsCache);
            ThreadManage.me().execute(runnable);
        }
        //Get propertyItems
            //Get propertyItems from local
        propertyItems = PropertyBuildingCache.me().getAll(areaId).stream().map(PropertyBuildingContext::getPropertyBuildingBean).collect(Collectors.toList());
            //Get propertyItems from redis
        if(propertyItems == null || propertyItems.isEmpty()) propertyItems = PropertyBuildingCache.me().getAllPropertyBuildingBeanByAreaId(areaId);
        if(propertyItems == null || propertyItems.isEmpty()) {
            //Get propertyItems from database
            propertyItems = BuildingDAO.getAllPropertyBuildingByAreaId(areaId);
            // Save propertyItems to redis and local
            List<Proto.PropertyBuilding> propertyItemsCache = propertyItems;
            Runnable runnable = () -> addListPropertyBuildingToCache(propertyItemsCache);
            ThreadManage.me().execute(runnable);
        }

        for(Proto.PropertyBuilding p : propertyItems) {
            Proto.BuildingBase c = null;
            CommonBuildingContext commonBuildingContext = CommonBuildingCache.me().get(String.valueOf(p.getCommonBuildingId()));
            if(commonBuildingContext != null) {
                c = commonBuildingContext.getBuildingBaseBean();
            }
            if(c == null) continue;
            Proto.Building.Builder buildingProto = Proto.Building.newBuilder();
            if(c.getType().equals(ConstUtils.TYPE_ITEM.PLANTING_LAND.getValue())) {
                Proto.PlantingLandBuilding.Builder plantingLandProto = Proto.PlantingLandBuilding.newBuilder();
                plantingLandProto.setBase(c);
                plantingLandProto.setPropertyBuilding(p);
                Proto.TillLands.Builder tillLandProtos = Proto.TillLands.newBuilder();
                List<Proto.TillLand> tillLands = TillLandDAO.getListTillLandByPlantingLandId(plantingLandProto.getPropertyBuilding().getId());
                tillLands.forEach(tillLand -> tillLandProtos.addTillLand(tillLand));
                plantingLandProto.setTillLands(tillLandProtos);
                buildingProto.setPlantingLandBuilding(plantingLandProto);
            }else{
                Proto.FarmBuilding.Builder farmBuildingProto = Proto.FarmBuilding.newBuilder();
                farmBuildingProto.setBase(c);
                farmBuildingProto.setPropertyBuilding(p);
                buildingProto.setFarmBuilding(farmBuildingProto);
            }
            buildingProtos.addBuilding(buildingProto);
        }
        return buildingProtos.build();
    }

    private void addListBaseBuildingToCache(List<Proto.BuildingBase> baseItems){
        baseItems.forEach(item -> {
            CommonBuildingContext commonBuildingContext = CommonBuildingContext.builder().buildingBaseBean(item).build();
            CommonBuildingCache.me().addCommonBuilding(commonBuildingContext);
            CommonBuildingCache.me().add(commonBuildingContext);
        });
    }

    private void addListPropertyBuildingToCache(List<Proto.PropertyBuilding> propertyItems){
        propertyItems.forEach(item -> {
            PropertyBuildingContext propertyBuildingContext = PropertyBuildingContext.builder().propertyBuildingBean(item).build();
            PropertyBuildingCache.me().addPropertyBuilding(propertyBuildingContext);
            PropertyBuildingCache.me().add(propertyBuildingContext);
        });
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
