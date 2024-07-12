import {
  _decorator,
  Button,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  ScrollView,
  SpriteFrame,
} from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
const { ccclass, property } = _decorator;

@ccclass("PopupCageInformation")
export class PopupCageInformation extends Component {
  @property(Label) private capacityLabel: Label;
  @property(Label) private levelLabel: Label;
  @property(ScrollView) private animalsPanel: ScrollView;
  @property(SpriteFrame) private listImageAnimal: SpriteFrame[] = [];
  @property(Prefab) private itemPopupAnimal: Prefab;
  @property(Prefab) private popupYesNo: Prefab;

  private listItemAnimal: Node[] = [];

  private cageInfo: proto.ICage;
  start() {
    // this.setListAnimal();
  }

  onClickExit() {
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  public setInformationCage(cageInfo: proto.ICage) {
    this.cageInfo = cageInfo;
    this.capacityLabel.string =
      cageInfo.animals.length.toString() +
      "/" +
      cageInfo.upgrade.capacity.toString();
    this.levelLabel.string = cageInfo.upgrade.level.toString();
  }

  // public setListAnimal() {
  //   this.animalsPanel.content.removeAllChildren();
  //   this.cageInfo.animals.forEach((animal) => {
  //     let item = instantiate(this.itemPopupAnimal);
  //     item
  //       .getComponent(ItemPopupAnimal)
  //       .setAnimalData(animal, this.getAnimalImage(animal.type, false));
  //     item.on(
  //       Button.EventType.CLICK,
  //       (button: Button) => this.onClickItem(button),
  //       this
  //     );
  //     this.animalsPanel.content.addChild(item);
  //     this.listItemAnimal.push(item);
  //   });
  // }

  public getCageInfo() {
    return this.cageInfo;
  }

  public getAnimalImage(type: string, isLeft: boolean): SpriteFrame {
    const text = isLeft ? "-left" : "-right";
    let result = null;
    this.listImageAnimal.forEach((image) => {
      if (image.name.toUpperCase() == (type + text).toUpperCase()) {
        result = image;
      }
    });
    return result;
  }

  public onClickUpgrade() {
    console.log("Upgrade cage");
  }

  public onClickSell(animalData: any) {
    console.log("Sell with price: " + animalData.id.toString() + " coins");
  }

  public onClickNoSell() {
    console.log("No");
  }
  // public onClickItem(button: Button) {
  //   const popupYesNoNode = instantiate(this.popupYesNo);
  //   popupYesNoNode
  //     .getComponent(PopupYesNo)
  //     .setContent(
  //       "Do you want to sell this " +
  //         button.getComponent(ItemPopupAnimal).getAnimalData().name +
  //         "?"
  //     );
  //   popupYesNoNode
  //     .getComponent(PopupYesNo)
  //     .onClickYes(() =>
  //       this.onClickSell(button.getComponent(ItemPopupAnimal).getAnimalData())
  //     );
  //   popupYesNoNode.getComponent(PopupYesNo).onClickNo(this.onClickNoSell);
  //   popupYesNoNode.parent = this.node.parent;
  //   popupYesNoNode.getComponent(PopupComponent).show();
  // }
}
