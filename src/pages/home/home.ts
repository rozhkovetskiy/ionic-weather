import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherProvider } from '../../providers/weather/weather';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  weatherIcon: string;
  location: {
    latitude: number,
    longitude: number
  };

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherProvider,
              private storage: Storage,
              private geolocation: Geolocation ) {

  }

  ionViewWillEnter() {

    this.geolocation.getCurrentPosition().then((resp) => {

      this.weatherProvider.getWeather(resp.coords.latitude, resp.coords.longitude)
        .subscribe((response) => {
          this.weather = response;
          this.weather.main.temp = Math.round(this.weather.main.temp);
          this.weatherIcon = `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
        });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
}
