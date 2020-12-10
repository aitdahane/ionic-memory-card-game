import { Component, Input } from '@angular/core';
import { GameProvider } from '../../providers/game.provider';
import { AudioProvider } from '../../providers/audio.provider';

@Component({
  selector: 'game-header',
  templateUrl: 'game-header.html'
})
export class GameHeaderComponent {

  @Input() levelNum: number;

  constructor(
    public gameProvider: GameProvider,
    public audioProvider: AudioProvider) { }
  
  onGivenUp() {
    this.audioProvider.playButtonAudio();    

    this.gameProvider.endGame(false, false, true);
  }
}
