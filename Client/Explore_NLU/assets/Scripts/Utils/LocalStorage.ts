import { _decorator, Component, Node, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LocalStorage")
export class LocalStorage extends Component {
  public static instance: LocalStorage = null;

  public static me() {
    if (this.instance == null) {
      this.instance = new LocalStorage();
    }
    return this.instance;
  }

  saveItem(key, item) {
    sys.localStorage.setItem(key, item);
  }

  getItem(key) {
    return sys.localStorage.getItem(key);
  }

  deleteItem(key) {
    sys.localStorage.removeItem(key);
  }
}
