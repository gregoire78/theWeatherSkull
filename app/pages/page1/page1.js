import {Page} from 'ionic-angular';
import {CurrentTime} from './currentTime';
import {Geolocation} from 'ionic-native';
import {NavController} from 'ionic-angular';
import {Page2} from '../page2/page2';
import {Http} from 'angular2/http';
import {NavButton} from './navButton';

@Page({
    templateUrl: 'build/pages/page1/page1.html',
    directives: [CurrentTime, NavButton]
})
export class Page1 {
    posi: int;
    posp: int;
    datas: {};
    longi: {};
    tempMain: {};
    constructor(nav: NavController, http: Http) {
        this.nav = nav;
        this.http = http;
        this.datas = {};
        this.longi = {};
        this.tempMain = {};
        this.sys = {};
        this.sunrise = "";
        this.sunset = "";
        Geolocation.getCurrentPosition().then((resp) => {
            this.posi = resp.coords.latitude;
            this.posp = resp.coords.longitude;
            this.getWeather();
        });
    }
    goToPage2(){
        this.nav.push(Page2);
    }
    getWeather(){
        this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+this.posi+'&lon='+this.posp+'&appid=f513805255c080947d4115bc85cf923e&lang=fr&units=metric')
            .map(response => response.json())
            .subscribe(result => {
                this.datas = result;
                this.longi = result.coord;
                this.tempMain = result.main;
                this.sys = result.sys;
                var date_sunrise = new Date(this.sys.sunrise*1000);
                var date_sunset = new Date(this.sys.sunset*1000);
                this.sunrise = date_sunrise.getHours() + 'h' + ('0' + date_sunrise.getMinutes()).slice(-2);
                this.sunset = date_sunset.getHours() + 'h' + ('0' + date_sunset.getMinutes()).slice(-2);
                console.log(result, this.sunset)
            });

    }
}
