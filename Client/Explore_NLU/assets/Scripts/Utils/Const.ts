import { Enum, Vec3 } from "cc";
import { spawn } from "child_process";

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

export enum SCENES {
  AUTHEN = "AuthenScene",
  ANIMAL_HUSBANDRY = "AnimalHusbandryScene",
  FARM = "FarmScene",
  KIOT = "KiotScene",
  VETERINARIAN = "VeterinarianScene",
  MECHANICAL = "MechanicalScene",
  PICK_CHARACTER = "PickCharacterScene",
  PHUONG_VI = "PhuongViScene",
  CAM_TU = "CamTuScene",
  RANG_DONG = "RangDongScene",
  QUOC_LO_1A = "QuocLo1AScene",
}

export enum SCENES_COMMON {
  ME = 0,
  KIOT = 5,
  PHUONG_VI = 6,
  CAM_TU = 7,
  RANG_DONG = 8,
  QUOC_LO_1A = 9,
}

Enum(SCENES_COMMON);

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
    sceneName: SCENES.VETERINARIAN,
    spawnPos: [
      {
        oldSceneName: SCENES.QUOC_LO_1A,
        spawnPos: new Vec3(-430, -540, 0),
      },
    ],
  },
  {
    sceneName: SCENES.ANIMAL_HUSBANDRY,
    spawnPos: [
      {
        oldSceneName: SCENES.KIOT,
        spawnPos: new Vec3(606, -350, 0),
      },
    ],
  },
  {
    sceneName: SCENES.MECHANICAL,
    spawnPos: [
      {
        oldSceneName: SCENES.CAM_TU,
        spawnPos: new Vec3(520, -286, 0),
      },
    ],
  },
  {
    sceneName: SCENES.FARM,
    spawnPos: [
      {
        oldSceneName: SCENES.KIOT,
        spawnPos: new Vec3(-176, -338, 0),
      },
    ],
  },
  {
    sceneName: SCENES.KIOT,
    spawnPos: [
      {
        oldSceneName: SCENES.ANIMAL_HUSBANDRY,
        spawnPos: new Vec3(3610, 580, 0),
      },
      {
        oldSceneName: SCENES.FARM,
        spawnPos: new Vec3(3280, 175, 0),
      },
      {
        oldSceneName: SCENES.PHUONG_VI,
        spawnPos: new Vec3(1960, -515, 0),
      },
      {
        oldSceneName: SCENES.QUOC_LO_1A,
        spawnPos: new Vec3(-3447, -262, 0),
      },
    ],
  },
  {
    sceneName: SCENES.PHUONG_VI,
    spawnPos: [
      {
        oldSceneName: SCENES.CAM_TU,
        spawnPos: new Vec3(-780, 96, 0),
      },
      {
        oldSceneName: SCENES.RANG_DONG,
        spawnPos: new Vec3(742, 1180, 0),
      },
      {
        oldSceneName: SCENES.KIOT,
        spawnPos: new Vec3(-240, -1630, 0),
      },
    ],
  },
  {
    sceneName: SCENES.CAM_TU,
    spawnPos: [
      {
        oldSceneName: SCENES.PHUONG_VI,
        spawnPos: new Vec3(145, -1236, 0),
      },
      {
        oldSceneName: SCENES.MECHANICAL,
        spawnPos: new Vec3(-1030, -578, 0),
      },
    ],
  },
  {
    sceneName: SCENES.RANG_DONG,
    spawnPos: [
      {
        oldSceneName: SCENES.PHUONG_VI,
        spawnPos: new Vec3(-144, -857, 0),
      },
    ],
  },
  {
    sceneName: SCENES.QUOC_LO_1A,
    spawnPos: [
      {
        oldSceneName: SCENES.KIOT,
        spawnPos: new Vec3(-614, 454, 0),
      },
      {
        oldSceneName: SCENES.VETERINARIAN,
        spawnPos: new Vec3(-1024, -464, 0),
      },
    ],
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

export const LOCAL_STORAGE = {
  USERNAME: "USERNAME",
  AUTO_LOGIN: "AUTO_LOGIN",
  TOKEN: "TOKEN",
};

export enum POPUP {
  POPUP_OPTION = "POPUP_OPTION",
  POPUP_SETTING = "POPUP_SETTING",
  POPUP_FRIEND = "POPUP_FRIEND",
  POPUP_SHOP = "POPUP_SHOP",
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
  RICE = "rice-seed-bag",
  CABBAGE = "cabbage-seed-bag",
  CARROT = "carrot-seed-bag",
  CUCUMBER = "cucumber-seed-bag",
  PUMPKIN = "pumpkin-seed-bag",
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
  SEED = "SEED",
}

export enum WEATHER {
  RAIN = "RAIN",
  SUNNY = "SUNNY",
}

export enum TYPE_TOOL {
  SICKLE = "Sickle",
  PICKAXE = "Pickaxe",
  HAMMER = "Hammer",
  SEED_BAG = "SeedBag",
}

export enum REWARD_ICONS {
  GOLD = "icon-gold",
  EXPERIENCE_POINT = "icon-experience",
  SEED_BAG = "seed-bag",
}
