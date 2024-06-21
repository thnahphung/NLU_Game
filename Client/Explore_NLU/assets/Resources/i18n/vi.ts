const win = window as any;

export const languages = {
  // Data
  label_text: {
    //authen
    authen_signin: "ĐĂNG NHẬP",
    authen_signup: "ĐĂNG KÝ",
    authen_username: "Tài khoản",
    authen_password: "Mật khẩu",
    authen_forgot_password: "Quên mật khẩu?",
    authen_remember_me: "Tự động đăng nhập lại",
    authen_email: "Email",
    authen_confirm_password: "Nhập lại mật khẩu",
    authen_policy: "Bạn đồng ý với chính sách của chúng tôi!",
    authen_forget_password: "Quên mật khẩu",
    authen_forget_newpassword: "Mật khẩu mới",
    authen_forget_continue: "TIẾP TỤC",
    authen_forget_email: "Email của bạn",
    authen_forget_token: "Mã xác nhận",
    authen_change_password: "ĐỔI MẬT KHẨU",

    //setting
    setting_title: "CÀI ĐẶT",
    setting_music: "Nhạc nền",
    setting_sound: "Âm thanh",
    setting_notify: "Thông báo",
    setting_language: "Ngôn ngữ",
    setting_language_current: "Tiếng Việt",
    setting_language_vietnamese: "Tiếng Việt",
    setting_language_english: "English",
    //pick character
    pick_character_title: "Chọn nhân vật",
    pick_character_select: "CHỌN",
    //character
    character_title: "Nhân vật",
    character_name_mechanical: "Kỹ sư cơ khí",
    character_name_veterinarian: "Bác sĩ thú y",
    character_name_agricultural: "Kỹ sư nông nghiệp",
    character_name_animal_husbandry: "Kỹ sư chăn nuôi",
    //loading
    loading: "Đang tải...",
    //UI
    btn_setting: "Cài đặt",
    btn_leader_board: "Xếp hạng",
    btn_mail: "Hộp thư",
    btn_event: "Sự kiện",
    btn_quest: "Nhiệm vụ",
    btn_friend: "Bạn bè",
    //UI Animal
    animal_type: "Giống:",
    animal_age: "Tuổi:",
    animal_health: "Sức khỏe:",
    animal_pregnant: "Mang thai:",
    animal_age_day: "ngày",
    animal_health_good: "Tốt",
    animal_health_disease: "Bệnh",
    animal_pregnant_yes: "Có",
    animal_pregnant_no: "Không",
    //breeding popup
    breeding_popup_title: "LAI GIỐNG",
    //cage information popup
    cage_information_popup_title_cow_barn: "CHUỒNG BÒ",
    cage_information_popup_title_chicken_coop: "CHUỒNG GÀ",
    cage_information_popup_capacity: "Sức chứa:",
    cage_information_popup_level: "Cấp độ:",
    //Popup
    title_notify: "Thông báo",
    closing_connection: "Mất kết nối với máy chủ, đang thử kết nối lại...",
  },
};

if (!win.languages) {
  win.languages = {};
}

win.languages.vi = languages;
