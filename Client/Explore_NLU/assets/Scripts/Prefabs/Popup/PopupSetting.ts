import { _decorator, Label, Node, ProgressBar } from "cc";

import { LOCAL_STORAGE, POPUP_MESSAGE, SCENES } from "../../Utils/Const";
import DataSender from "../../Utils/DataSender";
import { init } from "../../../../extensions/i18n/assets/LanguageData";
import { updateSceneRenderers } from "../../../../extensions/i18n/assets/LanguageData";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { StorageManager } from "../../Manager/StorageManger";
import { PopupComponent } from "../../Controller/PopupComponent";
import GlobalData from "../../Utils/GlobalData";
import { UICanvas } from "../MainUI/UICanvas";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
const { ccclass, property } = _decorator;

@ccclass("PopupSetting")
export class PopupSetting extends AbsHandler {
  // Khai bao setting music
  @property(ProgressBar)
  public progressBarMusic: ProgressBar = null;
  // Khai bao setting sound
  @property(ProgressBar)
  public progressBarSound: ProgressBar = null;
  // Khai bao setting language
  @property(Node)
  public dropdownLanguage: Node = null;
  @property(Label)
  public lableLanguage: Label = null;

  protected onLoad(): void {
    this.lableLanguage.string = t("label_text.setting_language_current");
    this.dropdownLanguage.active = false;

    HandlerManager.me().registerHandler(this);
  }

  onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
    packetWrapper.packet.forEach((packet) => {
      console.log("PopupSetting load: ", packet);
      if (packet.resLogout) {
        switch (packet.resLogout.status) {
          case 200:
            StorageManager.me().deleteItem(LOCAL_STORAGE.USERNAME);
            StorageManager.me().deleteItem(LOCAL_STORAGE.TOKEN);
            StorageManager.me().saveItem(LOCAL_STORAGE.AUTO_LOGIN, false);
            GlobalData.me().setMainUser(null);
            //Chuyển scene
            UICanvas.me().transitScene(SCENES.AUTHEN);
            break;
          case 400:
            UICanvas.me().showPopupMessage(t("label_text.logout_failed_400"));
            break;
        }
      }
    });
  }

  onChangeMusic(event) {
    let progress = event.progress;
    this.progressBarMusic.progress = progress;
  }

  onChangeSound(event) {
    let progress = event.progress;
    this.progressBarSound.progress = progress;
  }

  onChangeLanguage() {
    this.dropdownLanguage.active = !this.dropdownLanguage.active;
  }

  onClickLanguage(event) {
    let language = event.target.name;
    switch (language) {
      case "ButtonEN":
        init("en");
        updateSceneRenderers();
        let nameLanguageEN = t("label_text.setting_language_english");
        this.lableLanguage.string = nameLanguageEN;
        this.dropdownLanguage.active = !this.dropdownLanguage.active;
        break;
      case "ButtonVI":
        init("vi");
        updateSceneRenderers();
        let nameLanguageVI = t("label_text.setting_language_vietnamese");
        this.lableLanguage.string = nameLanguageVI;
        this.dropdownLanguage.active = !this.dropdownLanguage.active;
        break;
    }
  }

  onClickExitSetting() {
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);      
  }

  onLogout() {
    if(GlobalData.me().getMainUser() == null){
      UICanvas.me().showPopupMessage(POPUP_MESSAGE.LOGOUT_FAILED_401);
      return;
    }
    DataSender.sendReqLogout();
  }
}
