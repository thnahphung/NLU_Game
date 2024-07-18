package vn.edu.nlu.fit.nlugame.layer1;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.List;

public class PingPongService {
    private static final PingPongService install = new PingPongService();
    SessionManage sessionManage = SessionManage.me();

    private PingPongService() {
    }

    public static PingPongService me() {
        return install;
    }

    public void pingPong() {
        List<String> keyList = sessionManage.listSessionId();
        for (String sessionId : keyList) {
            Session session = sessionManage.get(sessionId);
            try {
                if (session != null && session.isOpen())
                    session.getAsyncRemote().sendPing(ByteBuffer.wrap("ping".getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        List<Session> sessionRemoveList = sessionManage.getSessionRemoveList();
        if(sessionRemoveList != null || !sessionRemoveList.isEmpty())for (Session session : sessionRemoveList) {
            System.out.println("Close session: " + session.getId() + " Reason: " + "No Pong");
            AreaService.me().leaveArea(session);
            SessionService.me().onClose(session);
            sessionManage.getSessionRemoveList().remove(session);
        }
    }

    public void handleReqPong(Session session) {
        SessionManage.me().get(SessionID.of(session.getId()).getSessionId());
    }
}
