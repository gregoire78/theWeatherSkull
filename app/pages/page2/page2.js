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
    this.dataWeather = {};
      this.address = "";
      this.place = ""
  }

  load(){

    var autocomplete = new google.maps.places.Autocomplete((document.getElementById("pac-input")));
      autocomplete.bindTo('bounds', this.map);

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
          map: this.map
      });

      marker.addListener('click', () => {
          marker.setVisible(false);
          this.http.get(this.weatherUrl(marker.getPosition().lat(),marker.getPosition().lng()))
              .map(response => response.json())
              .subscribe((result) => {
                  this.dataWeather = result;

                  marker.setIcon({
                      url: "http://weatherandtime.net/images/icons/1/" + this.dataWeather.weather[0].icon + ".png",
                      size: new google.maps.Size(50, 50),
                      //origin: new google.maps.Point(0, 0),
                      //anchor: new google.maps.Point(0, -29)
                      scaledSize: new google.maps.Size(50, 50)
                  });
                  marker.setVisible(true);

                  infowindow.setContent(
                      "<p><img src=" + "http://weatherandtime.net/images/icons/1/" + this.dataWeather.weather[0].icon + ".png" + ">" +
                      this.dataWeather.main.temp + "°C</p>" +
                      '<div><strong>' + this.place.name + '</strong><br>' +
                      this.address
                  );
                  infowindow.open(this.map, marker);
              });
      });
      
    autocomplete.addListener('place_changed', () => {
        marker.setVisible(false);
        infowindow.close();
        // marker.setVisible(false);
        this.place = autocomplete.getPlace();
    if (!this.place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
    }

      var lat = this.place.geometry.location.lat();
      var lng = this.place.geometry.location.lng();

        this.map.setCenter(this.place.geometry.location);
        this.map.setZoom(14);

        this.address = '';
        if (this.place.address_components) {
            this.address = [
                (this.place.address_components[0] && this.place.address_components[0].short_name || ''),
                (this.place.address_components[1] && this.place.address_components[1].short_name || ''),
                (this.place.address_components[2] && this.place.address_components[2].short_name || '')
            ].join(' ');
        }

        this.http.get(this.weatherUrl(lat,lng))
            .map(response => response.json())
            .subscribe((result) => {
                this.dataWeather = result;
                console.log(this.dataWeather);

                marker.setIcon({
                    url: "http://weatherandtime.net/images/icons/1/" + this.dataWeather.weather[0].icon + ".png",
                    size: new google.maps.Size(50, 50),
                    //origin: new google.maps.Point(0, 0),
                    //anchor: new google.maps.Point(0, -29)
                    scaledSize: new google.maps.Size(50, 50)
                });
                marker.setPosition(this.place.geometry.location);
                marker.setVisible(true);

                infowindow.setContent(
                    "<p><img src=" + "http://weatherandtime.net/images/icons/1/" + this.dataWeather.weather[0].icon + ".png" + ">" +
                    this.dataWeather.main.temp + "°C</p>" +
                    '<div><strong>' + this.place.name + '</strong><br>'
                    + this.address
                );
                infowindow.open(this.map, marker);
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
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.HYBRID
          };

          this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        },

        (error) => {
          console.log(error);
        }, options

    );

  }

    weatherUrl(lat, lng){
        return 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&units=metric&appid=551b97ca557560dfc7d8c49a81b37d89'
    }
}
