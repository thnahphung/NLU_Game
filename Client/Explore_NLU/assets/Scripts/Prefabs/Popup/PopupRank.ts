import {
  _decorator,
  Button,
  Component,
  instantiate,
  Node,
  Prefab,
  SpriteFrame,
} from "cc";
import { AudioManger } from "../../Manager/AudioManger";
import { AUDIOS } from "../../Utils/Const";
import { PopupComponent } from "../../Controller/PopupComponent";
import DataSender from "../../Utils/DataSender";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import { ItemRank } from "./ItemPopup/ItemRank";
const { ccclass, property } = _decorator;

@ccclass("PopupRank")
export class PopupRank extends AbsHandler {
  @property(SpriteFrame)
  private btnPressedSprite: SpriteFrame;
  @property(SpriteFrame)
  private btnNormalSprite: SpriteFrame;
  @property(Button)
  private btnKSNN: Button = null;
  @property(Button)
  private btnKSCN: Button = null;
  @property(Button)
  private btnKSCK: Button = null;
  @property(Button)
  private btnBSTY: Button = null;
  @property(Node)
  private scrollView: Node = null;
  @property(Prefab)
  private prefabRankItem: Prefab = null;

  private characterCode = null;

  protected onLoad(): void {
    HandlerManager.me().registerHandler(this);
    DataSender.sendReqLoadRank("KSNN");
  }

  protected start(): void {
    this.btnKSNN.normalSprite = this.btnPressedSprite;
    this.btnKSCN.normalSprite = this.btnNormalSprite;
    this.btnKSCK.normalSprite = this.btnNormalSprite;
    this.btnBSTY.normalSprite = this.btnNormalSprite;
  }

  onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
    packetWrapper.packet.forEach((packet) => {
      if (packet.resLoadRank) {
        this.onHandleResLoadRank(packet.resLoadRank);
      }
    });
  }

  private onHandleResLoadRank(resLoadRank: proto.IResLoadRank): void {
    console.log("resLoadRank", resLoadRank);
    if (resLoadRank.userRanks.length > 0) {
      this.scrollView.removeAllChildren();
      resLoadRank.userRanks.forEach((userRank) => {
        const rankItem = instantiate(this.prefabRankItem);
        rankItem.getComponent(ItemRank).init(userRank.user, userRank.rank);
        rankItem.setSiblingIndex(userRank.rank);
        this.scrollView.addChild(rankItem);
      });
    }
  }

  private onClickExitPopup() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 0.3);
  }

  private onClickKSNN() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.btnKSNN.normalSprite = this.btnPressedSprite;
    this.btnKSCN.normalSprite = this.btnNormalSprite;
    this.btnKSCK.normalSprite = this.btnNormalSprite;
    this.btnBSTY.normalSprite = this.btnNormalSprite;
    DataSender.sendReqLoadRank("KSNN");
    console.log("KSNN");
  }

  private onClickKSCN() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.btnKSNN.normalSprite = this.btnNormalSprite;
    this.btnKSCN.normalSprite = this.btnPressedSprite;
    this.btnKSCK.normalSprite = this.btnNormalSprite;
    this.btnBSTY.normalSprite = this.btnNormalSprite;
    DataSender.sendReqLoadRank("KSCN");
    console.log("KSCN");
  }

  private onClickKSCK() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.btnKSNN.normalSprite = this.btnNormalSprite;
    this.btnKSCN.normalSprite = this.btnNormalSprite;
    this.btnKSCK.normalSprite = this.btnPressedSprite;
    this.btnBSTY.normalSprite = this.btnNormalSprite;
    DataSender.sendReqLoadRank("KSCK");
    console.log("KSCK");
  }

  private onClickBSTY() {
    AudioManger.me().playOneShot(AUDIOS.CLICK_3);
    this.btnKSNN.normalSprite = this.btnNormalSprite;
    this.btnKSCN.normalSprite = this.btnNormalSprite;
    this.btnKSCK.normalSprite = this.btnNormalSprite;
    this.btnBSTY.normalSprite = this.btnPressedSprite;
    DataSender.sendReqLoadRank("BSTY");
    console.log("BSTY");
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
