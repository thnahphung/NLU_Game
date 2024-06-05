import {
  _decorator,
  Component,
  Animation,
  RigidBody2D,
  Vec2,
  Label,
  find,
  Node,
} from "cc";

import { CharacterMovement } from "./CharacterMovement";
import { CharacterAnimation } from "./CharacterAnimation";
import { CHARACTER_STATE } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Character")
export class Character extends Component {
  @property private speed: number = 500;

  private playerName: string = "player name 123";
  private userId: number;
  @property private isMainPlayer: boolean = false;

  private currentState: CHARACTER_STATE = CHARACTER_STATE.IDLE_DOWN;

  private animation: Animation;
  private rigidBody: RigidBody2D;
  private labelName: Label;
  private playerNameLayer: Node;

  private characterMovement: CharacterMovement;
  private characterAnimation: CharacterAnimation;

  protected onLoad(): void {
    this.init();
  }

  private init() {
    this.animation = this.getComponent(Animation);
    this.rigidBody = this.getComponent(RigidBody2D);

    this.characterMovement = this.getComponent(CharacterMovement);
    this.characterAnimation = this.getComponent(CharacterAnimation);
    this.labelName = this.node.getChildByName("Name").getComponent(Label);
  }

  protected start(): void {
    this.playerNameLayer = find("Canvas/PopupGameLayer/PlayerNameLayer");
    this.labelName.string = this.playerName;
    this.labelName.node.parent = this.playerNameLayer;
  }

  protected update(dt: number): void {
    this.labelName.node.setPosition(
      this.node.position.x,
      this.node.position.y + 54
    );
  }

  public setCurrentState(newState: CHARACTER_STATE) {
    this.currentState = newState;
  }
  public getCurrentState() {
    return this.currentState;
  }
  public getAnimation() {
    return this.animation;
  }
  public getRigidBody() {
    return this.rigidBody;
  }
  public getCharacterMovement() {
    return this.characterMovement;
  }
  public getCharacterAnimation() {
    return this.characterAnimation;
  }
  public getSpeed() {
    return this.speed;
  }
  public getPlayerName() {
    return this.playerName;
  }
  public setPlayerName(name: string) {
    this.playerName = name;
    this.labelName.string = name;
  }
  public setUserId(id: number) {
    this.userId = id;
  }
  public getUserId() {
    return this.userId;
  }
  public setIsMainPlayer(isMain: boolean) {
    this.isMainPlayer = isMain;
  }
  public getIsMainPlayer() {
    return this.isMainPlayer;
  }
}
