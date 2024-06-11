package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.AllArgsConstructor;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
@AllArgsConstructor
public class FarmBuildingBean extends ABuilding{
    private int commonBuildingId;
    public FarmBuildingBean(int id, String name, String description, ConstUtils.TYPE_ITEM type, int maxLevel, int upgradeId, int currentLevel, int areaId, int positionX, int positionY, int commonBuildingId) {
        super(id, name, description, type, maxLevel, upgradeId, currentLevel, areaId, positionX, positionY, commonBuildingId);
    }
    public FarmBuildingBean(){

    }
}
