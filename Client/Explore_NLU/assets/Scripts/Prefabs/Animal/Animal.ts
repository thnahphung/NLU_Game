import {
  _decorator,
  Animation,
  Collider2D,
  Color,
  Component,
  find,
  Node,
  Sprite,
  UITransform,
  Vec2,
} from "cc";
import { AnimalAnimation } from "./AnimalAnimation";
import { AnimalMovement } from "./AnimalMovement";
import { ANIMAL, ANIMAL_STATE } from "../../Utils/Const";
import { PopupInformationAnimal } from "../Popup/PopupInformationAnimal";
const { ccclass, property } = _decorator;

@ccclass("Animal")
export class Animal extends Component {
  @property private type: ANIMAL = ANIMAL.COW;
  @property private currentState: ANIMAL_STATE = ANIMAL_STATE.IDLE_RIGHT;
  @property private speed: number = 100;
  @property private isHungry: boolean = false;
  @property private isPregnant: boolean = false;
  @property private isDisease: boolean = false;
  @property private daysOld: number = 0;
  @property private animalName: string = "";

  @property maxMovingDistanceX: Vec2 = new Vec2(0, 0);
  @property maxMovingDistanceY: Vec2 = new Vec2(0, 0);

  private animalAnimation: AnimalAnimation;
  private animalMovement: AnimalMovement;

  private animalSprite: Sprite;
  private animation: Animation;
  private emoteAnimation: Animation;
  private collider: Collider2D;

  private popupInformationAnimal: Node;
  private blockInputPanel: Node;

  private emoteLayer: Node;
  private animalInformationLayer: Node;

  protected onLoad(): void {
    this.init();
  }

  init() {
    this.animalAnimation = this.node.getComponent(AnimalAnimation);
    this.animalMovement = this.node.getComponent(AnimalMovement);
    this.animation = this.node.getComponent(Animation);
    this.emoteAnimation = this.node
      .getChildByName("Emote")
      .getComponent(Animation);
    this.collider = this.node.getComponent(Collider2D);
    this.animalSprite = this.node.getComponent(Sprite);
    this.popupInformationAnimal = this.node.getChildByName(
      "PopupInformationAnimal"
    );
    this.blockInputPanel = this.node.getChildByName("BlockInputPanel");

    this.addPopupToLayer();
    this.createMaxMovingDistance();
  }

  public createMaxMovingDistance() {
    this.maxMovingDistanceX.x =
      -this.node.getParent().getComponent(UITransform).contentSize.width / 2;
    this.maxMovingDistanceX.y =
      this.node.getParent().getComponent(UITransform).contentSize.width / 2;
    this.maxMovingDistanceY.x =
      -this.node.getParent().getComponent(UITransform).contentSize.height / 2;
    this.maxMovingDistanceY.y =
      this.node.getParent().getComponent(UITransform).contentSize.height / 2;
  }

  protected update(dt: number): void {
    this.checkDisease();
  }

  public checkDisease() {
    if (this.isDisease) {
      this.animalSprite.color = new Color("#83FFB5");
    }
  }

  private addPopupToLayer() {
    this.emoteLayer = find("Canvas/PopupGameLayer/EmoteLayer");
    this.emoteLayer.addChild(this.emoteAnimation.node);
    this.animalInformationLayer = find(
      "Canvas/PopupGameLayer/AnimalInformationLayer"
    );
    this.animalInformationLayer.addChild(this.popupInformationAnimal);
  }

  public getSpeed() {
    return this.speed;
  }
  public setCurrentState(newState: ANIMAL_STATE) {
    this.currentState = newState;
  }
  public getCurrentState() {
    return this.currentState;
  }
  public getAnimation() {
    return this.animation;
  }
  public getAnimalMovement() {
    return this.animalMovement;
  }
  public getAnimalAnimation() {
    return this.animalAnimation;
  }
  public getMaxMovingDistanceX() {
    return this.maxMovingDistanceX;
  }
  public getMaxMovingDistanceY() {
    return this.maxMovingDistanceY;
  }
  public getCollider() {
    return this.collider;
  }
  public isHungryAnimal() {
    return this.isHungry;
  }
  public setIsHungry(isHungry: boolean) {
    this.isHungry = isHungry;
  }
  public getType() {
    return this.type;
  }
  public getEmoteAnimation() {
    return this.emoteAnimation;
  }
  public isPregnantAnimal() {
    return this.isPregnant;
  }
  public getEmoteLayer() {
    return this.emoteLayer;
  }
  public getPopupInformationAnimal() {
    return this.popupInformationAnimal;
  }
  public getBlockInputPanel() {
    return this.blockInputPanel;
  }
  public getAnimalInformationLayer() {
    return this.animalInformationLayer;
  }
  public isDiseaseAnimal() {
    return this.isDisease;
  }
  public getDaysOld() {
    return this.daysOld;
  }
  public getAnimalName() {
    return this.animalName;
  }
}
