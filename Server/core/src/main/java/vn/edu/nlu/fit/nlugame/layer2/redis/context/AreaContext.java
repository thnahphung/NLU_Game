package vn.edu.nlu.fit.nlugame.layer2.redis.context;

import lombok.Builder;
import lombok.Data;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

@Data
@Builder
public class AreaContext implements Serializable {
    Proto.Player players;
}
