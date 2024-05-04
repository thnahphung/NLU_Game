import { _decorator, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("StorageManager")
export class StorageManager {
  public static instance: StorageManager = null;

  public static me() {
    if (this.instance == null) {
      this.instance = new StorageManager();
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
