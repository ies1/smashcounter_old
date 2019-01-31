import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers';
import { Player, User } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  players: Array<Player> = [];
  activePlayers: Array<Player> = [];
  rotatedImg: any;

  constructor(public navCtrl: NavController, 
              navParams: NavParams, 
              items: Items,
              public user: User) {

    this.item = navParams.get('item') || items.defaultItem;
    this.players = this.user.getPlayers();

    //only for testing
    this.activePlayers = this.players;
  }

  addPlayer() {

  }

}
