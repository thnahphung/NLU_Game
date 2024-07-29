import { _decorator, Component, Node } from "cc";
import { UICanvas } from "../Prefabs/MainUI/UICanvas";
import { AUDIOS } from "../Utils/Const";
import { AudioManger } from "../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("View360Component")
export class View360Component extends Component {
  onClickShowInformation(event: any, customData: string) {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    UICanvas.me().showPopupInformationAmphitheater(customData);
  }
}
