import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MenuLevelsPage } from '../menu-levels/menu-levels';
import { AudioProvider } from '../../providers/audio.provider';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private audioProvider: AudioProvider,
  ) { }

  ionViewDidLoad() {
  }

  onStart() {
    this.audioProvider.playButtonAudio();
    this.navCtrl.push(MenuLevelsPage);
  }

}
