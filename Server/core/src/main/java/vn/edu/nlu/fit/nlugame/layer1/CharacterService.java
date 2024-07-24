package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.AreaDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.CharacterDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.PlayerDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.UserDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CharacterBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
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
        if (characters == null) {
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

    public UserBean pickCharacter(Session session, Proto.ReqPickCharacter reqPickCharacter) {
        int characterId = reqPickCharacter.getCharacterId();
        String playerName = reqPickCharacter.getPlayerName();
        //Check player name exist
        if (UserDAO.checkPlayerNameExist(playerName)) {
            sendResponse(session, Proto.Packet.newBuilder().setResPickCharacter(Proto.ResPickCharacter.newBuilder().setStatus(400)).build());
            return null;
        }
        SessionID sessionID = SessionID.of(session);
        UserBean userLoginBean = new UserBean();
        String typeArea = "";
        int userId = SessionCache.me().getUserID(sessionID);
        // Check user login
        if (userId < 1) {
            sendResponse(session, Proto.Packet.newBuilder().setResPickCharacter(Proto.ResPickCharacter.newBuilder().setStatus(500)).build());
            return null;
        }
        if (characterId < 1 || playerName.trim().equals("")) {
            sendResponse(session, Proto.Packet.newBuilder().setResPickCharacter(Proto.ResPickCharacter.newBuilder().setStatus(500)).build());
            return null;
        }

        CharacterBean characterBean = CharacterDAO.loadCharacterById(characterId);
        Proto.Character.Builder character = Proto.Character.newBuilder();
        character.setId(characterBean.getId());
        character.setName(characterBean.getName());
        character.setCode(characterBean.getCode());
        character.setDescription(characterBean.getDescription());

        switch (character.getCode()) {
            case "BSTY":
                typeArea = ConstUtils.TYPE_AREA.VETERNARIAN_SCENE.getValue();
                break;
            case "KSCK":
                typeArea = ConstUtils.TYPE_AREA.MECHANICAL_SCENE.getValue();
                break;
            case "KSNN":
                typeArea = ConstUtils.TYPE_AREA.FARM_SCENE.getValue();
                break;
            case "KSCN":
                typeArea = ConstUtils.TYPE_AREA.ANIMAL_HUSBANDRY_SCENE.getValue();
                break;
            default:
                System.out.println("Error: Invalid character code");
        }

        // Update player name
        UserDAO.updatePlayerName(userId, playerName);
        //update has character
        UserDAO.updateHasCharacter(userId, 1);
        UserDAO.updateCharacterId(userId, characterId);

        userLoginBean = UserDAO.selectUser(userId);

        Proto.User.Builder userProto = Proto.User.newBuilder()
                .setUserId(userLoginBean.getId())
                .setUsername(userLoginBean.getUsername() == null ? "" : userLoginBean.getUsername())
                .setHasCharacter(userLoginBean.getHasCharacter())
                .setCharacterId(userLoginBean.getCharacterId())
                .setLevel(userLoginBean.getLevel())
                .setIsNewAccount(1)
                .setEmail(userLoginBean.getEmail())
                .setPlayerName(userLoginBean.getPlayerName())
                .setGold(userLoginBean.getGold())
                .setCharacter(character);

        int resultInsert = AreaDAO.insertArea(userId, typeArea);
        if (resultInsert == 200) {
            sendResponse(session, Proto.Packet.newBuilder().setResPickCharacter(Proto.ResPickCharacter.newBuilder().setStatus(resultInsert).setUser(userProto)).build());
        }
        UserCache.me().addUserOnline(userProto.build(), SessionID.of(session).getSessionId());
        return userLoginBean;
    }

    private void sendResponse(Session session, Proto.Packet packet) {
        Proto.PacketWrapper packets = Proto.PacketWrapper.newBuilder().addPacket(packet).build();
        if (session != null && session.isOpen())
            session.getAsyncRemote().sendObject(packets);
    }
}
