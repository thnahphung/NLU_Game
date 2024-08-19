import { _decorator, BlockInputEvents, Component, find, Node } from "cc";
import { AUDIOS, TYPE_TOOL } from "../../Utils/Const";
import GlobalData from "../../Utils/GlobalData";
import { UICanvas } from "../MainUI/UICanvas";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
import { AudioManger } from "../../Manager/AudioManger";
const { ccclass, property } = _decorator;

@ccclass("PlantingLand")
export class PlantingLand extends Component {
  @property(Node)
  private tilledLandPanel: Node = null;
  public plantingLandProto: proto.IPlantingLandBuilding = null;
  protected onLoad(): void {
    this.node.on(Node.EventType.TOUCH_START, this.handleGetMenuTool, this);
  }

  private handleGetMenuTool(): void {
    AudioManger.me().playOneShot(AUDIOS.CLICK_2);
    if (
      GlobalData.me().getMainUser().character.code == "KSCK" &&
      GlobalData.me().getIsSupporting()
    ) {
      UICanvas.me().showPopupMenuMechanical(TYPE_TOOL.TILL);
      GlobalData.me().setPlantingLandChoosed(this.node);
      return;
    }

    if (
      GlobalData.me().getMainUser().character.code == "KSCK" &&
      !GlobalData.me().getIsSupporting()
    ) {
      UICanvas.me().showPopupMessage(t("label_text.help_notify_status"));
      return;
    }

    if (this.node.getComponent(BlockInputEvents)) return;

    if (GlobalData.me().getIsSupporting()) {
      UICanvas.me().showPopupMessage(t("label_text.support_action_fail"));
      return;
    }

    if (!GlobalData.me().isMainArea()) return;

    if (
      GlobalData.me().getMoveBuildingStatus() ||
      GlobalData.me().getSowStatus()
    )
      return;
    UICanvas.me().showPopupMenuToolFarm(TYPE_TOOL.PICKAXE);
  }

  public getTilledLandPanel(): Node {
    return this.tilledLandPanel;
  }

  public setTilledLandPanel(tilledLandPanel: Node): void {
    this.tilledLandPanel = tilledLandPanel;
  }

  getPlantingLandProto(): proto.IPlantingLandBuilding {
    return this.plantingLandProto;
  }

  setPlantingLandProto(plantingLandProto: proto.IPlantingLandBuilding): void {
    this.plantingLandProto = plantingLandProto;
  }
}
