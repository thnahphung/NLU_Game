package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.dao.CharacterDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.PlayerDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CharacterBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;

import java.util.List;

public class CharacterService {
    private static final CharacterService instance = new CharacterService();
    public static CharacterService me() {
        return instance;
    }
    public void loadCharactes(Session session) {
        List<CharacterBean> characters = CharacterDAO.loadAllCharacter();
        Proto.ResLoadCharacters.Builder builder = Proto.ResLoadCharacters.newBuilder();
        if(characters == null) {
            System.out.println("Error: Load character failed");
            sendResponse(session, Proto.Packet.newBuilder().setResLoadCharacters(builder).build());
            return;
        }
        for (CharacterBean character : characters) {
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
    public void pickCharacter(Session session, Proto.ReqPickCharacter reqPickCharacter) {
        int characterId = reqPickCharacter.getCharacterId();
        String playerName = reqPickCharacter.getPlayerName();
        SessionID sessionID = SessionID.of(session);
        int userId = SessionCache.me().getUserID(sessionID);
        if (userId == -1) {
            System.out.println("Error: User not login");
            sendResponse(session, Proto.Packet.newBuilder().setResPickCharacter(Proto.ResPickCharacter.newBuilder().setStatus(401)).build());
            return;
        }
        int resultInsert = PlayerDAO.insertPlayer(playerName, userId, characterId, 0);
        if(resultInsert == 200) {
            UserDAO.updateHasCharacter(userId, 1);
        }
        sendResponse(session, Proto.Packet.newBuilder().setResPickCharacter(Proto.ResPickCharacter.newBuilder().setStatus(resultInsert)).build());
    }

    private void sendResponse(Session session, Proto.Packet packet) {
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen())
            session.getAsyncRemote().sendObject(packets);
    }
}
