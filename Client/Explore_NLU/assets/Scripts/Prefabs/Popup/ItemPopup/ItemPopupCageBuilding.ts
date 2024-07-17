import { _decorator, Button, Component, find, Label, Node, Sprite } from "cc";
import { Util } from "../../../Utils/Util";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import { ResourceManager } from "../../../Manager/ResourceManager";
import GlobalData from "../../../Utils/GlobalData";
import { PopupCageBuilding } from "../PopupCageBuilding";
import { LandPurchase } from "../../MainUI/LandPurchase";
import { AudioManger } from "../../../Manager/AudioManger";
import { AUDIOS } from "../../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupCageBuilding")
export class ItemPopupCageBuilding extends Component {
  @property(Label) private nameCage: Label;
  @property(Sprite) private spriteCage: Sprite;
  @property(Label) private priceCage: Label;
  @property(LandPurchase) private landPurchaseLayer: LandPurchase;
  private cageItem: proto.IShopItem;
  start() {
    this.landPurchaseLayer = this.getLandPurchaseLayer();
    this.node.on(Button.EventType.CLICK, this.onClickItem, this);
    this.setData();
  }

  public init(cageItem: proto.IShopItem) {
    this.cageItem = cageItem;
  }

  public setData() {
    this.spriteCage.spriteFrame = ResourceManager.me().getSpriteFrame(
      this.cageItem.noGrowthItem.name
    );
    this.nameCage.string = t(
      "label_text." +
        Util.convertDashToUnderscore(this.cageItem.noGrowthItem.name)
    );
    this.priceCage.string = Util.formatNumber(this.cageItem.noGrowthItem.price);
  }

  public onClickItem() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    GlobalData.me().setPickCageItem(this.cageItem);
    this.node.parent.parent.getComponent(PopupCageBuilding).hidePopup();
    this.landPurchaseLayer.showLandPurchaseLayer();
  }

  public getLandPurchaseLayer(): LandPurchase {
    return find("Canvas/BackGroundLayer/LandPurchaseLayer").getComponent(
      LandPurchase
    );
  }
}
