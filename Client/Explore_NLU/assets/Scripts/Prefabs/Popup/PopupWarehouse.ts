import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  ScrollView,
} from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import GlobalData from "../../Utils/GlobalData";
import { ItemPopupWarehouse } from "./ItemPopup/ItemPopupWarehouse";
const { ccclass, property } = _decorator;

@ccclass("PopupWarehouse")
export class PopupWarehouse extends Component {
  @property(Prefab) private prefabItemPopupWarehouse: Prefab;
  @property(ScrollView) private scrollView: ScrollView;

  protected onEnable(): void {
    this.instanceItems();
  }

  instanceItems() {
    this.scrollView.content.removeAllChildren();
    const warehouseItems = GlobalData.me().getWarehouseItems();
    for (let item of warehouseItems) {
      const itemPopupWarehouse = instantiate(this.prefabItemPopupWarehouse);
      itemPopupWarehouse.getComponent(ItemPopupWarehouse).init(item);
      this.scrollView.content.addChild(itemPopupWarehouse);
    }
  }

  onClickExit() {
    this.node.getComponent(PopupComponent).hide();
  }
}
