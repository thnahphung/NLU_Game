import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from "cc";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import { Util } from "../../../Utils/Util";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupShop")
export class ItemPopupShop extends Component {
  @property(Sprite) private icon: Sprite;
  @property(Label) private nameItem: Label;
  @property(Label) private price: Label;
  private shopItem: proto.IShopItem;
  @property([SpriteFrame]) private iconSpriteFrames: SpriteFrame[] = [];

  init(shopItem: proto.IShopItem) {
    this.shopItem = shopItem;
  }

  start() {
    this.setUpInfoShopItem();
  }

  setUpInfoShopItem() {
    for (let iconName of this.iconSpriteFrames) {
      if (this.shopItem.noGrowthItem.name == iconName.name) {
        this.icon.spriteFrame = iconName;
      }
    }
    this.nameItem.string = t(
      "label_text." +
        Util.convertDashToUnderscore(this.shopItem.noGrowthItem.name)
    );
    this.price.string = this.shopItem.noGrowthItem.price.toString();
  }
}
