import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ItemPopupBuildingSystem")
export class ItemPopupBuildingSystem extends Component {
  @property(Label)
  private nameLabel: Label = null;
  @property(Label)
  private priceLabel: Label = null;
  start() {}

  public setName(name: string) {
    this.nameLabel.string = name;
  }

  public setPrice(price: number) {
    this.priceLabel.string = price.toString();
  }

  public getPriceLabel() {
    return this.priceLabel;
  }
}
