import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

export interface Player {
  name: string,
  image: string,
  smashes: number,
  games: number,
  wins: number,
  active_smashes?: number
}

export interface Games {
  date: Date,
  players: Player[]
}

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  _players: Player[] = [];

  constructor() { }

  getPlayers(): Player[] {
    //todo local storage stuff

    if (this._players.length === 0)
      this.createMockPlayers();

    return this._players;
  }

  createMockPlayers() {
    this._players.push({
      name: "Player 1",
      smashes: 1,
      games: 1,
      wins: 0,
      image: 'assets/img/fighters/mario.png'
    });

    this._players.push({
      name: "Player 2",
      smashes: 0,
      games: 1,
      wins: 0,
      image: 'assets/img/fighters/bowser.png'
    });

    this._players.push({
      name: "Player 3",
      smashes: 2,
      games: 1,
      wins: 1,
      image: 'assets/img/fighters/samus.png'
    });
  }

  addPlayer(p: Player) {
    //TODO Local storage stuff

    this._players.push(p);
  }
}
