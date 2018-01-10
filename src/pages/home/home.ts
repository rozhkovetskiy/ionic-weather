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
  locationData : {
    cityName: string,
    latitude: number,
    longitude: number,
    flag: string
  };

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherProvider,
              private storage: Storage,
              private geolocation: Geolocation ) {

  }

  ionViewWillEnter() {
    // get information about location from storage
    this.storage.get('location').then((val) => {
      if (val == null) {
        this.locationData.flag = 'none';
      } else {
        this.locationData = JSON.parse(val);
      }
    });
    // this.weatherProvider.getWeather(resp.coords.latitude, resp.coords.longitude)
    //   .subscribe((response) => {
    //     this.weather = response;
    //     this.weather.main.temp = Math.round(this.weather.main.temp);
    //     this.weatherIcon = `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
    //   });
  }
}
