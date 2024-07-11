package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.dao.AreaDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.AreaBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.AreaCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;

public class AnimalHusbandService {
    private static final AnimalHusbandService instance = new AnimalHusbandService();

    private AnimalHusbandService() {
    }

    public static AnimalHusbandService me() {
        return instance;
    }

    public void buyCage(Session session, Proto.ReqBuyCage reqBuyCage) {

    }

    public void loadCages(Session session, Proto.ReqLoadCages reqLoadCages) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));

        Proto.Area areaProto = getAreaById(userId);
        // todo: get properties building by id

    }

    public Proto.Area getAreaByUserId(int userId) {
        Proto.Area areaProto = AreaCache.me().getAreaByUserId(userId);
        if (areaProto == null) {
            AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
            if (areaBean == null) {
                return null;
            }
            areaProto = Proto.Area.newBuilder()
                    .setAreaId(areaBean.getId())
                    .setUserId(areaBean.getUserId())
                    .setTypeArea(areaBean.getTypeArea())
                    .setStatus(areaBean.getStatus())
                    .build();
            AreaCache.me().add(areaProto);
        }
        return areaProto;
    }

    public Proto.Area getAreaById(int id) {
        Proto.Area area = AreaCache.me().get(String.valueOf(id));
        if (area == null) {
            AreaBean areaBean = AreaDAO.loadAreaById(id);
            if (areaBean == null) {
                return null;
            }
            area = Proto.Area.newBuilder()
                    .setAreaId(areaBean.getId())
                    .setUserId(areaBean.getUserId())
                    .setTypeArea(areaBean.getTypeArea())
                    .setStatus(areaBean.getStatus())
                    .build();
            AreaCache.me().add(String.valueOf(id), area);
        }
        return area;
    }
}
