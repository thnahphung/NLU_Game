import {
  _decorator,
  BlockInputEvents,
  Collider2D,
  Component,
  Contact2DType,
  find,
  instantiate,
  IPhysics2DContact,
  Node,
  Prefab,
  Sprite,
} from "cc";
import GlobalData from "../../Utils/GlobalData";
import { AUDIOS, SEED_BAG } from "../../Utils/Const";
import { Crop } from "../Crop/Crop";
import { SeedBag } from "../Tools/SeedBag";
import { UICanvas } from "../MainUI/UICanvas";
import { SeedInformation } from "../Crop/SeedInformation";
import { Menu } from "../Menu/Menu";
import { AudioManger } from "../../Manager/AudioManger";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
const { ccclass, property } = _decorator;

@ccclass("TilledLand")
export class TilledLand extends Component {
  private tillLandProto: proto.ITillLand = null;
  public seedNode: Node = null;
  private isTilled = false;
  public isSown = false;
  @property(Prefab)
  private ricePrefab: Prefab = null;
  @property(Prefab)
  private cabbagePrefab: Prefab = null;
  @property(Prefab)
  private carrotPrefab: Prefab = null;
  @property(Prefab)
  private cucumberPrefab: Prefab = null;
  @property(Prefab)
  private pumkinPrefab: Prefab = null;

  protected start(): void {
    let collider = this.node.getComponent(Collider2D);
    if (collider) {
      collider.enabled = true;
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }
  onLoad() {
    this.listenSow();
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (
      otherCollider.node.name == "Pickaxe" ||
      otherCollider.node.name == "BulldozerMachine"
    ) {
      if (this.isTilled) return;
      this.handleTillLand();
      GlobalData.me().setTilledStatus(true);
    }
    if (otherCollider.node.name.indexOf("seed") != -1) {
      if (this.node.getComponent(Sprite).enabled == false || this.isSown)
        return;
      let seedBag = otherCollider.node.getComponent(SeedInformation);
      this.handleSow(seedBag);
    }
  }

  private handleSow(seedBag: SeedInformation): void {
    const nameSeed = seedBag?.getNoGrowItemSeedBag()?.name;
    if (!nameSeed) return;
    //Trừ hạt giống và kiểm tra số lượng hạt giống còn lại
    if (seedBag.getQuantity() == 0) return;
    if (
      GlobalData.me().getSowingInformations() &&
      GlobalData.me().getSowingInformations().length >= 50
    ) {
      UICanvas.me().showPopupMessage(t("label_text.sow_fail_too_many_seeds"));
      return;
    }
    seedBag.setQuantity(seedBag.getQuantity() - 1);
    const menuSeedComponent = UICanvas.me()
      .getMenuSeedFarm()
      .getComponent(Menu);
    menuSeedComponent
      .getMenuItemNode(nameSeed)
      .getComponent(SeedBag)
      .setAmount(seedBag.getQuantity());
    this.isSown = true;
    GlobalData.me().setSownStatus(true);
    //Hiển thị cây trồng lên đất
    this.handleDisplayCropsToLand(nameSeed);
    //Gửi thông tin gieo hạt này
    let sowingInformation = new proto.SowingInformation();
    sowingInformation.noGrowthItem = seedBag.getNoGrowItemSeedBag();
    sowingInformation.tillLand = this.tillLandProto;
    this.handleSendSowInformation(sowingInformation);
  }

  private handleSendSowInformation(
    sowingInformation: proto.SowingInformation
  ): void {
    if (GlobalData.me().getSowingInformations() == null) {
      let sowingInformations = new Array<proto.SowingInformation>();
      GlobalData.me().setSowingInformations(sowingInformations);
    }
    GlobalData.me().getSowingInformations().push(sowingInformation);
  }
  public handleDisplayCropsToLand(seed: string): void {
    seed = seed.toLowerCase();
    this.isSown = true;
    switch (seed) {
      case SEED_BAG.RICE:
      case "rice":
        this.seedNode = instantiate(this.ricePrefab);
        break;
      case SEED_BAG.CABBAGE:
      case "cabbage":
        this.seedNode = instantiate(this.cabbagePrefab);
        break;
      case SEED_BAG.CARROT:
      case "carrot":
        this.seedNode = instantiate(this.carrotPrefab);
        break;
      case SEED_BAG.CUCUMBER:
      case "cucumber":
        this.seedNode = instantiate(this.cucumberPrefab);
        break;
      case SEED_BAG.PUMPKIN:
      case "pumpkin":
        this.seedNode = instantiate(this.pumkinPrefab);
        break;
    }
    let plantingLand = this.node.getParent().getParent();
    this.seedNode.getComponent(Crop).plantingLand = plantingLand;
    this.seedNode.getComponent(Crop).tilledLand = this.node;
    this.seedNode.setPosition(
      this.node.position.x + plantingLand.position.x,
      this.node.position.y + plantingLand.position.y - 5,
      0
    );
    this.getMidLayer()?.addChild(this.seedNode);
  }

  public deleteCrop(): void {
    this.resetTillLand();
    if (this.seedNode) this.seedNode.destroy();
  }

  public resetTillLand(): void {
    this.isTilled = false;
    this.isSown = false;
    this.tillLandProto.crop = null;
    this.node.getComponent(Sprite).enabled = false;
    this.node.getComponent(BlockInputEvents).enabled = false;
    this.node.off(Node.EventType.TOUCH_END, this.handleTouchTilledLand, this);
  }

  public handleTillLand(): void {
    this.isTilled = true;
    this.node.getComponent(Sprite).enabled = true;
    this.node.getComponent(BlockInputEvents).enabled = true;
    // Node begin listening sowing
    this.listenSow();
    // Save data
    this.tillLandProto.statusTilled = true;
    if (GlobalData.me().getTilledLands() == null) {
      let listTilledLand = new Array<proto.TillLand>();
      GlobalData.me().setTilledLands(listTilledLand);
    }
    GlobalData.me().getTilledLands().push(this.tillLandProto);
  }

  public handleTilledLand(): void {
    this.isTilled = true;
    this.node.getComponent(Sprite).enabled = true;
    this.node.getComponent(BlockInputEvents).enabled = true;
    // Node begin listening sowing
    this.listenSow();
  }

  private listenSow(): void {
    var fillStatus = this.node.getComponent(Sprite).enabled;
    if (fillStatus) {
      this.node.on(Node.EventType.TOUCH_END, this.handleTouchTilledLand, this);
    }
  }

  private handleTouchTilledLand(): void {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    if (GlobalData.me().getIsSupporting()) {
      return;
    }
    if (!GlobalData.me().isMainArea()) return;
    this.showMenuSeedNode();
  }

  private showMenuSeedNode(): void {
    UICanvas.me().showPopupMenuSeedFarm();
  }

  private getMidLayer(): Node {
    return find("Canvas/ObjectLayers/MidLayer");
  }

  protected onDestroy(): void {
    this.node.off(Node.EventType.TOUCH_END, this.handleTouchTilledLand, this);
  }

  public getTillLandProto(): proto.ITillLand {
    return this.tillLandProto;
  }

  public setTillLandProto(tillLandProto: proto.ITillLand): void {
    this.tillLandProto = tillLandProto;
  }
}
