package vn.edu.nlu.fit.nlugame.layer2.redis.cache;

import java.util.List;
import java.util.Objects;
import java.util.Set;

public interface ICache<T, E> {
    boolean add(E key, T value);

    boolean add(T value);

    T get(E key);

    List<T> getAll();

    Set<E> getKeys();

    T remove(E key);

    boolean containsKey(E key);

    void clear();

    E getKey(T value);
}
