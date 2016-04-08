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
    <!--<input (click)="load()" id="dede" autocapitalize="off" autocomplete="off" autocorrect="off" class="searchbar-input" spellcheck="false" type="search" placeholder="Search">-->
    <input (click)="load()" id="pac-input" autocapitalize="off" autocomplete="off" autocorrect="off" type="text" placeholder="Enter a location" spellcheck="false" type="search">
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

    var autocomplete = new google.maps.places.Autocomplete((document.getElementById("pac-input")));
      autocomplete.bindTo('bounds', this.map);

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
          map: this.map,
          anchorPoint: new google.maps.Point(0, -29)
      });
    autocomplete.addListener('place_changed', () => {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
    if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
    }
        var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&units=metric&appid=f513805255c080947d4115bc85cf923e')
          .map(response => response.json())
          .subscribe(result => {
            console.log(result)
          });
        if (place.geometry.viewport) {
            this.map.fitBounds(place.geometry.viewport);
        } else {
            this.map.setCenter(place.geometry.location);
            this.map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(this.map, marker);
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
