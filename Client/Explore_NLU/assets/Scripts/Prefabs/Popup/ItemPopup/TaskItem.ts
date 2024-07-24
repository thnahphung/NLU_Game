import { _decorator, Button, Component, Label, Node, Touch } from "cc";
import { t } from "../../../../../extensions/i18n/assets/LanguageData";
import DataSender from "../../../Utils/DataSender";
import { AudioManger } from "../../../Manager/AudioManger";
import { AUDIOS } from "../../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("TaskItem")
export class TaskItem extends Component {
  @property(Label) private taskName: Label;
  @property(Label) private taskReward: Label;
  @property(Label) private taskProgress: Label;
  @property(Button) private btnProgress: Button;

  private task: proto.IActivity;
  private progressTask: proto.IProgressActivity;

  init(task: proto.IActivity, progressTask: proto.IProgressActivity) {
    this.task = task;
    this.progressTask = progressTask;
  }

  start() {
    this.setUpInfoWarehouseItem();
  }

  private setUpInfoWarehouseItem() {
    let rewardString = "";
    this.taskName.string = t("label_text." + this.task.code);
    this.task.rewardItem.forEach((reward) => {
      if (reward.quantity == 0 || !reward || !reward.noGrowthItem) return;
      rewardString +=
        reward.quantity +
        " " +
        t("label_text.reward_name_" + reward.noGrowthItem.name) +
        ", ";
    });
    rewardString = rewardString.substring(0, rewardString.length - 2);
    this.taskReward.string = rewardString;
    this.setProgress();
  }

  private setProgress() {
    if (this.progressTask.status == 1) {
      this.setProgressTaskComoleted();
    } else if (this.progressTask.progress >= this.task.turn) {
      this.setProgressTaskComplete();
    } else {
      this.setProgressTaskProgress();
    }
  }

  private setProgressTaskComplete() {
    this.btnProgress.node.active = true;
    this.taskProgress.node.active = false;
  }

  private setProgressTaskComoleted() {
    this.taskProgress.string = t("label_text.task_completed");
    this.btnProgress.node.active = false;
    this.taskProgress.node.active = true;
  }

  private setProgressTaskProgress() {
    this.taskProgress.string =
      this.progressTask.progress + "/" + this.task.turn;
    this.btnProgress.node.active = false;
    this.taskProgress.node.active = true;
  }

  onBtnProgressClick() {
    // Get reward
    AudioManger.me().playOneShot(AUDIOS.LEVEL_UP);
    DataSender.sendResCompleteTask(this.task, this.progressTask);
    this.setProgressTaskComoleted();
  }
}
