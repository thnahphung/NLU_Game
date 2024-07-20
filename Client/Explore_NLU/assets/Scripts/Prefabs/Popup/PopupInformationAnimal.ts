import { _decorator, Button, Component, Label, Node, RichText } from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../Utils/Util";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("PopupInformationAnimal")
export class PopupInformationAnimal extends AbsHandler {
  @property(Label) private nameLabel: Label;
  @property(Label) private ageLabel: Label;
  @property(RichText) private healthLabel: RichText;
  @property(Label) private pregnantLabel: Label;
  @property(Button) private buttonInformation: Button;
  private diseaseId: number;

  private detailDisease: Node;

  protected start(): void {
    HandlerManager.me().registerHandler(this);
    this.detailDisease = this.node.getChildByName("DetailDisease");
    DataSender.sendReqLoadDetailDisease(this.diseaseId);
  }

  public onMessageHandler(packets: proto.IPacketWrapper): void {
    packets.packet.forEach((packet) => {
      if (packet.resLoadDetailDisease) {
        this.onLoadDetailDiseaseHandler(packet);
      }
    });
  }

  onLoadDetailDiseaseHandler(packet: proto.IPacket) {
    let text = "";
    for (let sysptom of packet.resLoadDetailDisease.sysptoms) {
      text +=
        "-" +
        t("label_text." + Util.convertDashToUnderscore(sysptom.description)) +
        "\n";
    }
    this.detailDisease.getChildByName("Content").getComponent(Label).string =
      text;
  }

  public setInformationAnimal(
    name: string,
    age: number,
    disease: boolean,
    pregnant: boolean,
    diseaseId: number
  ) {
    this.nameLabel.string = t(
      "label_text." + Util.convertDashToUnderscore(name)
    );
    this.ageLabel.string =
      age.toString() + " " + t("label_text.animal_age_day");
    this.healthLabel.string = disease
      ? "<color=#d14431>" + t("label_text.animal_health_disease") + "</color>"
      : "<color=#479757>" + t("label_text.animal_health_good") + "</color>";

    this.buttonInformation.node.active = disease;

    this.pregnantLabel.string = pregnant
      ? t("label_text.animal_pregnant_yes")
      : t("label_text.animal_pregnant_no");

    this.diseaseId = diseaseId;
  }

  public showHide(
    name: string,
    age: number,
    disease: boolean,
    pregnant: boolean,
    diseaseId: number
  ) {
    if (this.node.active) {
      this.node.getComponent(PopupComponent).hide();
      return;
    }
    this.setInformationAnimal(name, age, disease, pregnant, diseaseId);
    this.node.getComponent(PopupComponent).show();
  }

  public onClickButtonInformation() {
    if (this.detailDisease.active) {
      this.detailDisease.getComponent(PopupComponent).hide();
    } else {
      this.detailDisease.getComponent(PopupComponent).show();
    }
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
