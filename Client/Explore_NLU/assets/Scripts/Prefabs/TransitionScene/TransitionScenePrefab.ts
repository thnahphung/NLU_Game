import { _decorator, Component, director, Label, Node, ProgressBar } from "cc";
const { ccclass, property } = _decorator;
@ccclass("ComponentLoading")
export class TransitionScenePrefab extends Component {
  public static _instance: TransitionScenePrefab;
  @property(Node)
  private progressBar: Node = null;
  @property(Node)
  private loadingLabel: Node = null;

  private sceneName: string = null;

  public static me(): TransitionScenePrefab {
    if (this._instance == null) {
      this._instance = new TransitionScenePrefab();
    }
    return this._instance;
  }

  protected onLoad(): void {
    if (!this.sceneName) {
      this.node.destroy();
      return;
    }
    this.progressBar.getComponent(ProgressBar).progress = 0;
    director.preloadScene(this.sceneName, this.onProgress.bind(this), () => {
      director.loadScene(this.sceneName);
    });
  }

  setSceneName(sceneName: string) {
    this.sceneName = sceneName;
  }

  private onProgress(completedCount: number, totalCount: number, item: any) {
    let progress = completedCount / totalCount;
    this.updateProgress(progress);
  }

  private updateProgress(progress: number) {
    this.progressBar.getComponent(ProgressBar).progress = progress;
    this.loadingLabel.getComponent(Label).string =
      Math.floor(progress * 100) + "%";
  }
}
