import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherProvider {
  apiKey = 'c8234d69d5357a1d';
  url = `http://api.wunderground.com/api/${this.apiKey}/conditions/q`;
  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }

  public getWeather(city: string, state: string) {
    return this.http.get<any>(this.url + `/${state}/${city}.json`);
  }
}
