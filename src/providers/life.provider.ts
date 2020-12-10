import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LifeProvider {
  
  totalLives: number = 5;
  totalLivesChanged: Subject<number> = new Subject();
  timeToReset: number = 5000;

  constructor() { }

  resetLife() {
    this.totalLives = Math.min(this.totalLives+1, 5);
    this.totalLivesChanged.next(this.totalLives);
  }

  takeLife() {
    this.totalLives = Math.max(this.totalLives-1, 0);
    this.totalLivesChanged.next(this.totalLives);
  }

}