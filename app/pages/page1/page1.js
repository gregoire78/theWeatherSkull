import {Page} from 'ionic-angular';
import {CurrentTime} from './currentTime';
import {Geolocation} from 'ionic-native';
import {NavController} from 'ionic-angular';
import {Http} from 'angular2/http';
import {NavButton} from './navButton';

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
                <i class="wi wi-owm-{{datas.weather_id}}"></i> {{datas.weather_desc}}
                <hr>
                <i class="wi wi-sunrise"></i> {{datas.sunrise}}<br>
                <i class="wi wi-sunset"></i> {{datas.sunset}}
            </h3>
        </ion-col>
        <icon-col width-40>
            <!--<img src="http://www.yourplaceabroad.com/_img/weather_icons/icons_200/{{datas.weather_icon}}.png" alt="icon">-->
            <!--<img src="http://www.pf-arkhbum.ru/skin/img/icons/weather/day/{{datas.weather_icon}}.png" alt="icon">-->
            <!--<img src="http://www.motorwerksporsche.com/wp-content/themes/DealerInspireCommonTheme/images/mobile/weather/{{datas.weather_icon}}.png" alt="icon">-->
            <img src="http://weatherandtime.net/images/icons/1/{{datas.weather_icon}}.png" alt="icon">
            <!--<img src="http://www.kankou-nanjo.okinawa/img/weather/{{datas.weather_icon}}.png" alt="icon">-->
        </icon-col>
    </ion-row>
    <p id="temp"><span id="val-temp">{{datas.temp}}</span><span id="celsius">°C</span></p>
</ion-content>
<ion-toolbar position="bottom">
  <p>Ash, Misty, Brock</p>
  <ion-buttons end>
    <button royal>
      Send
      <ion-icon name="send"></ion-icon>
    </button>
  </ion-buttons>
</ion-toolbar>`,
    directives: [CurrentTime, NavButton]
})
export class Page1 {
    lat:int;
    lng:int;
    datas:{};

    constructor(nav:NavController, http:Http) {
        this.nav = nav;
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
                this.datas['sunrise'] = this.hourFormat(result.sys.sunrise);
                this.datas['sunset'] = this.hourFormat(result.sys.sunset);
                this.datas['weather_id'] = result.weather[0].id;
                this.datas['weather_desc'] = result.weather[0].description;
                this.datas['weather_icon'] = result.weather[0].icon;
                console.log(result)
            }, (error) => console.log("error : " + error), (complete) => console.log("complet !"));
    }

    hourFormat(date) {
        date = new Date(date * 1000);
        return date.getHours() + 'h' + ('0' + date.getMinutes()).slice(-2);
    }
}
