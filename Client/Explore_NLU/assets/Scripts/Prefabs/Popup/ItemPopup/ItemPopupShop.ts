import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from "cc";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../../Utils/Util";
import { ResourceManager } from "../../../Manager/ResourceManager";
import DataSender from "../../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupShop")
export class ItemPopupShop extends Component {
  @property(Sprite) private icon: Sprite;
  @property(Label) private nameItem: Label;
  @property(Label) private price: Label;
  private shopItem: proto.IShopItem;

  init(shopItem: proto.IShopItem) {
    this.shopItem = shopItem;
  }

  start() {
    this.setUpInfoShopItem();
  }

  setUpInfoShopItem() {
    this.icon.spriteFrame = ResourceManager.me().getSpriteFrame(
      this.shopItem.noGrowthItem.name
    );
    this.nameItem.string = t(
      "label_text." +
        Util.convertDashToUnderscore(this.shopItem.noGrowthItem.name)
    );
    this.price.string = this.shopItem.noGrowthItem.price.toString();
  }

  onClickBuyItem() {
    DataSender.sendReqBuyItemShop(this.shopItem.noGrowthItemId, 1);
  }
}
