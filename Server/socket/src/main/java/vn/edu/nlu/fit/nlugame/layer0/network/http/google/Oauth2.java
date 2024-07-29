package vn.edu.nlu.fit.nlugame.layer0.network.http.google;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.Session;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;
import vn.edu.nlu.fit.nlugame.layer1.*;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
import vn.edu.nlu.fit.nlugame.layer2.google.dto.GoogleDTO;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.IOException;

@WebServlet("/oauth2callback")
public class Oauth2 extends HttpServlet {
    private final AuthService authService = AuthService.me();
    private final AreaService areaService = AreaService.me();
    private final WarehouseService warehouseService = WarehouseService.me();
    private final GameStateService gameStateService = GameStateService.me();
    private final TaskService taskService = TaskService.me();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String code = req.getParameter("code");
        String sessionId = req.getParameter("state");
        if (code != null) {
            String accessToken = getToken(code);
            GoogleDTO googleDTO = getUserInfo(accessToken);
            if (googleDTO == null) {
                resp.getWriter().write("GoogleDTO not found");
                return;
            }
            Session session = SessionManage.me().get(sessionId);

            UserBean userLoginBean = authService.loginGoogleSuccess(session, googleDTO);
            if (userLoginBean == null) return;
            gameStateService.sendGameStateLogin(session);
            warehouseService.loadWarehouse(session);
            taskService.loadTask(session);
            if (userLoginBean.getHasCharacter() == 0) return;
            areaService.joinAreaLogin(userLoginBean.getId(), session);
        } else {
            resp.getWriter().write("No code found");
        }

        req.getRequestDispatcher("oauth2callback.jsp").forward(req, resp);

    }

    public static String getToken(String code) throws ClientProtocolException, IOException {
        String response = Request.Post(ConstUtils.GOOGLE_LINK_GET_TOKEN)
                .bodyForm(Form.form().add("client_id", ConstUtils.GOOGLE_CLIENT_ID)
                        .add("client_secret", ConstUtils.GOOGLE_CLIENT_SECRET)
                        .add("redirect_uri", ConstUtils.GOOGLE_REDIRECT_URI).add("code", code)
                        .add("grant_type", ConstUtils.GOOGLE_GRANT_TYPE).build())
                .execute().returnContent().asString();

        JsonObject jobj = new Gson().fromJson(response, JsonObject.class);
        return jobj.get("access_token").toString().replaceAll("\"", "");
    }

    public static GoogleDTO getUserInfo(final String accessToken) throws ClientProtocolException, IOException {
        String link = ConstUtils.GOOGLE_LINK_GET_USER_INFO + accessToken;
        String response = Request.Get(link).execute().returnContent().asString();
        return new Gson().fromJson(response, GoogleDTO.class);

    }
}