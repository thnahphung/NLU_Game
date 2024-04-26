
const win = window as any;

export const languages = {
    // Data
    "label_text": {
        "hello": "xin chào!" ,
        "bye": "tạm biệt!"
    }
};

if (!win.languages) {
    win.languages = {};
}

win.languages.zh = languages;
