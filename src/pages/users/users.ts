import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';

import { Items, User } from '../../providers';
import { TranslateService } from '@ngx-translate/core';
import { Player } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  slides: Player[];
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public items: Items,
              public translate: TranslateService, 
              public platform: Platform,
              public modalCtrl: ModalController,
              public user: User) { 

    this.dir = platform.dir();

    this.slides = user.getPlayers();
  }

  newPlayer() {
    let addModal = this.modalCtrl.create('UserCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }
}
