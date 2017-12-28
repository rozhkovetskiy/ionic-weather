import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  location: {
    city: string,
    state: string
  };

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherProvider,
              private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get('location').then((val) => {
      if (val !== null) {
        this.location = JSON.parse(val)
      } else {
        this.location = {
          state: 'RU',
          city: 'Moscow'
        };
      }

      this.weatherProvider.getWeather(this.location.city, this.location.state)
        .subscribe((response) => {
          this.weather = response.current_observation
          console.log(this.weather);
        });
    });
  }
}
