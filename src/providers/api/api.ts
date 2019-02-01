import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Events } from 'ionic-angular';

export interface Player {
  _id?: string;
  name: string,
  avatar: string,
  smashes?: number,
  games?: number,
  wins?: number,
}

export interface Game {
  _id?: string;
  date: number,
  _dateReadable?: string,
  place: string,
  img: string,
  note: string
}

export interface PlayerGame {
  _id?: string;
  player: any,
  game: any,
  smashes: number,
  doubler: number,
  tripplos: number,
  win: boolean
}

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

  playersRef: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;
  gamesRef: AngularFirestoreCollection<Game>;
  games: Observable<Game[]>;
  player_gameRef: AngularFirestoreCollection<PlayerGame>;
  player_game: Observable<PlayerGame[]>;

  PLAYERS: Array<Player> = [];
  GAMES: Array<Game> = [];
  PLAYER_GAME: Array<PlayerGame> = [];

  constructor(private db: AngularFirestore,
    private event: Events) {

    this.playersRef = this.db.collection<Player>('players');
    this.players = this.playersRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data();
        data._id = a.payload.doc.id;
        return data;      
        });
    });

    this.gamesRef = this.db.collection<Game>('games');
    this.games = this.gamesRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data();
        let d = new Date(data.date);
        data._dateReadable = `${d.getFullYear()}`+"-"+(`0${d.getMonth() + 1}`).slice(-2)+"-"+(`0${d.getDay()}`).slice(-2);
        data._id = a.payload.doc.id;
        return data;      
        });
    });

    this.player_gameRef = this.db.collection<PlayerGame>('player_game');
    this.player_game = this.player_gameRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data();
        data._id = a.payload.doc.id;
        return data;      
        });
    });

    this.subscribeEvents();
  }

  subscribeEvents() {
    this.players.subscribe((players) => {
      this.PLAYERS = [];
      for (let i = 0; i < players.length; i++) {
        this.PLAYERS.push(players[i]);
      }
      this.event.publish('update:players');
    });

    this.games.subscribe((games) => {
      this.GAMES = [];
      for (let i = 0; i < games.length; i++) {
        this.GAMES.push(games[i]);
      }
      this.event.publish('update:games');
    });

    this.player_game.subscribe((pg) => {
      this.PLAYER_GAME = [];
      for (let i = 0; i < pg.length; i++) {
        this.PLAYER_GAME.push(pg[i]);
      }
      this.event.publish('update:player_game');
    });
  }

  addPlayer(player: Player) {
    this.playersRef.add({
      name: player.name,
      avatar: player.avatar
    })
  }

  addGame(game: Game) {
    this.gamesRef.add(game);
  }

}
