import {Page} from 'ionic-angular';
import {Http} from 'angular2/http';


@Page({
  template: `
<ion-navbar *navbar primary="">
  <ion-title>The Weather Skull</ion-title>
</ion-navbar>
<ion-toolbar>
  <ion-title>Rechercher</ion-title>
</ion-toolbar>

<ion-content class="page2">
    <input (click)="load()" id="dede" autocapitalize="off" autocomplete="off" autocorrect="off" class="searchbar-input" spellcheck="false" type="search" placeholder="Search">
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAC4k0qIOxFSbHMZ6Du0sirVICthUVkwfU&libraries=places"></script>
    <div id="map"></div>  
</ion-content>
`
})
export class Page2 {
  constructor(http: Http) {
    this.http = http;
    this.map = null;
    this.loadMap();
  }

  load(){

    var autocomplete = new google.maps.places.Autocomplete((document.getElementById("dede")));

    autocomplete.addListener('place_changed', () => {
      var lat = autocomplete.getPlace().geometry.location.lat();
      var lng = autocomplete.getPlace().geometry.location.lng();
      this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&units=metric&appid=f513805255c080947d4115bc85cf923e')
          .map(response => response.json())
          .subscribe(result => {
            console.log(result)
          });
    });
  }

  loadMap(){
    let options = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(

        (position) => {
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }

          this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        },

        (error) => {
          console.log(error);
        }, options

    );

  }
}
