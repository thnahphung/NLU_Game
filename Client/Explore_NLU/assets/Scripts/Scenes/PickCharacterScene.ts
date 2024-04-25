import { Label, Node, Prefab, Sprite, _decorator, find, instantiate, resources } from 'cc';
import AbsScene from './AbsScene';
import { WS } from '../Socket/WS';
import DataSender from '../Utils/DataSender';
import { t } from '../../../extensions/i18n/assets/LanguageData';
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
        //confirm('PickCharacterScene.onMessageHandler');
        super.onMessageHandler(packetWrapper);
        packetWrapper.packet.forEach((packet) => {
            let resLoadCharacters = packet.resLoadCharacters;
            if (resLoadCharacters) {
                if(resLoadCharacters.character == null || resLoadCharacters.character.length == 0){
                    confirm('Không có nhân vật');
                }
                resLoadCharacters.character.forEach((character) => {
                    console.log(character);
                    let characterID = "" + character.id;
                    let code = character.code;
                    const characterPrefab = instantiate(this.characterPrefab);
                    switch (code) {
                        case "KSNN":
                            characterPrefab.getChildByName("nameLable").getComponent(Label).string = t("label_text.character_name_agricultural");
                            break;
                        case "KSCN":
                            characterPrefab.getChildByName("nameLable").getComponent(Label).string = t("label_text.character_name_animal_husbandry");
                            break;
                        case "KSCK":
                            characterPrefab.getChildByName("nameLable").getComponent(Label).string = t("label_text.character_name_mechanical");
                            break;
                        case "BSTY":
                            characterPrefab.getChildByName("nameLable").getComponent(Label).string = t("label_text.character_name_veterinarian");
                            break;
                        default:
                                characterPrefab.getChildByName("nameLable").getComponent(Label).string = "Loading...";
                    }
                    characterPrefab.getChildByName("code").getComponent(Label).string = characterID;
                    characterPrefab.on(Node.EventType.MOUSE_DOWN, () => {
                        this.onClickPickCharacter(characterID);
                    });
                    characterPrefab.on(Node.EventType.TOUCH_END, () => {
                        this.onClickPickCharacter(characterID);
                    });
                    this.characterPanel.addChild(characterPrefab);
                });
            }else{
                confirm('Không có resLoadCharacters');
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


