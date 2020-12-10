import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';
import { Level } from '../../models/level.model';
import { LevelProvider } from '../../providers/level.provider';
import { Subscription } from 'rxjs';
import { AudioProvider } from '../../providers/audio.provider';

@IonicPage()
@Component({
  selector: 'page-menu-levels',
  templateUrl: 'menu-levels.html',
})
export class MenuLevelsPage implements OnInit, OnDestroy {
  levelsOpen: Level[];
  levelsLocked: Level[];
  levelsChangedSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public levelProvider: LevelProvider,
    public audioProvider: AudioProvider) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.levelsOpen = this.levelProvider.levels.filter(level => !level.isLocked);
    this.levelsLocked = this.levelProvider.levels.filter(level => level.isLocked).slice(0, 8);
    this.levelsChangedSubscription = this.levelProvider.levelsChanged.subscribe(
      (levels) => {
        this.levelsOpen = levels.filter(level => !level.isLocked);
        this.levelsLocked = levels.filter(level => level.isLocked).slice(0, 8);
      }
    );
  }

  onSelectLevel(levelNum: number) {
    this.audioProvider.playButtonAudio();    
    const currentPageIndex = this.navCtrl.getActive().index;    
    this.navCtrl.push(GamePage, { levelNum })
      .then(
        () => {
          this.navCtrl.remove(currentPageIndex, 1);
        }
      );
  }

  ngOnDestroy() {
    this.levelsChangedSubscription.unsubscribe();
  }

}
