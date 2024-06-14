package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.BuildingDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.TillLandDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ABuilding;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PlantingLandBuildingBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.CommonBuildingCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.PropertyBuildingCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.PropertyBuildingContext;

import java.util.List;

public class AgriculturalService {
    private static final AgriculturalService instance = new AgriculturalService();

    private AgriculturalService() {
    }

    public static AgriculturalService me() {
        return instance;
    }

    public void handleBuyBuilding(Session session, Proto.ReqBuyBuilding reqBuyBuilding){
        String typeBuilding = reqBuyBuilding.getTypeBuilding();
        Proto.Building.Builder buildingResponse = Proto.Building.newBuilder();
        if(typeBuilding.equals("PLANTING_LAND")){
            //insert planting land
            ABuilding plantingBuilidng = new PlantingLandBuildingBean();
            int idPlantingBuilding = CommonBuildingCache.me().getIdBuildingByType(ConstUtils.TYPE_ITEM.PLANTING_LAND);
            if(idPlantingBuilding == 0) idPlantingBuilding = BuildingDAO.getIdBuildingByType(ConstUtils.TYPE_ITEM.PLANTING_LAND);
            plantingBuilidng.setCommonBuildingId(idPlantingBuilding);
            plantingBuilidng.setAreaId(reqBuyBuilding.getAreaId());
            plantingBuilidng.setPositionX(reqBuyBuilding.getPositionX());
            plantingBuilidng.setPositionY(reqBuyBuilding.getPositionY());
            //set planting land response
            Proto.PlantingLandBuilding.Builder plantingLandBuilding = BuildingDAO.insertPlantingLandInArea(plantingBuilidng);
            //add building cache
                //redis
            PropertyBuildingContext propertyBuildingContext = PropertyBuildingContext.builder()
                    .propertyBuildingBean(plantingLandBuilding.getPropertyBuilding())
                    .build();
            PropertyBuildingCache.me().addPropertyBuilding(propertyBuildingContext);
                //local
            PropertyBuildingCache.me().add(propertyBuildingContext);
            //set till land
            TillLandDAO.insertTillLand(plantingLandBuilding.getPropertyBuilding().getId());
            List<Proto.TillLand> tillLands = TillLandDAO.getListTillLandByPlantingLandId(plantingLandBuilding.getPropertyBuilding().getId());
            Proto.TillLands.Builder tillLandsBuilder = Proto.TillLands.newBuilder();
            tillLands.forEach(tillLand -> tillLandsBuilder.addTillLand(tillLand));
            plantingLandBuilding.setTillLands(tillLandsBuilder);
            buildingResponse.setPlantingLandBuilding(plantingLandBuilding);
        }
        Proto.ResBuyBuilding.Builder resBuyBuilding = Proto.ResBuyBuilding.newBuilder();
        resBuyBuilding.setUuid(reqBuyBuilding.getUuid());
        resBuyBuilding.setBuilding(buildingResponse);
        sendResponse(session, Proto.Packet.newBuilder().setResBuyBuilding(resBuyBuilding).build());
    }

    private void sendResponse(Session session, Proto.Packet packet) {
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen())
            session.getAsyncRemote().sendObject(packets);
    }
}
