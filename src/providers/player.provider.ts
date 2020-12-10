import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PlayerProvider {

  currentLevelNum: number;
  currentLevelNumChanged: Subject<number> = new Subject();
  
  constructor() { 
    
  }


  

}
