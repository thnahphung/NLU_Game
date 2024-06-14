import {
  _decorator,
  Button,
  Component,
  EventHandler,
  ImageAsset,
  instantiate,
  Label,
  Node,
  Prefab,
  ScrollView,
  Sprite,
  SpriteFrame,
} from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import { ItemPopupAnimal } from "./ItemPopup/ItemPopupAnimal";
const { ccclass, property } = _decorator;

@ccclass("PopupBreeding")
export class PopupBreeding extends Component {
  @property(Sprite) private animalLeft: Sprite;
  @property(Sprite) private animalRight: Sprite;
  @property(Label) private dayLabel: Label;
  @property(ScrollView) private animalsPanel: ScrollView;
  @property(Prefab) private itemPopupAnimal: Prefab;
  @property(SpriteFrame) private listImageAnimal: SpriteFrame[] = [];

  private leftSelect: number = null;
  private rightSelect: number = null;
  private listItemAnimal: Node[] = [];
  private listAnimal: any[] = [
    {
      id: 1,
      name: "Bò vàng",
      type: "cow",
      age: 1,
      isDisease: true,
      isPregnant: false,
    },
    {
      id: 11,
      name: "Bò vàng",
      type: "cow",
      age: 1,
      isDisease: false,
      isPregnant: false,
    },
    {
      id: 12,
      name: "Bò vàng",
      type: "cow",
      age: 1,
      isDisease: false,
      isPregnant: false,
    },
    {
      id: 3,
      name: "Bò vàng",
      type: "cow",
      age: 1,
      isDisease: false,
      isPregnant: false,
    },
    {
      id: 4,
      name: "Gà vàng",
      type: "chicken",
      age: 1,
      isDisease: false,
      isPregnant: true,
    },
    {
      id: 5,
      name: "Gà vàng",
      type: "chicken",
      age: 1,
      isDisease: false,
      isPregnant: false,
    },
    {
      id: 6,
      name: "Gà vàng",
      type: "chicken",
      age: 1,
      isDisease: false,
      isPregnant: true,
    },
    {
      id: 7,
      name: "Gà vàng",
      type: "chicken",
      age: 1,
      isDisease: false,
      isPregnant: false,
    },
    {
      id: 8,
      name: "Gà vàng",
      type: "chicken",
      age: 1,
      isDisease: false,
      isPregnant: false,
    },
    {
      id: 9,
      name: "Gà vàng",
      type: "chicken",
      age: 1,
      isDisease: false,
      isPregnant: false,
    },
    {
      id: 10,
      name: "Gà vàng",
      type: "chicken",
      age: 1,
      isDisease: false,
      isPregnant: false,
    },
  ];

  start() {
    this.addAnimalToList();
  }

  private addAnimalToList() {
    this.listAnimal.forEach((animalData, index) => {
      let item = this.createItemAnimal(index, animalData);
      if (animalData.isPregnant || animalData.isDisease) {
        item.active = false;
      }

      this.animalsPanel.content.addChild(item);
      this.listItemAnimal.push(item);
    });
  }

  private createItemAnimal(index: number, animalData) {
    let item = instantiate(this.itemPopupAnimal);
    let itemComponent = item.getComponent(ItemPopupAnimal);
    itemComponent.setAnimalData(
      animalData,
      this.getAnimalImage(animalData.type, false)
    );
    itemComponent.node.on(
      Button.EventType.CLICK,
      (button: Button) => this.onClickItem(index, button),
      this
    );
    return item;
  }

  public onClickExit() {
    this.node.getComponent(PopupComponent).hide();
    let timeoutDestroy = setTimeout(() => {
      this.node.destroy();
      clearTimeout(timeoutDestroy);
    }, 300);
  }

  public onClickItem(index: number, button: Button) {
    if (this.leftSelect != null && this.rightSelect != null) {
      return;
    }

    if (this.leftSelect == null) {
      this.leftSelect = index;
      this.animalLeft.spriteFrame = this.getAnimalImage(
        this.listAnimal[index].type,
        false
      );
    } else if (this.rightSelect == null) {
      this.rightSelect = index;
      this.animalRight.spriteFrame = this.getAnimalImage(
        this.listAnimal[index].type,
        true
      );
    }
    this.listItemAnimal.forEach((item) => {
      if (
        button.getComponent(ItemPopupAnimal).getAnimalData().type !=
        item.getComponent(ItemPopupAnimal).getAnimalData().type
      ) {
        item.active = false;
      }
    });

    button.interactable = false;
    button.node.getComponent(Sprite).grayscale = true;
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

  public onClickAnimalLeft() {
    if (this.leftSelect == null) return;

    this.listItemAnimal[this.leftSelect].getComponent(Button).interactable =
      true;
    this.listItemAnimal[this.leftSelect].getComponent(Sprite).grayscale = false;
    this.animalLeft.spriteFrame = null;
    this.leftSelect = null;
    if (this.rightSelect == null) {
      this.showItemAnimal();
    }
  }

  public onClickAnimalRight() {
    if (this.rightSelect == null) return;

    this.listItemAnimal[this.rightSelect].getComponent(Button).interactable =
      true;
    this.listItemAnimal[this.rightSelect].getComponent(Sprite).grayscale =
      false;
    this.animalRight.spriteFrame = null;
    this.rightSelect = null;

    if (this.leftSelect == null) {
      this.showItemAnimal();
    }
  }

  private showItemAnimal() {
    this.listItemAnimal.forEach((item) => {
      if (
        !item.getComponent(ItemPopupAnimal).getAnimalData().isPregnant &&
        !item.getComponent(ItemPopupAnimal).getAnimalData().isDisease
      ) {
        item.active = true;
      }
    });
  }

  public onClickHeart() {
    console.log("onClickHeart");
  }
}
