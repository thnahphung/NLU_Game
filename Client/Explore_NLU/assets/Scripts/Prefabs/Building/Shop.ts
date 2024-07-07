import { _decorator, Button, Component, instantiate, Node, Prefab } from "cc";
import { UICanvas } from "../MainUI/UICanvas";
import { POPUP } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Shop")
export class Shop extends Component {
  onClickButtonInformation() {
    UICanvas.me().showPopupShop(proto.ShopItem.TYPE_SHOP.CROP);
  }
  onClickExit() {
    console.log("Click exit");
  }
}
