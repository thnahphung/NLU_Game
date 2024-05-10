import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AbsScene")
export default class AbsScene extends Component {
  onMessageHandler(packets: proto.IPacketWrapper) {
    //TODO: xử lý chung như thông báo...
  }
}
