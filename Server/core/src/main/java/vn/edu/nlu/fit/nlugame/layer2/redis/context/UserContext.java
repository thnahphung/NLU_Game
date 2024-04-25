package vn.edu.nlu.fit.nlugame.layer2.redis.context;

import lombok.Builder;
import lombok.Data;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.Serializable;
@Data
@Builder
public class UserContext implements Serializable {
    private Proto.User user;
    private String sessionID;
}
