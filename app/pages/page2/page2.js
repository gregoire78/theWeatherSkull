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
    constructor(http:Http) {
        this.http = http;

        this.loadMap();

        this.map = null;
        this.dataWeather = {};
        this.place = ""
    }

    load() {

        var autocomplete = new google.maps.places.Autocomplete((document.getElementById("pac-input")));
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: this.map
        });

        marker.addListener('click', () => {
            marker.setVisible(false);
            this.http.get(this.weatherUrl(marker.getPosition().lat(), marker.getPosition().lng()))
                .map(response => response.json())
                .subscribe((result) => {
                    this.dataWeather = result;
                    marker.setIcon(this.setMarker(this.dataWeather));
                    marker.setPosition(this.place.geometry.location);
                    marker.setVisible(true);
                    infowindow.setContent(this.infoWindowsContent(this.dataWeather, this.place));
                    infowindow.open(this.map, marker);
                });
        });

        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', () => {
            marker.setVisible(false);
            infowindow.close();

            this.place = autocomplete.getPlace();
            if (!this.place.geometry) {
                console.log("Autocomplete's returned place contains no geometry");
                return;
            }

            this.map.setCenter(this.place.geometry.location);
            this.map.setZoom(12);

            this.place.address = '';
            if (this.place.address_components) {
                this.place.address = [
                    //(this.place.address_components[0] && this.place.address_components[0].short_name || ''),
                    (this.place.address_components[1] && this.place.address_components[1].short_name || ''),
                    (this.place.address_components[2] && this.place.address_components[2].short_name || '')
                ].join(' ');
            }

            this.getDataWeather(marker, infowindow);

        });
    }

    getDataWeather(marker, infowindow) {
        this.http.get(this.weatherUrl(this.place.geometry.location.lat(), this.place.geometry.location.lng()))
            .map(response => response.json())
            .subscribe((result) => {
                this.dataWeather = result;
                marker.setIcon(this.setMarker(this.dataWeather));
                marker.setPosition(this.place.geometry.location);
                marker.setVisible(true);
                infowindow.setContent(this.infoWindowsContent(this.dataWeather, this.place));
                infowindow.open(this.map, marker);
            });
    }

    loadMap() {
        var styledMap = new google.maps.StyledMapType([
            {
                "featureType": "landscape",
                "stylers": [{"hue": "#FFBB00"}, {"saturation": 43.400000000000006}, {"lightness": 37.599999999999994}, {"gamma": 1}]
            }, {
                "featureType": "road.highway",
                "stylers": [{"hue": "#FFC200"}, {"saturation": -61.8}, {"lightness": 45.599999999999994}, {"gamma": 1}]
            }, {
                "featureType": "road.arterial",
                "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 51.19999999999999}, {"gamma": 1}]
            }, {
                "featureType": "road.local",
                "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 52}, {"gamma": 1}]
            }, {
                "featureType": "water",
                "stylers": [{"hue": "#0078FF"}, {"saturation": -13.200000000000003}, {"lightness": 2.4000000000000057}, {"gamma": 1}]
            }, {
                "featureType": "poi",
                "stylers": [{"hue": "#00FF6A"}, {"saturation": -1.0989010989011234}, {"lightness": 11.200000000000017}, {"gamma": 1}]
            }
        ],
            {name: "météo"});

        let options = {timeout: 10000, enableHighAccuracy: true};

        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                let mapOptions = {
                    center: latLng,
                    zoom: 12,
                    // mapTypeId: google.maps.MapTypeId.HYBRID,
                    mapTypeControlOptions: {
                         mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'map_style']
                    }
                };

                this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                this.map.mapTypes.set('map_style', styledMap);
                this.map.setMapTypeId('map_style');
            },

            (error) => {
                console.log(error);
            }, options
        );

    }

    weatherUrl(lat, lng) {
        return 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&units=metric&appid=551b97ca557560dfc7d8c49a81b37d89'
    }

    infoWindowsContent(dataWeather, place){
        return "<p><img src=" + "http://weatherandtime.net/images/icons/1/" + dataWeather.weather[0].icon + ".png" + ">" +
        dataWeather.main.temp + "°C</p>" +
        '<div><strong>' + place.name + '</strong><br>'
        + place.address
    }

    setMarker(dataWeather){
        return {
            url: "http://weatherandtime.net/images/icons/1/" + dataWeather.weather[0].icon + ".png",
            size: new google.maps.Size(50, 50),
            //origin: new google.maps.Point(0, 0),
            //anchor: new google.maps.Point(0, -29)
            scaledSize: new google.maps.Size(50, 50)
        }
    }
}
