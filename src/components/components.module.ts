import { NgModule } from '@angular/core';
import { GameHeaderComponent } from './game-header/game-header';
import { IonicModule } from 'ionic-angular';
import { FlipBoardComponent } from './flip-board/flip-board';
import { FlipCardComponent } from './flip-card/flip-card';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GameTimerComponent } from './game-timer/game-timer';

@NgModule({
    declarations: [
        GameHeaderComponent,
        FlipBoardComponent,
        FlipCardComponent,
        GameTimerComponent,
    ],
    imports: [
        IonicModule,
        BrowserAnimationsModule
    ],
    exports: [
        GameHeaderComponent,
        FlipBoardComponent,
        FlipCardComponent,
        GameTimerComponent,
    ]
})
export class ComponentsModule { }
