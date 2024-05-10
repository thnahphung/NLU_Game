import { Vec3 } from "cc";

export const POPUP_MESSAGE = {
  LOGIN_SUCCESS_200: `Đăng nhập thành công!`,
  LOGIN_FAILED_400: `Tên đăng nhập hoặc mật khẩu không đúng!`,
  LOGIN_FAILED_402: `Tài khoản chưa đã bị khóa!`,
  LOGIN_FAILED_403: `Tài khoản đăng được đăng nhập ở thiết bị khác!`,
  LOGIN_FAILED_500: `Tài khoản đã đăng nhập!`,
  REGISTER_SUCCESS_200: `Đăng ký thành công!`,
  REGISTER_FAILED_400: `Tên đăng nhập đã tồn tại!`,
  REGISTER_FAILED_401: `Tên đăng nhập hoặc mật khẩu không thể trống!`,
  REGISTER_FAILED_402: `Đăng ký thất bại!`,
  REGISTER_FAILED_403: `Email này đã được sử dụng!`,
  REGISTER_FAILED_500: `Lỗi hệ thống, hiện tại không thể đăng ký!`,
  LOGOUT_FAILED_400: `Lỗi không thể đăng xuất!`,
  SERVER_ERROR: `Lỗi hệ thống!`,
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
export const KIOT_AREA = {
  SPAWN_POS: new Vec3(-2800, -250, 0),
  SPAWN_POS_NONG_HOC: new Vec3(3234, 180, 0),
};

export enum CHARACTERS {
  KSNN = 1,
  KSCN = 2,
  KSCK = 3,
  BSTY = 4,
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
