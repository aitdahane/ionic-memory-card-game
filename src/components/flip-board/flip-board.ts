import { Component, Input, OnInit } from '@angular/core';
import { Shape } from '../../models/shape.model';
import { GameProvider } from '../../providers/game.provider';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AudioProvider } from '../../providers/audio.provider';

@Component({
  selector: 'flip-board',
  templateUrl: 'flip-board.html',
  animations: [
    trigger('visible', [
      state('true', style({ opacity: 1 })),
      transition('* => true', [
        animate('1s ease-in-out', keyframes([
          style({ border: 'black solid 5px', 'border-radius': '50%', opacity: 0.5, offset: 0.1 }),
          style({ border: 'black solid 10px','border-radius': '50%', opacity: 0.3, offset: 0.3 }),
          style({ border: 'black solid 15px', 'border-radius': '50%', opacity: 0, offset: 0.5 }),
          style({ border: 'black solid 10px','border-radius': '50%', opacity: 0, offset: 0.6 }),
          style({ border: 'black solid 5px', 'border-radius': '50%', opacity: 0.3, offset: 0.7 }),
          style({ border: 'none', opacity: 0.5, offset: 0.9 })
        ]))
      ]),
    ])
  ],
})
export class FlipBoardComponent implements OnInit {

  @Input() shapes: Shape[] = new Array();
  @Input() gridClass: string;
  @Input() dynamicMode: number;

  indexFirstShape: number = -1;
  indexSecondShape: number = -1;

  indexFirstSwap: number = -1;
  indexSecondSwap: number = -1;

  totalFlipped: number = 0;

  areFlipped: boolean[];

  constructor(
    public gameProvider: GameProvider,
    public audioProvider: AudioProvider,    
    ) { }

  ngOnInit() {
    this.areFlipped = new Array(this.shapes.length);
    this.areFlipped.fill(false);
  }

  onFlipCard(index: number) {
    this.indexFirstShape = (this.indexFirstShape == -1) ? index : this.indexFirstShape;
    this.indexSecondShape = (this.indexFirstShape != -1) ? index : -1;
    if (this.indexFirstShape != -1
      && this.indexSecondShape != -1
      && this.indexFirstShape != this.indexSecondShape) {

      if (this.dynamicMode == 1 && this.totalFlipped != (this.shapes.length-2)) {
        this.swapShapes();
      }

      if (!this.compareShapes()) {
        this.areFlipped[this.indexFirstShape] = false;
        this.areFlipped[this.indexSecondShape] = false;
      } else {
        this.totalFlipped += 2;
        this.audioProvider.playDingAudio();
        if (this.totalFlipped == this.shapes.length) {
          this.gameProvider.endGame(true);
        }
      }
      
      this.indexFirstShape = -1;
      this.indexSecondShape = -1;
    }
  }

  swapShapes() {
    let i, j;
    do {
      i = Math.floor(Math.random() * this.shapes.length);
    } while(this.areFlipped[i] == true);
    do {
      j = Math.floor(Math.random() * this.shapes.length);
    } while(j == i || this.areFlipped[j] == true);
    const shape = this.shapes[i];
    this.shapes[i] = this.shapes[j];
    this.shapes[j] = shape;
    this.indexFirstSwap = i;
    this.indexSecondSwap = j;
  }

  onDoneSwap() {
    this.indexFirstSwap = -1;
    this.indexSecondSwap = -1;
  }

  compareShapes() {
    return (this.shapes[this.indexFirstShape].num == this.shapes[this.indexSecondShape].num);
  }

  trackByNum(index: number, shape: Shape): number { return index; }

}
