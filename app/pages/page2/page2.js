import {Page} from 'ionic-angular';
import {Http} from 'angular2/http';
import {InputSearch} from './input-search'

@Page({
    template: `
<ion-navbar *navbar primary="">
    <ion-title>The Weather Skull</ion-title>
</ion-navbar>

    <input-search (click)="load()" [weather]="dataWeather" [place]="place" ></input-search>

<ion-content class="page2">
    <!--<input (click)="load()" id="dede" autocapitalize="off" autocomplete="off" autocorrect="off" class="searchbar-input" spellcheck="false" type="search" placeholder="Search">-->
    
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAC4k0qIOxFSbHMZ6Du0sirVICthUVkwfU&libraries=places"></script>
    <div id="map"></div>  
</ion-content>
`,
    directives: [InputSearch]
})
export class Page2 {
    dataWeather: {}
    constructor(http:Http) {
        this.http = http;

        this.loadMap();
        this.map = null;
        this.marker=null;
        this.infowindow=null;
        this.infowindow=null;
        this.dataWeather = {};
        this.place = ""
    }


    geocodePosition(pos) {
    this.geocoder.geocode({
        latLng: pos
    }, (responses) => {
        if (responses && responses.length > 0) {
            this.place = responses[0];
            this.place.name=responses[0].address_components[2].long_name;
            this.place.address=responses[0].address_components[3].long_name + " " + responses[0].address_components[4].long_name;
            this.getDataWeather(pos);
            console.log(responses[0]);
        } else {
            console.log('Cannot determine address at this location.');
        }
    });
}

    load() {
        console.log('load');

        this.autocomplete.bindTo('bounds', this.map);
        this.autocomplete.addListener('place_changed', () => {
            this.place = this.autocomplete.getPlace();
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
            this.getDataWeather(this.place.geometry.location);

        });
        this.marker.addListener('click', () => {
            this.getDataWeather(this.marker.getPosition());
        });
        this.marker.addListener('dragend', () => {
            this.geocodePosition(this.marker.getPosition());
        });

    }

    getDataWeather(latlng) {
        this.marker.setVisible(false);
        this.infowindow.close(this.map, this.marker);
        this.http.get(this.weatherUrl(latlng))
            .map(response => response.json())
            .subscribe((result) => {
                this.dataWeather = result;
                this.marker.setIcon(this.setMarker(this.dataWeather));
                this.marker.setPosition(latlng);
                this.marker.setVisible(true);
                this.infowindow.setContent(this.infoWindowsContent(this.dataWeather, this.place));
                this.infowindow.open(this.map, this.marker);
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
        this.geocoder = new google.maps.Geocoder();
        let options = {timeout: 10000, enableHighAccuracy: true};

        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                let mapOptions = {
                    center: latLng,
                    zoom: 12,
                    mapTypeControl: false,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                        mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'map_style']
                    }
                };

                this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                this.map.mapTypes.set('map_style', styledMap);
                this.map.setMapTypeId('map_style');

                this.marker = new google.maps.Marker({
                    map: this.map,
                    draggable:true,
                    animation: google.maps.Animation.DROP
                });

                var input = document.getElementById("pac-input");
                this.autocomplete = new google.maps.places.Autocomplete(input);

                this.infowindow = new google.maps.InfoWindow();
                this.infowindow.close(this.map, this.marker);
            },

            (error) => {
                console.log(error);
            }, options
        );

    }

    weatherUrl(latlng) {
        return 'http://api.openweathermap.org/data/2.5/weather?lat=' + latlng.lat() + '&lon=' + latlng.lng() + '&appid=551b97ca557560dfc7d8c49a81b37d89&lang=fr&units=metric'
    }

    infoWindowsContent(dataWeather, place){
        //"<p><img src=" + "http://weatherandtime.net/images/icons/1/" + dataWeather.weather[0].icon + ".png" + ">" +
        return '' +
            '<p>' +
            '<h1>'+dataWeather.main.temp+'°C</h1>' +
            dataWeather.weather[0].description +
            '</p>' +
            '<div>' +
            '<strong>' + place.name + '</strong><br>' +
            place.address +
            '<!--<br><button class="btn-details">Détails</button>-->' +
            '</div>'
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
