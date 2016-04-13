import {Page, NavParams} from 'ionic-angular';
import {Hour} from '../hour_format';

@Page({
  template:`
<ion-navbar *navbar primary="">
    <ion-title>The Weather Skull</ion-title>
</ion-navbar>
<ion-toolbar>
    <ion-title>{{place.address}}</ion-title>
</ion-toolbar>
<ion-content class="page3">
    <div>
        <p>{{weather.weather[0].description}}</p>
        <p>
            <i class="wi wi-sunrise"></i> {{weather.sunrise}}<br>
            <i class="wi wi-sunset"></i> {{weather.sunset}}
        </p>
        <p>{{weather.main.temp}}°C</p>
        <p><img src="http://weatherandtime.net/images/icons/1/{{weather.weather[0].icon}}.png" alt="icon"></p>
        <p>
            <i class="wi wi-wind towards-{{weather.wind.deg}}-deg"></i> {{weather.wind.speed}} m/s<br>
            {{weather.main.humidity}} <i class="wi wi-humidity"></i>
        </p>
    </div>
</ion-content>`,
  providers: [Hour]
})
export class Page3 {

  constructor(navParams: NavParams, hour:Hour){
    this.weather = navParams.get("weather");
    this.weather.sunrise = hour.hourFormat(this.weather.sys.sunrise);
    this.weather.sunset = hour.hourFormat(this.weather.sys.sunset);
    this.place = navParams.get("place");
    this.place.address = [
      (this.place.address_components[0] && this.place.address_components[0].short_name + ', ' || ''),
      (this.place.address_components[1] && this.place.address_components[1].short_name || ''),
      (this.place.address_components[2] && this.place.address_components[2].short_name || '')
    ].join(' ');
  }
}
