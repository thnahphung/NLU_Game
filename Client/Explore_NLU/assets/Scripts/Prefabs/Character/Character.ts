import { _decorator, Component, Animation, RigidBody2D, Vec2, Label } from "cc";

import { CharacterMovement } from "./CharacterMovement";
import { CharacterAnimation } from "./CharacterAnimation";
import { CharacterState } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Character")
export class Character extends Component {
  @property
  private speed: number = 500;

  private playerName: string = "player name 123";
  private userId: number;
  @property
  private isMainPlayer: boolean = false;

  private currentState: CharacterState = CharacterState.IDLE_DOWN;

  private animation: Animation;
  private rigidBody: RigidBody2D;
  @property(Label)
  private labelName: Label;

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
    this.labelName.string = this.playerName;
  }

  public setCurrentState(newState: CharacterState) {
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
