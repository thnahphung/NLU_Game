import { EditBox, Label, Node, Prefab, Sprite, _decorator, find, instantiate, resources } from 'cc';
import AbsScene from './AbsScene';
import DataSender from '../Utils/DataSender';
import { t } from '../../../extensions/i18n/assets/LanguageData';
import { CharacterIntro } from '../Prefabs/Character/CharacterIntro';
import { UICanvas } from '../Prefabs/MainUI/UICanvas';
import GlobalData from '../Utils/GlobalData';
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
                    UICanvas.me().showPopupMessage(t('label_text.pick_character_403'));
                    return;
                }
                resLoadCharacters.character.forEach((character) => {
                    console.log(character);
                    let characterID = "" + character.id;
                    let code = character.code;
                    const characterPrefab = instantiate(this.characterPrefab);
                    const chacracterComponent = characterPrefab.getComponent(CharacterIntro);
                    chacracterComponent.setCharacterCode(code);
                    chacracterComponent.setNameByCode(code);
                    chacracterComponent.setCharacterSpriteFrame(code);
                    chacracterComponent.setCharacterName(character.name);
                    chacracterComponent.setCharacterID(characterID);
                    characterPrefab.on(Node.EventType.MOUSE_DOWN, () => {this.onClickCharacter(characterID)});
                    characterPrefab.on(Node.EventType.TOUCH_END, () => {this.onClickCharacter(characterID)});
                    this.characterPanel.addChild(characterPrefab);
                });
            }

            if (packet.resPickCharacter) {
                if (packet.resPickCharacter.status == 500) {
                    UICanvas.me().showPopupMessage(t('label_text.pick_character_402'));
                } else {
                    console.log(packet.resPickCharacter.user);
                    GlobalData.me().setMainUser(packet.resPickCharacter.user);
                }
            }
            
        });
    }

    loadCharacters() {
        DataSender.sendReqLoadCharacters();
    }

    onClickPickCharacter() {
        if (this.characterPicked == '') {
            UICanvas.me().showPopupMessage(t('label_text.pick_character_401'));
            return;
        }
        this.namePlayerPanel.active = true;
    }

    onClickCancelPickCharacter() {
        this.namePlayerPanel.active = false;
    }

    onClickConfirmPickCharacter() {
        if(this.editboxNamePlayer.string == '') {
            UICanvas.me().showPopupMessage(t('label_text.pick_character_404'));
            return;
        }
        DataSender.sendReqPickCharacter(Number.parseInt(this.characterPicked), this.editboxNamePlayer.string);
    }

    onClickCharacter(characterId: string) {
        if (this.characterPanel) {
            this.characterPicked = characterId;
            this.resetGrayscale();
            this.characterPanel.children.forEach((node) => {
                const characterCompoponent = node.getComponent(CharacterIntro);
                if(characterCompoponent.getCharacterID() == characterId) {
                    characterCompoponent.getCharacterBG().getComponent(Sprite).grayscale = false;
                    characterCompoponent.getCharacterSprite().getComponent(Sprite).grayscale = false;
                }
            });
        }
    }

    resetGrayscale() {
        if (this.characterPanel) {
            this.characterPanel.children.forEach((node) => {
                const characterCompoponent = node.getComponent(CharacterIntro);
                characterCompoponent.getCharacterBG().getComponent(Sprite).grayscale = true;
                characterCompoponent.getCharacterSprite().getComponent(Sprite).grayscale = true;
            });
        }
    }
}


