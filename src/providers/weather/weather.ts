import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherProvider {
  apiKey = '0780ed5f08f4cb68d1de443d100f289c';
  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }

  public getWeather(cityName?: string,  latitude?: number, longitude?: number) {
    let url = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${this.apiKey}`;
    if (cityName && cityName !== '') {
      url += `&q=${cityName}`
    }
    if (latitude && longitude) {
      url += `&lat=${latitude}&lon=${longitude}`;
    }
    return this.http.get<any>(url);
  }

  public getWeatherForecast (cityName?: string,  latitude?: number, longitude?: number) {
    let url = `http://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=${this.apiKey}`;
    if (cityName && cityName !== '') {
      url += `&q=${cityName}`
    }
    if (latitude && longitude) {
      url += `&lat=${latitude}&lon=${longitude}`;
    }
    return this.http.get<any>(url);
  }
}
