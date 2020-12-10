import { Injectable } from '@angular/core';
import { Level } from '../models/level.model';
import { Subject } from 'rxjs/Subject';
import { Storage } from '@ionic/storage';

@Injectable()
export class LevelProvider {

  currentLevelNum: number = 1;
  maxLevelNum: number;

  levels: Level[] = [];
  levelsChanged: Subject<Level[]> = new Subject();

  

  constructor(private storage: Storage) {
    this.initLevels();
  }

  initLevels() {
    this.levels = LEVELS.slice();
    this.storage.get('currentLevelNum')
    .then(
      (currentLevelNum) => {
        if (currentLevelNum) {
          this.currentLevelNum = currentLevelNum;
        } else {
          this.storage.set('currentLevelNum', 1);
        }
      }
    ).then(
      () => {
        this.maxLevelNum = 1;
        this.levels.forEach((level, index, levels) => {
          if (level.num < this.currentLevelNum) {
            levels[index].isLocked = false;
            levels[index].isComplete = true;
          }
          else if (level.num == this.currentLevelNum) {
            levels[index].isLocked = false;
          } else {
            levels[index].isLocked = true;
            levels[index].isComplete = false;
          }
          // Search for the max level num
          if (level.num > this.maxLevelNum ) {
            this.maxLevelNum = level.num;
          } 
        });        
        this.levelsChanged.next(this.levels);
      });

  }

  completeLevel(levelNum: number) {
    const i = this.levels.findIndex((level) => level.num == levelNum);
    const j = this.levels.findIndex((level) => level.num == (levelNum+1));
    this.levels[i].isComplete = true;
    if (j > 0) {
      this.levels[j].isLocked = false;
    }
    if (levelNum >= this.currentLevelNum) {
      this.currentLevelNum = levelNum + 1;
      this.storage.set('currentLevelNum', this.currentLevelNum);
    }
  }
}

export const LEVELS: Level[] = [
  { num: 1, name: 'Level 1', time: 30, countShape: 3, dynamicMode: 0, isComplete: false, isLocked: false },
  { num: 2, name: 'Level 2', time: 60, countShape: 6, dynamicMode: 0, isComplete: false, isLocked: true },
  { num: 3, name: 'Level 3', time: 40, countShape: 6, dynamicMode: 0, isComplete: false, isLocked: true },
  { num: 4, name: 'Level 4', time: 60, countShape: 8, dynamicMode: 0, isComplete: false, isLocked: true },
  { num: 5, name: 'Level 5', time: 40, countShape: 8, dynamicMode: 0, isComplete: false, isLocked: true },
  { num: 6, name: 'Level 6', time: 60, countShape: 6, dynamicMode: 1, isComplete: false, isLocked: true },
  { num: 7, name: 'Level 7', time: 75, countShape: 8, dynamicMode: 1, isComplete: false, isLocked: true },
  { num: 8, name: 'Level 8', time: 70, countShape: 10, dynamicMode: 0, isComplete: false, isLocked: true },
  { num: 9, name: 'Level 9', time: 60, countShape: 10, dynamicMode: 0, isComplete: false, isLocked: true },
  { num: 10, name: 'Level 10', time: 90, countShape: 10, dynamicMode: 1, isComplete: false, isLocked: true },
  { num: 11, name: 'Level 11', time: 70, countShape: 10, dynamicMode: 1, isComplete: false, isLocked: true },
  { num: 12, name: 'Level 12', time: 90, countShape: 12, dynamicMode: 0, isComplete: false, isLocked: true },
  { num: 13, name: 'Level 13', time: 130, countShape: 12, dynamicMode: 1, isComplete: false, isLocked: true },
  { num: 14, name: 'Level 14', time: 100, countShape: 12, dynamicMode: 1, isComplete: false, isLocked: true },
  { num: 15, name: 'Level 15', time: 160, countShape: 15, dynamicMode: 0, isComplete: false, isLocked: true },
  { num: 16, name: 'Level 16', time: 160, countShape: 15, dynamicMode: 1, isComplete: false, isLocked: true },
  { num: 17, name: 'Level 17', time: 140, countShape: 15, dynamicMode: 1, isComplete: false, isLocked: true },
];
