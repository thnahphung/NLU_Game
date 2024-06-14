package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;

import java.util.List;
@AllArgsConstructor
public class PlantingLandBuildingBean extends ABuilding{
    private int commonBuildingId;
    private List<TillLandBean> tillLands;
    public PlantingLandBuildingBean(int id, String name, String description, ConstUtils.TYPE_ITEM type, int maxLevel, int upgradeId, int currentLevel, int areaId, int positionX, int positionY, int commonBuildingId) {
        super(id, name, description, type, maxLevel, upgradeId, currentLevel, areaId, positionX, positionY, commonBuildingId);
    }
    public PlantingLandBuildingBean(int id, String name, String description, ConstUtils.TYPE_ITEM type, int maxLevel, int upgradeId, int currentLevel, int areaId, int positionX, int positionY, int commonBuildingId, List<TillLandBean> tillLands) {
        super(id, name, description, type, maxLevel, upgradeId, currentLevel, areaId, positionX, positionY, commonBuildingId);
        this.tillLands = tillLands;
    }
    public PlantingLandBuildingBean(){

    }

    public PlantingLandBuildingBean(ABuilding aBuilding){
        super(aBuilding.getId(), aBuilding.getName(), aBuilding.getDescription(), aBuilding.getType(), aBuilding.getMaxLevel(), aBuilding.getUpgradeId(), aBuilding.getCurrentLevel(), aBuilding.getAreaId(), aBuilding.getPositionX(), aBuilding.getPositionY(), aBuilding.getCommonBuildingId());
    }

    public List<TillLandBean> getTillLands() {
        return tillLands;
    }

    public void setTillLands(List<TillLandBean> tillLands) {
        this.tillLands = tillLands;
    }
}
