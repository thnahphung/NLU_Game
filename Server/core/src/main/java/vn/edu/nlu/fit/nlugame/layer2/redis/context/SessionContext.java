package vn.edu.nlu.fit.nlugame.layer2.redis.context;

import lombok.Builder;
import lombok.Data;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.Serializable;

@Data
@Builder
public class SessionContext implements Serializable {
    private String sessionID;
    private Proto.User user;
    private int roomId;
    private String socketID;
    private boolean isBot;
}
