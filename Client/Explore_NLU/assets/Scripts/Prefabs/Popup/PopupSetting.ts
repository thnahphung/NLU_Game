import { _decorator, instantiate, Label, Node, Prefab, ProgressBar } from "cc";
import { TransitionScenePrefab } from "../../Prefabs/TransitionScene/TransitionScenePrefab";
import AbsScene from "../../Scenes/AbsScene";

import { POPUP_MESSAGE } from "../../Utils/Const";
import DataSender from "../../Utils/DataSender";
import { init } from "../../../../extensions/i18n/assets/LanguageData";
import { updateSceneRenderers } from "../../../../extensions/i18n/assets/LanguageData";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { StorageManager } from "../../Manager/StorageManger";
const { ccclass, property } = _decorator;

@ccclass("PopupSetting")
export class PopupSetting extends AbsScene {
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
  // Khai bao transitScreen
  @property(Prefab)
  public transitScreen: Prefab = null;
  start() {}
  protected onLoad(): void {
    this.lableLanguage.string = t("label_text.setting_language_current");
    this.dropdownLanguage.active = false;
  }

  onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
    let transitScreen = instantiate(this.transitScreen);
    packetWrapper.packet.forEach((packet) => {
      if (packet.resLogout) {
        switch (packet.resLogout.status) {
          case 200:
            StorageManager.me().deleteItem("USERNAME");
            StorageManager.me().deleteItem("AUTO_LOGIN");
            StorageManager.me().deleteItem("TOKEN");
            //Chuyển scene
            transitScreen
              .getComponent(TransitionScenePrefab)
              .setSceneName("AuthenScene");
            this.node.addChild(transitScreen);
            break;
          case 400:
            confirm(POPUP_MESSAGE.LOGOUT_FAILED_400);
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
    this.node.destroy();
  }

  onLogout() {
    DataSender.sendReqLogout();
  }
}
