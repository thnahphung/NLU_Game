import { _decorator, Component, find, Node } from "cc";
import { CoatingComponent } from "../../Controller/CoatingComponent";
import { COATING } from "../../Utils/Const";
const { ccclass, property } = _decorator;

@ccclass("Cage")
export class Cage extends Component {
  private isMenuOpen: boolean = false;
  private menuNode: Node;
  start() {
    this.menuNode = find("Canvas/PopupGameLayer/MenuAnimalFood");
    this.node.on(Node.EventType.TOUCH_START, this.handleGetMenu, this);
  }

  private handleGetMenu(): void {
    this.menuNode.setPosition(
      this.node.getPosition().x,
      this.node.getPosition().y + 150,
      0
    );
    this.menuNode.active = true;

    CoatingComponent.me().setCoating(
      COATING.FEED,
      this.node.parent,
      this.menuNode
    );
    CoatingComponent.me().showCoating(COATING.FEED);
    CoatingComponent.me().autoOff(COATING.FEED);
  }
}
