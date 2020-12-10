import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';

import { ComponentsModule } from '../components/components.module';

import { GamePageModule } from '../pages/game/game.module';
import { StartPageModule } from '../pages/start/start.module';
import { MenuLevelsPageModule } from '../pages/menu-levels/menu-levels.module';
import { EndGamePageModule } from '../pages/end-game/end-game.module';

import { GameProvider } from '../providers/game.provider';
import { ShapeProvider } from '../providers/shape.provider';
import { LevelProvider } from '../providers/level.provider';
import { AudioProvider } from '../providers/audio.provider';
import { AdMobFree } from '@ionic-native/admob-free';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StartPageModule,
    MenuLevelsPageModule,
    GamePageModule,
    EndGamePageModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShapeProvider,
    LevelProvider,
    GameProvider,
    AudioProvider,
    AdMobFree,
    ScreenOrientation,
  ]
})
export class AppModule {}
