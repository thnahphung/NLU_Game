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
    authen_forget_password: "Forget password",
    authen_forget_newpassword: "New password",
    authen_forget_continue: "CONTINUE",
    authen_forget_email: "Your email",
    authen_forget_token: "Token",
    authen_change_password: "CHANGE PASSWORD",
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
    btn_friend: "Friend",
    //UI Animal
    animal_type: "Type:",
    animal_age: "Age:",
    animal_health: "Health:",
    animal_pregnant: "Pregnant:",
    animal_age_day: "day",
    animal_health_good: "Good",
    animal_health_disease: "Disease",
    animal_pregnant_yes: "Yes",
    animal_pregnant_no: "No",
    //breeding popup
    breeding_popup_title: "BREEDING",
    //cage information popup
    cage_information_popup_title_cow_barn: "COW BARN",
    cage_information_popup_title_chicken_coop: "CHICKEN COOP",
    cage_information_popup_capacity: "Capacity:",
    cage_information_popup_level: "Level:",
    //Popup
    title_notify: "Notification",
    closing_connection: "Lost connection to the server, trying to reconnect...",
  },
};

if (!win.languages) {
  win.languages = {};
}

win.languages.en = languages;
