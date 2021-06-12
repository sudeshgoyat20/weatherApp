import { Injectable } from  '@angular/core';

import { HttpClient } from  '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


import { Observable } from 'rxjs';

@Injectable()

export  class  HttpServiceProvider {



constructor(private  httpClient : HttpClient) {

 }

// Sending a GET request

  getTodaysWeather( geoCoder)  {
   let  apiKey= 'c27d7a2fbd8c5b999d79d9162580e8fa';

   let baseUrl =  'http://api.openweathermap.org/data/2.5/weather?q='+geoCoder+'&appid='+apiKey
    console.log('hey',baseUrl)

  return  this.httpClient.get(  baseUrl )

  }
  getWeekWeather( geoCoder)  {
    let  apiKey= '6beb0391b75e617720d2c502cab625a4';
   let baseUrl =  'http://api.openweathermap.org/data/2.5/forecast?q='+geoCoder+'&appid='+apiKey
    console.log('hey',baseUrl)

  return  this.httpClient.get(  baseUrl )

  }

  geoCoderApi(lat,long){
    let  apiKey= '73b98b21499ab71fc3f7a71300684da5';
    let baseUrl =  'http://api.openweathermap.org/geo/1.0/reverse?lat=' +lat + '&lon='+long+'&limit=5&appid='+apiKey
     console.log('hey',baseUrl)

   return  this.httpClient.get(  baseUrl )

  }

}
