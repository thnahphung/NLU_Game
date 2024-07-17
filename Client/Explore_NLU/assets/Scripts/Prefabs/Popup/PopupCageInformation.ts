import {
  _decorator,
  Button,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  ScrollView,
  SpriteFrame,
} from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { ItemPopupAnimal } from "./ItemPopup/ItemPopupAnimal";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../Utils/Util";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { PopupYesNo } from "./PopupYesNo";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("PopupCageInformation")
export class PopupCageInformation extends Component {
  @property(Label) private titleLabel: Label;
  @property(Label) private capacityLabel: Label;
  @property(Label) private levelLabel: Label;
  @property(ScrollView) private animalsPanel: ScrollView;
  @property(SpriteFrame) private listImageAnimal: SpriteFrame[] = [];
  @property(Prefab) private itemPopupAnimal: Prefab;
  @property(Prefab) private popupYesNo: Prefab;

  private cageInfo: proto.ICage;
  start() {
    this.setInformationCage();
    this.setListAnimal();
  }

  init(cage: proto.ICage) {
    this.cageInfo = cage;
  }

  reset(cage: proto.ICage) {
    this.cageInfo = cage;
    this.setInformationCage();
    this.setListAnimal();
  }

  onClickExit() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }

  public setInformationCage() {
    this.titleLabel.string = t(
      "label_text." + Util.convertDashToUnderscore(this.cageInfo.upgrade.name)
    );
    this.capacityLabel.string =
      this.cageInfo.animals.length.toString() +
      "/" +
      this.cageInfo.upgrade.capacity.toString();
    this.levelLabel.string = this.cageInfo.upgrade.level.toString();
  }

  public setListAnimal() {
    this.cageInfo.animals.forEach((animal) => {
      let item = instantiate(this.itemPopupAnimal);
      item.getComponent(ItemPopupAnimal).init(animal);
      this.animalsPanel.content.addChild(item);
      item.on(Button.EventType.CLICK, () => {
        this.onClickItem(animal);
      });
    });
  }

  public getCageInfo() {
    return this.cageInfo;
  }

  public getAnimalImage(type: string, isLeft: boolean): SpriteFrame {
    const text = isLeft ? "-left" : "-right";
    let result = null;
    this.listImageAnimal.forEach((image) => {
      if (image.name.toUpperCase() == (type + text).toUpperCase()) {
        result = image;
      }
    });
    return result;
  }

  public onClickUpgrade() {
    console.log("Upgrade cage");
  }

  public onClickSell(animalData: proto.IAnimal) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    DataSender.sendReqSellAnimal(animalData.id);
  }

  public onClickNoSell() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
  }

  public onClickItem(animalData: proto.IAnimal) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    const popupYesNoNode = instantiate(this.popupYesNo);
    popupYesNoNode
      .getComponent(PopupYesNo)
      .setContent(
        t("label_text.you_definitely_want_to_sell_this_animal_right")
      );
    popupYesNoNode
      .getComponent(PopupYesNo)
      .onClickYes(() => this.onClickSell(animalData));
    popupYesNoNode.getComponent(PopupYesNo).onClickNo(this.onClickNoSell);
    popupYesNoNode.parent = this.node.parent;
    popupYesNoNode.getComponent(PopupComponent).show();
  }

  public deleteItemByAnimalId(animalId: number) {
    this.animalsPanel.content.children.forEach((item) => {
      if (item.getComponent(ItemPopupAnimal).getAnimalData().id == animalId) {
        item.destroy();
      }
    });
  }
}
