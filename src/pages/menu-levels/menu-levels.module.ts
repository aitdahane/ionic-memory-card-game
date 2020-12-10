import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuLevelsPage } from './menu-levels';

@NgModule({
  declarations: [
    MenuLevelsPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuLevelsPage),
  ],
})
export class MenuLevelsPageModule {}
