import { Injectable } from '@angular/core';

@Injectable()
export class AudioProvider {
  
  constructor() { }

  playButtonAudio(){
    let audio = new Audio();
    audio.src = "../assets/sounds/button.mp3";
    audio.load();
    audio.play();
  }

  playDingAudio(){
    let audio = new Audio();
    audio.src = "../assets/sounds/ding.mp3";
    audio.load();
    audio.play();
  }

  playWinAudio(){
    let audio = new Audio();
    audio.src = "../assets/sounds/tada.mp3";
    audio.load();
    audio.play();
  }

  playFailAudio(){
    let audio = new Audio();
    audio.src = "../assets/sounds/fail.mp3";
    audio.load();
    audio.play();
  }

}