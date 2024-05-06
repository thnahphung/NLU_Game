import { EditBox, Label, Node, Prefab, Sprite, _decorator, find, instantiate, resources } from 'cc';
import AbsScene from './AbsScene';
import { WS } from '../Socket/WS';
import DataSender from '../Utils/DataSender';
import { t } from '../../../extensions/i18n/assets/LanguageData';
import { TransitionScenePrefab } from '../Prefabs/TransitionScene/TransitionScenePrefab';
const { ccclass, property } = _decorator;

@ccclass('PickCharacterScene')
export class PickCharacterScene extends AbsScene {
    @property(Prefab)
    public characterPrefab: Prefab = null!;
    @property(Node)
    public characterPanel: Node = null!;
    @property(Node)
    public namePlayerPanel: Node = null!;
    @property(EditBox)
    public editboxNamePlayer: EditBox = null!;
    // Khai bao transitScreen
    @property(Prefab)
    public transitScreen: Prefab = null;

    private characterPicked: string = '';
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
                    return;
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
                        this.onClickCharacter(characterID);
                    });
                    characterPrefab.on(Node.EventType.TOUCH_END, () => {
                        this.onClickCharacter(characterID);
                    });
                    this.characterPanel.addChild(characterPrefab);
                });
            }

            if (packet.resPickCharacter) {
                if (packet.resPickCharacter.status == 500) {
                    confirm('Chọn nhân vật thất bại, vui lòng thử lại!');
                } 
                if(packet.resPickCharacter.status == 200) {
                    let transitScreenNode = instantiate(this.transitScreen);
                    transitScreenNode
                    .getComponent(TransitionScenePrefab)
                    .setSceneName("KiotScene");
                    this.node.addChild(transitScreenNode);
                }
            }
        });
    }

    loadCharacters() {
        DataSender.sendReqLoadCharacters();
    }

    onClickPickCharacter() {
        if (this.characterPicked == '') {
            confirm('Chưa chọn nhân vật');
            return;
        }
        this.namePlayerPanel.active = true;
    }

    onClickCancelPickCharacter() {
        this.namePlayerPanel.active = false;
    }

    onClickConfirmPickCharacter() {
        if(this.editboxNamePlayer.string == '') return;
        DataSender.sendReqPickCharacter(Number.parseInt(this.characterPicked), this.editboxNamePlayer.string);
        console.log('onClickConfirmPickCharacter: ', this.characterPicked);
        console.log('editboxNamePlayer: ', this.editboxNamePlayer.string);
    }

    onClickCharacter(characterId: string) {
        let nodeCharacterPanel = find("Canvas/PickCharacter/CharacterPanel");
        if (nodeCharacterPanel) {
            this.characterPicked = characterId;
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


