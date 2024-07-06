package vn.edu.nlu.fit.nlugame.layer1;
import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;

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
                //System.out.println("pingPongJob:  " + sessionId);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
//        remoweList.forEach(s -> sessionManage.addSessionIDToRemoveList(s));

    }

}
