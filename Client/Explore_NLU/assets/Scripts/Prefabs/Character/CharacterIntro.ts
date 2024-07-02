import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
import { t } from '../../../../extensions/i18n/assets/LanguageData';
const { ccclass, property } = _decorator;

@ccclass('CharacterIntro')
export class CharacterIntro extends Component {
    @property(Label)
    private characterName: Label = null!;
    @property(Label)
    private characterCode: Label = null!;
    @property(Sprite)
    private characterSprite: Sprite = null!;
    @property(SpriteFrame)
    private characterSpriteFrame: SpriteFrame[] = [];
    @property(Node)
    private characterBG: Node = null!;

    private characterID: string = '';


    start() {

    }

    public getCharacterID() {
        return this.characterID;
    }

    public setCharacterID(id: string) {
        this.characterID = id;
    }

    public setCharacterName(name: string) {
        this.characterName.string = name;
    }

    public setCharacterCode(code: string) {
        this.characterCode.string = code;
    }

    public setCharacterSpriteFrame(code: string) {
        this.characterSpriteFrame.forEach((spriteFrame) => {
            if (spriteFrame.name == code) {
                this.characterSprite.spriteFrame = spriteFrame;
            }
        });
    }

    public setNameByCode(code: string) {
        switch (code) {
            case "KSNN":
                this.characterName.string = t("label_text.character_name_agricultural");
                break;
            case "KSCN":
                this.characterName.string = t("label_text.character_name_animal_husbandry");
                break;
            case "KSCK":
                this.characterName.string = t("label_text.character_name_mechanical");
                break;
            case "BSTY":
                this.characterName.string = t("label_text.character_name_veterinarian");
                break;
            default:
                this.characterName.string = "Loading...";
                break;
        }
    }

    public getCharacterBG() {
        return this.characterBG;
    }

    public getCharacterCode() {
        return this.characterCode.string;
    }

    public getCharacterSprite() {
        return this.characterSprite;
    }
}


