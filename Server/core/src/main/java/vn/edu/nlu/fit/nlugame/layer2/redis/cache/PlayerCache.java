package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import vn.edu.nlu.fit.nlugame.layer2.CompressUtils;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.RedisClusterHelper;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class PlayerCache extends RedisClusterHelper implements ICache<Proto.Player, Integer> {
    private static final PlayerCache instance = new PlayerCache();
    private static final Cache<Integer, Proto.Player> playerMap = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(10, TimeUnit.MINUTES).build();
    private static final String PLAYER_KEY = "players";

    private PlayerCache() {
    }

    public static PlayerCache me() {
        return instance;
    }

    @Override
    public boolean add(Integer key, Proto.Player value) {
        playerMap.put(key, value);
        return true;
    }

    @Override
    public boolean add(Proto.Player value) {
        return this.add(value.getPlayerId(), value);
    }

    @Override
    public Proto.Player get(Integer key) {
        return playerMap.getIfPresent(key);
    }

    @Override
    public List<Proto.Player> getAll() {
        return new ArrayList<>(getAllPlayer().values());
    }

    @Override
    public Set<Integer> getKeys() {
        return null;
    }

    @Override
    public Proto.Player remove(Integer key) {
        Proto.Player player = playerMap.getIfPresent(key);
        if (player != null) {
            playerMap.invalidate(key);
        }
        return player;
    }

    @Override
    public boolean containsKey(Integer key) {
        return playerMap.getIfPresent(key) != null;
    }

    @Override
    public void clear() {
        playerMap.invalidateAll();
    }

    @Override
    public Integer getKey(Proto.Player value) {
        return value.getPlayerId();
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

    //    public void addPlayer(Proto.Player player) {
//        getConnection().hset(PLAYER_KEY.getBytes(), String.valueOf(player.getPlayerId()).getBytes(), CompressUtils.compress(player));
//    }
    public void addPlayer(Proto.Player player) {
        getConnection().hset(PLAYER_KEY, String.valueOf(player.getPlayerId()), player.toString());
    }

    public void removePlayer(int playerId) {
        getConnection().hdel(PLAYER_KEY, String.valueOf(playerId));
    }

    public Proto.Player removeByUserId(int userId) {
        Proto.Player result = null;
        for (Proto.Player player : playerMap.asMap().values()) {
            if (player.getUserId() == userId) {
                playerMap.invalidate(player.getPlayerId());
                result = player;
            }
        }
        return result;
    }
}
