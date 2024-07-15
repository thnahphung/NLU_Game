import {
  _decorator,
  AudioClip,
  AudioSource,
  Component,
  director,
  Node,
  resources,
} from "cc";

import { SETTINGS } from "../Utils/Const";
import { StorageManager } from "./StorageManger";
const { ccclass, property } = _decorator;

@ccclass("AudioManger")
export class AudioManger extends Component {
  protected static _instance: AudioManger;
  private _audioSource: AudioSource;
  private MUSIC_VOLUME_RATE: number = 0.5;
  private currentMusic: string = "";

  public static me(): AudioManger {
    if (this._instance == null) {
      this._instance = new AudioManger();
    }
    return this._instance;
  }

  protected onLoad(): void {
    if (AudioManger._instance != null)
      console.log("Only 1 InputManager allow to exist");
    AudioManger._instance = this;
    director.addPersistRootNode(this.node);
    this._audioSource = this.node.getComponent(AudioSource);
    console.log("AudioManger start");
  }

  protected start(): void {}

  public get audioSource() {
    return this._audioSource;
  }

  //phat am thanh 1 lan cho cac am thanh ngan
  //vi du: click, pop up, ...
  playOneShot(sound: string) {
    const musicVolume =
      parseFloat(StorageManager.me().getItem("MUSIC")) ||
      SETTINGS.DEFAULT_EFFECT;
    resources.load(sound, (err, clip: AudioClip) => {
      if (err) {
        console.log(err);
      } else {
        this._audioSource.playOneShot(
          clip,
          musicVolume * this.MUSIC_VOLUME_RATE
        );
      }
    });
  }

  //phat am thanh co the lap lai, am thanh dai
  //vi du: nhac nen, am thanh game, ...
  play(sound: string, loop: boolean = false) {
    const musicVolume =
      parseFloat(StorageManager.me().getItem("MUSIC")) ||
      SETTINGS.DEFAULT_MUSIC;
    console.debug("musicVolume", musicVolume);
    resources.load(sound, (err, clip: AudioClip) => {
      if (err) {
        console.log(err);
      } else {
        this.currentMusic = sound;
        this._audioSource.stop();
        this._audioSource.clip = clip;
        this._audioSource.play();
        this.audioSource.volume = musicVolume * this.MUSIC_VOLUME_RATE;
        this.audioSource.loop = loop;
      }
    });
  }

  stop() {
    this._audioSource.stop();
  }

  pause() {
    this._audioSource.pause();
  }

  resume() {
    this._audioSource.play();
  }

  public getCurrentMusic() {
    return this.currentMusic;
  }
}
