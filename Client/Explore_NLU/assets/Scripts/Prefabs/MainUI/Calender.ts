import { _decorator, Component, Label, Node, RichText } from "cc";
import GlobalData from "../../Utils/GlobalData";
import { _language, t } from "../../../../extensions/i18n/assets/LanguageData";
const { ccclass, property } = _decorator;

@ccclass("Calender")
export class Calender extends Component {
  @property(Label) timesOfSeasonLabel: Label;
  @property(RichText) seasonLabel: RichText;
  private timesOfSeason: number = 1;
  private currentReason: proto.GameState.Season = proto.GameState.Season.SPRING;
  private currentLanguage: string = _language;
  start() {
    this.updateCalender();
  }

  update(deltaTime: number) {
    this.updateCalender();
  }

  updateCalender() {
    if (this.timesOfSeason != GlobalData.me()?.getGameState()?.timesOfSeason) {
      this.timesOfSeason = GlobalData.me()?.getGameState()?.timesOfSeason;
      this.timesOfSeasonLabel.string = this.timesOfSeason.toString();
    }
    if (this.currentReason != GlobalData.me()?.getGameState()?.currentSeason) {
      this.currentReason = GlobalData.me()?.getGameState().currentSeason;
      this.seasonLabel.string = this.getSeasonRichText(this.currentReason);
    }
    if (this.currentLanguage != _language) {
      this.currentLanguage = _language;
      this.seasonLabel.string = this.getSeasonRichText(this.currentReason);
    }
  }

  getSeasonRichText(season: proto.GameState.Season) {
    let seasonString = "";
    switch (season) {
      case proto.GameState.Season.SPRING:
        seasonString = "<color=#3c7d50>" + t("label_text.spring") + "</color>";
        break;
      case proto.GameState.Season.SUMMER:
        seasonString = "<color=#FF0000>" + t("label_text.summer") + "</color>";
        break;
      case proto.GameState.Season.AUTUMN:
        seasonString = "<color=#FFA500>" + t("label_text.autumn") + "</color>";
        break;
      case proto.GameState.Season.WINTER:
        seasonString = "<color=#0000FF>" + t("label_text.winter") + "</color>";
        break;
    }
    return seasonString;
  }
}
