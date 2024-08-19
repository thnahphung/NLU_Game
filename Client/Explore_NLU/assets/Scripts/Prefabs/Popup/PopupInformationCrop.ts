import { _decorator, Component, Label, Node, ProgressBar } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PopupInformationCrop")
export class PopupInformationCrop extends Component {
  @property(Label)
  private nameCrop: Label = null;
  @property(ProgressBar)
  private progressBar: ProgressBar = null;
  init(name: string, progress: number) {
    this.nameCrop.string = name;
    this.progressBar.progress = progress;
  }
  start() {
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 3);
  }
}
