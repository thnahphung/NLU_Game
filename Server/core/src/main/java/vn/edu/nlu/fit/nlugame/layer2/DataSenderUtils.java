package vn.edu.nlu.fit.nlugame.layer2;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import javax.mail.Authenticator;
import java.util.ArrayList;
import java.util.Properties;

public class DataSenderUtils {
    public static void sendResponse(Session session, Proto.Packet packet) {
        System.out.println("Send response: " + packet.toString());
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen()) session.getAsyncRemote().sendObject(packets);
    }

    public static void sendMail(String to, String subject, String content) {
        final String form = "nlugamefit@gmail.com";
        final String password = "vzmk phof ccgx aimh";

        //Properties
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        Authenticator authenticator = new Authenticator() {
            @Override
            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                return new javax.mail.PasswordAuthentication(form, password);
            }
        };

        //Phien lam viec
        javax.mail.Session session = javax.mail.Session.getInstance(properties, authenticator);

        //Gui mail
        try {
            javax.mail.Message message = new javax.mail.internet.MimeMessage(session);
            message.setFrom(new javax.mail.internet.InternetAddress(form));
            message.setRecipient(javax.mail.Message.RecipientType.TO, new javax.mail.internet.InternetAddress(to, false));
            message.setSubject(subject);
            message.setContent(content, "text/html; charset=UTF-8");
            javax.mail.Transport.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendResponseManySession(ArrayList<String> listSession, Proto.Packet packet) {
        for (String sessionId : listSession) {
            Session sessionInArea = SessionManage.me().get(sessionId);
            sendResponse(sessionInArea, packet);
        }
    }
}
