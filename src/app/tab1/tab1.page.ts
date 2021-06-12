import { Component } from '@angular/core';
import { HttpServiceProvider } from '../service-provider/http-service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  result: Observable<any>;
  resultWeek: Observable<any>;
  geoCode: Observable<any>;
  todaysData:any;
  weeklyData:any;
  geoCoder:any;
  showIcon=true;
  showError=false;
  constructor( private httpServiceProvider:HttpServiceProvider,
    private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder) {


  }
  ngOnInit(){
    this.getLocationCords();

  }

  //to get the geo coordinates
  getLocationCords(){
  this.geolocation.getCurrentPosition().then((resp) => {
    console.log('111',resp)
   if(resp.coords){
    this.getCity(resp.coords);
   }

   }).catch((error) => {
     console.log('Error getting location', error);
   });

   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
   });
}


//to get the city name from geo coordinates
getCity(cords){
this.geoCode=this.httpServiceProvider.geoCoderApi(cords.latitude, cords.longitude)
this.geoCode.subscribe(data => {


  if(data){
    this.geoCoder = data[0].name;
    console.log(this.geoCoder);
    this.getTodaysForcast(this.geoCoder);
this.weekForcast(this.geoCoder);
  }
 }, error => {
  console.log(error);

});

}


getTodaysForcast(geoCoder){
  if(geoCoder){
    this.result = this.httpServiceProvider.getTodaysWeather(geoCoder);

    this.result.subscribe(data => {


     if(data){
       this.todaysData = data;
       console.log(this.todaysData);
     }
    }, error => {
     console.log(error);

   });
  }


}

weekForcast(geoCoder){
  if(geoCoder){
    this.showIcon=true;
    this.resultWeek = this.httpServiceProvider.getWeekWeather(geoCoder);
    this.resultWeek.subscribe(data => {
   if(data){
       this.weeklyData = data;
       console.log(this.weeklyData);
       this.showIcon=false;
       this.showError=false;
     }
    }, error => {
     console.log(error);
     this.showIcon=false;
     this.showError=true;


   });
  }

}
}
