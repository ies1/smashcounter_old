import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Player, User } from '../../providers/user/user';
import { AVATARS } from '../../providers/items/items';

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
              public userMgmt: User) {

    
    this.form = formBuilder.group({
        profilePic: ['', Validators.required],
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
            image: this.form.controls['profilePic'].value,
            games: 0,
            smashes: 0,
            wins: 0
        }

        this.userMgmt.addPlayer(newPlayer);

        this.viewCtrl.dismiss();
    }
  }

  selectAvatar(imgObj, activeAvatar) {
    if (typeof this.currentActiveAvatar !== "undefined"){
        this.currentActiveAvatar.classList.remove('activeAvatar')
    }
    this.currentActiveAvatar = activeAvatar;
    this.currentActiveAvatar.classList.add('activeAvatar');

    this.form.patchValue({ 'profilePic': imgObj.url });
    this.hideSelect = true;
}

  chooseAvatar() {
    this.hideSelect = false;
  }

  getAvatars() {
    this.avatars = AVATARS.sort();
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

}
