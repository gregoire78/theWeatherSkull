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
</ion-content>
`
})
export class Page2 {
  constructor(http: Http) {
    this.http = http;
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
}
