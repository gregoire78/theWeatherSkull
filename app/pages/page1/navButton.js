/**
 * Created by gregoire on 25/03/2016.
 */
import {Component, Input} from 'angular2/core';
import {NavController, IONIC_DIRECTIVES, Button, Icon} from 'ionic-angular';
import {Page2} from '../page2/page2';
import {Http} from 'angular2/http';
import {Geolocation} from 'ionic-native';

@Component({
    selector: 'nav-button',
    template: `
<ion-toolbar>
    <ion-title>{{address}}</ion-title>
    <ion-buttons start>
        <button royal (click)="goToPage2()">
            <ion-icon name="search"></ion-icon>
        </button>
    </ion-buttons>
    <ion-buttons end>
        <button royal (click)="getWeather()">
            <ion-icon name="refresh"></ion-icon>
        </button>
    </ion-buttons>
</ion-toolbar>
    `,
    directives: [IONIC_DIRECTIVES]
})
export class NavButton {
    @Input() address
    constructor(nav:NavController, http: Http) {
        this.nav = nav;
        this.http = http;
        Geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            this.getWeather();
        });
    }

    goToPage2() {
        this.nav.push(Page2);
    }
    
    getWeather(){
        this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.lng+'&appid=f513805255c080947d4115bc85cf923e&lang=fr&units=metric')
            .map(response => response.json())
            .subscribe((result) => {
                this.datas = result;
                this.address = result.name;
                this.datas['temp'] = result.main.temp;
                this.datas['humidity'] = result.main.humidity;
                this.datas['sunrise'] = this.hourFormat(result.sys.sunrise);
                this.datas['sunset'] = this.hourFormat(result.sys.sunset);
                this.datas['weather_id'] = result.weather[0].id;
                this.datas['weather_desc'] = result.weather[0].description;
                this.datas['weather_icon'] = result.weather[0].icon;
                this.datas['deg'] = result.wind.deg;
                this.datas['speed'] = result.wind.speed;
                console.log(result)
            }, (error) => console.log("error : " + error), (complete) => console.log("complet !"));
    }
}