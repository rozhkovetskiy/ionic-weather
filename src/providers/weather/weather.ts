import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherProvider {
  apiKey = '0780ed5f08f4cb68d1de443d100f289c';
  url = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${this.apiKey}`;
  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }

  public getWeather(latitude: number, longitude: number) {
    this.url += `&lat=${latitude}&lon=${longitude}`;
    return this.http.get<any>(this.url);
  }
}
