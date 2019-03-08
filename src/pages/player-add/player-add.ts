import { Component, NgZone } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, Events, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Api } from '../../providers';
import { Player, Game } from '../../providers/api/api';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-player-add',
  templateUrl: 'player-add.html'
})
export class PlayerAddPage {

  players: Array<Player> = [];
  addablePlayers: Array<Player> = [];
  alreadySelectedPlayers: Array<Player> = [];
  
  game: Game;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    public camera: Camera,
    public statusBar: StatusBar,
    public db: Api,
    public event: Events,
    public zone: NgZone) {

    this.alreadySelectedPlayers = navParams.get('players');
    this.game = navParams.get('game');

    console.log(this.game)

    this.players = this.db.PLAYERS.slice(0);
    this.event.subscribe('update:players', () => {
      this.zone.run(() => {
        this.players = this.db.PLAYERS.slice(0);
        this.filterAddablePlayers();
      });
    });
    this.filterAddablePlayers();
  }

  filterAddablePlayers() {
    this.addablePlayers = this.players.filter((player) => {
      let alreadySelected = false;
      for (let p of this.alreadySelectedPlayers) {
        if (p._id === player._id) {
          alreadySelected = true; 
        }
      }
      if (!alreadySelected) {
        return player;
      }
    });
  }
  
  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  choosePlayer(player) {
    this.db.addPlayerGame({
      player: firebase.firestore().doc(`/players/${player._id}`),
      game: firebase.firestore().doc(`/games/${this.game._id}`),
      smashes: 0,
      doubler: 0,
      tripplos: 0,
      win: false,
      total: 0
    });

    console.log('old games count', player.games);

    player.games = player.games + 1;
    this.db.playersRef.doc(`${player._id}`).update({games: player.games})
      .then(() => {
        console.log('new games count', player.games);
        this.viewCtrl.dismiss();
      }).catch((err) => {
        console.error("ERROR DURING UPDATE", err);
      });
  }
}
