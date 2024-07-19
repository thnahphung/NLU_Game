import {
  _decorator,
  BoxCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  find,
  Node,
  RigidBody2D,
  Sprite,
  SpriteFrame,
  tween,
  Vec3,
} from "cc";
import GlobalData from "../../Utils/GlobalData";
import { AUDIOS, TYPE_TOOL } from "../../Utils/Const";
import { TilledLand } from "../Lands/TilledLand";
import { UICanvas } from "../MainUI/UICanvas";
import { AudioManger } from "../../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("Crop")
export class Crop extends Component {
  // Node đất trồng
  public plantingLand: Node = null;
  // Node đất đã cày
  public tilledLand: Node = null;
  // Giai đoạn phát triển hiện tại
  private currentStage: number = 0;
  // Thời gian đã trôi qua
  private elapsedTime: number = 0;
  // Thời gian (giây) cho mỗi giai đoạn phát triển
  private seedTime: number = 1;
  private sproutTime: number = 1;
  private smallTreeTime: number = 1;
  // Trạng thái cây đã thu hoạch
  private isHarvested: boolean = false;
  // Thời gian hiệu ứng thu hoạch
  private effectHarvestTime: number = 0.5;
  // Proto information của cây trồng
  public cropProto: proto.ICrop = null;
  // Sprite của các giai đoạn phát triển
  private checkTime = 0;
  private isCheckedRisingTime = false;
  private isLoadedDevelopedTime = false;
  @property(SpriteFrame)
  public seedSprite: SpriteFrame;
  @property(SpriteFrame)
  public sproutSprite: SpriteFrame;
  @property(SpriteFrame)
  public smallTreeSprite: SpriteFrame;
  @property(SpriteFrame)
  public bigTreeSprite: SpriteFrame;
  @property(SpriteFrame)
  public harvestSprite: SpriteFrame;
  @property(Sprite)
  public sprite: Sprite = null;

  protected onLoad(): void {
    this.setSpriteFrame(this.seedSprite);
  }

  protected start(): void {
    // Đặt sprite ban đầu là hạt giống
    this.node.on(Node.EventType.TOUCH_END, this.handleTouchCrop, this);
    // Đưa cây đến giai đoạn đã phát triển của cây
    this.checkTime = GlobalData.me().getGameState().currentDate;
    if (!this.cropProto) {
      this.elapsedTime = 0;
    } else {
      this.elapsedTime = this.cropProto.propertyGrowthItem.developedDays;
    }
  }

  public setSpriteFrame(spriteFrame: SpriteFrame): void {
    this.getSprite().getComponent(Sprite).spriteFrame = spriteFrame;
  }

  public getSpriteFrame(): SpriteFrame {
    return this.getSprite().getComponent(Sprite).spriteFrame;
  }

  public getSprite(): Sprite {
    return this.sprite;
  }

  private handleTouchCrop(): void {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    let spriteStatus = this.getSpriteFrame().name;
    if (
      spriteStatus == "rice-level4-v1" ||
      spriteStatus == "cabbage-level4-v1" ||
      spriteStatus == "carrot-level4-v1" ||
      spriteStatus == "cucumber-level4-v1" ||
      spriteStatus == "pumpkin-level4-v1"
    ) {
      this.showMenuTool();
    }
  }

  private showMenuTool(): void {
    if (GlobalData.me().getMainUser().character.code == "KSCK") {
      UICanvas.me().showPopupMenuMechanical(TYPE_TOOL.HARVEST);
      GlobalData.me().setPlantingLandChoosed(this.plantingLand);
      return;
    }
    GlobalData.me().setHarvestStatus(true);
    // Hiển thị menu công cụ
    UICanvas.me().showPopupMenuToolFarm(TYPE_TOOL.SICKLE);
  }

  private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    if (otherCollider.node.name === TYPE_TOOL.SICKLE) {
      this.handleHarvest();
    } else {
      return;
    }
  }

  private handleHarvest(): void {
    AudioManger.me().playOneShot(AUDIOS.HARVEST_CROP);
    // Xử lý khi người dùng thu hoạch cây
    this.node.off(Node.EventType.TOUCH_END, this.handleTouchCrop, this);
    this.node.getComponent(Collider2D).enabled = false;
    this.node.scale = new Vec3(0, 0, 0);
    this.node.setPosition(
      this.node.getPosition().x,
      this.node.getPosition().y + 10,
      0
    );
    this.setSpriteFrame(this.harvestSprite);
    this.tilledLand.getComponent(TilledLand).isSown = false;
    this.isHarvested = true;
    GlobalData.me().setHarvestedStatus(true);
    this.handlePushInformationHarvest();
    tween(this.node)
      .call(() => {
        this.node.active = true;
      })
      .to(
        this.effectHarvestTime,
        { scale: new Vec3(1, 1, 1) },
        { easing: "backOut" }
      )
      .call(() => {
        this.node.destroy();
      })
      .start();
  }

  private handlePushInformationHarvest(): void {
    if (GlobalData.me().getHarvestingInformation() == null) {
      let harvestingInformation = new proto.HarvestingInformation();
      harvestingInformation.crop = [];
      GlobalData.me().setHarvestingInformation(harvestingInformation);
    }
    this.cropProto.CommonRisingTimes = new Array<proto.CommonRisingTime>();
    GlobalData.me().getHarvestingInformation().crop.push(this.cropProto);
  }

  setupRisingTime(): void {
    if (this.isCheckedRisingTime) return;
    // Lấy ra các giai đoạn phát triển của cây
    this.cropProto.CommonRisingTimes.forEach((risingTime) => {
      if (risingTime.stage === 1) {
        this.seedTime = risingTime.time;
      } else if (risingTime.stage === 2) {
        this.sproutTime = risingTime.time;
      } else if (risingTime.stage === 3) {
        this.smallTreeTime = risingTime.time;
      }
    });
    this.isCheckedRisingTime = true;
  }

  update(deltaTime: number) {
    // Kiểm tra và cập nhật giai đoạn phát triển
    if (
      !this.cropProto ||
      !this.cropProto.CommonRisingTimes ||
      !this.cropProto.CommonRisingTimes ||
      this.cropProto.CommonRisingTimes.length == 0 ||
      this.isHarvested
    ) {
      return;
    }
    // Cài đặt thời gian phát triển của cây
    this.setupRisingTime();
    // Cập nhật thời gian trôi qua
    let currentDay = GlobalData.me().getGameState().currentDate;
    if (this.checkTime != 0 && this.checkTime < currentDay) {
      // Nếu qua ngày mới thì cập nhật thời gian trôi qua
      this.checkTime = currentDay;
      this.elapsedTime += 1;
    } else {
      // Nếu chưa qua ngày mới thì không cập nhật thời gian trôi qua
      if (this.isLoadedDevelopedTime) return;
    }
    this.isLoadedDevelopedTime = true;
    // Cập nhật giai đoạn phát triển
    if (this.currentStage === 0 && this.elapsedTime >= this.seedTime) {
      this.setSpriteFrame(this.sproutSprite);
      this.currentStage = 1;
    }
    if (this.currentStage === 1 && this.elapsedTime >= this.sproutTime) {
      this.setSpriteFrame(this.smallTreeSprite);
      this.currentStage = 2;
    }
    if (this.currentStage === 2 && this.elapsedTime >= this.smallTreeTime) {
      this.setSpriteFrame(this.bigTreeSprite);
      this.currentStage = 3;
      const collider = this.node.getComponent(BoxCollider2D);
      const rigidBody = this.node.getComponent(RigidBody2D);
      let collider2D = this.node.getComponent(Collider2D);
      if (collider && rigidBody && collider2D) {
        collider.enabled = true;
        rigidBody.enabled = true;
        if (collider2D) {
          collider2D.enabled = true;
          collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
      }
    }
  }

  public setTilledLand(tilledLand: Node): void {
    this.tilledLand = tilledLand;
  }

  public getTilledLand(): Node {
    return this.tilledLand;
  }

  public setPlantingLand(plantingLand: Node): void {
    this.plantingLand = plantingLand;
  }

  public getPlantingLand(): Node {
    return this.plantingLand;
  }

  public setCropProto(cropProto: proto.ICrop): void {
    this.cropProto = cropProto;
  }

  public getCropProto(): proto.ICrop {
    return this.cropProto;
  }
}
