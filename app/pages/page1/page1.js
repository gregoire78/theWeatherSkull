import {Page} from 'ionic-angular';
import {CurrentTime} from './currentTime';
import {Geolocation} from 'ionic-native';
import {NavController} from 'ionic-angular';
import {Http} from 'angular2/http';
import {NavButton} from './navButton';
import {Hour} from '../hour_format';

@Page({
    template: `
<ion-navbar primary>
    <ion-title>The Weather Skull</ion-title>
</ion-navbar>
<nav-button [address]="address"></nav-button>
<ion-content padding class="page1">
    <current-time>Loading...</current-time>
    <ion-row>
        <ion-col width-60>
            <h3>
                <i class="wi wi-owm-{{datas.weather_id}}"></i> <span id="weather_desc">{{datas.weather_desc}}</span>
                <hr>
                <i class="wi wi-sunrise"></i> {{datas.sunrise}}<br>
                <i class="wi wi-sunset"></i> {{datas.sunset}}
                <p>
                    <i class="wi wi-wind towards-{{datas.deg}}-deg"></i> {{datas.speed}} m/s<br>
                    {{datas.humidity}} <i class="wi wi-humidity"></i>
                </p>
            </h3>
        </ion-col>
        <icon-col width-40>
            <img src="http://weatherandtime.net/images/icons/1/{{datas.weather_icon}}.png" alt="icon">
        </icon-col>
    </ion-row>
    <p id="temp"><span id="val-temp">{{datas.temp}}</span><span id="celsius">°C</span></p>
    <button royal (click)="getWeather()">
            <ion-icon name="refresh"></ion-icon>
    </button>
</ion-content>`,
    directives: [CurrentTime, NavButton],
    providers: [Hour]
})
export class Page1 {
    lat:int;
    lng:int;
    datas:{};
    hour:Hour;

    constructor(nav:NavController, http:Http, hour:Hour) {
        this.nav = nav;
        this.hour=hour;
        this.http = http;
        this.datas = {};
        Geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            this.getWeather();
        });
    }

    getWeather() {
        this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lng + '&appid=551b97ca557560dfc7d8c49a81b37d89&lang=fr&units=metric')
            .map(response => response.json())
            .subscribe((result) => {
                this.datas = result;
                this.address = result.name;
                this.datas['temp'] = result.main.temp;
                this.datas['humidity'] = result.main.humidity;
                this.datas['sunrise'] = this.hour.hourFormat(result.sys.sunrise);
                this.datas['sunset'] = this.hour.hourFormat(result.sys.sunset);
                this.datas['weather_id'] = result.weather[0].id;
                this.datas['weather_desc'] = result.weather[0].description;
                this.datas['weather_icon'] = result.weather[0].icon;
                this.datas['deg'] = result.wind.deg;
                this.datas['speed'] = result.wind.speed;
                console.log(result)
            });
            // }, (error) => console.log("error : " + error), (complete) => console.log("complet !"));
    }
}
