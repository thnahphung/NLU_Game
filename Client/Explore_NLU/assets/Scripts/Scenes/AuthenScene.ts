import {
  _decorator,
  Component,
  EditBox,
  instantiate,
  Label,
  Node,
  Prefab,
} from "cc";
import AbsScene from "./AbsScene";
import { WS } from "../Socket/WS";
import { PopupComponent } from "../Controller/PopupComponent";
const { ccclass, property } = _decorator;

@ccclass("AuthenScene")
export class AuthenScene extends AbsScene {
  @property(Node)
  private popupGeneral: Node = null;

  @property(Node)
  private popupSignIn: Node = null;

  @property(Node)
  private popupSignUp: Node = null;

  start() {}

  onMessageHandler(packets: proto.IPacketWrapper): void {
    super.onMessageHandler(packets);
  }

  onClickSignIn() {
    this.popupGeneral.active = false;
    this.popupSignIn.getComponent(PopupComponent).show();
  }

  onClickSignUp() {
    this.popupGeneral.active = false;
    this.popupSignUp.getComponent(PopupComponent).show();
  }

  onClickSetting() {
    // this.popupGeneral.active = false;
    // this.popupSignIn.active = true;
  }

  onClickBack() {
    this.popupSignIn.getComponent(PopupComponent).hide();
    this.popupSignUp.getComponent(PopupComponent).hide();
    this.popupGeneral.active = true;
  }
}
