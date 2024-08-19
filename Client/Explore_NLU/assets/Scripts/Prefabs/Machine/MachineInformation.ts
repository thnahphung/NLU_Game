import { _decorator, Component, Label, Node, RichText } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MachineInformation")
export class MachineInformation extends Component {
  @property(Label)
  private speed: Label = null;
  @property(Label)
  private power: Label = null;
  @property(RichText)
  private energy: RichText = null;

  public init(speed: string, power: string, energy: string): void {
    this.speed.string = speed;
    this.power.string = power;
    this.energy.string = energy;
  }

  start() {}

  public setSpeed(speed: string): void {
    this.speed.string = speed;
  }

  public setPower(power: string): void {
    this.power.string = power;
  }

  public setEnergy(energy: string): void {
    this.energy.string = energy;
  }
}
