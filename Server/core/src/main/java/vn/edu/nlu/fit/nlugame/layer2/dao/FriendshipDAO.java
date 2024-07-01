package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CharacterBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;

public class FriendshipDAO {
    private static final String TABLE_NAME = "friendships";

    public static void sendFriendRequest(int senderId, int receiverId) {
        Jdbi jdbi = BaseDAO.getJdbi();
        if (jdbi == null) {
            return ;
        }
        jdbi.withHandle(handle -> handle.createUpdate("insert into " + TABLE_NAME + " (user_id, friend_id, status, create_at) values (:senderId, :receiverId, 1, now())")
                .bind("senderId", senderId)
                .bind("receiverId", receiverId)
                .bind("currentLevel", 1)
                .execute());
    }

    public static void acceptFriendRequest(int senderId, int receiverId) {
        Jdbi jdbi = BaseDAO.getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.useHandle(handle -> handle.createUpdate("update " + TABLE_NAME + " set status = 2 where user_id = :senderId and friend_id = :receiverId")
                .bind("senderId", senderId)
                .bind("receiverId", receiverId)
                .execute()
        );
    }

    public static void rejectFriendRequest(int senderId, int receiverId) {
        Jdbi jdbi = BaseDAO.getJdbi();
        if (jdbi == null) {
            return;
        }
        jdbi.useHandle(handle -> handle.createUpdate("update " + TABLE_NAME + " set status = 3 where user_id = :senderId and friend_id = :receiverId")
                .bind("senderId", senderId)
                .bind("receiverId", receiverId)
                .execute()
        );
    }

    public static List<Proto.Friend> loadFriendList(int userId, int status) {
        Jdbi jdbi = BaseDAO.getJdbi();
        if (jdbi == null) {
            return null;
        }
        String query;
        if(status == 1) {
            query = "SELECT U.id, U.player_name, U.level, U.character_id FROM Users U JOIN Friendships F ON (U.id = F.friend_id OR U.id = F.user_id) WHERE (F.friend_id = :userId) AND U.id != :userId AND F.status = :status";
        } else {
            query = "SELECT U.id, U.player_name, U.level, U.character_id FROM Users U JOIN Friendships F ON (U.id = F.friend_id OR U.id = F.user_id) WHERE (F.user_id = :userId OR F.friend_id = :userId) AND U.id != :userId AND F.status = :status";
        }

        return jdbi.withHandle(handle -> handle.createQuery(query)
                .bind("userId", userId)
                .bind("status", status)
                .map((rs, ctx) -> {
                    Proto.Character character = CharacterDAO.loadCharacterProtoById(rs.getInt("character_id"));
                    if(character ==  null){
                        character = Proto.Character.newBuilder().setName("The user has not selected a character").build();
                    }
                    return Proto.Friend.newBuilder()
                            .setId(rs.getInt("id"))
                            .setName(rs.getString("player_name"))
                            .setLevel(rs.getInt("level"))
                            .setCharacter(character)
                            .build();
                })
                .list());
    }

    public static List<Proto.Friend> loadSuggestFriendList(int userId) {
        Jdbi jdbi = BaseDAO.getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("SELECT U.id, U.player_name, U.level, U.character_id FROM Users U WHERE U.id != :userId AND U.id NOT IN (SELECT F.friend_id FROM Friendships F WHERE F.user_id  = :userId UNION SELECT F.user_id FROM Friendships F WHERE F.friend_id = :userId) ORDER BY RAND() LIMIT 10")
                .bind("userId", userId)
                .map((rs, ctx) -> {
                    Proto.Character character = CharacterDAO.loadCharacterProtoById(rs.getInt("character_id"));
                    if(character ==  null){
                        character = Proto.Character.newBuilder().setName("The user has not selected a character").build();
                    }
                    return Proto.Friend.newBuilder()
                            .setId(rs.getInt("id"))
                            .setName(rs.getString("player_name"))
                            .setLevel(rs.getInt("level"))
                            .setCharacter(character)
                            .build();
                })
                .list());
    }

    public static void main(String[] args) {
        FriendshipDAO friendshipDAO = new FriendshipDAO();
        System.out.println(loadFriendList(1, 1));
    }
}
