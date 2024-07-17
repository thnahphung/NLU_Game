package vn.edu.nlu.fit.nlugame.layer2;

public class ConstUtils {
    public enum TYPE_ITEM {
        ANIMAL("ANIMAL"),
        TREE("TREE"),
        STONE("STONE"),
        ROOT("ROOT"),
        HOUSE("HOUSE"),
        PLANTING_LAND("PLANTING_LAND"),
        CROP("CROP"),
        SEED("SEED"),
        CAGE("CAGE");

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

    public enum TYPE_AREA {
        FARM_SCENE("FarmScene"),
        ANIMAL_HUSBANDRY_SCENE("AnimalHusbandryScene"),
        VETERNARIAN_SCENE("VeterinarianScene"),
        MECHANICAL_SCENE("MechanicalScene");

        private final String value;

        TYPE_AREA(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public enum REWARDS {
        EXPERIENCE("Experience"),
        GOLD("Gold"),
        RICE_BAG("rice"),
        CARROT_BAG("carrot"),
        CABBAGE_BAG("cabbage"),
        CUCUMBER_BAG("cucumber"),
        PUMPKIN_BAG("pumpkin");

        public final String value;

        REWARDS(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static REWARDS fromValue(String value) {
            for (REWARDS reward : values()) {
                if (reward.getValue().equals(value)) {
                    return reward;
                }
            }
            return null;
        }
    }

    public static final String GOOGLE_CLIENT_ID = "437772553970-vklbe77ufknniqm86875t6hhv8765k3j.apps.googleusercontent.com";
    public static final String GOOGLE_CLIENT_SECRET = "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";
    public static final String GOOGLE_REDIRECT_URI = "http://localhost:8080/socket/oauth2callback";
    public static final String GOOGLE_GRANT_TYPE = "authorization_code";
    public static final String GOOGLE_LINK_GET_TOKEN = "https://accounts.google.com/o/oauth2/token";
    public static final String GOOGLE_LINK_GET_USER_INFO = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";
}
