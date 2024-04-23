package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import java.util.List;
import java.util.Objects;
import java.util.Set;

public interface ICache<T> {
    void add(Object key, T value);

    T get(Object key);

    List<T> getAll();

    void remove(Object key);
}
