package vn.edu.nlu.fit.nlugame.layer2.redis.context;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CommonBuildingBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.Serializable;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommonBuildingContext implements Serializable {
    private Proto.BuildingBase buildingBaseBean;
}