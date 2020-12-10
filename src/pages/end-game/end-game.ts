import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';
import { LevelProvider } from '../../providers/level.provider';
import { MenuLevelsPage } from '../menu-levels/menu-levels';
import { AudioProvider } from '../../providers/audio.provider';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

/**
 * Generated class for the EndGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-end-game',
  templateUrl: 'end-game.html',
})
export class EndGamePage implements OnInit {

  endMode: number;
  levelNum: number;
  maxLevelNum: number;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public levelsProvider: LevelProvider,
    public audioProvider: AudioProvider,
    public adMobFree: AdMobFree
    ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.endMode = this.navParams.data['endMode'];
    if (this.endMode == 0) {
      this.audioProvider.playWinAudio();
    } else {
      this.audioProvider.playFailAudio();
    }
    this.levelNum = this.navParams.data['levelNum'];
    this.maxLevelNum = this.levelsProvider.maxLevelNum;
  }

  onRetry() {
    this.audioProvider.playButtonAudio();    
    const currentPageIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(GamePage, {levelNum: this.levelNum}).then(
      () => {
        this.navCtrl.remove(currentPageIndex, 1);
      }
    );
  }

  onNext() {
    this.audioProvider.playButtonAudio();    
    const currentPageIndex = this.navCtrl.getActive().index;
    
    if (this.levelNum < this.maxLevelNum) {
      this.navCtrl.push(GamePage, {levelNum: this.levelNum+1}).then(
        () => {
          this.navCtrl.remove(currentPageIndex, 1);
        }
      );
    } else {
      this.navCtrl.push(MenuLevelsPage).then(
        () => {
          this.navCtrl.remove(currentPageIndex, 1);
        }
      );
    }
  }

  onCancel() {
    this.audioProvider.playButtonAudio();  
      

    const currentPageIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(MenuLevelsPage).then(
      () => {
        this.navCtrl.remove(currentPageIndex, 1);
        this.showInterstitialAd();
      }
    );
  }

  showInterstitialAd() {
    const interstitialConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-6871490155288055/2579574531',
      isTesting: false,
    };
    this.adMobFree.interstitial.config(interstitialConfig);
    this.adMobFree.interstitial.prepare()
      .then(() => {
        this.adMobFree.interstitial.show();
      })
      .catch(e => console.log(e));

  }

}
