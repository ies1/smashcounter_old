import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}

export const AVATARS = [
"bayonetta.png",         "fox.png",               "lucas.png",             "peach.png",            "shulk.png",
"bowser.png",            "ganondorf.png",         "lucina.png",            "pichu.png",             "simon.png",
"bowser_jr.png",         "gaogaen.png",           "luigi.png",             "pikachu.png",           "snake.png",
"captain_falcon.png",    "greninja.png",          "mario.png",             "pit.png",               "sonic.png",
"chrom.png",             "ice_climbers.png",      "marth.png",             "pokemon_trainer.png",   "toon_link.png",
"cloud.png",             "ike.png",               "mega_man.png",         "richter.png",           "villager.png",
"corrin.png",            "inkling.png",           "meta_knight.png",       "ridley.png",           "wario.png",
"daisy.png",             "jigglypuff.png",        "mewtwo.png",            "rob.png",               "wii_fit_trainer.png",
"dark_pit.png",          "ken.png",               "mii_fighter.png",       "robin.png",             "wolf.png",
"dark_samus.png",        "king_dedede.png",       "mr_game_and_watch.png", "rosalina_and_luma.png", "yoshi.png",
"diddy_kong.png",       "king_k_rool.png",        "ness.png",              "roy.png",               "young_link.png",
"donkey_kong.png",       "kirby.png",             "olimar.png",            "ryu.png",               "zelda.png",
"dr_mario.png",          "link.png",              "pac_man.png",           "samus.png",             "zero_suit_samus.png",
"duck_hunt.png",         "little_mac.png",        "packun_flower.png",     "sheik.png",
"falco.png",             "lucario.png",           "palutena.png",          "shizue.png",
];
