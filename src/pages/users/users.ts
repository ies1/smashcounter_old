import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, Events } from 'ionic-angular';

import { Items } from '../../providers';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@ionic-native/status-bar';
import { Player, Api } from '../../providers/api/api';

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
              public statusBar: StatusBar,
              public db: Api,
              public zone: NgZone,
              public event: Events) { 


    this.dir = this.platform.dir();

    this.slides = this.db.PLAYERS.slice(0);
    this.event.subscribe('update:players', () => {
      this.zone.run(() => {
        this.slides = this.db.PLAYERS.slice(0);
      });
    })
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
