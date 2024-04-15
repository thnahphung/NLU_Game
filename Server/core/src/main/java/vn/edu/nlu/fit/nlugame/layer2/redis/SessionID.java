package vn.edu.nlu.fit.nlugame.layer2.redis;

import jakarta.websocket.Session;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SessionID {
    static final String ownerEndPointID = String.valueOf(System.currentTimeMillis());

    String endPointID;
    String sessionID;

    public static SessionID of(String endPointID, String sessionID) {
        return SessionID.builder().endPointID(endPointID).sessionID(sessionID).build();
    }

    public static SessionID of(String sessionID) {
        return SessionID.builder().endPointID(ownerEndPointID).sessionID(sessionID).build();
    }

    public static SessionID of(Session session) {
        return SessionID.builder().endPointID(ownerEndPointID).sessionID(session.getId()).build();
    }

    //    parse UUID
    public static SessionID parseUUID(String sessionId) {
        String[] sessionIdDetail = sessionId.split(":");
        if (sessionIdDetail.length != 2) {
            return null;
        }
        return SessionID.builder().endPointID(sessionIdDetail[0]).sessionID(sessionIdDetail[1]).build();
    }

    public String getSessionId() {
        return this.endPointID + ":" + this.sessionID;
    }

}
