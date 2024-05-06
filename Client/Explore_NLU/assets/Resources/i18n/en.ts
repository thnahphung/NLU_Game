const win = window as any;

export const languages = {
  // Data
  label_text: {
    //authen
    authen_signin: "SIGN IN",
    authen_signup: "SIGN UP",
    authen_username: "Username",
    authen_password: "Password",
    authen_forgot_password: "Forgot password?",
    authen_remember_me: "Remember me",
    authen_email: "Email",
    authen_confirm_password: "Confirm password",
    authen_policy: "I agree to all the terms and conditions",
    //setting
    setting_title: "SETTING",
    setting_music: "Music ",
    setting_sound: "Sound",
    setting_notify: "Notification",
    setting_language: "Language",
    setting_language_current: "English",
    setting_language_vietnamese: "Tiếng Việt",
    setting_language_english: "English",
    //pick character
    pick_character_title: "Pick character",
    pick_character_select: "PICK",
    //character
    character_title: "Character",
    character_name_mechanical: "Mechanical Engineer",
    character_name_veterinarian: "Veterinarian",
    character_name_agricultural: "Agricultural engineer",
    character_name_animal_husbandry: "Animal husbandry engineer",
    //loading
    loading: "Loading...",
    //UI
    btn_setting: "Setting",
    btn_leader_board: "Leader board",
    btn_mail: "Mail",
    btn_event: "Event",
    btn_quest: "Quest",
  },
};

if (!win.languages) {
  win.languages = {};
}

win.languages.en = languages;
