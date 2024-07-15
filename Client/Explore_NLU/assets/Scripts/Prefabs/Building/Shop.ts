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
import { AUDIOS, POPUP } from "../../Utils/Const";
import { AudioManger } from "../../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("Shop")
export class Shop extends Component {
  @property private typeShop: number;

  onClickButtonInformation() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    UICanvas.me().showPopupShop(this.typeShop);
  }
}
