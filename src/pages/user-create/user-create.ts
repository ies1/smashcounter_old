import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AVATARS } from '../../providers/items/items';
import { StatusBar } from '@ionic-native/status-bar';
import { Player, Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-user-create',
  templateUrl: 'user-create.html'
})
export class UserCreatePage {

  isReadyToSave = false;

  hideSelect = true;
  avatars: Array<string> = [];
  urlAvatars: Array<any> = [];
  currentActiveAvatar: any;
  chosenAvatar: string;

  form: FormGroup;
  
  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
              public modalCtrl: ModalController,
              public statusBar: StatusBar,
              public db: Api) {

    
    this.form = formBuilder.group({
        avatar: ['', Validators.required],
        name: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });

    this.getAvatars();
    for (let i = 0; i < this.avatars.length; i++) {
        this.urlAvatars.push({
            title: this.avatars[i].split(".")[0].replace("_", " "),
            url: `assets/img/fighters/${this.avatars[i]}`  
        });
    }

  }

  cancel() {
    this.viewCtrl.dismiss();
  }


  done() {
    if (this.form.valid) {
        let newPlayer: Player = {
            name: this.form.controls['name'].value,
            avatar: this.form.controls['avatar'].value
        }

        this.db.addPlayer(newPlayer);

        this.viewCtrl.dismiss();
    }
  }

  selectAvatar(imgObj, activeAvatar) {
    if (typeof this.currentActiveAvatar !== "undefined"){
        this.currentActiveAvatar.classList.remove('activeAvatar')
    }
    this.currentActiveAvatar = activeAvatar;
    this.currentActiveAvatar.classList.add('activeAvatar');

    this.form.patchValue({ 'avatar': imgObj.url });
    this.hideSelect = true;
}

  chooseAvatar() {
    this.hideSelect = false;
  }

  getAvatars() {
    this.avatars = AVATARS.sort();
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['avatar'].value + ')'
  }

}
