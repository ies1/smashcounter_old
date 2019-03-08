import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

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
    public event: Events,
    public modalCtrl: ModalController) {

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
    this.activePlayerGame = [];
    this.activePlayers = [];
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
    let addModal = this.modalCtrl.create('PlayerAddPage', {
      players: this.activePlayers,
      game: this.item
    });
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item);
      }
    })
    addModal.present();
  }

  addSmash(pg: PlayerGame, p: Player) {

    console.log('old smash count', p.smashes, pg.smashes);

    p.smashes = p.smashes + 1;
    pg.smashes = pg.smashes + 1;
    pg.total = pg.total + 1;

    this.db.playersRef.doc(`${p._id}`).update({ smashes: p.smashes })
      .then(() => {
        console.log('new smash overall count', p.smashes);
      }).catch((err) => {
        console.error("ERROR DURING UPDATE", err);
      });

    this.db.player_gameRef.doc(`${pg._id}`).update({ smashes: pg.smashes })
      .then(() => {
        console.log('new smash count', pg.smashes);
      }).catch((err) => {
        console.error("ERROR DURING UPDATE", err);
      });

    this.db.player_gameRef.doc(`${pg._id}`).update({ total: pg.total })
      .then(() => {
        console.log('new total count', pg.smashes);
      }).catch((err) => {
        console.error("ERROR DURING UPDATE", err);
      });
  }

  remSmash(pg: PlayerGame, p: Player) {
    if (pg.smashes > 0 && p.smashes > 0) {

      console.log('old smash count', p.smashes, pg.smashes);

      p.smashes = p.smashes - 1;
      pg.smashes = pg.smashes - 1;
      pg.total = pg.total - 1;

      this.db.playersRef.doc(`${p._id}`).update({ smashes: p.smashes })
        .then(() => {
          console.log('new smash overall count', p.smashes);
        }).catch((err) => {
          console.error("ERROR DURING UPDATE", err);
        });

      this.db.player_gameRef.doc(`${pg._id}`).update({ smashes: pg.smashes })
        .then(() => {
          console.log('new smash count', pg.smashes);
        }).catch((err) => {
          console.error("ERROR DURING UPDATE", err);
        });

      this.db.player_gameRef.doc(`${pg._id}`).update({ total: pg.total })
        .then(() => {
          console.log('new total count', pg.total);
        }).catch((err) => {
          console.error("ERROR DURING UPDATE", err);
        });
    }
  }

  addDoubler(pg: PlayerGame, p: Player) {
    console.log('old doubler count', p.smashes, pg.doubler);

    p.smashes = p.smashes + 3;
    pg.doubler = pg.doubler + 1;
    pg.total = pg.total + 3;

    this.db.playersRef.doc(`${p._id}`).update({ smashes: p.smashes })
      .then(() => {
        console.log('new smash overall count', p.smashes);
      }).catch((err) => {
        console.error("ERROR DURING UPDATE", err);
      });

    this.db.player_gameRef.doc(`${pg._id}`).update({ doubler: pg.doubler })
      .then(() => {
        console.log('new doubler count', pg.doubler);
      }).catch((err) => {
        console.error("ERROR DURING UPDATE", err);
      });

    this.db.player_gameRef.doc(`${pg._id}`).update({ total: pg.total })
      .then(() => {
        console.log('new total count', pg.total);
      }).catch((err) => {
        console.error("ERROR DURING UPDATE", err);
      });
  }

  remDoubler(pg: PlayerGame, p: Player) {
    console.log('old doubler count', p.smashes, pg.doubler);

    if (p.smashes > 3 && pg.doubler > 0) {
      p.smashes = p.smashes - 3;
      pg.doubler = pg.doubler - 1;
      pg.total = pg.total - 3;


      this.db.playersRef.doc(`${p._id}`).update({ smashes: p.smashes })
        .then(() => {
          console.log('new smash overall count', p.smashes);
        }).catch((err) => {
          console.error("ERROR DURING UPDATE", err);
        });

      this.db.player_gameRef.doc(`${pg._id}`).update({ doubler: pg.doubler })
        .then(() => {
          console.log('new doubler count', pg.doubler);
        }).catch((err) => {
          console.error("ERROR DURING UPDATE", err);
        });

      this.db.player_gameRef.doc(`${pg._id}`).update({ total: pg.total })
        .then(() => {
          console.log('new total count', pg.total);
        }).catch((err) => {
          console.error("ERROR DURING UPDATE", err);
        });
    }
  }

}
