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
  weatherForecast: any;
  weatherIcon: string;
  locationData: {
    cityName: string,
    latitude: number,
    longitude: number,
    flag: string
  };

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherProvider,
              private storage: Storage) {

  }

  ionViewWillEnter() {
    // get information about location from storage
    // console.log('ionViewWillEnter');
    this.storage.get('location').then((val) => {
      if (val == null) {
        this.locationData.flag = 'none';
      } else {
        this.locationData = JSON.parse(val);
        // console.log(JSON.stringify(this.locationData));
        if (this.locationData.flag === 'cityName') {
          console.log(`weather by city`);
          this.weatherProvider.getWeather(this.locationData.cityName)
            .subscribe((response) => {
              this.weather = response;
              this.weather.main.temp = Math.round(this.weather.main.temp);
              this.weatherIcon = `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
            }, () => this.locationData.flag = 'none');
          this.weatherProvider.getWeatherForecast(this.locationData.cityName).subscribe((response) => {
            console.log(response.list);
            this.weatherForecast = response.list;
          })
        }
        if (this.locationData.flag === 'location') {
          console.log(`weather by location`);
          this.weatherProvider.getWeather('', this.locationData.latitude, this.locationData.longitude)
            .subscribe((response) => {
              this.weather = response;
              this.weather.main.temp = Math.round(this.weather.main.temp);
              this.weatherIcon = `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
            });
          this.weatherProvider.getWeatherForecast('', this.locationData.latitude, this.locationData.longitude)
            .subscribe((response) => {
              console.log(response.list);
              this.weatherForecast = response.list;
            })
        }
      }
    });
  }

  public getWeatherIcon(iconId: string): string {
    return `http://openweathermap.org/img/w/${iconId}.png`
  }
}
