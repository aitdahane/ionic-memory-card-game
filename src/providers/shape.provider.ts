import { Injectable } from '@angular/core';
import { Shape } from '../models/shape.model';

@Injectable()
export class ShapeProvider {

  shapes: Shape[] = SHAPES;

  constructor() { }

  // To generate random shapes
  generateShapes(countShape: number) {
    return new Promise((resolve) => {
      let shapes: Shape[] = new Array(countShape * 2);
      let is: number[] = [];
      let js: number[] = [];

      for (let i = 0; i < countShape; i++) {
        is.push(i);
      }
      for (let j = 0; j < countShape * 2; j++) {
        js.push(j);
      }

      for (let i = 0; i < countShape; i++) {
        let ri, rj, rk;
        do {
          ri = Math.floor(Math.random() * countShape);
        } while (is[ri] == -1)

        do {
          rj = Math.floor(Math.random() * countShape * 2);
        } while (js[rj] == -1);
        shapes[js[rj]] = this.shapes[is[ri]];
        js[rj] = -1;

        do {
          rk = Math.floor(Math.random() * countShape * 2);
        } while (js[rk] == -1);
        shapes[js[rk]] = this.shapes[is[ri]];
        js[rk] = -1;

        is[ri]= -1;
      }
      resolve(shapes);
    });
  }

}

export const SHAPES: Shape[] = [
  { num: 1, name: 'circle', src: 'circle.svg' },
  { num: 2, name: 'crescent', src: 'crescent.svg' },
  { num: 3, name: 'diamond', src: 'diamond.svg' },
  { num: 4, name: 'ellipse', src: 'ellipse.svg' },
  { num: 5, name: 'heart', src: 'heart.svg' },
  { num: 6, name: 'hexagon', src: 'hexagon.svg' },
  { num: 7, name: 'parallel', src: 'parallel.svg' },
  { num: 8, name: 'pentagon', src: 'pentagon.svg' },
  { num: 9, name: 'rectangle', src: 'rectangle.svg' },
  { num: 10, name: 'rhombus', src: 'rhombus.svg' },
  { num: 11, name: 'ring', src: 'ring.svg' },
  { num: 12, name: 'square', src: 'square.svg' },
  { num: 13, name: 'star', src: 'star.svg' },
  { num: 14, name: 'trefoil', src: 'trefoil.svg' },
  { num: 15, name: 'triangle', src: 'triangle.svg' },
];