import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Shape } from '../../models/shape.model';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

/**
 * Generated class for the FlipCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'flip-card',
  templateUrl: 'flip-card.html',
  animations: [
    trigger('frontBack', [
      state('front', style({
        transform: 'rotateY(0deg)',
      })),
      state('back', style({
        transform: 'rotateY(180deg)',
      })),
      transition('front => back', animate('400ms ease-in-out')),
      transition('back => front', animate('400ms ease-in-out'))
    ]),
  ]
})
export class FlipCardComponent implements OnInit {

  @Input() shape: Shape;
  @Input() isFlipped: boolean;
  @Output() isFlippedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() flip: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onFlip() {
    if (!this.isFlipped)
      this.isFlippedChange.emit(true);
  }

  onDoneFlip() {
    if (this.isFlipped) {
      this.flip.emit();
    }
  }

}
