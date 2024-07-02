package vn.edu.nlu.fit.nlugame.layer2.dao;

import org.jdbi.v3.core.Jdbi;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.CharacterBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.util.List;
import java.util.stream.Collectors;

public class CharacterDAO extends BaseDAO{
    private static final String TABLE_NAME = "characters";
    public static List<CharacterBean> loadAllCharacter() {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, name, code, description from " + TABLE_NAME)
                .mapToBean(CharacterBean.class).stream().collect(Collectors.toList())
        );
    }

    public static CharacterBean loadCharacterById(int id) {
        Jdbi jdbi = getJdbi();
        if (jdbi == null) {
            return null;
        }
        return jdbi.withHandle(handle -> handle.createQuery("select id, name, code, description from " + TABLE_NAME + " where id = :id")
                .bind("id", id)
                .mapToBean(CharacterBean.class).findFirst().orElse(null)
        );
    }

    public static Proto.Character loadCharacterProtoById(int id) {
        CharacterBean characterBean = loadCharacterById(id);
        if (characterBean == null) {
            return null;
        }
        return Proto.Character.newBuilder()
                .setId(characterBean.getId())
                .setName(characterBean.getName())
                .setCode(characterBean.getCode())
                .setDescription(characterBean.getDescription())
                .build();
    }
}
