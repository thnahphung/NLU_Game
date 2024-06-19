import {
  _decorator,
  BlockInputEvents,
  Button,
  Component,
  find,
  instantiate,
  Node,
  Prefab,
  UIOpacity,
} from "cc";
import { CUSTOM_EVENT, PLANTING_LAND, POPUP } from "../../Utils/Const";
import { CameraFollow } from "../Camera/CameraFollow";
import { UICanvas } from "../MainUI/UICanvas";
import GlobalData from "../../Utils/GlobalData";
import DataSender from "../../Utils/DataSender";
const { ccclass, property } = _decorator;

@ccclass("PopupBuildingSystem")
export class PopupBuildingSystem extends Component {
  @property(Button)
  public buttonPlantingLand: Button = null;
  @property(Button)
  public buttHouse: Button = null;
  @property(Button)
  public buttonWarehouse: Button = null;
  @property(Button)
  public buttonTree: Button = null;

  @property(Prefab)
  public plantingLandPrefab: Prefab = null;

  private handleNode: Node = null;
  private typeBuilding: string = null;

  start() {
    this.buttonPlantingLand.node.on(
      Node.EventType.TOUCH_END,
      this.handlePlantingBuilding,
      this
    );
    this.buttHouse.node.on(
      Node.EventType.TOUCH_END,
      this.handleHouseBuilding,
      this
    );
    this.buttonWarehouse.node.on(
      Node.EventType.TOUCH_END,
      this.handleWarehouseBuilding,
      this
    );
    this.buttonTree.node.on(
      Node.EventType.TOUCH_END,
      this.handleTreeBuilding,
      this
    );
  }

  private handlePlantingBuilding(event: Event, customEventData: string) {
    const plantingLand = instantiate(this.plantingLandPrefab);
    const plantingPanel = find("Canvas/BackgroundLayers/PlantingPanel");

    const lastNode = plantingPanel.children[plantingPanel.children.length - 1];

    if (lastNode) {
      plantingLand.setPosition(
        lastNode.position.x + 50 + PLANTING_LAND.WIDTH,
        lastNode.position.y,
        lastNode.position.z
      );
    } else {
      plantingLand.setPosition(0, -100, 0);
    }

    plantingPanel.addChild(plantingLand);
    this.node.active = false;
    this.openUICanvas();

    this.cameraFollowTarget(plantingLand);

    this.handleNode = plantingLand;
    this.typeBuilding = "PLANTING_LAND";
    this.effectNodeIsBuilding(this.handleNode);
    this.showPopupOption();
  }

  private showPopupOption(): void {
    UICanvas.me().showPopup(POPUP.POPUP_OPTION, this.handleNode, "Mua: 10G");
    this.handleNode.on(
      CUSTOM_EVENT.LISTEN_CANCEL,
      this.handleClickCancel,
      this
    );
    this.handleNode.on(
      CUSTOM_EVENT.LISTEN_COMPLETE,
      this.handleClickComplete,
      this
    );
  }

  private handleClickCancel(event: CustomEvent): void {
    this.handleNode.destroy();
    this.hidePopupOption();
    this.node.destroy();
    if (this.handleUserOffline()) return;
    this.cameraFollowTarget(GlobalData.me().getMainUserNode());
  }

  private handleClickComplete(event: CustomEvent): void {
    this.hidePopupOption();
    this.node.destroy();
    const plantingPanel = find("Canvas/BackgroundLayers/PlantingPanel");
    const buildingNumber = plantingPanel.children.length;
    if (buildingNumber >= 4) {
      this.handleNode.destroy();
      let mainCharacter = find("Canvas/ObjectLayers/MidLayer/CharacterKSNN");
      this.cameraFollowTarget(mainCharacter);
      UICanvas.me().showPopupMessage(
        "Hiện tại đã đạt giới hạn xây dựng đất trồng!"
      );
      return;
    }
    if (this.handleUserOffline()) return;
    this.cameraFollowTarget(GlobalData.me().getMainUserNode());
    DataSender.sendReqBuyBuilding(
      this.handleNode.uuid,
      this.typeBuilding,
      this.handleNode.position.x,
      this.handleNode.position.y,
      1,
      1
    );
  }

  private handleUserOffline(): boolean {
    if (GlobalData.me().getIsUserOffline()) {
      let mainCharacter = find("Canvas/ObjectLayers/MidLayer/CharacterKSNN");
      this.cameraFollowTarget(mainCharacter);
      this.hideEffectNodeIsBuilding(this.handleNode);
      return true;
    }
    return false;
  }

  private effectNodeIsBuilding(node: Node) {
    node.addComponent(UIOpacity).opacity = 200;
    node.addComponent(BlockInputEvents);
  }

  private hideEffectNodeIsBuilding(node: Node) {
    if (node.getComponent(UIOpacity)) node.removeComponent(UIOpacity);
    if (node.getComponent(BlockInputEvents))
      node.removeComponent(BlockInputEvents);
  }

  private hidePopupOption(): void {
    UICanvas.me().closePopup(POPUP.POPUP_OPTION);
    this.handleNode.off(
      CUSTOM_EVENT.LISTEN_CANCEL,
      this.handleClickCancel,
      this
    );
    this.handleNode.off(
      CUSTOM_EVENT.LISTEN_COMPLETE,
      this.handleClickComplete,
      this
    );
  }

  private handleHouseBuilding(event: Event, customEventData: string) {
    console.log("House");
  }

  private handleWarehouseBuilding(event: Event, customEventData: string) {
    console.log("Warehouse");
  }

  private handleTreeBuilding(event: Event, customEventData: string) {
    console.log("Tree");
  }

  private cameraFollowTarget(target: Node): void {
    let CameraFollowComponent =
      find("Canvas/Camera").getComponent(CameraFollow);
    CameraFollowComponent.updateTargetFollow(target);
  }

  openUICanvas(): void {
    const childrenCanvas = find("UICanvas").children;
    childrenCanvas.forEach((child: Node) => {
      if (child.name !== "Camera") child.active = true;
    });
  }
}
