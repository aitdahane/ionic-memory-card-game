import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ShapeProvider } from './shape.provider';
import { LevelProvider } from './level.provider';
import { Level } from '../models/level.model';

@Injectable()
export class GameProvider {

  gameStarted: Subject<boolean> = new Subject();
  gameEnded: Subject<number> = new Subject();

  currentLevel: Level;

  constructor(
    public shapeProvider: ShapeProvider,
    public levelProvider: LevelProvider,
  ) { }

  selectLevel(levelNum: number) {
    this.currentLevel = this.levelProvider.levels.find(level => level.num == levelNum);
    if (!this.currentLevel.isLocked) {
      return this.currentLevel;
    }
  }

  startGame() {
    this.gameStarted.next(true);
  }

  endGame(isWinner: boolean, isTimesUp?: boolean, isGivenUp?: boolean) {
    if (isWinner) {
      this.gameEnded.next(0);
      this.levelProvider.completeLevel(this.currentLevel.num);
    } else if (isTimesUp) {
      this.gameEnded.next(1);
    } else  {
      // if (isGivenUp)
      this.gameEnded.next(2);
    }
  }

  generatesShapes() {
    return this.shapeProvider.generateShapes(this.currentLevel.countShape);
  }

}
