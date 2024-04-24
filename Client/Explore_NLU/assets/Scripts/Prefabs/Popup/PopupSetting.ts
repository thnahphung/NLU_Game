import { _decorator, Button, instantiate, Label, Node, Prefab, ProgressBar } from 'cc';
import { TransitionScenePrefab } from '../../Others/TransitionScenePrefab';
import AbsScene from '../../Scenes/AbsScene';
import { LocalStorage } from '../../Utils/LocalStorage';
import { POPUP_MESSAGE } from '../../Utils/Const';
import DataSender from '../../Utils/DataSender';
const { ccclass, property } = _decorator;

@ccclass('PopupSetting')
export class PopupSetting extends AbsScene {
    // Khai bao transitScreen
    @property(Prefab)
    public transitionScreen: Prefab = null;
    // Khai bao setting music
    @property(ProgressBar)
    public progressBarMusic: ProgressBar = null;
    // Khai bao setting sound
    @property(ProgressBar)
    public progressBarSound: ProgressBar = null;
    // Khai bao setting language
    @property(Node)
    public dropdownLanguage: Node = null;
    @property(Label)
    public lableLanguage: Label = null;

    protected onLoad(): void {
        this.dropdownLanguage.active = false;
    }

    onMessageHandler(packetWrapper: proto.IPacketWrapper): void {
        packetWrapper.packet.forEach((packet) => {
           if(packet.resLogout){
               switch(packet.resLogout.status){
                    case 200:
                        LocalStorage.me().deleteItem("USERNAME");
                        LocalStorage.me().deleteItem("AUTO_LOGIN");
                        LocalStorage.me().deleteItem("TOKEN");  
                          //Chuyển scene
                        console.log("check 2",this.transitionScreen)
                        let transitScreenAuthen = this.transitionScreen!= null ? instantiate(this.transitionScreen) : null;
                        transitScreenAuthen.getComponent(TransitionScenePrefab).setSceneName("AuthenScene");
                        this.node.addChild(transitScreenAuthen);
                        break;
                    case 400:
                        confirm(POPUP_MESSAGE.LOGOUT_FAILED_400);
                        break;
                }
           }
        });
    }

    onChangeMusic(event) {
        let progress = event.progress;
        console.log("progress", progress);
        this.progressBarMusic.progress = progress;
    }

    onChangeSound(event) {
        let progress = event.progress;
        console.log("progress", progress);
        this.progressBarSound.progress = progress;
    }

    onChangeLanguage(){
        this.dropdownLanguage.active = !this.dropdownLanguage.active;
    }

    onClickLanguage(event){
        let language = event.target.name;
        console.log("language", language);
        switch(language){
            case "ButtonEN":
                this.lableLanguage.string = "Tiếng Anh";
                this.dropdownLanguage.active = !this.dropdownLanguage.active;
                break;
            case "ButtonVI":
                this.lableLanguage.string = "Tiếng Việt";
                this.dropdownLanguage.active = !this.dropdownLanguage.active;
                break;
        }
        
    }

    onClickExitSetting() {
        this.node.destroy();
    }
    
    onLogout() {
        DataSender.sendReqLogout();
    }
}


