import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shape } from '../../models/shape.model';
import { GameProvider } from '../../providers/game.provider';
import { EndGamePage } from '../end-game/end-game';
import { Subscription } from 'rxjs';
import { Level } from '../../models/level.model';
import { MenuLevelsPage } from '../menu-levels/menu-levels';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage implements OnInit, OnDestroy {


  shapes: Shape[] = new Array();
  gridClass;

  levelTime: number = 0;
  levelNum: number = 0;
  levelDynamicMode: number = 0;

  gameEndedSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gameProvider: GameProvider) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    const levelNum: number = this.navParams.data['levelNum'];

    const currentLevel: Level = this.gameProvider.selectLevel(levelNum);
    this.levelNum = currentLevel.num;
    this.levelTime = currentLevel.time;
    this.levelDynamicMode = currentLevel.dynamicMode;
    
    this.gameProvider.generatesShapes()
      .then(
        (shapes: Shape[]) => {
          this.shapes = shapes;
          if (this.shapes.length <= 6) {
            this.gridClass = 'grid-2';
          } else if (this.shapes.length > 6 && shapes.length <= 12) {
            this.gridClass = 'grid-3';
          } else if (this.shapes.length > 12 && this.shapes.length <= 24) {
            this.gridClass = 'grid-4';
          } else {
            this.gridClass = 'grid-5';
          }
        }
      )
      .then(
        () => {
          this.gameProvider.startGame();
        }
      );

    this.gameEndedSubscription = this.gameProvider.gameEnded.subscribe(
      (endMode: number) => {
        const currentPageIndex = this.navCtrl.getActive().index;
        if (endMode == 2) {
          this.navCtrl.push(MenuLevelsPage, { endMode, levelNum: this.levelNum })
            .then(
              () => {
                this.navCtrl.remove(currentPageIndex, 1);
              }
            );
        } else {
          this.navCtrl.push(EndGamePage, { endMode, levelNum: this.levelNum })
            .then(
              () => {
                this.navCtrl.remove(currentPageIndex, 1);
              }
            );
        }
      }
    );

  }

  ngOnDestroy() {
    this.gameEndedSubscription.unsubscribe();
  }

}
