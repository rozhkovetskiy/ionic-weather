import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
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
  public city: string;
  storageInformation : {
    cityName: string,
    latitude: number,
    longitude: number,
    flag: string
  } = {
    cityName: '',
    latitude: 0,
    longitude: 0,
    flag: 'none'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private storage: Storage ) { }

  ionViewWillEnter() {
    this.storage.get('location').then((val) => {
      if(val == null) {
        this.storage.set('location', this.storageInformation)
      } else {
        this.storageInformation = JSON.parse(val);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveCity() {
    console.log(this.storageInformation);
    this.storageInformation.cityName = this.city;
    // this.storageInformation.flag = 'cityName';
    this.storage.set('location', JSON.stringify(this.storageInformation));
    // this.navCtrl.push(HomePage);

  }

  setGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.storageInformation.latitude = resp.coords.latitude;
      this.storageInformation.longitude = resp.coords.longitude;
      this.storageInformation.flag = 'geolocation';
      this.storage.set('location', JSON.stringify(this.storageInformation));
    }).catch((error) => {
      this.storageInformation.flag = 'none';
      this.storage.set('location', JSON.stringify(this.storageInformation));
    });
  }
}
