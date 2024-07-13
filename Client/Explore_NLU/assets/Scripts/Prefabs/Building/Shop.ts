import {
  _decorator,
  Button,
  Component,
  Enum,
  instantiate,
  Node,
  Prefab,
} from "cc";
import { UICanvas } from "../MainUI/UICanvas";
import { POPUP } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Shop")
export class Shop extends Component {
  @property private typeShop: number;

  onClickButtonInformation() {
    UICanvas.me().showPopupShop(this.typeShop);
  }
}
