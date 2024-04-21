import { Label, Node, Prefab, Sprite, _decorator, find, instantiate, resources } from 'cc';
import AbsScene from './AbsScene';
import { WS } from '../Socket/WS';
import DataSender from '../Utils/DataSender';
import { LoadPrefabUtil } from '../Utils/LoadPrefabUtil';
const { ccclass, property } = _decorator;

@ccclass('PickCharacterScene')
export class PickCharacterScene extends AbsScene {
    @property(Prefab)
    public characterPrefab: Prefab = null!;
    @property(Node)
    public characterPanel: Node = null!;
    private characterPick: string = '';
    start() {
    }

    protected onLoad(): void {
        this.loadCharacters() 
    }

    onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
        super.onMessageHandler(packetWrapper);
        packetWrapper.packet.forEach((packet) => {
            let resLoadCharacters = packet.resLoadCharacters;
            if (resLoadCharacters) {
                if(resLoadCharacters.character == null || resLoadCharacters.character.length == 0){
                    console.log('Không có nhân vật');
                }
                resLoadCharacters.character.forEach((character) => {
                    let characterID = "" + character.id;
                    const characterPrefab = instantiate(this.characterPrefab);
                    characterPrefab.getChildByName("nameLable").getComponent(Label).string = character.name;
                    characterPrefab.getChildByName("code").getComponent(Label).string = characterID;
                    characterPrefab.on(Node.EventType.MOUSE_DOWN, () => {
                        this.onClickPickCharacter(characterID);
                    });
                    characterPrefab.on(Node.EventType.TOUCH_END, () => {
                        this.onClickPickCharacter(characterID);
                    });
                    this.characterPanel.addChild(characterPrefab);
                });
            }
        });
    }

    loadCharacters() {
        DataSender.sendReqLoadCharacters();
    }

    onClickPickCharacter(characterId: string) {
        let nodeCharacterPanel = find("Canvas/PickCharacter/CharacterPanel");
        if (nodeCharacterPanel) {
            this.characterPick = characterId;
            this.resetGrayscale(nodeCharacterPanel);
            nodeCharacterPanel.children.forEach((node) => {
                if (node.getChildByName("code").getComponent(Label).string != characterId) {
                    node.getChildByName("sprite").getComponent(Sprite).grayscale = true;
                    node.getChildByName("bg").getComponent(Sprite).grayscale = true;
                }
            });
        }
    }

    resetGrayscale(nodeCharacterPanel : Node) {
        if (nodeCharacterPanel) {
            nodeCharacterPanel.children.forEach((node) => {
                node.getChildByName("sprite").getComponent(Sprite).grayscale = false;
                node.getChildByName("bg").getComponent(Sprite).grayscale = false;
            });
        }
    }
}


