package vn.edu.nlu.fit.nlugame.layer2.redis.context;

import lombok.Builder;
import lombok.Data;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ABuilding;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyBuildingBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.Serializable;
@Data
@Builder
public class PropertyBuildingContext implements Serializable {
    private Proto.PropertyBuilding propertyBuildingBean;
}
