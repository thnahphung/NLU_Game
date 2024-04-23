package vn.edu.nlu.fit.nlugame.layer2.redis.context;

import jakarta.websocket.Session;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class SessionContext implements Serializable {
    private Integer userID;
}
