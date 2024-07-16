import {
  _decorator,
  BlockInputEvents,
  Button,
  Color,
  Component,
  find,
  instantiate,
  LabelComponent,
  Node,
  Prefab,
  UIOpacity,
} from "cc";
import { CUSTOM_EVENT, PLANTING_LAND, POPUP } from "../../Utils/Const";
import { CameraFollow } from "../Camera/CameraFollow";
import { UICanvas } from "../MainUI/UICanvas";
import GlobalData from "../../Utils/GlobalData";
import DataSender from "../../Utils/DataSender";
import { AbsHandler } from "../../Handler/AbsHandler";
import { HandlerManager } from "../../Manager/HandlerManager";
import { ItemPopupBuildingSystem } from "./ItemPopup/ItemPopupBuildingSystem";
import { t } from "../../../../extensions/i18n/assets/LanguageData";
const { ccclass, property } = _decorator;

@ccclass("PopupBuildingSystem")
export class PopupBuildingSystem extends AbsHandler {
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

  protected onLoad(): void {
    HandlerManager.me().registerHandler(this);
    DataSender.sendReqLoadShop(proto.ShopItem.TYPE_SHOP.FARM_ITEM);
  }

  start() {
    const userGold = GlobalData.me().getMainUser()?.gold;
    if (userGold && userGold >= 1000) {
      this.buttonPlantingLand.node.on(
        Node.EventType.TOUCH_END,
        this.handlePlantingBuilding,
        this
      );
    } else {
      this.buttonPlantingLand.node
        .getComponent(ItemPopupBuildingSystem)
        .getPriceLabel()
        .getComponent(LabelComponent).color = new Color(255, 0, 0);
      this.buttonPlantingLand.node.on(
        Node.EventType.TOUCH_END,
        this.handleNoEnoughGold,
        this
      );
    }
    this.buttHouse.node.getComponent(Button).interactable = false;
  }

  onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
    packetWrapper.packet.forEach((packet) => {
      if (packet.resLoadShop) {
        packet.resLoadShop.shopItems.forEach((shopItem) => {
          if (shopItem.type == proto.ShopItem.TYPE_SHOP.FARM_ITEM) {
            if (shopItem.noGrowthItem.name == "planting-land") {
              const itemPopupBuildingSystem =
                this.buttonPlantingLand.node.getComponent(
                  ItemPopupBuildingSystem
                );
              itemPopupBuildingSystem.setName(
                t("label_text." + "building_land")
              );
              itemPopupBuildingSystem.setPrice(shopItem.noGrowthItem.price);
            }
          }
        });
      }
    });
  }

  private handlePlantingBuilding(event: Event, customEventData: string) {
    if (!GlobalData.me().isMainArea()) return;
    const plantingLand = instantiate(this.plantingLandPrefab);
    const plantingPanel = find("Canvas/BackgroundLayers/PlantingPanel");

    let length = plantingPanel.children.length;

    if (length > 0) {
      if (length == 5) {
        plantingLand.setPosition(0, -330, 0);
      } else if (length > 5) {
        length = length - 5;
        plantingLand.setPosition(
          PLANTING_LAND.WIDTH * length + length * 25,
          -330,
          0
        );
      } else {
        plantingLand.setPosition(
          PLANTING_LAND.WIDTH * length + length * 25,
          -130,
          0
        );
      }
    } else {
      plantingLand.setPosition(0, -130, 0);
    }

    plantingPanel.addChild(plantingLand);
    this.node.active = false;
    this.openUICanvas();

    this.cameraFollowTarget(plantingLand);

    this.handleNode = plantingLand;
    this.typeBuilding = "PLANTING_LAND";
    this.effectNodeIsBuilding(this.handleNode);
    this.showPopupOption("Mua: 1000G");
  }

  private showPopupOption(title: string): void {
    UICanvas.me().showPopupOption(this.handleNode, title);
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
    let plantingPanel = find("Canvas/BackgroundLayers/PlantingPanel");
    let length = plantingPanel.children.length;
    if (length > 10) {
      this.handleNode.destroy();
      let mainCharacter = find("Canvas/ObjectLayers/MidLayer/CharacterKSNN");
      this.cameraFollowTarget(mainCharacter);
      UICanvas.me().showPopupMessage(
        "Hiện tại đã đạt giới hạn xây dựng đất trồng!"
      );
      return;
    }
    if (this.handleUserOffline()) return;

    this.hideEffectNodeIsBuilding(this.handleNode);
    this.cameraFollowTarget(GlobalData.me().getMainUserNode());
    DataSender.sendReqBuyBuilding(
      this.handleNode.uuid,
      this.typeBuilding,
      this.handleNode.position.x,
      this.handleNode.position.y,
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

  handleNoEnoughGold(): void {
    this.openUICanvas();
    UICanvas.me().showPopupMessage("Không đủ vàng!");
    this.node.destroy();
  }

  protected onDestroy(): void {
    HandlerManager.me().unRegisterHandler(this);
  }
}
