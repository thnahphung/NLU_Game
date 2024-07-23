import {
  _decorator,
  Button,
  Component,
  Input,
  instantiate,
  Label,
  Node,
  Prefab,
} from "cc";
import DataSender from "../../Utils/DataSender";
import { AbsHandler } from "../../Handler/AbsHandler";
import { Util } from "../../Utils/Util";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { ItemAnswer } from "./ItemPopup/ItemAnswer";
import { HandlerManager } from "../../Manager/HandlerManager";
import { AudioManger } from "../../Manager/AudioManger";
import { PopupComponent } from "../../Controller/PopupComponent";
import { AUDIOS } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("PopupDiagnosis")
export class PopupDiagnosis extends AbsHandler {
  @property(Label) symptomsLabel: Label;
  @property(Node) answerPanel: Node;
  @property(Prefab) itemAnswerPrefab: Prefab;
  @property(Node) blackBackground: Node;

  private animal: proto.IAnimal;

  protected onLoad(): void {
    HandlerManager.me().registerHandler(this);
  }

  start() {
    this.blackBackground.on(Input.EventType.TOUCH_START, this.hidePopup, this);

    DataSender.sendReqLoadDetailDisease(
      this.animal.propertyGrowthItem.currentDiseaseId
    );
    this.scheduleOnce(() => {
      DataSender.sendReqLoadQuestion(
        this.animal.propertyGrowthItem.currentDiseaseId
      );
    }, 0.1);
  }

  public init(animal: proto.IAnimal) {
    this.animal = animal;
  }

  public onMessageHandler(packets: proto.IPacketWrapper): void {
    packets.packet.forEach((packet) => {
      if (packet.resLoadDetailDisease) {
        this.onLoadDetailDiseaseHandler(packet.resLoadDetailDisease);
      }
      if (packet.resLoadQuestion) {
        this.onLoadQuestionHandler(packet.resLoadQuestion);
      }
    });
  }

  onLoadQuestionHandler(packet: proto.IResLoadQuestion) {
    for (let disease of packet.diseases) {
      let itemAnswer = instantiate(this.itemAnswerPrefab);
      itemAnswer.getComponent(ItemAnswer).init(disease);
      itemAnswer.on(
        Button.EventType.CLICK,
        () => this.onClickItemAnswer(itemAnswer.getComponent(ItemAnswer)),
        this
      );
      this.answerPanel.addChild(itemAnswer);
    }
  }

  onLoadDetailDiseaseHandler(packet: proto.IResLoadDetailDisease) {
    let text = "";
    for (let sysptom of packet.sysptoms) {
      text +=
        "-" +
        t("label_text." + Util.convertDashToUnderscore(sysptom.description)) +
        "\n";
    }
    this.symptomsLabel.string = text;
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }

  public hidePopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }

  public onClickItemAnswer(item: ItemAnswer) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    DataSender.sendReqDiagnosisAnimal(this.animal.id, item.getDisease().id);
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }
}
