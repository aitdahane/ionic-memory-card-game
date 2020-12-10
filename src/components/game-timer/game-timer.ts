import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GameProvider } from '../../providers/game.provider';
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'game-timer',
  templateUrl: 'game-timer.html'
})
export class GameTimerComponent implements OnDestroy {

  @Input() time: number;
  @Output() timeChange: EventEmitter<number> = new EventEmitter();
  gameStartedSubscription: Subscription;

  constructor(
    public gameProvider: GameProvider) { }

  ngOnInit() {
    const interval = Observable.interval(1000);
    this.gameStartedSubscription = this.gameProvider.gameStarted
      .combineLatest(interval)
      .subscribe(
        () => {
          this.startTimer();
        }
      );
  }

  startTimer() {
    if (this.time > 0) {
      this.time--;
    } else {
      this.gameProvider.endGame(false, true);
      this.gameStartedSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.gameStartedSubscription.unsubscribe();
  }
}