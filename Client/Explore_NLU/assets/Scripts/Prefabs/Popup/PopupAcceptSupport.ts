import { _decorator, Component, Label, Node, ProgressBar } from "cc";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("PopupAcceptSupport")
export class PopupAcceptSupport extends Component {
  @property(Label)
  labelTitle: Label = null;
  @property(ProgressBar)
  progressBar: ProgressBar = null;
  private duration: number = 60;
  private elapsedTime: number = 0;

  private userInvite: proto.IUser = null;

  protected onLoad(): void {
    this.progressBar.progress = 1;
  }

  init(userInvite: proto.IUser) {
    this.userInvite = userInvite;
    this.labelTitle.string = `${userInvite.playerName} ${t(
      "label_text.help_notify_invite"
    )}`;
  }

  start() {}

  onClickAccept() {
    DataSender.sendReqAcceptInviteSupport(this.userInvite.userId);
    this.node.destroy();
  }

  onClickReject() {
    DataSender.sendReqRejectInviteSupport(this.userInvite.userId);
    this.node.destroy();
  }

  update(deltaTime: number) {
    if (this.elapsedTime < this.duration) {
      this.elapsedTime += deltaTime;
      const progress = 1 - this.elapsedTime / this.duration;
      this.progressBar.progress = progress;
    } else {
      this.progressBar.progress = 0;
      DataSender.sendReqRejectInviteSupport(this.userInvite.userId);
      this.node.destroy();
    }
  }
}
