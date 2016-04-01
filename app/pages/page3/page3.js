import {Page} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Http} from 'angular2/http';



@Page({
  templateUrl: 'build/pages/page3/page3.html'
  
})

export class Page3 {
posi: int;
    posp: int;
    datas: {};
    longi: {};
    tempMain: {};
     constructor(nav: NavController, http: Http) {
      this.http = http;

Geolocation.getCurrentPosition().then((resp) => {
            this.posi = resp.coords.latitude;
            this.posp = resp.coords.longitude;
            this.getWeather();
        });
    }



getWeather(){
        this.http.get('http://api.openweathermap.org/data/2.5/forecast?lat='+this.posi+'&lon='+this.posp+'&units=metric&appid=f513805255c080947d4115bc85cf923e')
            .map(response => response.json())
            .subscribe(result => {console.log(result.city.country)});
    }	
}
