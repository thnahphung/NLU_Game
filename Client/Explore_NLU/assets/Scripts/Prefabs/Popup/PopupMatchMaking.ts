import { _decorator, Button, Component, Label, Node, Sprite } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { UICanvas } from "../MainUI/UICanvas";
import GlobalData from "../../Utils/GlobalData";
import { ResourceManager } from "../../Manager/ResourceManager";
import DataSender from "../../Utils/DataSender";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { AUDIOS, CHARACTERS } from "../../Utils/Const";
import { AudioManger } from "../../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("PopupMatchMaking")
export class PopupMatchMaking extends Component {
  @property(Sprite)
  private spriteMainUser: Sprite = null;
  @property(Sprite)
  private spriteFindUser: Sprite = null;
  @property(Label)
  private nameMainUserLabel: Label = null;
  @property(Label)
  private nameFindUserLabel: Label = null;
  @property(Button)
  private okButton: Button = null;
  @property(Button)
  private backHomeButton: Button = null;
  @property(Label)
  private notifyLabel: Label = null;
  @property(Label)
  private titleLabel: Label = null;

  private matchmakedUser: proto.IUser = null;

  init(): void {
    this.okButton.interactable = false;
    this.okButton.node.active = false;
    this.backHomeButton.interactable = true;
    this.backHomeButton.node.active = true;
    this.notifyLabel.node.active = false;
    this.spriteFindUser.spriteFrame = null;
  }

  start() {
    this.nameMainUserLabel.string = GlobalData.me().getMainUser().playerName;
    this.spriteMainUser.spriteFrame = UICanvas.me().getMainUserAvatar();
    let code = GlobalData.me().getMainUser().character.code;
    if (code && code == CHARACTERS.KSCK) {
      this.nameFindUserLabel.string = t("label_text.character_name_mechanical");
      this.titleLabel.string = t("label_text.help_agricultural");
    } else {
      this.nameFindUserLabel.string = t(
        "label_text.character_name_veterinarian"
      );
    }
  }

  onClickExitPopup(): void {
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  onClickFindUser(): void {
    DataSender.sedReqSupportFind();
    UICanvas.me().showPopupFindTime();
    UICanvas.me().hidePopupMatchMaking();
  }

  setMatchmakedUser(user: proto.IUser): void {
    this.matchmakedUser = user;
    this.spriteFindUser.spriteFrame = ResourceManager.me().getChacracterFrame(
      user.character.code
    );
    this.nameFindUserLabel.string = user.playerName;
  }

  showPopup(): void {
    this.node.getComponent(PopupComponent).show();
  }

  setMatchmakingOK(): void {
    this.okButton.interactable = true;
    this.okButton.node.active = true;
    this.backHomeButton.interactable = false;
    this.backHomeButton.node.active = false;
    GlobalData.me().getMainUser().character.code == "KSNN"
      ? (this.notifyLabel.string = t("label_text.help_match_KSCK_ok"))
      : (this.notifyLabel.string = t("label_text.help_match_BSTY_ok"));
    this.notifyLabel.node.active = true;
    this.scheduleOnce(() => {
      UICanvas.me().hidePopupMatchMaking();
    }, 3);
  }

  setMatchmakingNotify(): void {
    this.backHomeButton.interactable = false;
    this.backHomeButton.node.active = false;
    this.notifyLabel.string = t("label_text.help_move");
    this.notifyLabel.node.active = true;
  }

  setStatus(status: number): void {
    if (status == 200) {
      this.notifyLabel.string = t("label_text.support_stop_support_finish");
      this.notifyLabel.node.active = true;
      this.okButton.interactable = true;
      this.okButton.node.active = true;
    } else if (status == 201) {
      this.notifyLabel.string = t("label_text.support_stop_support_require");
      this.notifyLabel.node.active = true;
      this.backHomeButton.interactable = true;
      this.backHomeButton.node.active = true;
    }
  }

  onClickOK(): void {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    UICanvas.me().hidePopupMatchMaking();
  }

  onClickBackHome(): void {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    DataSender.sendReqPlayerJoinArea(GlobalData.me().getMainUser().userId);
  }
}
