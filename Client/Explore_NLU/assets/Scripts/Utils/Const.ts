import { Vec3 } from "cc";

export const POPUP_MESSAGE = {
  LOGIN_SUCCESS_200: `Đăng nhập thành công!`,
  LOGIN_FAILED_400: `Tên đăng nhập hoặc mật khẩu không đúng!`,
  LOGIN_FAILED_401: `Tên đăng nhập hoặc mật khẩu không thể trống!`,
  LOGIN_FAILED_402: `Tài khoản chưa đã bị khóa!`,
  LOGIN_FAILED_403: `Tài khoản đăng được đăng nhập ở thiết bị khác!`,
  LOGIN_FAILED_500: `Tài khoản đã đăng nhập!`,
  REGISTER_SUCCESS_200: `Đăng ký thành công!`,
  REGISTER_FAILED_400: `Tên đăng nhập đã tồn tại!`,
  REGISTER_FAILED_401: `Tên đăng nhập hoặc mật khẩu không thể trống!`,
  REGISTER_FAILED_402: `Mật khẩu không trùng khớp!`,
  REGISTER_FAILED_403: `Email này đã được sử dụng!`,
  REGISTER_FAILED_500: `Lỗi hệ thống, hiện tại không thể đăng ký!`,
  REGISTER_FAILED_INPUT: `Tên đăng nhập không được chưa khoảng trắng!`,
  REGISTER_FAILED_EMAIL: `Email không hợp lệ!`,
  LOGOUT_FAILED_400: `Lỗi không thể đăng xuất!`,
  LOGOUT_FAILED_401: `Chưa đăng nhập tài khoản!`,
  SERVER_ERROR: `Lỗi hệ thống!`,
  FORGET_PASSWORD_SUCCESS: `Mật khẩu mới đã được gửi vào email của bạn!`,
  FORGET_PASSWORD_FAILED_400: `Email không tồn tại!`,
  FORGET_PASSWORD_FAILED_401: `Email không được để trống!`,
  FORGET_PASSWORD_FAILED_403: `Email không hợp lệ!`,
};

export const SETTINGS = {
  DEFAULT_EFFECT: 1,
  DEFAULT_MUSIC: 1,
  DEFAULT_BRIGHTNESS: 1,
  DEFAULT_NOTIFICATION: true,
};
export const AUDIOS = {
  CLICK: "Audios/click",
  BACKGROUND: "Audios/Bg/tungtung",
};

export const SETTING_AREA = [
  {
    sceneName: "FarmScene",
    spawnPos: new Vec3(0, 0, 0),
  },
  {
    sceneName: "AnimalHusbandryScene",
    spawnPos: new Vec3(760, -354, 0),
  },
  {
    sceneName: "MechanicalScene",
    spawnPos: new Vec3(0, 0, 0),
  },
  {
    sceneName: "VeterinarianScene",
    spawnPos: new Vec3(-407, -86, 0),
  },
];
//Spawn position end

export enum CHARACTERS {
  KSNN = "KSNN",
  KSCN = "KSCN",
  KSCK = "KSCK",
  BSTY = "BSTY",
}

export enum CHARACTER_STATE {
  IDLE_UP = "idle-up",
  IDLE_DOWN = "idle-down",
  IDLE_LEFT = "idle-left",
  IDLE_RIGHT = "idle-right",
  WALK_UP = "walk-up",
  WALK_DOWN = "walk-down",
  WALK_LEFT = "walk-left",
  WALK_RIGHT = "walk-right",
}

export enum ANIMAL_STATE {
  IDLE_LEFT = "idle-left",
  IDLE_RIGHT = "idle-right",
  WALK_LEFT = "walk-left",
  WALK_RIGHT = "walk-right",
  EAT_LEFT = "eat-left",
  EAT_RIGHT = "eat-right",
}

export enum SCENES {
  AUTHEN = "AuthenScene",
  ANIMAL_HUSBANDRY = "AnimalHusbandryScene",
  FARM = "FarmScene",
  KIOT = "KiotScene",
  VETERINARIAN = "VeterinarianScene",
  MECHANICAL = "MechanicalScene",
  PICK_CHARACTER = "PickCharacterScene",
}

export const LOCAL_STORAGE = {
  USERNAME: "USERNAME",
  AUTO_LOGIN: "AUTO_LOGIN",
  TOKEN: "TOKEN",
};

export enum POPUP {
  POPUP_OPTION = "POPUP_OPTION",
  POPUP_SETTING = "POPUP_SETTING",
  POPUP_FRIEND = "POPUP_FRIEND",
}

export enum BUTTON {
  UI_BUTTON_BUILDING = "BUILDING",
}

export enum CUSTOM_EVENT {
  LISTEN_CANCEL = "LISTEN_CANCEL",
  LISTEN_COMPLETE = "LISTEN_COMPLETE",
}

export enum COATING {
  MOVE = "MOVE",
  TILL = "TILL",
  SEED = "SEED",
  FEED = "FEED",
  HARVEST = "HARVEST",
}

export enum SEED_BAG {
  RICE = "Rice",
  CABBAGE = "Cabbage",
  CARROT = "Carrot",
  CUCUMBER = "Cucumber",
  PUMPKIN = "Pumpkin",
}

export enum PLANTING_LAND {
  WIDTH = 172,
  HEIGHT = 178,
}

export enum ANIMAL {
  COW = "Cow",
  CHICKEN = "Chicken",
}

export enum ANIMAL_FOOD {
  HAY = "Hay",
  PADDY_GRAIN = "PaddyGrain",
}

export enum TYPE_ITEM {
  ANIMAL = "ANIMAL",
  TREE = "TREE",
  STONE = "STONE",
  HOUSE = "HOUSE",
  ROOT = "ROOT",
  PLANTING_LAND = "PLANTING_LAND",
}

export enum WEATHER {
  RAIN = "RAIN",
  SUNNY = "SUNNY",
}
