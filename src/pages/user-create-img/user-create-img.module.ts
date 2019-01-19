import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { UserCreateImgPage } from './user-create-img';

@NgModule({
  declarations: [
    UserCreateImgPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCreateImgPage),
    TranslateModule.forChild()
  ],
  exports: [
    UserCreateImgPage
  ]
})
export class UserCreateImgPageModule { }
