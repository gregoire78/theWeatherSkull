import {Page} from 'ionic-angular';
import {CurrentTime} from './currentTime';
import {Geolocation} from 'ionic-native';
import {NavController} from 'ionic-angular';
import {Page2} from '../page2/page2';
import {Http} from 'angular2/http';

@Page({
    templateUrl: 'build/pages/page1/page1.html',
    directives: [CurrentTime]
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
        this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+this.posi+'&lon='+this.posp+'&units=metric&appid=f513805255c080947d4115bc85cf923e')
            .map(response => response.json())
            .subscribe(result => {this.datas = result; this.longi = result.coord; this.tempMain = result.main; console.log(result)});
    }
}
