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
  @property(AudioSource) private audioMusic: AudioSource;
  @property(AudioSource) private audioSound: AudioSource;
  private MUSIC_VOLUME_RATE: number = 1;
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
    this.audioMusic = this.node.getComponent(AudioSource);
  }

  protected start(): void {}

  //phat am thanh 1 lan cho cac am thanh ngan
  //vi du: click, pop up, ...
  playOneShot(sound: string) {
    const musicVolume =
      parseFloat(StorageManager.me().getItem("SOUND")) ||
      SETTINGS.DEFAULT_SOUND;
    resources.load(sound, (err, clip: AudioClip) => {
      if (err) {
        console.log(err);
      } else {
        this.audioSound.playOneShot(clip, musicVolume * this.MUSIC_VOLUME_RATE);
      }
    });
  }

  //phat am thanh co the lap lai, am thanh dai
  //vi du: nhac nen, am thanh game, ...
  play(sound: string, loop: boolean = false) {
    const musicVolume =
      parseFloat(StorageManager.me().getItem("MUSIC")) ||
      SETTINGS.DEFAULT_MUSIC;
    resources.load(sound, (err, clip: AudioClip) => {
      if (err) {
        console.log(err);
      } else {
        this.currentMusic = sound;
        this.audioMusic.stop();
        this.audioMusic.clip = clip;
        this.audioMusic.play();
        this.audioMusic.volume = musicVolume * this.MUSIC_VOLUME_RATE;
        this.audioMusic.loop = loop;
      }
    });
  }

  stop() {
    this.audioMusic.stop();
  }

  pause() {
    this.audioMusic.pause();
  }

  resume() {
    this.audioMusic.play();
  }

  public getCurrentMusic() {
    return this.currentMusic;
  }

  public getAudioMusic() {
    return this.audioMusic;
  }

  public getAudioSound() {
    return this.audioSound;
  }
}
