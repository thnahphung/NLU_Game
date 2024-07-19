import { _decorator, Button, Component, Label, Node, Sprite } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { UICanvas } from "../MainUI/UICanvas";
import GlobalData from "../../Utils/GlobalData";
import { ResourceManager } from "../../Manager/ResourceManager";
import DataSender from "../../Utils/DataSender";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { CHARACTERS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("PopupSupport")
export class PopupSupport extends Component {
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
  private findUserButton: Button = null;
  @property(Label)
  private notifyLabel: Label = null;
  @property(Label)
  private titleLabel: Label = null;

  private matchmakedUser: proto.IUser = null;

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

  onClickExitPopup() {
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  onClickFindUser() {
    DataSender.sedReqSupportFind();
    UICanvas.me().showPopupFindTime();
    UICanvas.me().hidePopupHelp();
  }

  setMatchmakedUser(user: proto.IUser) {
    this.matchmakedUser = user;
    this.spriteFindUser.spriteFrame = ResourceManager.me().getChacracterFrame(
      user.character.code
    );
    this.nameFindUserLabel.string = user.playerName;
  }

  showPopup() {
    this.node.getComponent(PopupComponent).show();
  }

  setMatchmakingOK() {
    this.okButton.interactable = true;
    this.okButton.node.active = true;
    this.findUserButton.interactable = false;
    this.findUserButton.node.active = false;
    this.notifyLabel.string = t("label_text.help_match_ok");
    this.notifyLabel.node.active = true;
  }

  setMatchmakingNotify() {
    this.findUserButton.interactable = false;
    this.findUserButton.node.active = false;
    this.notifyLabel.string = t("label_text.help_move");
    this.notifyLabel.node.active = true;
  }

  onClickOK() {
    this.node.destroy();
  }
}
