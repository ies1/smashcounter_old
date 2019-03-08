import { Component, NgZone } from '@angular/core';
import { IonicPage, ModalController, NavController, Events } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, Api } from '../../providers';
import { StatusBar } from '@ionic-native/status-bar';
import { Game } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-game-master',
  templateUrl: 'game-master.html'
})
export class GameMasterPage {
  games: Array<Game> = [];

  constructor(public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController,
    public statusBar: StatusBar,
    public db: Api,
    public zone: NgZone,
    public event: Events) {

    this.games = this.db.GAMES.slice(0);
    this.event.subscribe('update:games', () => {
      this.zone.run(() => {
        this.games = this.db.GAMES.slice(0);
      });
    })
  }

  newGame() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.db.addGame(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    //this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
