import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { Items } from '../../providers';
import { StatusBar } from '@ionic-native/status-bar';
import { Player, Api, PlayerGame } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  
  item: any;
  players: Array<Player> = [];
  activePlayers: Array<Player> = [];
  pgTable: Array<PlayerGame> = [];
  activePlayerGame: Array<PlayerGame> = [];

  rotatedImg: any;
  

  constructor(public navCtrl: NavController, 
              navParams: NavParams, 
              public statusBar: StatusBar,
              public db: Api,
              public zone: NgZone,
              public event: Events) {

    this.item = navParams.get('item');

    this.players = this.db.PLAYERS.slice(0);
    this.event.subscribe('update:players', () => {
      this.zone.run(() => {
        this.players = this.db.PLAYERS.slice(0);
      });
    });

    this.pgTable = this.db.PLAYER_GAME.slice(0);
    this.event.subscribe('update:player_game', () => {
      this.zone.run(() => {
        this.pgTable = this.db.PLAYER_GAME.slice(0);
        this.getPGforGame();
      });
    });

    this.getPGforGame();
  }

  getPGforGame() {
    for (let pg of this.pgTable) {
      let pgId = pg.game.id;
      if (this.item._id == pgId) {
        this.zone.run(() => {
          this.activePlayerGame.push(pg);
          this.activePlayers.push(this.getPlayersForGame(pg.player.id));
        });
      } 
    }
  }

  getPlayersForGame(playerId): Player {
    for (let p of this.players) {
      if (playerId === p._id) {
        return p;
      }
    }
  }

  addPlayerToGame() {

  }

}
