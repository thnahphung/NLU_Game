package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class PlayerCache extends RedisClusterHelper implements ICache<Proto.Player, String> {
    private static final PlayerCache instance = new PlayerCache();
    private static final Cache<String, Proto.Player> playerMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final String PLAYER_KEY = "players";

    private PlayerCache() {
    }

    public static PlayerCache me() {
        return instance;
    }

    @Override
    public boolean add(String key, Proto.Player value) {
        playerMap.put(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.Player value) {
        return this.add(String.valueOf(value.getUserId()), value);
    }

    @Override
    public Proto.Player get(String key) {
        return playerMap.getIfPresent(key);
    }

    @Override
    public List<Proto.Player> getAll() {
        return new ArrayList<>(getAllPlayer().values());
    }

    @Override
    public Set<String> getKeys() {
        return null;
    }

    @Override
    public Proto.Player remove(String key) {
        Proto.Player player = playerMap.getIfPresent(key);
        if (player != null) {
            playerMap.invalidate(key);
        }
        return player;
    }

    @Override
    public boolean containsKey(String key) {
        return playerMap.getIfPresent(key) != null;
    }

    @Override
    public void clear() {
        playerMap.invalidateAll();
    }

    @Override
    public String getKey(Proto.Player value) {
        return String.valueOf(value.getPlayerId());
    }

    public Map<String, Proto.Player> getAllPlayer() {
        Map<byte[], byte[]> map = getConnection().hgetAll(PLAYER_KEY.getBytes());
        Map<String, Proto.Player> result = new HashMap<>();
        map.forEach((k, v) -> {
            Proto.Player player = CompressUtils.decompress(v, Proto.Player.class);
            result.put(new String(k), player);
        });
        return result;
    }

    public void addPlayer(String key, Proto.Player player) {
        getConnection().hset(PLAYER_KEY.getBytes(), String.valueOf(key).getBytes(), CompressUtils.compress(player));
    }

    public Proto.Player getPlayer(int key) {
        byte[] data = getConnection().hget(PLAYER_KEY.getBytes(), String.valueOf(key).getBytes());
        if (data == null) {
            return null;
        }
        return CompressUtils.decompress(data, Proto.Player.class);
    }

    public void removePlayer(int key) {
        getConnection().hdel(PLAYER_KEY.getBytes(), String.valueOf(key).getBytes());
    }

    public Proto.Player removeByUserId(int userId) {
        Proto.Player result = null;
        for (Proto.Player player : playerMap.asMap().values()) {
            if (player.getUserId() == userId) {
                getConnection().hdel(String.valueOf(player.getPlayerId()).getBytes());
                result = player;
            }
        }

        return result;
    }

    public ArrayList<Proto.Player> getListPlayerByListUserId(ArrayList<String> userIds) {
        ArrayList<Proto.Player> result = new ArrayList<>();
        for (String key : userIds) {
            byte[] data = getConnection().hget(PLAYER_KEY.getBytes(), key.getBytes());
            if (data == null) {
                continue;
            }
            Proto.Player player = CompressUtils.decompress(data, Proto.Player.class);
            result.add(player);
        }
        return result;
    }

}
