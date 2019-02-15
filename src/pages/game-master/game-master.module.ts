import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { GameMasterPage } from './game-master';

@NgModule({
  declarations: [
    GameMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(GameMasterPage),
    TranslateModule.forChild()
  ],
  exports: [
    GameMasterPage
  ]
})
export class GameMasterPageModule { }
