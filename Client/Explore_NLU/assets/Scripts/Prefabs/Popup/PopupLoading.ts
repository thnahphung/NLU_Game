import { _decorator, Component, Label, Node, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PopupLoading')
export class PopupLoading extends Component {
    @property(Label)
    label: Label = null;
   
    @property(Node)
    loadingIcon: Node = null;
   
    onLoad() {
      if (this.label) {
        tween(this.node)
          .repeatForever(
            tween()
              .call(
                function () {
                  this.label.string = "Đang tải ";
                }.bind(this)
              )
              .delay(0.2)
              .call(
                function () {
                  this.label.string = "Đang tải .";
                }.bind(this)
              )
              .delay(0.2)
              .call(
                function () {
                  this.label.string = "Đang tải ..";
                }.bind(this)
              )
              .delay(0.2)
              .call(
                function () {
                  this.label.string = "Đang tải ...";
                }.bind(this)
              )
              .delay(0.2)
          )
          .start();
      }
   
      if (this.loadingIcon) {
        tween(this.loadingIcon).by(1, { angle: -360 }).repeatForever().start();
      }
    }
}


