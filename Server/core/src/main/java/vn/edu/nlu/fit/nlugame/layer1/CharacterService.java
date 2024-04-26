package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.dao.CharacterDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CharacterBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;

public class CharacterService {
    private static final CharacterService instance = new CharacterService();
    public static CharacterService me() {
        return instance;
    }
    public void loadCharactes(Session session, Proto.ReqLogin reqLogin) {
        List<CharacterBean> characters = CharacterDAO.loadAllCharacter();
        Proto.ResLoadCharacters.Builder builder = Proto.ResLoadCharacters.newBuilder();
        if(characters == null) {
            System.out.println("Error: Load character failed");
            sendResponse(session, Proto.Packet.newBuilder().setResLoadCharacters(builder).build());
            return;
        }
        for (CharacterBean character : characters) {
            System.out.println("Res Character: " + character.getName());
            builder.addCharacter(
                     Proto.Character.newBuilder()
                    .setId(character.getId())
                    .setName(character.getName())
                    .setCode(character.getCode())
                    .setDescription(character.getDescription() == null ? "" : character.getDescription())
                    .build()
            );
        }
        sendResponse(session, Proto.Packet.newBuilder().setResLoadCharacters(builder).build());
    }

    private void sendResponse(Session session, Proto.Packet packet) {
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen())
            session.getAsyncRemote().sendObject(packets);
    }
}
