import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StartPage } from '../pages/start/start';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = StartPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private adMobFree: AdMobFree) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      statusBar.styleLightContent();
      splashScreen.hide();
      this.showBannerAd(); 
    });
  }

  showBannerAd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-6871490155288055/2610158846',
      size: 'BANNER',
      bannerAtTop: false,
      isTesting: false,
      // autoShow: true,
    };
    this.adMobFree.banner.config(bannerConfig);
    this.adMobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
        this.adMobFree.banner.show();
      })
      .catch(e => console.log(e));

  }
}

