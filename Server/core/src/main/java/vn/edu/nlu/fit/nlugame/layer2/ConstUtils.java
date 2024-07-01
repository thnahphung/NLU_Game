package vn.edu.nlu.fit.nlugame.layer2;

public class ConstUtils {
    public enum TYPE_ITEM {
        ANIMAL("ANIMAL"),
        TREE("TREE"),
        STONE("STONE"),
        ROOT("ROOT"),
        HOUSE("HOUSE"),
        PLANTING_LAND("PLANTING_LAND"),
        CROP("CROP");
        private final String value;

        TYPE_ITEM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static TYPE_ITEM fromValue(String value) {
            for (TYPE_ITEM type : values()) {
                if (type.getValue().equals(value)) {
                    return type;
                }
            }
            return null;
        }
    }

    public enum WEATHER {
        RAIN("RAIN"),
        SUNNY("SUNNY");

        private final String value;

        WEATHER(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public enum STATUS_FRIEND {
        PENDING(1),
        ACCEPTED(2),
        REJECTED(3);

        private final int value;

        STATUS_FRIEND(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
}
