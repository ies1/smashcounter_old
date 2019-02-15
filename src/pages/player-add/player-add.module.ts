import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PlayerAddPage } from './player-add';

@NgModule({
  declarations: [
    PlayerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerAddPage),
    TranslateModule.forChild()
  ],
  exports: [
    PlayerAddPage
  ]
})
export class ItemCreatePageModule { }
