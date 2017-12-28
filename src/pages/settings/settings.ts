import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  location: {
    city: string,
    state: string
  } = {
    state: 'RU',
    city: 'Moscow'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage ) { }

  ionViewWillEnter() {
    this.storage.get('location').then((val) => {
      if(val != null){
        this.location = JSON.parse(val);
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm() {
    this.storage.set('location', JSON.stringify(this.location));
    this.navCtrl.push(HomePage);
  }
}
