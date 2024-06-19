import { _decorator, Component, director, instantiate, Node, Prefab } from "cc";
import { CHARACTERS } from "../Utils/Const";
import { Character } from "../Prefabs/Character/Character";
import GlobalData from "../Utils/GlobalData";
const { ccclass, property } = _decorator;

@ccclass("PlayerManager")
export class PlayerManager extends Component {
  @property([Prefab]) private playerPrefab: Prefab[] = [];

  protected static _instance: PlayerManager;

  public static me(): PlayerManager {
    return this._instance;
  }

  protected onLoad(): void {
    PlayerManager._instance = this;
  }

  createCharacter(userProto: proto.IUser): Node {
    let characterNode: Node = null;
    this.playerPrefab.forEach((element) => {
      if (element.name == "Character" + userProto.character.code) {
        characterNode = instantiate(element);
        characterNode.getComponent(Character).setUserProto(userProto);
      }
    });
    return characterNode;
  }
}
