import {
  _decorator,
  Component,
  Input,
  instantiate,
  Node,
  Prefab,
  ScrollView,
} from "cc";
import { PopupComponent } from "../../Controller/PopupComponent";
import GlobalData from "../../Utils/GlobalData";
import { TaskItem } from "./ItemPopup/TaskItem";
const { ccclass, property } = _decorator;

@ccclass("PopupTask")
export class PopupTask extends Component {
  @property(Prefab) private prefabItemPopuTask: Prefab;
  @property(Node) private blackBackground: Node;
  @property(ScrollView) private scrollView: ScrollView;
  start() {
    this.blackBackground.on(Input.EventType.TOUCH_START, this.hidePopup, this);
  }

  protected onEnable(): void {
    this.instanceItems();
  }

  instanceItems() {
    this.scrollView.content.removeAllChildren();
    const tasks = GlobalData.me().getTasks();
    const progressTasks = GlobalData.me().getProgressTasks();
    const progressUnfinishedTask = [];
    const progressCompletedTasks = [];
    for (let item of tasks) {
      const itemPopupWarehouse = instantiate(this.prefabItemPopuTask);
      const progress = progressTasks.find(
        (progress) => progress.activityId == item.id
      );
      itemPopupWarehouse.getComponent(TaskItem).init(item, progress);
      if (progress.progress < item.turn) {
        progressUnfinishedTask.push(itemPopupWarehouse);
      } else if (progress.status == 1 && progress.progress >= item.turn) {
        progressCompletedTasks.push(itemPopupWarehouse);
      } else {
        this.scrollView.content.addChild(itemPopupWarehouse);
      }
    }
    for (let item of progressUnfinishedTask) {
      this.scrollView.content.addChild(item);
    }
    for (let item of progressCompletedTasks) {
      this.scrollView.content.addChild(item);
    }
  }

  public hidePopup() {
    this.node.getComponent(PopupComponent).hide();
    this.scheduleOnce(() => this.node.destroy(), 0.3);
  }
}
