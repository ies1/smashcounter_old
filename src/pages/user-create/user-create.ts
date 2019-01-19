import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Player } from '../../providers/user/user';
import { AVATARS } from '../../providers/items/items';

@IonicPage()
@Component({
  selector: 'page-user-create',
  templateUrl: 'user-create.html'
})
export class UserCreatePage {

  isReadyToSave = true;

  item: Player;
  hideSelect = true;
  avatars: Array<string> = [];
  urlAvatars: Array<any> = [];
  currentActiveAvatar: any;

  form: FormGroup;
  
  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
              public modalCtrl: ModalController) {

    
    this.form = formBuilder.group({
        profilePic: ['', Validators.required],
        name: ['', Validators.required]
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

  }

  createUser() {

  }

  selectAvatar(avatar, activeAvatar) {
    if (typeof this.currentActiveAvatar !== "undefined"){
        this.currentActiveAvatar.classList.remove('activeAvatar')
    }
    this.currentActiveAvatar = activeAvatar;
    this.currentActiveAvatar.classList.add('activeAvatar');
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
